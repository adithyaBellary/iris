'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = '74EORF7567KKW34BCZ3QAF2TQJSKCBWS';
const witClient = require('../server/witClient')(witToken);


const slackToken = 'xoxb-231318367431-h4YurDjBsIMwM7kRQrOBirPf';
const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry );
rtm.start();


slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode`)
});