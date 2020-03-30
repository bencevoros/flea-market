import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {

    @Column({ type: 'varchar', length: 30, unique: true})
    email: string;

    @Column('text')
    password: string;

    @PrimaryGeneratedColumn()
    id: number;
}
