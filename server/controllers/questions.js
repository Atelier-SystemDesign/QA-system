const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id: id, count, page } = req.query; // destructured req.query into variables
      console.log('what parameters we got, id:', id, 'count:', count, 'page:', page);

      const questions = await models.questions.getQuestions(id, count, page);
      // const answers = await models.answers.getAnswers();
      console.log('transform this question data', questions.rows, questions.rows[0]);
      console.log('product_id:', id);
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
      console.log('post question req.body', req.body, 'req.params', req.params);
      await models.questions.postQuestion(req.body);
      console.log('question was posted');

      res.sendStatus(201);
    } catch (err) {
      console.log('questions controller post error', err.message);
      res.status(404).send('error at questions controller post');
    }
  },

  putHelpful: async (req, res) => {
    try {
      console.log('req.body', req.body, 'req.params', req.params);
      const response = await models.questions.helpfulQuestion(req.params.question_id);
      console.log('question helpful updated', response);

      res.sendStatus(204);
    } catch (err) {
      console.log('questions controller helpful error', err.message);
      res.status(404).send('error at questions controller helpful');
    }
  },

  putReport: async (req, res) => {
    try {
      const response = await models.questions.reportQuestion(req.params.question_id);
      console.log('question reported', response);

      res.send(response);
    } catch (err) {
      console.log('questions controller report error', err.message);
      res.status(404).send('error at questions controller report');
    }
  },
};
