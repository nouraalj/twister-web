module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', password:''}
    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo trop court ou déjà pris";
    
    if (err.message.includes('password'))
        errors.password = "Mot de passe doit faire 6 caractères minimum";
    
    return errors;
}

module.exports.loginErrors = (err) => {
    let errors = {pseudo: '', password:''}
    if (err.message.includes('pseudo'))
        errors.pseudo = "Pas de compte enregistré à ce pseudo";
    
    if (err.message.includes('password'))
        errors.password = "Mot de passe incorrect";
    
    return errors;
}