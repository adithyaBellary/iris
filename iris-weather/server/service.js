'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

//As astated 
service.get('/service/:location', (req, res, next) => {
    
    request.get('http://api.openweathermap.org/data/2.5/weather?q=' + 
    req.params.location + '&APPID=f6f8bc003041ba4d6471e3186a46dbe9&units=metric', 
    (err, response) => {

        if (err) {
            console.log(err);
            return res.sendStatus(404);
        }

        res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});
    });
});

module.exports = service;