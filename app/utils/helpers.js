const request = require('request');
const main = require('../main');


module.exports = {

    getRequest(endpoint) {

        console.log(`Make the /GET -> ${endpoint}`);

        return new Promise((resolve, reject) => {

            request.get(endpoint, (err, res, body) => {

                if (err || !body) {
                    reject(err);
                    return;
                }

                resolve(body);
                return;

            });

        });

    },

    exit() {
        console.log('Exiting...');
        console.log('----------------------------------------------');
        process.exit();
    }

};