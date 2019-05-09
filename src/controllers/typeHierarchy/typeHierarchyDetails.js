'use strict';

const TypeHierarchyRepository = require('../../repositories/typeHierarchyRepository');

const typeHierarchyRepository = new TypeHierarchyRepository();

module.exports.request = async (event) => {
  const id = event.pathParameters.id;
  let payload;

  try {
    const typeHierarchy = await typeHierarchyRepository.findById(id);
    payload = {
      statusCode: 200,
      body: JSON.stringify(typeHierarchy),
    };
  } catch (err) {
    payload = {
      statusCode: 404,
      message: err.message
    }
  }

  return payload
};
