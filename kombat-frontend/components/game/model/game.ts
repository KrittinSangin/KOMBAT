import {Game, Minion, Player, StartInfo} from "../type/GameTypes";
import {Config, GameDTO, PlayerDTO, PlayerInfo} from "../../../ttypes/type";
import {GameStateEnum, PlayerIntentEnum} from "../../../ttypes/enums";
import {createHexMap, hexKey} from "./hexMap";

const emptyConfig: Config = {
    spawnCost: 0,
    hexPurchaseCost: 0,
    initBudget: 0,
    initHp: 0,
    turnBudget: 0,
    maxBudget: 0,
    interestPct: 0,
    maxTurns: 0,
    maxSpawns: 0,

    mapWidth: 0,
    mapHeight: 0,

    startHexPosP1: [],
    startHexPosP2: [],
}

const emptyPlayer: (team:number) => Player = (team) => {
    return {
        info: {
            name: "",
            team: team,
        },
        budget: 0,
        interestRatePercentage: 0,
        spawnCount: 0,
        deck: []
    }
}

export const emptyGame: Game = {
    cfg: emptyConfig,
    players: [emptyPlayer(0),emptyPlayer(1)],
    map: createHexMap(0,0),
    minion: [],
    gameState: GameStateEnum.empty,
    turn: 0,
    team: 0
}

export const emptyGameDTO: GameDTO = {
    executionInstanceLog: [],
    inputIntent: {intent: PlayerIntentEnum.empty},
    isGameDraw: false,
    isGameOver: false,
    isGameResign: false,
    isGameStart: false,
    isStateChange: false,
    isValidIntent: false,
    lastState: GameStateEnum.empty,
    state: GameStateEnum.empty,
    players: [],
    team: 0,
    turn: 0,
    winner: 0
}

const createPlayer: (info:PlayerInfo, deck:Minion[]) => Player = (info,deck) => {
    return {
        info: info,
        budget: 0,
        interestRatePercentage: 0,
        spawnCount: 0,
        deck: deck
    }
}

export const startGame: (info:StartInfo) => Game = (info) => {
    const game = emptyGame

    game.cfg = info.config;

    const p0 = createPlayer(info.p1info,info.deck1)
    const p1 = createPlayer(info.p2info,info.deck2)
    game.players = [p0,p1];

    const r = game.cfg.mapHeight
    const c = game.cfg.mapWidth
    game.map = createHexMap(r,c);

    game.gameState = GameStateEnum.start;

    return game;
}

const updatePlayer: (player:Player,dto:PlayerDTO) => Player = (player:Player,dto:PlayerDTO) => {
    player.budget = dto.budget;
    player.interestRatePercentage = dto.interestRatePercentage;
    player.spawnCount = dto.spawnCount;

    return player;
}

export const updateGame: (game:Game, dto:GameDTO) => Game = (game:Game, dto:GameDTO) => {

    game.map = createHexMap(game.cfg.mapHeight,game.cfg.mapWidth)
    game.minion = [];

    game.players.forEach((player,i) => // "i" is current team
        {
            updatePlayer(player,dto.players[i]);

            //update territory.
            dto.players[i].territories.forEach((pos) => {
                const hex = game.map.map.get(hexKey(pos));
                if (hex)
                {
                    hex.team = i;
                }
            })

            //update minions
            dto.players[i].minions.forEach((mdto) => {
                const hex = game.map.map.get(hexKey(mdto.pos))
                if (hex)
                {
                    const newMinion = player.deck[mdto.deckIndex];
                    newMinion.hp = mdto.hp;
                    newMinion.team = i;
                    hex.minion = newMinion;
                    game.minion.push(newMinion);
                }
            })
        }
    );

    game.team = dto.team;
    game.turn = dto.turn;

    game.gameState = dto.state;

    return {...game};
}