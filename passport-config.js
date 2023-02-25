const {recruiter, admin} = require('./connection')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

exports.initializingPassport = (passport) => {
    // console.log(initializingPassport)
    passport.use(
            new LocalStrategy ({
                usernameField: "email",
                passwordField: "password"
            },async(email, password, done)=> {
                try { 
                let user = null  
                const recruiters = await recruiter.findOne({where: {email: email}})
                if(recruiters){
                    user = recruiters
                }else {
                    user = await admin.findOne({where: {email: email}})
                }
                if(!user) return done(null, false)
                console.log(email)
                console.log(user.email)
                const decrypt = await bcrypt.compare(password, user.password)          
                if(!decrypt) return done(null, false)
                
                return done(null, user)
                }catch(err){
                    console.log(err)
                 return done(err, false)
        }
    })
    )

    passport.serializeUser((user,done)=>{
        done(null, user.email);
    })

    passport.deserializeUser(async(email,done)=>{
        try{
            let user=null
            let recruiterrr = await recruiter.findOne({where:{email}})
            console.log(recruiterrr)
            let adminnn = await admin.findOne({where:{email}})
            if(recruiterrr){
              user=recruiterrr
            }else{
              user=adminnn
            }
            done(null, user)
        }catch(error){
            done(error, false)
        }    
    })
}


exports.isAuthenticated = (req,res,next) =>{
    if(req.user) return next()
    res.status(404).send('y thoo...')
}

exports.isAuthenticatedRecruiter = async (req,res,next) =>{
    const recruiterr = req.user.dataValues.email
    const exists = await recruiter.findOne({where: {email: recruiterr}})
    // console.log(recruiter)
    if(exists) return next()
    res.status(404).send(req.user.dataValues.firstName +" is Not a Recruiter")
}

exports.isAuthenticatedAdmin = async (req,res,next) =>{
    const adminn = req.user.dataValues.email
    const exists = await admin.findOne({where: {email: adminn}})
    console.log(adminn)
    console.log(exists)
    // console.log(recruiter)
    if(exists) return next()
    res.status(404).send(req.user.dataValues.firstName +" is Not a Admin")
}
