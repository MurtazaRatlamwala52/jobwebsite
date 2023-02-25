const {Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('jobsPortal', 'root', process.env.password ,{
    dialect: 'mysql',
    logging: false
})

sequelize.authenticate().then(()=>{
    console.log('Connection established successfully')
}).catch((err)=>{
    console.log('Error '+err)
})

// module.exports.sequelize = sequelize
// module.exports.Sequelize = Sequelize
// module.exports.DataTypes = DataTypes


const recruiter = require('./models/recruiter')( sequelize, DataTypes)
const jobsList = require('./models/jobsList')( sequelize, DataTypes)
const admin = require('./models/admin')(sequelize, DataTypes)
sequelize.sync({alter: true})
module.exports= {recruiter , jobsList, admin}

