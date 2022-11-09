const router = require('express').Router()
const sendMessage = require('../controllers/ContactCt')
const {validationContactRules} = require("../validators/validationRules")



router.get("/", (req, res) =>{
    res.render("contact", {user: req.session.user})
})

router.post("/", validationContactRules, sendMessage)

module.exports = router