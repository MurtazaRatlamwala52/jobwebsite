const passport = require("passport")
const { welcomePage, jobAdd, login, adminRecruiter, logout, recruiter, admin } = require("../controller/recController")
const { isAuthenticated, isAuthenticatedRecruiter, isAuthenticatedAdmin } = require("../passport-config")

const router=require("express").Router()

router.get("/",isAuthenticated,welcomePage)
router.get ("/recruiter", isAuthenticatedRecruiter, recruiter)
router.post("/recruiter",isAuthenticated,jobAdd)
router.post("/login",passport.authenticate("local"),login)
router.post("/admin/recruiter",adminRecruiter)
router.get("/logout", logout )
router.get("/admin", isAuthenticatedAdmin, admin)

module.exports=router