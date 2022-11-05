import Sequelize from 'sequelize';

export const sequelize = new Sequelize('projectsdb', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
})

