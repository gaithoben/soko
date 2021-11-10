/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * /usr/local/lib/node_modules/sails/node_modules/sails-generate/lib/core-generators/
 */

module.exports = {
  attributes: {
    ProductCode: {
      type: "string",
      unique: true,
      required: true,
    },

    ProductName: {
      type: "string",
      defaultsTo: "",
    },

    // Price: {
    //   type: "number",
    //   defaultsTo: 0,
    //   rules: {
    //     minimum: 0,
    //   },
    // },

    // Discount: {
    //   type: "number",
    //   defaultsTo: 0,
    //   rules: {
    //     minimum: 0,
    //   },
    // },

    // Timestamp: {
    //   type: "number",
    //   defaultsTo: 0,
    //   rules: {
    //     minimum: 1,
    //   },
    // },

    Produce: {
      type: "json",
      defaultsTo: [],
      rules: {
        linkCollections: ["produce", "product"],
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            id: { type: "string" },
          },
          required: ["id"],
        },
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
