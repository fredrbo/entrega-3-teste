import { Router } from "express"
import DepartmentController from "../controllers/DepartmentController"

const routes = Router()

routes.get('/GetAll', DepartmentController.list)
routes.post('/', DepartmentController.create)
routes.put('/', DepartmentController.update)
routes.delete('/', DepartmentController.delete)

export default routes