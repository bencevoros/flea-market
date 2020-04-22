import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Bid {

    @Column("int")
    amount: string;

    @Column("timestamp")
    date: string;

    @Column("int")
    userId: string;

    @Column("int")
    itemId: string;

    @PrimaryGeneratedColumn()
    id: number;
}
