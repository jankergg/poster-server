const crypto = require('crypto');
const defaultOptions = {
    secret: 'www.qingyouyuedu.com', 
    text: 'janko'
}

exports.createHash = function(options){
    const $options = Object.assign(defaultOptions, options);
    const hex = crypto.createHmac('sha256', $options.secret)
        .update($options.text)
        .digest('hex');
    return hex.substr(0, 11);
}
