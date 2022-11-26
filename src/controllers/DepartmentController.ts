import { Department } from './../entitities/Department';
import { AppDataSource } from "../app-data-source"
import { Request, Response } from 'express'

class DepartmentController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body
        const department = await AppDataSource.manager.save(Department, { name }).catch((e) => {
            return e
        })

        return res.json(department)
    }

}

export default new DepartmentController()