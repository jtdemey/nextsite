import logger from '../logger';
import { rollScenario } from './imposterScenarios';
import { nanoid } from 'nanoid';
import { ENDGAME_REASONS, PHASES, SOCKET_COMMANDS } from '../../components/imposter/redux/imposterConstants';
import { genGameId } from '../../components/imposter/ImposterUtils';
import { handlePong, pingPlayers } from './playerCleaner';

export const makeGameSuite = () => {
  const gameSuite = {};

  //Fields
  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.gameList = [];
  gameSuite.playerList = [];

	//Private
	let gsTick = 0;

  //Logs
  const logInfo = (msg, gameId = null) =>
    logger.info(`[GS] ${gameId ? `[${gameId}] ` : ''}${msg}`);

  const logError = (err, gameId = null) =>
    logger.error(`[GS] ${gameId ? `[${gameId}] ` : ''}${err}`);

  //Creators
  gameSuite.makeCommand = (commName, params = null) => {
    if(params) {
      return JSON.stringify({
        command: commName,
        ...params
      });
    }
    return JSON.stringify({
      command: commName
    });
  };

  gameSuite.makeGame = () => ({
		gameId: genGameId(),
		gameTitle: 'imposter',
		gameOverReason: null,
		host: null,
		imposterId: null,
		isPaused: false,
		players: [],
		phase: PHASES.LOBBY,
		remainingTime: 10, //To-do: change this
		scenario: null,
		scenarioList: [],
		condition: null,
		roles: [], 
		tick: 0,
		votes: []
  });

  gameSuite.makePlayer = (socket, sockId) => ({
		extendTimerCt: 0,
		gameId: null,
		hurryUpCt: 0,
		isDisconnected: false,
		isPlaying: false,
		isReady: false,
		name: null,
		socket: socket,
		socketId: sockId
  });

  gameSuite.makeVote = (type, callerId, callerName, threshold, accusedId = null, accusedName = null) => ({
		voteId: nanoid(),
		voteType: type,
		callerId: callerId,
		callerName,
		accusedId: accusedId,
		accusedName,
		tick: 15,
		threshold,
		yay: 0,
		nay: 0
  });

  //Utilities
  gameSuite.emitToGame = (gameId, command, debug = false) => {
    const gamePlayers = gameSuite.playerList.filter(p => p.gameId && p.gameId === gameId);
    for(let j = 0; j < gamePlayers.length; j++) {
      if(debug) {
        logInfo(`Sending ${JSON.parse(command).command} to ${gamePlayers[j].socketId}`);
      }
      gamePlayers[j].socket.send(command);
    }
  };

  gameSuite.emitToPlayer = (socketId, command, debug = false) => {
    const player = gameSuite.playerList.filter(p => p.socketId === socketId)[0];
    if(!player) {
      logError(`Could not emit to player ${socketId}`);
    }
    if(debug) {
      logInfo(`Sending ${JSON.parse(command).command} to ${socketId}`);
    }
    player.socket.send(command);
  };

  gameSuite.parseRes = msg => {
    try {
      const r = JSON.parse(msg);
      return r;
    } catch {
      logError(`Unable to parse client message ${msg}`);
    }
  };

  //Getters
  gameSuite.getGame = gameId => {
    const r = gameSuite.gameList.filter(g => g.gameId === gameId)[0];
    if(!r) {
      logError(`Could not get game ${gameId}`);
      return false;
    }
    return r;
  };

  gameSuite.getPlayer = socketId => {
    const r = gameSuite.playerList.filter(p => p.socketId === socketId)[0];
    if(!r) {
      logError(`Could not get player ${socketId}`);
      return false;
    }
    return r;
  };

  //Setters
  gameSuite.updateGame = (gameId, gameData) => {
    let g = gameSuite.getGame(gameId.toUpperCase());
    if(!g) {
      logError(`Could not update game ${gameId}`);
    }
    g = {
      ...g,
      ...gameData
    };
    const f = gameSuite.gameList.filter(g => g.gameId !== gameId);
    gameSuite.gameList = f.concat([g]);
  };

  gameSuite.updatePlayer = (socketId, playerData) => {
    let p = gameSuite.getPlayer(socketId);
    if(!p) {
      logError(`Could not update player ${socketId}`);
    }
    p = {
      ...p,
      ...playerData
    };
    const f = gameSuite.playerList.filter(p => p.socketId !== socketId);
    gameSuite.playerList = f.concat([p]);
  };

  //Adders
  gameSuite.addGame = (game, debug = false) => {
    gameSuite.gameList = gameSuite.gameList.concat([game]);
    if(debug) {
      logInfo(`Added game ${game.gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };

  gameSuite.addPlayer = (player, debug = false) => {
    gameSuite.playerList = gameSuite.playerList.concat([player]);
    if(debug) {
      logInfo(`Added player ${player.socketId} (Total: ${gameSuite.playerList.length})`);
    }
  };

  //Deleters
  gameSuite.removeGame = (gameId, debug = false) => {
    const r = gameSuite.gameList.filter(g => g.gameId !== gameId);
    gameSuite.gameList = r;
    if(debug) {
      logInfo(`Removed game ${gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };

  gameSuite.removePlayer = (socketId, debug = false) => {
    const activeGame = gameSuite.gameList.filter(g => g.players.some(p => p.socketId === socketId))[0];
    if(activeGame && activeGame.players) {
      if(activeGame.players.length <= 1) {
        gameSuite.removeGame(activeGame.gameId);
        logInfo(`Removed empty game ${activeGame.gameId} (Total: ${gameSuite.gameList.length})`);
      } else if(socketId === activeGame.imposterId) {
        gameSuite.updateGame(activeGame.gameId, {
          gameOverReason: getEndgameMessage(ENDGAME_REASONS.IMPOSTER_QUIT),
          phase: PHASES.BYSTANDER_VICTORY,
          players: activeGame.players.filter(p => p.socketId !== socketId),
          remainingTime: 15
        });
      } else {
        gameSuite.updateGame(activeGame.gameId, {
          players: activeGame.players.filter(p => p.socketId !== socketId)
        });
      }
    }
    gameSuite.playerList = gameSuite.playerList.filter(p => p.socketId !== socketId);
    if(debug) {
      logInfo(`Removed player ${socketId} (Total: ${gameSuite.playerList.length})`);
    }
  };

  //Lifecycle
  gameSuite.doGameTick = game => {
    let g = {
      ...game
    };
    g.tick += 1;
    g.remainingTime -= 1;
    if(g.remainingTime < 0) {
      g = gameSuite.iteratePhase(g);
    }
    if(g.votes.length > 0) {
      g.votes = g.votes.map(v => ({ ...v, tick: v.tick - 1 })).filter(v => v.tick > 0);
    }
    return g;
  };

  gameSuite.iteratePhase = game => {
    let g = { ...game };
    for(let i = 0; i < g.players.length; i++) {
      game.players[i].isReady = false;
    }
    switch(g.phase) {
      case PHASES.LOBBY:
        if(g.players.length < 3) {
          g.remainingTime = 30;
          gameSuite.emitToGame(g.gameId, gameSuite.makeCommand('imposterError', {
            text: `At least 3 players are required to play`
          }));
        } else {
          g.phase = PHASES.IN_GAME;
          g.remainingTime = 240;
          g = gameSuite.applyScenario(g, rollScenario());
        }
        break;
      case PHASES.IN_GAME:
        g.phase = PHASES.IMPOSTER_VICTORY;
        g.remainingTime = 20;
        break;
      case PHASES.BYSTANDER_VICTORY:
      case PHASES.IMPOSTER_VICTORY:
        g.phase = PHASES.LOBBY;
        g.remainingTime = 60;
        break;
      default:
        logInfo(`Unrecognized game phase ${g.phase}`);
        break;
    }
    return g;
  };

	const onTick = tick => {
		if(tick % 30 === 0) {
			pingPlayers(gameSuite);
		}
		if(tick > 30000)  {
			tick = 0;
		}
		tick++;
		return tick;
	};

  gameSuite.startGameClock = () => {
    gameSuite.clock = setInterval(() => {
      if(gameSuite.gameList.length < 1) {
        logInfo('Going idle...');
        gameSuite.startIdleClock(gameSuite);
      }
      const activeGames = gameSuite.gameList.filter(g => g.isPaused === false && g.players.length > 0);
      for(let i = 0; i < activeGames.length; i++) {
        let g = activeGames[i];
        g = gameSuite.doGameTick(g);
        gameSuite.updateGame(g.gameId, { ...g });
        gameSuite.emitToGame(g.gameId, gameSuite.makeCommand('gameTick', {
          gameState: g
        }));
      }
			gsTick = onTick(gsTick);
    }, 1000);
  };

  gameSuite.startIdleClock = () => {
		clearInterval(gameSuite.clock);
    gameSuite.clock = setInterval(() => {
      if(gameSuite.gameList.length > 0) {
        logInfo(`Bootin' up!`);
        clearInterval(gameSuite.clock);
        gameSuite.startGameClock(gameSuite);
      }
			gsTick = onTick(gsTick);
    }, 3000);
  };

  //Form Handlers
  gameSuite.handleSubmitHostGame = msg => {
    const newImposter = gameSuite.makeGame();
    gameSuite.updatePlayer(msg.socketId, {
      gameId: newImposter.gameId,
      name: msg.playerName || 'Dingus'
    });
    const hostPlayer = gameSuite.getPlayer(msg.socketId);
    newImposter.host = hostPlayer.socketId;
    newImposter.players = newImposter.players.concat([hostPlayer]);
    gameSuite.addGame(newImposter, true);
    logInfo(`Host game submitted by ${msg.socketId}`);
    return newImposter;
  };

  const getOriginalName = (name, players) => {
    if(players.some(p => p.name === name)) {
      const lastChar = name.charAt(name.length - 1);
      let newName;
      if(isNaN(lastChar)) {
        newName = name + ' 2';
      } else {
        newName = name.replace(/.$/, (parseInt(lastChar) + 1).toString());
      }
      return getOriginalName(newName, players);
    } else {
      return name;
    }
  };

  gameSuite.handleSubmitJoinGame = msg => {
    const prospImposter = gameSuite.getGame(msg.gameId.toUpperCase());
    if(!prospImposter) {
      gameSuite.emitToPlayer(msg.socketId, gameSuite.makeCommand('imposterError', {
        text: `Could not find game ${msg.gameId}.`
      }));
      return;
    }
    if(prospImposter.players.length > 11) {
      gameSuite.emitToPlayer(msg.socketId, gameSuite.makeCommand('imposterError', {
        text: `Game ${msg.gameId.toUpperCase()} is full.`
      }));
      return;
    }
		if(prospImposter.phase === PHASES.IN_GAME) {
      gameSuite.emitToPlayer(msg.socketId, gameSuite.makeCommand('imposterError', {
        text: `Game ${msg.gameId.toUpperCase()} is in session; you can join when the game completes.`
      }));
      return;
		}
    let rawName = msg.playerName || 'Dingus';
    const playerName = getOriginalName(rawName.trim(), prospImposter.players);
    gameSuite.updatePlayer(msg.socketId, {
      gameId: msg.gameId.toUpperCase(),
      name: playerName
    });
    const joiner = gameSuite.getPlayer(msg.socketId);
    const newPlayers = prospImposter.players.concat([joiner]);
    gameSuite.updateGame(msg.gameId, {
      players: newPlayers
    });
    logInfo(`Join game submitted by ${msg.socketId}`);
    return {
      ...prospImposter,
      players: newPlayers
    };
  };

	//Message handler 
	gameSuite.handleSocketMsg = (wss, ws, raw) => {
		const msg = wss.gs.parseRes(raw);
		if(msg.command !== 'ping' && msg.command !== 'pong') {
			logInfo(`${msg.socketId ? `Socket ${msg.socketId}` : `New player`} says ${msg.command}"`);
		}
		let result, playerId;
		switch(msg.command) {
			//General
			case SOCKET_COMMANDS.PONG:
				handlePong(msg.socketId);
				break;
			case SOCKET_COMMANDS.SOCKET_DISONNECT:
				wss.gs.removePlayer(msg.socketId, true);
				break;
			//Imposter
			case SOCKET_COMMANDS.LAUNCHED_IMPOSTER:
				playerId = nanoid();
				wss.gs.addPlayer(wss.gs.makePlayer(ws, playerId), true);
				ws.send(wss.gs.makeCommand(SOCKET_COMMANDS.ACCEPT_IMPOSTER_LAUNCH, {
					socketId: playerId
				}));
				break;
			case SOCKET_COMMANDS.SUBMIT_HOST_GAME:
				result = wss.gs.handleSubmitHostGame(msg);
				if(result) {
					ws.send(wss.gs.makeCommand(SOCKET_COMMANDS.INIT_GAME, { gameState: result }));
				}
				break;
			case SOCKET_COMMANDS.SUBMIT_JOIN_GAME:
				result = wss.gs.handleSubmitJoinGame(msg);
				if(result) {
					ws.send(wss.gs.makeCommand(SOCKET_COMMANDS.INIT_GAME, { gameState: result }));
				}
				break;
			case SOCKET_COMMANDS.EXTEND_TIMER:
				wss.gs.extendTimer(msg.socketId, msg.gameId);
				break;
			case SOCKET_COMMANDS.HURRY_UP:
				wss.gs.hurryUp(msg.socketId, msg.gameId);
				break;
			case SOCKET_COMMANDS.TOGGLE_READY_STATE:
				wss.gs.toggleReadyState(msg);
				break;
			case SOCKET_COMMANDS.ACCUSE_PLAYER:
				wss.gs.handleAccusePlayer(msg);
				break;
			case SOCKET_COMMANDS.RETURN_TO_LOBBY:
				wss.gs.handleLobbyReturnVote(msg);
				break;
			case SOCKET_COMMANDS.CAST_VOTE:
				wss.gs.castVote(msg);
				break;
			case SOCKET_COMMANDS.IDENTIFY_SCENARIO:
				wss.gs.identifyScenario(msg);
				break;
			default:
				logError(`Socket command '${msg.command}' not recognized`);
				break;
		}
	};

  //Events
  gameSuite.applyScenario = (state, scene) => {
    const result = {
      ...state,
      imposterId: null,
      scenario: scene.scenario,
      scenarioList: scene.scenarioList,
      condition: scene.condition,
      roles: []
    };
    const randomId = state.players[Math.floor(Math.random() * state.players.length)].socketId;
    logInfo(`Assigned imposter to ` + randomId, state.gameId);
    result.imposterId = randomId;
    result.roles.push({
      socketId: randomId,
      role: 'the imposter'
    });
    state.players.forEach(p => {
      if(p.socketId !== randomId) {
        const role = scene.roles[Math.floor(Math.random() * scene.roles.length)];
        result.roles.push({
          socketId: p.socketId,
          role
        });
        scene.roles = scene.roles.filter(r => r !== role);
      }
    });
    logInfo(`Applied scenario ${scene.scenario} to ${state.gameId}`);
    return result;
  };

  const getEndgameMessage = ind => {
    const gameOverReasons = [
      `Anyone home? Nobody wins. Bad ending.`,
      `Bag em and tag em, fellas. The Imposter was apprehended.`,
      `Real subtle, bystanders. The Imposter figured out the scenario.`,
      `The Imposter goofed and picked the wrong scenario.`,
      `The Imposter ragequit.`,
      `You accused and convicted an innocent bystander!`
    ];
    if(!gameOverReasons[ind]) {
      logError(`Could not get endgame message for index ${ind}`);
    }
    return gameOverReasons[ind];
  };

  gameSuite.castVote = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    const currVotes = currGame.votes;
    const vote = currVotes.filter(v => v.voteId === msg.voteId)[0];
    if(!vote) {
      logError(`Cast vote: Unable to find vote ${msg.voteId} in ${msg.gameId}`);
    }
    if(msg.isYay) {
      vote.yay += 1;
    } else {
      vote.nay += 1;
    }
    if(vote.yay >= vote.threshold) {
      if(vote.voteType === 'lobby') {
        gameSuite.updateGame(msg.gameId, {
          phase: PHASES.LOBBY,
          remainingTime: 60,
          votes: []
        });
      } else if(vote.voteType === 'accusation') {
        if(vote.accusedId === currGame.imposterId) {
          gameSuite.updateGame(msg.gameId, {
            phase: PHASES.BYSTANDER_VICTORY,
            gameOverReason: getEndgameMessage(ENDGAME_REASONS.IMPOSTER_ACCUSED),
            remainingTime: 15,
            votes: []
          });
        } else {
          gameSuite.updateGame(msg.gameId, {
            phase: PHASES.IMPOSTER_VICTORY,
            gameOverReason: getEndgameMessage(ENDGAME_REASONS.WRONG_ACCUSATION),
            remainingTime: 15,
            votes: []
          });
        }
      }
    } else {
      gameSuite.updateGame(msg.gameId, {
        votes: currVotes.filter(v => v.voteId !== msg.voteId).concat([vote]) 
      });
    }
    logInfo(`${msg.gameId}: ${msg.socketId} voted ${msg.isYay ? 'yay' : 'nay'} on vote ${msg.voteId} (${vote.voteType})`);
  };

  gameSuite.handleAccusePlayer = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    if(msg.accuserId === msg.accusedId || currGame.votes.some(v => v.callerId === msg.accuserId)) {
      return;
    }
    const callerName = currGame.players.filter(p => p.socketId === msg.accuserId)[0].name;
    if(!callerName) {
      logError(`Accuse player: Unable to find player name for accuser ${msg.accuserId}`);
    }
    const accusedName = currGame.players.filter(p => p.socketId === msg.accusedId)[0].name;
    if(!accusedName) {
      logError(`Accuse player: Unable to find player name for accused ${msg.accuserId}`);
    }
    const thresh = currGame.players.length < 3 ? 1 : currGame.players.length - 2;
    const accusation = gameSuite.makeVote('accusation', msg.accuserId, callerName, thresh, msg.accusedId, accusedName);
    const newVotes = currGame.votes.concat([accusation]);
    gameSuite.updateGame(msg.gameId, {
      votes: newVotes
    });
    gameSuite.emitToGame(currGame.gameId, gameSuite.makeCommand('refreshVotes', {
      votes: newVotes
    }));
    logInfo(`${msg.gameId}: ${msg.accuserId} accuses ${msg.accusedId}`);
  };

  gameSuite.handleLobbyReturnVote = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    if(currGame.votes.some(v => v.callerId === msg.socketId)) {
      return;
    }
    if(currGame.players.length === 1) {
      gameSuite.updateGame(msg.gameId, {
        phase: PHASES.LOBBY,
        remainingTime: 60,
        votes: []
      });
    }
    const callerName = currGame.players.filter(p => p.socketId === msg.socketId)[0].name;
    if(!callerName) {
      logError(`Return to lobby: Unable to find player name for ${msg.socketId}`);
    }
    const thresh = currGame.players.length - 1 < 1 ? 1 : currGame.players.length - 1;
    const vote = gameSuite.makeVote('lobby', msg.socketId, callerName, thresh);
    const newVotes = currGame.votes.concat([vote]);
    gameSuite.updateGame(msg.gameId, {
      votes: newVotes
    });
    gameSuite.emitToGame(currGame.gameId, gameSuite.makeCommand('refreshVotes', {
      votes: newVotes
    }));
    logInfo(`${msg.gameId}: ${msg.socketId} votes to return to the lobby`);
  };

  gameSuite.extendTimer = (sockId, gameId) => {
    const game = gameSuite.getGame(gameId);
    game.remainingTime += 10;
    logInfo(`${sockId} extended timer for ${gameId}`);
  };

  gameSuite.hurryUp = (sockId, gameId) => {
    const game = gameSuite.getGame(gameId);
    game.remainingTime -= 1;
    logInfo(`${sockId} depleted timer for ${gameId}`);
  };

  gameSuite.identifyScenario = msg => {
    const game = gameSuite.getGame(msg.gameId);
    const imposter = game.players.filter(p => p.socketId === msg.imposterId);
    if(imposter.length < 1) {
      logError(`Identify scenario: unable to find imposter with ID ${msg.imposterId}`);
    }
    if(game.scenario.toUpperCase() === msg.scenario.toUpperCase()) {
      gameSuite.updateGame(msg.gameId, {
        gameOverReason: getEndgameMessage(ENDGAME_REASONS.IMPOSTER_CORRECT),
        phase: PHASES.IMPOSTER_VICTORY,
        remainingTime: 15
      });
      logInfo(`Imposter for ${msg.gameId} guessed correct scenario`);
    } else {
      gameSuite.updateGame(msg.gameId, {
        gameOverReason: getEndgameMessage(ENDGAME_REASONS.IMPOSTER_WRONG),
        phase: PHASES.BYSTANDER_VICTORY,
        remainingTime: 15
      });
      logInfo(`Imposter for ${msg.gameId} guessed the wrong scenario`);
    }
  };

  gameSuite.toggleReadyState = msg => {
    const game = gameSuite.getGame(msg.gameId);
    const player = game.players.filter(p => p.socketId === msg.socketId)[0];
    if(!player) {
      logError(`Toggle ready state: unable to find player ${msg.socketId} in game ${msg.gameId}`);
      return;
    }
    player.isReady = !player.isReady;
    gameSuite.updatePlayer(msg.socketId, {
      isReady: msg.readyValue
    });
    if(game.players.filter(p => p.isReady).length === game.players.length) {
      gameSuite.updateGame(game.gameId, {
        remainingTime: 0
      });
    }
    logInfo(`${msg.socketId} toggled ready state`, msg.gameId);
  };

  return gameSuite;
};