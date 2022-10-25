import express from 'express';
import usersRoutes from './routes/users.routes.js';
import petsRoutes from './routes/pets.routes.js';




const app = express();

//Middlewares
app.use(express.json());


app.use(usersRoutes)
app.use(petsRoutes);

export default app;