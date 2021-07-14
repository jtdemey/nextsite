import { ENDGAME_REASONS, PHASES } from "../../../components/imposter/redux/imposterConstants";
import { rollScenario } from "./imposterScenarios";

const createImposterDomain = gameSuite => {
	const domain = {};
	
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
      gameSuite.logError(`Could not get endgame message for index ${ind}`);
    }
    return gameOverReasons[ind];
  };

  domain.applyScenario = (state, scene) => {
    const result = {
      ...state,
      imposterId: null,
      scenario: scene.scenario,
      scenarioList: scene.scenarioList,
      condition: scene.condition,
      roles: []
    };
    const randomId = state.players[Math.floor(Math.random() * state.players.length)].socketId;
    gameSuite.logInfo(`Assigned imposter to ` + randomId, state.gameId);
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
    gameSuite.logInfo(`Applied scenario ${scene.scenario} but ${scene.condition}.`, state.gameId);
    return result;
  };

  domain.castVote = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    const currVotes = currGame.votes;
    const vote = currVotes.filter(v => v.voteId === msg.voteId)[0];
    if(!vote) {
      gameSuite.logError(`Cast vote: Unable to find vote ${msg.voteId} in ${msg.gameId}`);
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
    gameSuite.logInfo(`${msg.gameId}: ${msg.socketId} voted ${msg.isYay ? 'yay' : 'nay'} on vote ${msg.voteId} (${vote.voteType})`);
  };

  domain.extendTimer = (sockId, gameId) => {
    const game = gameSuite.getGame(gameId);
    game.remainingTime += 10;
    gameSuite.logInfo(`${sockId} extended timer for ${gameId}`);
  };

  domain.handleAccusePlayer = msg => {
    const currGame = gameSuite.getGame(msg.gameId);
    if(msg.accuserId === msg.accusedId || currGame.votes.some(v => v.callerId === msg.accuserId)) {
      return;
    }
    const callerName = currGame.players.filter(p => p.socketId === msg.accuserId)[0].name;
    if(!callerName) {
      gameSuite.logError(`Accuse player: Unable to find player name for accuser ${msg.accuserId}`);
    }
    const accusedName = currGame.players.filter(p => p.socketId === msg.accusedId)[0].name;
    if(!accusedName) {
      gameSuite.logError(`Accuse player: Unable to find player name for accused ${msg.accuserId}`);
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
    gameSuite.logInfo(`${msg.gameId}: ${msg.accuserId} accuses ${msg.accusedId}`);
  };

  domain.handleLobbyReturnVote = msg => {
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
      gameSuite.logError(`Return to lobby: Unable to find player name for ${msg.socketId}`);
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
    gameSuite.logInfo(`${msg.gameId}: ${msg.socketId} votes to return to the lobby`);
  };

  domain.hurryUp = (sockId, gameId) => {
    const game = gameSuite.getGame(gameId);
    game.remainingTime -= 1;
    gameSuite.logInfo(`${sockId} depleted timer for ${gameId}`);
  };

  domain.identifyScenario = msg => {
    const game = gameSuite.getGame(msg.gameId);
    const imposter = game.players.filter(p => p.socketId === msg.imposterId);
    if(imposter.length < 1) {
      gameSuite.logError(`Identify scenario: unable to find imposter with ID ${msg.imposterId}`);
    }
    if(game.scenario.toUpperCase() === msg.scenario.toUpperCase()) {
      gameSuite.updateGame(msg.gameId, {
        gameOverReason: getEndgameMessage(ENDGAME_REASONS.IMPOSTER_CORRECT),
        phase: PHASES.IMPOSTER_VICTORY,
        remainingTime: 15
      });
      gameSuite.logInfo(`Imposter for ${msg.gameId} guessed correct scenario`);
    } else {
      gameSuite.updateGame(msg.gameId, {
        gameOverReason: getEndgameMessage(ENDGAME_REASONS.IMPOSTER_WRONG),
        phase: PHASES.BYSTANDER_VICTORY,
        remainingTime: 15
      });
      gameSuite.logInfo(`Imposter for ${msg.gameId} guessed the wrong scenario`);
    }
  };

	domain.iteratePhase = game => {
    switch(game.phase) {
      case PHASES.LOBBY:
				//Todo: < 3
        if(game.players.length < 1) {
          game.remainingTime = 30;
          gameSuite.emitToGame(game.gameId, gameSuite.makeCommand('imposterError', {
            text: `At least 3 players are required to play`
          }));
        } else {
          game.phase = PHASES.IN_GAME;
          game.remainingTime = 240;
          game = gameSuite.imposter.applyScenario(game, rollScenario());
        }
        break;
      case PHASES.IN_GAME:
        game.phase = PHASES.IMPOSTER_VICTORY;
        game.remainingTime = 20;
        break;
      case PHASES.BYSTANDER_VICTORY:
      case PHASES.IMPOSTER_VICTORY:
        game.phase = PHASES.LOBBY;
        game.remainingTime = 60;
        break;
      default:
        gameSuite.logError(`Unrecognized game phase ${game.phase}`);
        break;
    }
    return game;
	};

	return domain;
};

export default createImposterDomain;