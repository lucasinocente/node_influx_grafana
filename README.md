## start grafana
```
docker run \
  -d \
  -p 3000:3000 \
  --name=grafana \
  -e "GF_SERVER_ROOT_URL=http://grafana.server.name" \
  -e "GF_SECURITY_ADMIN_PASSWORD=secret" \
  grafana/grafana
```

## start influx

```
docker run -p 8086:8086 \
      -v $PWD:/var/lib/influxdb \
      influxdb
```

## start app

`npm install`

`npm start`

## start infinity

`npm install pm2 -g`

`pm2 start app/main.js`

## Access Grafana
http://localhost:3000/

```
login: admin
pass: secret
```
