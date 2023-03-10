// const {DataTypes, sequelize} = require('../connection')

module.exports = (sequelize, DataTypes) => {
const jobsList = sequelize.define('jobsList',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    }
},{
    timestamps: false,
    createdAt: true,

})
return jobsList
}

// module.exports.jobsList = jobsList