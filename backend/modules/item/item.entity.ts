import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import moment from 'moment';

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

    @Column("timestamp")
    expireDate: Date;

    @Column("date")
    createdDate: Date = moment().format('YYYY-MM-DD');

    @PrimaryGeneratedColumn()
    id: number;
}
