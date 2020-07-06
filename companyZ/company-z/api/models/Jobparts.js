/**
 * Jobparts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    updatedAt: false,
    createdAt: false,
    tableName: 'jobparts',
    jobName: {
      type: 'string', required: true
    },
    partId: {
      type: 'number', required: true
    },
    qty: {
      type: 'number', required: true,
    },
    date: {
      type: 'string', required: true,
    },
    time: {
      type: 'string', required: true,
    },
    result: {
      type: 'string', required: true
    }
  },
  datastores: 'jobparts',
};
