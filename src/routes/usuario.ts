import { Router } from "express"
import UsuarioController from "../controllers/UsuarioController"

const routes = Router()

routes.get('/getAll', UsuarioController.list)
routes.get('/getById', UsuarioController.findById)
routes.post('/create', UsuarioController.create)
routes.put('/update', UsuarioController.update)
routes.delete('/delete', UsuarioController.delete)

export default routes