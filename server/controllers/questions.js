const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id: id, count, page } = req.query; // destructured req.query into variables
      console.log('what parameters we got, id:', id, 'count:', count, 'page:', page);

      const questions = await models.questions.getQuestions(id, count, page);
      // const answers = await models.answers.getAnswers();
      console.log('transform this question data', questions.rows, questions.rows[0]);
      console.log('product_id:', questions.rows[0].product_id);
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
      const response = await models.questions.postQuestion();
      console.log('question was posted', response);

      res.send(response);
    } catch (err) {
      console.log('questions controller post error', err.message);
      res.status(404).send('error at questions controller post');
    }
  },

  putHelpful: async (req, res) => {
    try {
      const response = await models.questions.helpfulQuestoin();
      console.log('question helpful updated', response);

      res.send(response);
    } catch (err) {
      console.log('questions controller helpful error', err.message);
      res.status(404).send('error at questions controller helpful');
    }
  },

  putReport: async (req, res) => {
    try {
      const response = await models.questions.reportQuestion();
      console.log('question reported', response);

      res.send(response);
    } catch (err) {
      console.log('questions controller report error', err.message);
      res.status(404).send('error at questions controller report');
    }
  },
};
