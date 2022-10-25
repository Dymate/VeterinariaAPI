import {DataTypes} from 'sequelize'

import {sequelize} from '../database/database.js';


export const Pet = sequelize.define('pets',{ 
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type: DataTypes.STRING
    },
    age:{
        type: DataTypes.INTEGER
    },
    gender :{
        type: DataTypes.STRING
    },
    weight :{
        type: DataTypes.INTEGER
    },
    species : {
        type: DataTypes.STRING
    },
    race : {
        type: DataTypes.STRING
    },
    color : {
        type: DataTypes.STRING
    },
    date : {
        type: DataTypes.STRING
    },
    sterilized : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description : {
        type: DataTypes.STRING
    }

},{
    timestamp: false
});
