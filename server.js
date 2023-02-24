// const {recruiter} = require('./models/recruiter')
// const {jobsList} = require('./models/jobslist')
// const {DataTypes, sequelize, Sequelize} = require('./connection')
const express = require('express')
const {recruiter, jobsList} = require('./connection')
const passport = require('passport')
const expressSession = require('express-session')
const {initializingPassport, isAuthenticated} = require('./passport-config')
const app = express()

initializingPassport(passport)


app.use(express.json())
app.use(expressSession({secret: 'secret', resave:false, saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

recruiter.hasMany(jobsList)
jobsList.belongsTo(recruiter)



app.get('/', isAuthenticated , (req,res)=>{
    res.send(`Welcome ${req.user.dataValues.firstName}`)
})

app.post('/login', passport.authenticate('local',{failureFlash: 'Invalid email or password'}),(req,res)=>{
    res.send(`Welcome`)
})

app.post('/admin/recruiter', async (req,res) => {
    const newRecruiter = await recruiter.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    res.send('New Recruiter Added')
})


// app.get('/as',async function namess (req,res) {
//     const recid = req.user.dataValues.id
//   const user = await recruiter.findOne({where: {id: recid}})
//   console.log(user)
// })
// namess()

app.post('/', isAuthenticated, async (req,res) => {
  const newJob = await jobsList.create({
   title: req.body.title,
   description: req.body.description
  })
  const recid = req.user.dataValues.id
  const user = await recruiter.findOne({where: {id: recid}})   
  const jobAdded = await user.addJobsList(newJob);
  res.send('New Job Added')
})

app.listen(5253,()=>console.log('Server Running On Port 5253'))