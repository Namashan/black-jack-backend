import { Context, ServiceSchema } from "moleculer";
import { GameServiceSchema } from "./methods/game-service-method";
import PlayerNameRequest from "./domain/request/PlayerNameRequest";
import ErrorResponse from "./domain/response/ErrorResponse";
import GameIDRequest from "./domain/request/GameIDRequest";
import CardResponse from "./domain/response/CardResponse";
import GameIDResponse from "./domain/response/GameIDResponse";
import EndGameResponse from "./domain/response/EndGameResponse";

const gameService : GameServiceSchema = new GameServiceSchema();

const GameService: ServiceSchema = {
    name: "games",

    /**
	 * Settings
	 */
	settings: {
		defaultName: "Game Service",
	},

    /**
	 * Dependencies
	 */
	dependencies: [],

    /**
	 * Actions
	 */
	actions: {
        newGame: {
            rest: {
                method: "POST",
                path: "/new-game",
            },
            async handler(ctx: Context<PlayerNameRequest>): Promise<GameIDResponse | ErrorResponse> {
                return gameService.createNewGame(ctx);
            }
        },
        cardRequest: {
            rest: {
                method: "GET",
                path: "/card-request/:id",
            },
            async handler(ctx: Context<GameIDRequest>): Promise<CardResponse | ErrorResponse> {
                return gameService.requestCard(ctx);
            }
        },
        cardFlip: {
            rest: {
                method: "GET",
                path: "card-flip/:id",
            },
            async handler(ctx: Context<GameIDRequest>): Promise<EndGameResponse | ErrorResponse> {
                return gameService.flipCard(ctx);
            }
        }
    },

    events: {},

    methods: {},

};
export default GameService;