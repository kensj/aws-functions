var AWS = require('aws-sdk')
var ses = new AWS.SES()

var RECEIVERS = ['email@email.com'];
var SENDER = 'email@email.com'; // make sure that the sender email is properly set up in your Amazon SES

exports.handler = (event, context, callback) => {
    sendEmail(event, function (err, data) {
        var response = {
            "isBase64Encoded": false,
            "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://kenjijapra.com' },
            "statusCode": 200,
            "body": "{\"result\": \"Success.\"}"
        };
        callback(err, response);
    });
};

function sendEmail (event, done) {
    var data = JSON.parse(event.body);
    
    var params = {
        Destination: {
            ToAddresses: RECEIVERS
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + data.name + '\nEmail: ' + data.email + '\nMessage: ' + data.message,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: data.subject,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}
