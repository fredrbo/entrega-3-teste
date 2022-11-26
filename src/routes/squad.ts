import { Router } from "express"
import SquadController from "../controllers/SquadController"

const routes = Router()

routes.get('/getAll', SquadController.list)
routes.get('/getById', SquadController.findById)
routes.post('/create', SquadController.create)
routes.put('/update', SquadController.update)
routes.delete('/delete', SquadController.delete)

export default routes