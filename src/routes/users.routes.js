import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserPets,
  login
} from '../controllers/users.controller.js'
import { verifyToken, getTokenIsValid } from '../middleware/auth.js';
const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.get('/:id/pets', getUserPets);
router.post('/verifyToken', verifyToken, getTokenIsValid);

export default router;