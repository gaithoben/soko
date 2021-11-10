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
      const product = await Product.create(params).meta({
        fetch: true,
      });

      return res.ok(product);
    } catch (error) {
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
};
