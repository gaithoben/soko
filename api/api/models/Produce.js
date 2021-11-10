/**
 * Produce.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * /usr/local/lib/node_modules/sails/node_modules/sails-generate/lib/core-generators/
 */

module.exports = {
  attributes: {
    ProductCode: {
      type: "string",
      defaultsTo: "",
    },

    ProductName: {
      type: "string",
      defaultsTo: "",
    },

    Timestamp: {
      type: "number",
      defaultsTo: 0,
      rules: {
        minimum: 1,
      },
    },
  },
  customToJSON: function () {
    var obj = this;
    if (!obj._key && obj.id) {
      obj["_key"] = obj.id;
    }
    return obj;
  },
  beforeCreate: async (recordToCreate, cb) => {
    recordToCreate.Timestamp = Date.now();
    return cb();
  },
  afterCreate: async (createdRecord, cb) => {
    return cb();
  },
};
