import logger from '../logger';
import { nanoid } from 'nanoid';
import { ENDGAME_REASONS, PHASES, SOCKET_COMMANDS } from '../../components/imposter/redux/imposterConstants';
import { genGameId } from '../../components/imposter/ImposterUtils';
import { handlePong, pingPlayers } from './playerCleaner';
import { handleImposterMsg } from './imposter/imposterController';
import createImposterDomain from './imposter/imposterDomain';

export const makeGameSuite = () => {
  const gameSuite = {};

  //Fields
  gameSuite.isIdle = false;
  gameSuite.clock = null;
  gameSuite.gameList = [];
  gameSuite.playerList = [];

	//Games
	gameSuite.imposter = createImposterDomain(gameSuite);

	//Private
	let gsTick = 0;

  //Logs
	const getLogText = (txt, gameId) =>
		`[GS] ${gameId ? `[${gameId}] ` : ''}${txt}`;

  gameSuite.logDebug = (err, gameId = null) =>
    logger.debug(getLogText(err, gameId));

  gameSuite.logInfo = (msg, gameId = null) =>
    logger.info(`[GS] ${gameId ? `[${gameId}] ` : ''}${msg}`);

  gameSuite.logError = (err, gameId = null) =>
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
		host: null,
		imposterId: null,
		isPaused: false,
		players: [],
		phase: PHASES.LOBBY,
		remainingTime: 45,
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

  gameSuite.makeVote = (type, callerId, callerName, threshold, voteData = {}) => ({
		voteId: nanoid(),
		voteType: type,
		voters: [],
		callerId: callerId,
		callerName,
		tick: 20,
		threshold,
		yay: 0,
		nay: 0,
		...voteData
  });

  //Utilities
  gameSuite.emitToGame = (gameId, command, debug = false) => {
    const gamePlayers = gameSuite.playerList.filter(p => p.gameId && p.gameId === gameId);
    for(let j = 0; j < gamePlayers.length; j++) {
      if(debug) {
        gameSuite.logInfo(`Sending ${JSON.parse(command).command} to ${gamePlayers[j].socketId}`);
      }
      gamePlayers[j].socket.send(command);
    }
  };

  gameSuite.emitToPlayer = (socketId, command, debug = false) => {
    const player = gameSuite.playerList.filter(p => p.socketId === socketId)[0];
    if(!player) {
      gameSuite.logError(`Could not emit to player ${socketId}`);
    }
    if(debug) {
      gameSuite.logInfo(`Sending ${JSON.parse(command).command} to ${socketId}`);
    }
    player.socket.send(command);
  };

  gameSuite.parseRes = msg => {
    try {
      const r = JSON.parse(msg);
      return r;
    } catch {
      gameSuite.logError(`Unable to parse client message ${msg}`);
    }
  };

  //Getters
  gameSuite.getGame = gameId => {
    const r = gameSuite.gameList.filter(g => g.gameId === gameId)[0];
    if(!r) {
      gameSuite.logError(`Could not get game ${gameId}`);
      return false;
    }
    return r;
  };

  gameSuite.getPlayer = socketId => {
    const r = gameSuite.playerList.filter(p => p.socketId === socketId)[0];
    if(!r) {
      gameSuite.logError(`Could not get player ${socketId}`);
      return false;
    }
    return r;
  };

  //Setters
  gameSuite.updateGame = (gameId, gameData) => {
    let g = gameSuite.getGame(gameId.toUpperCase());
    if(!g) {
      gameSuite.logError(`Could not update game ${gameId}`);
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
      gameSuite.logError(`Could not update player ${socketId}`);
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
      gameSuite.logInfo(`Added game ${game.gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };

  gameSuite.addPlayer = (player, debug = false) => {
    gameSuite.playerList = gameSuite.playerList.concat([player]);
    if(debug) {
      gameSuite.logInfo(`Added player ${player.socketId} (Total: ${gameSuite.playerList.length})`);
    }
  };

  //Deleters
  gameSuite.removeGame = (gameId, debug = false) => {
    const r = gameSuite.gameList.filter(g => g.gameId !== gameId);
    gameSuite.gameList = r;
    if(debug) {
      gameSuite.logInfo(`Removed game ${gameId} (Total: ${gameSuite.gameList.length})`);
    }
  };

  gameSuite.removePlayer = (socketId, debug = false) => {
    const activeGame = gameSuite.gameList.filter(g => g.players.some(p => p.socketId === socketId))[0];
    if(activeGame && activeGame.players) {
      if(activeGame.players.length <= 1) {
        gameSuite.removeGame(activeGame.gameId);
        gameSuite.logInfo(`Removed empty game ${activeGame.gameId} (Total: ${gameSuite.gameList.length})`);
      } else if(socketId === activeGame.imposterId) {
        gameSuite.updateGame(activeGame.gameId, {
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
      gameSuite.logInfo(`Removed player ${socketId} (Total: ${gameSuite.playerList.length})`);
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
    let g = { ...game, votes: [] };
    for(let i = 0; i < g.players.length; i++) {
      game.players[i].isReady = false;
    }
		switch(g.gameTitle) {
			case 'imposter':
				g = gameSuite.imposter.iteratePhase(g);
				break;
		}
    return g;
  };

	const onTick = tick => {
		if(tick % 15 === 0) {
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
        gameSuite.logInfo('Going idle...');
        gameSuite.startIdleClock(gameSuite);
      }
      const activeGames = gameSuite.gameList.filter(g => g.isPaused === false && g.players.length > 0);
      for(let i = 0; i < activeGames.length; i++) {
        let g = activeGames[i];
        g = gameSuite.doGameTick(g);
        gameSuite.updateGame(g.gameId, { ...g });
        gameSuite.emitToGame(g.gameId, gameSuite.makeCommand(SOCKET_COMMANDS.GAME_TICK, {
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
        gameSuite.logInfo(`Bootin' up!`);
        clearInterval(gameSuite.clock);
        gameSuite.startGameClock(gameSuite);
      }
			gsTick = onTick(gsTick);
    }, 3000);
  };

	const truncateName = raw => raw.length > 24
			? raw.substring(0, 24)
			: raw;

  //Form Handlers
  gameSuite.handleSubmitHostGame = msg => {
    const newGame = gameSuite.makeGame();
    gameSuite.updatePlayer(msg.socketId, {
      gameId: newGame.gameId,
      name: truncateName(msg.playerName) || 'Dingus'
    });
    const hostPlayer = gameSuite.getPlayer(msg.socketId);
    newGame.host = hostPlayer.socketId;
    newGame.players = newGame.players.concat([hostPlayer]);
    gameSuite.addGame(newGame, true);
    gameSuite.logInfo(`Host game submitted by ${msg.socketId}`);
    return newGame;
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
      gameSuite.emitToPlayer(msg.socketId, gameSuite.makeCommand(SOCKET_COMMANDS.IMPOSTER_ERROR, {
				returnToMain: true,
        text: `Could not find game ${msg.gameId}.`
      }));
      return;
    }
    if(prospImposter.players.length > 11) {
      gameSuite.emitToPlayer(msg.socketId, gameSuite.makeCommand(SOCKET_COMMANDS.IMPOSTER_ERROR, {
				returnToMain: true,
        text: `Game ${msg.gameId.toUpperCase()} is full.`
      }));
      return;
    }
		if(prospImposter.phase === PHASES.IN_GAME) {
      gameSuite.emitToPlayer(msg.socketId, gameSuite.makeCommand(SOCKET_COMMANDS.IMPOSTER_ERROR, {
				returnToMain: true,
        text: `Game ${msg.gameId.toUpperCase()} is in session; you can join when the game completes.`
      }));
      return;
		}
    let rawName = truncateName(msg.playerName) || 'Dingus';
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
    gameSuite.logInfo(`Join game submitted by ${msg.socketId}`);
    return {
      ...prospImposter,
      players: newPlayers
    };
  };

	//Message handler 
	gameSuite.handleSocketMsg = (wss, ws, raw) => {
		const msg = wss.gs.parseRes(raw);
		if(msg.command !== 'ping' && msg.command !== 'pong') {
			gameSuite.logInfo(`${msg.socketId ? `Socket ${msg.socketId}` : `New player`} says ${msg.command}`);
		}
		let recognizedByModule = ['core', 'imposter'];
		//General handling
		switch(msg.command) {
			case SOCKET_COMMANDS.PONG:
				handlePong(msg.socketId);
				break;
			case SOCKET_COMMANDS.SOCKET_DISONNECT:
				wss.gs.removePlayer(msg.socketId, true);
				break;
			default:
				recognizedByModule = recognizedByModule.filter(x => x !== 'core');
				break;
		}
		handleImposterMsg(wss, ws, msg, recognizedByModule);
		if(recognizedByModule.length < 1) {
			gameSuite.logError(`Socket command '${msg.command}' not recognized.`);
		}
	};

  return gameSuite;
};