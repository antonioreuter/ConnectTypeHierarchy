'use strict';

const TypeHierarchyRepository = require('../../repositories/typeHierarchyRepository');

const typeHierarchyRepository = new TypeHierarchyRepository();

module.exports.request = async (event) => {
  const params = event.queryStringParameters;

  let typeHierarchyList;
  if (params.oauthClientId) {
    typeHierarchyList = await typeHierarchyRepository.findByOAuthClient(params.oauthClientId);
  } else if (params.deviceType) {
    typeHierarchyList = await typeHierarchyRepository.findByDeviceType(params.deviceType);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(typeHierarchyList),
  };
};
