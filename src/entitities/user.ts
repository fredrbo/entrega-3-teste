import { Department } from './Department';
import { Profile } from './type/Types';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne } from "typeorm"

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    iduser: string

    @Column({length: 70, nullable: false})
    idmaster: string

    @Column({length: 70, nullable: false})
    name: string
    
    @Column({length: 70, nullable: false, unique:true})
    email: string

    @Column({nullable: false,  select: false})
    password: string

    @Column({nullable: false, enum: ['employee','manager','admin']})
    type: Profile


    @ManyToMany(() => Department)
    @JoinTable({name : 'works'})
    department: Department[]

    @ManyToOne(() => User, (user) => user.idmaster)
    @JoinTable()
    User: User
}
