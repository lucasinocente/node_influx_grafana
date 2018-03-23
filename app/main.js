const influxdb = require('./utils/influxdb');
const utils = require('./utils/helpers');
require('dotenv').config();

console.log(`#### -> Fake client started at ${new Date()}`);

let getLatency = null;

waitTime = 2000;

const main = () => {

    console.log('Starting...');

    influxdb
        .makeInfluxDBConnection()

        // Make the request 
        .then(() => {

            console.log('Starting count latency');

            const appEndpoint = 'https://google.com';
            getLatency = new Date().getTime();

            return utils.getRequest(`${appEndpoint}`);

        })

        // Send to Influx
        .then(() => {

            console.log('Stop count latency');

            const action = 'getLatency';
            getLatency = new Date().getTime() - getLatency;

            return influxdb.saveOnInfluxDB(action, getLatency);

        })

        // Exit from application
        .then(() => {
            setTimeout(()=>{
                utils.exit();
            }, waitTime);
        })

        .catch(err => {
            console.log(err);
            setTimeout(()=>{
                utils.exit();
            }, waitTime);
        });


};

main();