const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id: id, count, page } = req.query; // destructured

      const questions = await models.questions.getQuestions(id, count, page);

      const transformed = {
        product_id: id,
        results: questions.rows,
      };
      res.send(transformed);
    } catch (err) {
      console.log('questions controller get error: ---->', err.message);
      res.status(404).send('error at questions controller get');
    }
  },

  post: async (req, res) => {
    try {
      await models.questions.postQuestion(req.body);

      res.sendStatus(201);
    } catch (err) {
      console.log('questions controller post error', err.message);
      res.status(404).send('error at questions controller post');
    }
  },

  putHelpful: async (req, res) => {
    try {
      await models.questions.helpfulQuestion(req.params.question_id);

      res.sendStatus(204);
    } catch (err) {
      console.log('questions controller helpful error', err.message);
      res.status(404).send('error at questions controller helpful');
    }
  },

  putReport: async (req, res) => {
    try {
      await models.questions.reportQuestion(req.params.question_id);

      res.sendStatus(204);
    } catch (err) {
      console.log('questions controller report error', err.message);
      res.status(404).send('error at questions controller report');
    }
  },
};
