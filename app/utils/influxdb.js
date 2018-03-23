const Influx = require('influx');
const os = require('os');

module.exports = {

    makeInfluxDBConnection() {

        console.log('Make InfluxDB Connection');

        return new Promise((resolve, reject) => {

            const influxDatabase = process.env.INFLUX_DATABASE;

            INFLUXDB = new Influx.InfluxDB({
                host: process.env.INFLUX_ENDPOINT,
                database: influxDatabase,
                password: process.env.INFLUX_PASSWORD,
                username: process.env.INFLUX_USERNAME,
                schema: [
                    {
                        measurement: 'response_times',
                        fields: {
                            duration: Influx.FieldType.INTEGER
                        },
                        tags: [
                            'host',
                            'method'
                        ]
                    }
                ]
            });

            INFLUXDB.getDatabaseNames()
                .then(names => {
                    if (!names.includes(influxDatabase)) {
                        console.log(`Creating ${influxDatabase} in InfluxDB`);
                        return INFLUXDB.createDatabase(influxDatabase);
                    }
                })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    console.error(`Error creating Influx database!: ${err}`);
                    reject();
                });

        });

    },

    saveOnInfluxDB(action, data) {

        console.log(`Saving ${action} and ${data}ms in Influx DB`);

        return new Promise((resolve, reject) => {

            INFLUXDB.writePoints([{
                measurement: 'response_times',
                tags: {method: action, host: os.hostname()},
                fields: {duration: data},
            }])
            .then(res => {
                console.log(`Saved ${action} and ${data}ms in Influx DB`);
                resolve();
            })
            .catch(err => {
                console.error(`Error saving data to InfluxDB! ${err.stack}`);
                reject();
            });

        });

    },

};