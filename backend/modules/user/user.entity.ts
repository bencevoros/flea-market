import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @PrimaryGeneratedColumn()
    id: number;
}
