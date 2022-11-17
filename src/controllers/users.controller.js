import { User } from '../models/User.js'
import { Pet } from '../models/Pet.js'
import { sign } from '../middleware/auth.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    const cleanPassword = users.map((user) => ({
      ...user.dataValues,
      password: undefined,
      confirmPassword: undefined
    }))

    res.json(cleanPassword)
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no existe.' })
    }
    user.password = undefined;
    user.confirmPassword = undefined;
    res.json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

}

export const createUser = async (req, res) => {
  const { name, lastname, address, email, password, confirmPassword } = req.body

  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (user) {
       return res.status(409).json({ message : 'Usuario ya existe' });
    }

    const newUser = await User.create({
      name,
      lastname,
      address,
      email,
      password,
      confirmPassword
    })

    const userReponse = {
      ...newUser.dataValues,
      password: undefined,
      confirmPassword: undefined
    }

    sign(userReponse, (err, token) => {
      res.json({
        ...newUser.dataValues,
        password: undefined,
        confirmPassword: undefined,
        token
      })
    });
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error();
    }

    if (password !== user.dataValues.password) {
      throw new Error();
    }

    sign({
      ...user.dataValues,
      password: undefined,
      confirmPassword: undefined
    }, (err, token) => {
      res.status(200).send({
        ...user.dataValues,
        password: undefined,
        confirmPassword: undefined,
        token
      });
    })
  } catch {
    res.status(400).send({ error: 'Email or password is wrong' })
  }
}

export const updateUser = async (req, res) => {

  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no existe.' })
    }
    else{
      const { name, lastname, address, email, password, confirmPassword } = req.body
      const user = await User.findByPk(id)

      user.name = name
      user.lastname = lastname
      user.address = address
      user.email = email
      user.password = password
      user.confirmPassword = confirmPassword

      await user.save()

      res.json(user)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no existe.' })
    }
    else{
      await User.destroy({
        where: {
          id
        }
      });

      res.sendStatus(204)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
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
    return res.status(400).json({ message: e.message });
  }
}
