import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Follower {

    @Column("int")
    userId: string;

    @Column("int")
    itemId: string;

    @PrimaryGeneratedColumn()
    id: number;
}
