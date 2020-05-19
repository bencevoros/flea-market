import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {

    @Column({ type: 'varchar', length: 30, unique: true})
    email: string;

    @Column('text')
    password: string;

    @Column({ type: 'int', default: 0 })
    points: number = 0;

    @PrimaryGeneratedColumn()
    id: number;

    public setPoints(points: number) {
        this.points = points;
    }
}
