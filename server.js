// const {recruiter} = require('./models/recruiter')
// const {jobsList} = require('./models/jobslist')
// const {DataTypes, sequelize, Sequelize} = require('./connection')
const express = require('express')
const {recruiter, jobsList} = require('./connection')
const passport = require('passport')
const expressSession = require('express-session')
const app = express()

app.use(express.json())
app.use(expressSession({secret: 'secret', resave:false, saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

recruiter.hasMany(jobsList)
jobsList.belongsTo(recruiter)

app.get('/',(req,res)=>{
    res.send('index')
})

app.listen(5253,()=>console.log('Server Running On Port 5253'))