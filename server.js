const express=require("express")
const {recruiter, jobsList, admin} = require('./connection')
const passport = require('passport')
const expressSession = require('express-session')
const {initializingPassport, isAuthenticated} = require('./passport-config')
const router = require('./routes/router')
const app = express()

initializingPassport(passport)


app.use(express.json())
app.use(expressSession({secret: 'secret', resave:false, saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

recruiter.hasMany(jobsList)
jobsList.belongsTo(recruiter)

app.use("/",router)

app.listen(5253,()=>console.log('Server Running On Port 5253'))