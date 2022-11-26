import { Department } from './../entitities/Department';
import { AppDataSource } from "../data-source"
import { Request, Response } from 'express'

class DepartmentController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body
        const department = await AppDataSource.manager.save(Department, { name }).catch((e) => {
            return e
        })

        return res.json(department)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { iddepartment, name } = req.body
        const department: any = await AppDataSource.manager.findOneBy(Department, { iddepartment }).catch((e) => {
          return { error: "Identificador inválido" }
        })
        if (department && department.iddepartment) {
          department.name = name
          const r = await AppDataSource.manager.save(Department, department).catch((e) => {
            // testa se o e-mail é repetido
            return e
          })
          return res.json(r)
        }
        else if (department && department.error) {
          return res.json(department)
        }
        else {
          return res.json({ error: "Departamento não localizado" })
        }
      }

      
  public async delete(req: Request, res: Response): Promise<Response> {
    const { iddepartment } = req.body
    const department: any = await AppDataSource.manager.findOneBy(Department, { iddepartment }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (department && department.iddepartment) {
      const r = await AppDataSource.manager.remove(Department, department).catch((e) => e.message)
      return res.json(r)
    }
    else if (department && department.error) {
      return res.json(department)
    }
    else {
      return res.json({ error: "Departamento não localizado" })
    }
  }

    public async list(req: Request, res: Response): Promise<Response> {
        const department = await AppDataSource.manager.find(Department)
        return res.json(department)
      }
}

export default new DepartmentController()