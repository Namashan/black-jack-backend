import { Context } from "moleculer";
import Game from "../../db/entities/game";
import ErrorResponse from "../domain/response/ErrorResponse";
import appDataSource from "../../db/data-sources/app.data.sources";
import PlayerNameRequest from "../domain/request/PlayerNameRequest";
import GameIDRequest from "../domain/request/GameIDRequest";
import CardResponse from "../domain/response/CardResponse";
import GameIDResponse from "../domain/response/GameIDResponse";
import EndGameResponse from "../domain/response/EndGameResponse";

export class GameServiceSchema {
    async createNewGame(ctx: Context<PlayerNameRequest>): Promise<GameIDResponse | ErrorResponse> {
        if (ctx.params.name) {
            const game : Game = new Game();
            game.playerName = ctx.params.name;
            const createdGame : Game = await appDataSource.manager.save(Game, game);
            const idGame : GameIDResponse = {
                gameId: createdGame.id
            }
            return idGame;
        }
        
        return {
            message: "Can't find player name!"
        };
    }

    async requestCard(ctx: Context<GameIDRequest>): Promise<CardResponse | ErrorResponse> {
        if (!ctx.params.id) {
            return {
                message: "There is no provided game id!"
            };
        }

        const game : Game | null = await appDataSource.manager.findOne(Game, {
            where: {
                id: ctx.params.id
            }
        });

        if (!game) {
            return {
                message: "There is no game with the given id!"
            };
        }

        let newCard : number = Math.floor(Math.random() * 9) + 2;
        game.rounds += 1;
        game.cardsSum += newCard;

        if (game.cardsSum > 21) {
            return {
                message: "Game Over!"
            }
        }

        await appDataSource.manager.update(Game, game.id, game);

        const cardResponse : CardResponse = {
            cardsSum: game.cardsSum,
            turns: game.rounds
        };
        return cardResponse;
    }

    async flipCard(ctx: Context<GameIDRequest>): Promise<EndGameResponse | ErrorResponse> {
        if (!ctx.params.id) {
            return {
                message: "There is no provided game id!"
            }
        }

        const game : Game | null = await appDataSource.manager.findOne(Game, {
            where: {
                id: ctx.params.id
            }
        });

        if (!game) {
            return {
                message: "There is no game!"
            } 
        }

        let enemyCardsSum : number = Math.floor(Math.random() * 10) + 12;

        if (game.cardsSum < enemyCardsSum) {
            game.active = false;

            await appDataSource.manager.update(Game, game.id, game);

            const endGame : EndGameResponse = {
                playerName: game.playerName,
                isWinner: "Game Over!",
                cardsSum: game.cardsSum,
                enemyCardsSum: enemyCardsSum,
                lastRound: game.rounds
            };
            return endGame;

        } else if (game.cardsSum > enemyCardsSum) {
            game.active = false;

            await appDataSource.manager.update(Game, game.id, game);

            const endGame : EndGameResponse = {
                playerName: game.playerName,
                isWinner: "You have won!",
                cardsSum: game.cardsSum,
                enemyCardsSum: enemyCardsSum,
                lastRound: game.rounds
            };
            return endGame;

        } else {
            game.active = false;

            await appDataSource.manager.update(Game, game.id, game);

            const endGame : EndGameResponse = {
                playerName: game.playerName,
                isWinner: "Draw!",
                cardsSum: game.cardsSum,
                enemyCardsSum: enemyCardsSum,
                lastRound: game.rounds
            };
            return endGame;
        }
    }
}