const {recruiter, jobsList} = require('../connection')

module.exports={
    welcomePage: (req,res)=>{
        res.send(`Welcome ${req.user.dataValues.firstName}`)
    },
    login:(req,res)=>{
        res.send(`Welcome  ${req.user.dataValues.firstName}`)
    },
    adminRecruiter: async (req,res) => {
        const newRecruiter = await recruiter.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        res.send('New Recruiter Added')
    },jobAdd:async (req,res) => {
        const newJob = await jobsList.create({
         title: req.body.title,
         description: req.body.description
        })
        const recid = req.user.dataValues.id
        const user = await recruiter.findOne({where: {id: recid}})   
        const jobAdded = await user.addJobsList(newJob);
        res.send('New Job Added')
      },logout: (req,res) => {
        req.logout((err)=>{
            if(err) res.send('This Didnt Work')
            else res.send('Get Lost')
        })
      },recruiter: async (req, res) => {
        res.send("Welcome " + req.user.dataValues.firstName)
      },admin: async (req,res) => {
        res.send("welcome " + req.user.dataValues.firstName)
      },deleteRecruiter : async (req,res) => {
        const rec = await recruiter.findOne({where: {id: req.params.id}})
        const deleted = await recruiter.destroy({where: {id: req.params.id}})
        res.send(rec.firstName +" has been successfully deleted from the database") 
      },updateRecruiter: async function (req, res){
        const { id } = req.params; 
        const { firstName, lastName } = req.body; 
        await recruiter.update({ firstName, lastName },{ where: { id } })
        res.send('Recruiter Updated')
      },deleteJob : async (req,res) => {
        const job = await jobsList.findOne({where: {id: req.params.id}})
        const deleted = await jobsList.destroy({where: {id: req.params.id}})
        res.send(job.title +" has been successfully deleted from the database") 
      }
    }