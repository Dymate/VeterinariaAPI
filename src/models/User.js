import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import { Pet } from './Pet.js'

export const User = sequelize.define('users',{ 
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    lastname:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    confirmPassword:{
        type: DataTypes.STRING
    }
},{
    timestamps: true
});


User.hasMany(Pet,{
    foreignKey: 'idUser',
    sourceKey: 'id'
})


Pet.belongsTo(User,{
    foreignKey: 'idUser',
    targetId: 'id'
})