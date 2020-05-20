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

    @Column("date", { default: moment().format('YYYY-MM-DD') })
    createdDate: Date | string = moment().format('YYYY-MM-DD');

    @PrimaryGeneratedColumn()
    id: number;
}
