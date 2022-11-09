const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '}^jvN1*MU^^52W4';
const someOtherPlaintextPassword = 'not_bacon';

const encrypt = async (pass) =>{
    return await bcrypt.hash(pass, saltRounds)  
}

const decrypt = async (pass, hashedPass) =>{
    return await bcrypt.compare(pass, hashedPass)
}
module.exports = {encrypt, decrypt}