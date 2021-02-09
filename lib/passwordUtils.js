const bcrypt = require('bcrypt');

function validPassword(password) {
    bcrypt.compare(password, user.password, (err, res) => {
        console.log('compare false: ' + res);
        console.log('compare false cb end: ' + (Date.now() - Date.now()) + 'ms');
    })
}

module.exports.validPassword = validPassword;
