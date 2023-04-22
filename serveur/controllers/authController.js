const UserModel = require('../models/user')
const jwt = require("jsonwebtoken");
const { signUpErrors, loginErrors } = require('../utils/errors.utils');
const maxAge = 3*24*60*60*1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn:  maxAge,//expire dans 3 jours
    })
}

module.exports.signUp = async(req, res) =>{
    console.log(req.body);
    const {name, pseudo, password} = req.body

    try{
        const user = await UserModel.create({name, pseudo, password});
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = signUpErrors(err);
        res.status(400).send({errors})
    }
}

module.exports.login = async (req, res) =>{
    const {pseudo, password} = req.body
    try{
        const user =await UserModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly:true, maxAge:maxAge});
        res.status(200).json({user: user._id})
    }catch(err){
        const errors = loginErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.logout = (req, res) =>{
    res.cookie("jwt", "", {maxAge:1});
    res.redirect("/");
}