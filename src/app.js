import express from 'express';
import usersRoutes from './routes/users.routes.js';
import petsRoutes from './routes/pets.routes.js';
import cors from 'cors';
import { verifyToken } from './middleware/auth.js';

const app = express();
app.use(cors())

const router = express.Router()

router.use('/users', usersRoutes)
router.use('/pets', verifyToken, petsRoutes)

app.use(express.json());

app.use(router);

export default app;