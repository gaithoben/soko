/**
 * ProduceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  delete: async (req, res) => {
    const params = req.allParams() || {};
    const { headerUser, ...headers } = req.headers || {};

    if (!params.ids || !Array.isArray(params.ids)) {
      return res.status(500).send({ message: "PARAMS_VALIDATION_ERROR" });
    }

    try {
      const produces = params.ids;
      const result = await Produce.destroy({ id: { $in: produces } });
      return res.ok(result);
    } catch (error) {
      return res.serverError(error);
    }
  },
  saveproduce: async (req, res) => {
    try {
      const params = req.body || {};
      const { headerUser, ...headers } = req.headers || {};

      params.User = { ...headerUser };

      if (params.id) {
        const rid = params.id || params.id;
        delete params.id;
        const updatedrec = await Produce.updateOne({ id: rid }).set(params);
        return res.ok(updatedrec || {});
      } else {
        const savedrec = await Produce.create(params).meta({ fetch: true });
        return res.ok(savedrec || {});
      }
    } catch (error) {
      return res.serverError(error);
    }
  },

  getall: async (req, res) => {
    try {
      const params = req.allParams() || {};
      const headers = req.headers || {};
      let querry = {};

      if (params.filter) {
        const filter = params.filter.replace(/[.*+?^()|[\]\\]/g, "\\$&");
        querry = {
          ProduceName: { $like: `%${filter}%` },
        };
      }

      const count = await Produce.count(querry);

      let sort = "createdAt DESC";
      if (!params.sort) {
        params.sort = {};
      } else {
        const fld = JSON.parse(params.sort);
        for (var key in fld) {
          sort = `${key} ${fld[key] === -1 ? "DESC" : "ASC"}`;
        }
      }

      const sortObj = sort ? { sort: sort } : {};

      const rows = await Produce.find({
        where: { ...querry },
        ...sortObj,
        skip: parseInt(params.skip) || 0,
        limit: parseInt(params.limit) || 30,
      });

      return res.ok({
        totalCount: count || 0,
        items: rows || [],
      });
    } catch (error) {
      return res.serverError(error);
    }
  },

  filtersearch: async (req, res) => {
    try {
      const params = req.allParams() || {};
      const headers = req.headers || {};

      let querry = {};
      if (params.filter) {
        const filter = params.filter.replace(/[.*+?^()|[\]\\]/g, "\\$&");
        querry = {
          ProduceName: { $like: `%${filter}%` },
        };
      }

      const items = await Produce.find({
        where: { ...querry },
        skip: parseInt(params.skip) || 0,
        limit: parseInt(params.limit) || 30,
      });

      return res.ok({
        items,
      });
    } catch (error) {
      return res.serverError(error);
    }
  },

  processproduct: async (req, res) => {
    const params = req.allParams() || {};
    const headers = req.headers || {};
    try {
      const prod = params.Product || {};
      if (!prod.id || !params.Packs) {
        throw new Error("PARAMS_VALIDATION_ERROR");
      }

      const product = await Product.findOne(prod.id);

      console.log("====================================");
      console.log(product);
      console.log("====================================");

      await product.processProduct(params.Packs);
      return res.ok(product);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return res.serverError(error);
    }
  },
};
