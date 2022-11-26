import {Entity, Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { v1 as uuid } from "uuid"
import { Usuario } from "./Usuario";

@Entity("squad")
export class Squad{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column({ type: 'timestamptz' })
    dataCriada: string;

    
    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}