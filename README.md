# vtc-promo-api

Implementation of a promo booking endpoint.

Includes:
 - Two endpoints: POST `/promocode` and POST `/booking-promo`
 - Test stack with [mocha](https://mochajs.org/#synchronous-code)
 - ESLint with [standard](https://standardjs.com/)
 - Logs with [bunyan](https://github.com/trentm/node-bunyan)
 - Access logs with [morgan](https://github.com/expressjs/morgan)

## How to use

 - Clone this project
```
git clone https://github.com/cedric25/vtc-promo-api.git
npm i // yarn
```

 - Run server
```
npm start // yarn start
npm run start:debug // yarn start:debug
```

 - Run tests
```
npm t // yarn test
```

## Deployed to heroku

https://vtc-promo-api.herokuapp.com/

Example:
POST https://vtc-promo-api.herokuapp.com/booking-promo
```json
{
  "promocode_name": "WeatherCode",
  "arguments": {
    "age": 25,
    "meteo": {
    	"town": "Lyon"
    }
  }
}
``

should answer with:

```json
{
  "promocode_name": "WeatherCode",
  "status": "accepted",
  "avantage": {
    "percent": 20
  }
}
```

## TODO

Look for 'TODO' in the code
