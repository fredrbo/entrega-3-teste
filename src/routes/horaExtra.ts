import { Router } from "express"
import HoraExtraController from "../controllers/HoraExtraController"

const routes = Router()

routes.get('/getAll', HoraExtraController.list)
routes.get('/getById', HoraExtraController.findById)
routes.get('/getByStatus', HoraExtraController.findByStatus)
routes.get('/getAllPendente', HoraExtraController.getAllPendente)
// routes.get('/getByUserId', HoraExtraController.getByUserId)
routes.post('/create', HoraExtraController.create)
routes.put('/update', HoraExtraController.update)
routes.delete('/delete', HoraExtraController.delete)

export default routes