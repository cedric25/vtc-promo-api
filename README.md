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

## Data

At the moment, there is only an **in-memory database** which includes one entry:
```json
{
  "_id": "123xxx",
  "name": "WeatherCode",
  "avantage": {
    "percent": 20
  },
  "restrictions": {
    "@or": [{
      "@age": {
        "eq": 40
      }
    }, {
      "@age": {
        "lt": 30,
        "gt": 15
      },
    }],
    "@date": {
      "after": "2017-05-02",
      "before": "2018-10-02",
    },
    "@meteo": {
      "is": "clear",
      "temp": {
        "gt": "15",
      }
    }
  }
}
```

A possible next step could be to have a file-based database instead.

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
```

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

There is multiple 'TODO' in the code...
