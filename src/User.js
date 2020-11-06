const got = require('got');

module.exports = username => {
    return got(`https://instagram.com/${username}/?__a=1`).then(res => {
        return JSON.parse(res.body);
    }).catch(err => {
        if (err) {
            return null;
        }
    });
};
