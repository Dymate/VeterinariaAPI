import { Router } from 'express';
import { createPet, getPets, getPet, updatePet, deletePet } from '../controllers/pets.controller.js'
const router = Router();

router.get('/', getPets);
router.get('/:id', getPet);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;
