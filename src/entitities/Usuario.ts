import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"usuarios"})
export class Usuario {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 70, nullable: false})
    nome: string
    
    @Column({length: 70, nullable: false, unique:true})
    mail: string

    @Column({nullable: false,  select: false})
    senha: string

    @Column({nullable: false})
    type: number
    // 0 = admin, 1 = gestor, 2 colaborador
}
