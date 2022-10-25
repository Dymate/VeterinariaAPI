import {User} from '../models/User.js'
import { Pet } from '../models/Pet.js'
import jwt from 'jsonwebtoken';


export const getUsers = async (req, res) => {
    try{
        const  users = await User.findAll()
        res.json(users)
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}

export const getUser = async (req, res) => {

  try {
    const {id} = req.params
    const user = await User.findOne({
      where: {
        id
      }
    })

    if(!user){
      return res.status(404).json({message:'Usuario no existe.'})
    }
  
    res.json(user)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}

export const createUser = async (req, res) => {
    const {name,lastname, address, email, password, confirmPassword } = req.body

  try{
    const newUser = await User.create({
        name,
        lastname,
        address,
        email,
        password,
        confirmPassword
     })

     jwt.sign({newUser: newUser}, 'secretKey', (err,token) =>{
      res.json({
        token: token})
        console.log(token)
     })

    

  }catch(err){
    return res.status(500).json({message: err.message})
  }


}

export const verifyToken =  (req, res) => {

  //const token = req.body.jwt;
  //const token = createUser.tokenJ;
  //console.log('MOSTRAR TOKEN: ' + token);

  jwt.verify(req.token,'secretKey', (error, authData) => {

    if(error){
      res.sendStatus(403);
      console.log(error);
      console.log(authData);
    }else{
      res.json({
        message:"Post Creado",
        authData: authData
      });
    }
  });

};

// Authorization: Bearer <token>
export function token(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
    }else{
      res.sendStatus(403);
    }

}

export const updateUser = async (req, res) => {
 
  try {
    const {id} = req.params;
    const {name,lastname, address, email, password, confirmPassword} = req.body
    const user = await User.findByPk(id)

    user.name = name
    user.lastname = lastname
    user.address = address
    user.email = email
    user.password = password
    user.confirmPassword = confirmPassword

    await user.save()

    res.json(user)

  }catch (error) {
    return res.status(500).json({message:error.message})
  }
  
}

export const deleteUser = async (req, res) => {

  try {
    const {id} = req.params
    await User.destroy({
      where: {
        id
      }
    });
  
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}

export const getUserPets = async (req, res) => {

  const { id } = req.params;
  try {
    const pets = await Pet.findAll({
      where: { idUser: id },
    });
    res.json(pets);
  } catch (e) {
    return res.status(500).json({ message: e.message });
}


}
