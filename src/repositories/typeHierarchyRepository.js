/* eslint-disable class-methods-use-this */
'use strict';

const BaseRepository = require('./baseRepository');
const TypeHierarchy = require('../models/typeHierarchy');

const retrieveTableName = () => {
  console.log(`Table Name: ${JSON.stringify(process.env.TYPE_HIERARCHY_TABLE)}`)

  if (!process.env.TYPE_HIERARCHY_TABLE) {
    throw new Error('The table name was not specified! Verify if the ENV variable DATA_BROKER_SUBSCRIPTION_TABLE exists.');
  }
  return process.env.TYPE_HIERARCHY_TABLE;
};

class TypeHierarchyRepository extends BaseRepository {
  itemFactory(item) {
    return new TypeHierarchy(item);
  }

  getTableName() {
    return retrieveTableName();
  }

  async findByOAuthClient(oauthClientId) {
    return this.findByIndex('GSI-OAuthClientId', 'oauthClientId', oauthClientId);
  }

  async findByDeviceType(deviceType) {
    return this.findByIndex('GSI-DeviceType', 'deviceType', deviceType);
  }
}

module.exports = TypeHierarchyRepository;
