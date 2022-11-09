const securePass = require("../helpers/securePass")
const User = require("../schemas/usersSchema")


function getLoginForm(req, res, next) {
    res.render("loginForm")
}


//procesar form de login
async function sendLoginForm(req, res, next) {
    const {email, username, pass} = req.body;
    const user = await User.find({email})
    if(!user.length){
        return res.render("loginForm", {message: "* Usuario o contraseña incorrecta"}) 
    };

    if (await securePass.decrypt(pass, user[0].password)){

        const usr = {
            id: user[0]._id,
            name: user[0].name,
            lastName: user[0].lastName
        }

        req.session.user = usr
        res.render("secret", {user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user._id})
    } else return res.render("loginForm", {message: "* Usuario o contraseña incorrecta"})
}

function getRegisterForm(req, res, next) {
    res.render("registerForm")
}


//Crear nuevo usuario
async function sendRegisterForm (req, res, next) {
    const {name, lastName, username, email, pass, confirm} = req.body
    const hashedPass = await securePass.encrypt(pass)

    const newUser = new User({
        name, lastName, username, email, password: hashedPass
    })
    const usr = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        lastName: newUser.lastName,
        username: newUser.username
    }
    if(pass !== confirm){
        const formData = usr
        const notEqual = "* Password do not match"
        res.render("registerForm", {message: notEqual, formData})
    } else{
    newUser.save((err)=>{
        if(!err){
            req.session.user = usr
            res.render("secret", {user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user._id})
        } else {
            res.render("registerForm", {message: "Ya existe un registro con ese email o nombre de usuario"})
        }
    })}
};


//Mostramos settings
async function getSettings(req, res) {
    const user = await User.findById(req.session.user.id).lean()
    res.render("editUserForm", {user})
}


//Procesamos formulario de settings
async function sendSettings(req, res) {
    const {name, lastName, email} = req.body
    await User.findByIdAndUpdate(req.session.user.id, req.body)
    res.redirect("settings")
}

//Procesamos el borrado de la base de datos.
async function deleteUser(req, res) {
    try {    
        await User.findByIdAndDelete(req.session.user.id)
        req.session.destroy()
        res.redirect("/")
    } catch (error) {
    }
    }


async function validateEmail(req, res) {
    res.send("email verification")
}


const logout = (req, res)=>{
    req.session.destroy()
    res.redirect("/")
}

module.exports = {getLoginForm, sendLoginForm, sendRegisterForm, getRegisterForm, logout, getSettings, sendSettings, validateEmail, deleteUser}