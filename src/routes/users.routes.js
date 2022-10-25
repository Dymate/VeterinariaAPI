import {Router} from 'express'
import {createUser, getUsers,getUser, updateUser, deleteUser, getUserPets, verifyToken, token } from '../controllers/users.controller.js'
 
const router = Router()

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/users/:id/pets', getUserPets);
router.post('/user/verifyToken', token, verifyToken );


export default router;