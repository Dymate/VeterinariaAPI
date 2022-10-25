import {Pet} from '../models/Pet.js';

export const getPets = async (req, res) => {
    try{
        const  pets = await Pet.findAll()
        res.json(pets)
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}

export const getPet = async (req, res) => {
        
  try {
    const {id} = req.params
    const pet = await Pet.findOne({
      where: {
        id
      }
    })

    if(!pet){
      return res.status(404).json({message:'Mascota no existe.'})
    }
  
    res.json(pet)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}

export const createPet = async (req, res) => {
    const {name,age, gender, weigth, species, race, color, date, sterilized, description, idUser} = req.body

    try{
      const newPet = await Pet.create({
        name,
        age,
        gender,
        weigth,
        species,
        race,
        color,
        date,
        sterilized,
        description,
        idUser
       })
       res.json(newPet)
    }catch(err){
      return res.status(500).json({message: err.message})
    }
    
}

export const updatePet = async (req, res) => {
 
    try {
      const {id} = req.params;
      const {name,age, gender, weigth, species, race, color, date, sterilized, description, idUser} = req.body
      const pet = await Pet.findByPk(id)
  
      pet.name = name
      pet.age = age
      pet.gender = gender
      pet.weigth = weigth
      pet.species = species
      pet.race = race
      pet.color = color
      pet.date = date
      pet.sterilized = sterilized
      pet.description = description
      pet.idUser = idUser
  
      await pet.save()
  
      res.json(pet)
  
    }catch (error) {
      return res.status(500).json({message:error.message})
    }
    
  }

export const deletePet = async (req, res) => {

  try {
    const {id} = req.params
    await Pet.destroy({
      where: {
        id
      }
    });
  
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}