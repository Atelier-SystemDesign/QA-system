const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { count, page } = req.query; // destructured
      const id = req.params.question_id;

      const data = await models.answers.getAnswers(id, count, page);
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
      await models.answers.postAnswer(req.body, req.params.question_id);

      res.sendStatus(201);
    } catch (err) {
      console.log('answers controller post error', err.message);
      res.status(404).send('error at answers controller post');
    }
  },

  putHelpful: async (req, res) => {
    try {
      await models.answers.helpfulAnswer(req.params.answer_id);

      res.sendStatus(204);
    } catch (err) {
      console.log('answers controller helpful error', err.message);
      res.status(404).send('error at answers controller helpful');
    }
  },

  putReport: async (req, res) => {
    try {
      await models.answers.reportAnswer(req.params.answer_id);

      res.sendStatus(204);
    } catch (err) {
      console.log('answers controller report error', err.message);
      res.status(404).send('error at answers controller report');
    }
  },
};
