import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { v1 as uuid } from "uuid"
import { Usuario } from "./Usuario";

@Entity("sobreaviso")
export class Sobreaviso {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((type) => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({  //Defines which side of the relation contains the join column with a foreign key 
        name: "idusuario",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_usuario_id"
    })
    usuario: Usuario

    @Column()
    codverba: number;

    @Column({ type: 'timestamptz' })
    dia: Date;

    @Column({ type: 'time' })
    horainicio: string;

    @Column({ type: 'time' })
    horafim: string;

    @Column()
    status: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}