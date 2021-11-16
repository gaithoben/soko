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

    Price: {
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
    Packs: {
      type: "number",
      defaultsTo: 0,
      rules: {
        minimum: 0,
      },
    },

    Produce: {
      type: "json",
      defaultsTo: [],
      rules: {
        linkCollections: ["produce"],
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            id: { type: "string" },
            ProductCode: { type: "string" },
            ProductName: { type: "string" },
          },
          required: ["id", "ProductCode", "ProductName"],
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

ProductObject.prototype.processProduct = async function (packs) {
  try {
    const tx = await this._Transaction({
      action: function (params) {
        const product = getDocument(params.product);

        for (let rm of product.Produce) {
          const produce = getDocument(rm);

          const Weight = rm.WeightPerItem * params.packs;

          // throw new Error(`${Weight}`);
          const tx = {
            From: produce.keyProps,
            To: product.keyProps,
            Weight,
            Packs: params.packs,
            Timestamp: Date.now(),
          };

          produce.update({
            Weight: produce.Weight - Weight,
          });

          ProcessingtxDbo.create(produce, product, tx);
          db.procecssingtx.save(tx);
        }

        product.update({
          Packs: Number(product.Packs || 0) + params.packs,
        });
      },
      writes: ["processingtx", "product", "produce"],
      params: {
        packs: packs,
        product: this,
      },
    });
  } catch (error) {
    throw error;
  }
};
