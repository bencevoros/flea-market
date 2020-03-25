import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Sample {

    @Column("text")
    title: string;
    
    @Column("text")
    message: string;
    
    @PrimaryGeneratedColumn()
    id: number;
}
  