'use strict';

const DBUtil = require('./utils/dbUtil');

const retrieveItems = async (params, itemFactory) => {
  const dbClient = DBUtil.createDBClientFactory();

  return dbClient.query(params).promise().then((data) => {
    const resultSet = [];

    if (data && data.Items) {
      data.Items.forEach(item => resultSet.push((itemFactory) ? itemFactory(item) : item));
    }

    return Promise.resolve(resultSet);
  }).catch(err => Promise.reject(err));
};

module.exports = class BaseRepository {
  async findById(itemId, key = 'id') {
    const params = {
      KeyConditionExpression: `${key} = :${key}`,
      TableName: this.getTableName()
    };
    params.ExpressionAttributeValues = {};
    params.ExpressionAttributeValues[`:${key}`] = String(itemId);

    const result = await retrieveItems(params, this.itemFactory);

    if (result && result.length > 0) {
      return result[0];
    }

    throw new Error('Resource not found');

  }

  async findByIndex(index, keyName, keyValue) {
    const exprAttrValues = {};
    exprAttrValues[`:${keyName}`] = keyValue;

    const params = {
      ExpressionAttributeValues: exprAttrValues,
      ScanIndexForward: false,
      IndexName: index,
      KeyConditionExpression: `${keyName} = :${keyName}`,
      TableName: this.getTableName()
    };

    return retrieveItems(params);
  }

  search(params) {
    return retrieveItems(params, this.itemFactory);
  }

  itemFactory() {
    throw new Error('Operation Not Supported!');
  }

  getTableName() {
    throw new Error('Operation Not Supported!');
  }
}
