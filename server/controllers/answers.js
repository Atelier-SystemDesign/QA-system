const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      // console.log('answers req.query', req.query, 'req.params', req.params);
      const { count, page } = req.query; // destructured req.query into variables
      const id = req.params.question_id;

      const data = await models.answers.getAnswers(id, count, page);
      // console.log('transform this data', data.rows, 'count:', count, 'page:', page);
      const transformed = {
        question: id,
        page,
        count,
        results: data.rows,
      };
      res.send(transformed);
    } catch (err) {
      console.log('answers controller get error', err.message);
      res.status(404).send('error at answers controller get');
    }
  },

  post: async (req, res) => {
    try {
      // console.log('post answer req.body', req.body, 'req.params', req.params);
      await models.answers.postAnswer(req.body, req.params.question_id);
      // console.log('answer was posted');

      res.sendStatus(201);
    } catch (err) {
      console.log('answers controller post error', err.message);
      res.status(404).send('error at answers controller post');
    }
  },

  putHelpful: async (req, res) => {
    try {
      await models.answers.helpfulAnswer(req.params.answer_id);
      // console.log('answer helpful updated', response);

      res.sendStatus(204);
    } catch (err) {
      console.log('answers controller helpful error', err.message);
      res.status(404).send('error at answers controller helpful');
    }
  },

  putReport: async (req, res) => {
    try {
      await models.answers.reportAnswer(req.params.answer_id);
      // console.log('answer reported', response);

      res.sendStatus(204);
    } catch (err) {
      console.log('answers controller report error', err.message);
      res.status(404).send('error at answers controller report');
    }
  },
};
