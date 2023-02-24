const passport = require("passport")
const { welcomePage, jobAdd, login, adminRecruiter, logout } = require("../controller/recController")
const { isAuthenticated } = require("../passport-config")

const router=require("express").Router()

router.get("/",isAuthenticated,welcomePage)
router.post("/",isAuthenticated,jobAdd)
router.post("/login",passport.authenticate("local"),login)
router.post("/admin/recruiter",adminRecruiter)
router.get("/logout", logout )
module.exports=router