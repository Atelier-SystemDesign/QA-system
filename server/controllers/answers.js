const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      console.log('answers req.query', req.query, 'req.params', req.params);
      const { count, page } = req.query; // destructured req.query into variables
      const id = req.params.question_id;

      const data = await models.answers.getAnswers(id, count, page);
      console.log('transform this data', data.rows, 'count:', count, 'page:', page);
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
      const response = await models.answers.postAnswers();
      console.log('answer was posted', response);

      res.send(response);
    } catch (err) {
      console.log('answers controller post error', err.message);
      res.status(404).send('error at answers controller post');
    }
  },

  putHelpful: async (req, res) => {
    try {
      const response = await models.answers.helpfulAnswer();
      console.log('answer helpful updated', response);

      res.send(response);
    } catch (err) {
      console.log('answers controller helpful error', err.message);
      res.status(404).send('error at answers controller helpful');
    }
  },

  putReport: async (req, res) => {
    try {
      const response = await models.answers.reportAnswer();
      console.log('answer reported', response);

      res.send(response);
    } catch (err) {
      console.log('answers controller report error', err.message);
      res.status(404).send('error at answers controller report');
    }
  },
};
