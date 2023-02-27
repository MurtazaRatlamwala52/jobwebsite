const passport = require("passport")
const { welcomePage, jobAdd, login, adminRecruiter, logout, recruiter, admin, deleteRecruiter, updateRecruiter, deleteJob, getJob } = require("../controller/recController")
const { isAuthenticated, isAuthenticatedRecruiter, isAuthenticatedAdmin } = require("../passport-config")

const router=require("express").Router()

router.get("/",isAuthenticated,welcomePage)
router.get ("/recruiter", isAuthenticatedRecruiter, recruiter)
router.post("/recruiter",isAuthenticated,jobAdd)
router.post("/login",passport.authenticate("local"),login)
router.post("/admin/recruiter",isAuthenticatedAdmin,adminRecruiter)
router.get("/logout", logout )
router.get("/admin", isAuthenticatedAdmin, admin)
router.delete("/admin/recruiter/:id", isAuthenticatedAdmin, deleteRecruiter)
router.put("/admin/recruiter/:id", isAuthenticatedAdmin, updateRecruiter)
router.delete("/admin/jobs/:id", isAuthenticatedAdmin, deleteJob)
router.get("/admin/jobs", isAuthenticatedAdmin, getJob)

module.exports=router