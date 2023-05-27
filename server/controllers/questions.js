const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id: id, count, page } = req.query; // destructured req.query into variables
      console.log('what parameters we got, id:', id, 'count:', count, 'page:', page);

      const questions = await models.questions.getQuestions(id, count, page);
      // const answers = await models.answers.getAnswers();
      console.log('transform this question data', questions.rows[0].answers, questions.rows);
      const transformed = {
        product_id: questions.rows.product_id,
        results: [
          {
            question_id: questions.rows.id,
            question_body: questions.rows.body,
            question_date: questions.rows.date_written,
            asker_name: questions.rows.asker_name,
            question_helpfulness: questions.rows.helpful,
            reported: questions.rows.reported,
            answers: {},
          },
        ],
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
