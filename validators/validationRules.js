const { body, validationResult } = require('express-validator')


const validationContactRules = [
    body("name")
    .notEmpty().withMessage("* You must enter a name")
    .isLength({min: 3, max: 40}).withMessage("* Name must be between 3 and 40 characters"),
    body("email").isEmail().normalizeEmail().withMessage("* You must enter a valid email"),
    body("message").isLength({min: 10, max: 500}).withMessage("* The message must be between 10 and 500 characters").trim(""),
    (req, res, next) => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            const formData = req.body
            const arrWarnings = errors.array()
            console.log(arrWarnings)
            res.render("contact", {arrWarnings, formData})
        } else return next()
    }]

    
const validationRegisterRules = [
    body("name")
    .notEmpty().withMessage("* You must enter a name")
    .isLength({min: 3, max: 40}).withMessage("* Name must be between 3 and 40 characters"),
    body("lastName")
    .notEmpty().withMessage("* You must enter a last name")
    .isLength({min: 3, max: 40}).withMessage("* Last name must be between 3 and 40 characters"),
    body("email")
    .isEmail().normalizeEmail().withMessage("* You must enter a valid email"),
    body("username")
    .notEmpty().withMessage("* You must enter an username")
    .isLength({min: 3, max: 10}).withMessage("* Username must be between 3 and 10 characters")
    .isAlphanumeric().withMessage("* Username must have only numbers and letters"),
    body("pass").isStrongPassword({ minLength: 6, minNumbers: 1, minLowercase: 1, minSymbols: 0, minUppercase: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })
    .withMessage("* Password is too weak"),
    (req, res, next) => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            const formData = req.body
            const arrWarnings = errors.array()
            console.log(arrWarnings)
            res.render("registerForm", {arrWarnings, formData})
        } else return next()
    }]

module.exports = {validationContactRules, validationRegisterRules}