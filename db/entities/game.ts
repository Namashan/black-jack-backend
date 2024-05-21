import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 40})
    playerName: string;

    @Column({type: "int", width: 16, unsigned: true, default: 0})
    cardsSum: number;

    @Column({type: "int", width: 16, default: 0})
    rounds: number;

    @Column({type: "boolean", default: true})
    active: boolean;
}