import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Item {

    @Column("text")
    name: string;

    @Column("text")
    description: string;

    @Column("int")
    price: string;

    @Column("int")
    userId: string;

    @PrimaryGeneratedColumn()
    id: number;
}
