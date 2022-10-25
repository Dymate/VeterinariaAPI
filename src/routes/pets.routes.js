import {Router} from 'express';
import {createPet,getPets, getPet, updatePet, deletePet } from '../controllers/pets.controller.js'
const router = Router();

router.get('/pets', getPets);
router.get('/pets/:id', getPet);
router.post('/pets', createPet);
router.put('/pets/:id', updatePet);
router.delete('/pets/:id', deletePet);


export default router;


