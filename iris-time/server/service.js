'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

//Keep in mind that my key will be different from your key
//You need to go to the Google API website and request one
//That goes for all the keys in all the service.js files
service.get('/service/:location', (req, res, next) => {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=AIzaSyDMVUwr1kKYpk3JTIgV5cM_D-z6r97RK8Q', (err, response) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X');

        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&language=es&key=AIzaSyBF5CZV8JCVySXxAAyFp2PyJ80nHD5YK1w', (err, response) =>{
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }

            const result = response.body;

            const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');

            res.json({result: timeString});
        });
    });
});
module.exports = service;