'use strict';

const TypeHierarchyRepository = require('../../repositories/typeHierarchyRepository');

const typeHierarchyRepository = new TypeHierarchyRepository();

module.exports.request = async (event) => {
  let payload;

  try {
    if (event.pathParameters && event.pathParameters.id) {
      const id = event.pathParameters.id;
      const typeHierarchy = await typeHierarchyRepository.findById(id);

      payload = {
        statusCode: 200,
        body: JSON.stringify(typeHierarchy),
      };
    } else if (event.queryStringParameters) {
      const queryStringParams = event.queryStringParameters;
      let typeHierarchyList = {};

      if (queryStringParams.oauthClientId) {
        typeHierarchyList = await typeHierarchyRepository.findByOAuthClient(queryStringParams.oauthClientId);
      } else if (queryStringParams.deviceType) {
        typeHierarchyList = await typeHierarchyRepository.findByDeviceType(queryStringParams.deviceType);
      }

      payload = {
        statusCode: 200,
        body: JSON.stringify(typeHierarchyList),
      };
    }
  } catch (err) {
    payload = {
      statusCode: 500,
      message: err.message
    }
  }

  return payload;
};
