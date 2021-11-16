/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  saveproduct: async (req, res) => {
    const params = req.allParams() || {};
    const headers = req.headers || {};
    try {
      let product;

      if (params.id) {
        product = await Product.findOne(params.id);

        await product.update({
          ...params,
        });
      } else {
        product = await Product.create(params).meta({
          fetch: true,
        });
      }

      return res.ok(product);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return res.status(500).json({
        error: error.message || error.toString(),
      });
    }
  },

  getall: async (req, res) => {
    const params = req.allParams() || {};
    const headers = req.headers || {};
    try {
      const products = await Product.find();

      return res.ok(products);
    } catch (error) {
      return res.status(500).json({
        error: error.message || error.toString(),
      });
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
          ProductName: { $like: `%${filter}%` },
        };
      }

      const items = await Product.find({
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
};
