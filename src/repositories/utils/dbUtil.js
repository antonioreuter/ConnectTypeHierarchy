'use strict';

const AWS = require('aws-sdk');

const dynamoDBOptions = {
  region: process.env.AWS_DEFAULT_REGION,
  retryDelayOptions: {
    base: 100
  }
};

const createDBClientFactory = () => new AWS.DynamoDB.DocumentClient(dynamoDBOptions);

module.exports = {
  createDBClientFactory
};
