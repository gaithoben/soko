/**
 * Produce.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * /usr/local/lib/node_modules/sails/node_modules/sails-generate/lib/core-generators/
 */

module.exports = {
  keyProps: ["ProductName"],
  attributes: {
    ProductCode: {
      type: "string",
      defaultsTo: "",
      unique: true,
    },

    ProductName: {
      type: "string",
      defaultsTo: "",
    },

    Weight: {
      type: "number",
      defaultsTo: 0,
      rules: {
        minimum: 0,
      },
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
