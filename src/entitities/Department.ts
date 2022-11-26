import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"departament"})
export class Department {
    @PrimaryGeneratedColumn("uuid")
    iddepartment: string

    @Column({length: 70, nullable: false})
    name: string
    
}
