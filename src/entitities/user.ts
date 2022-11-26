import { Profile } from './type/Types';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    iduser: string

    @Column({length: 70, nullable: false})
    name: string
    
    @Column({length: 70, nullable: false, unique:true})
    email: string

    @Column({nullable: false,  select: false})
    password: string

    @Column({nullable: false, enum: ['employee','manager','admin']})
    type: Profile
    // 0 = admin, 1 = gestor, 2 colaborador
}
