const db = require('../db/pg');

module.exports = {
  getQuestions: (id, count, page = 1) => {
    const skip = (page - 1) * count;
    console.log('number of rows to skip', skip);
    return db.query(`
      SELECT
        question.id,
        product_id,
        body,
        date_written,
        asker_name,
        reported,
        helpful,
        ARRAY_AGG(
          answer.id,
          question_id,
          answer_body,
          answer_date_written,
          answerer_name,
          answer_reported,
          answer_helpful
          ORDER BY
            answer.id
        ) answers
      FROM
        question
      INNER JOIN answer ON (question.id = question_id)
      INNER JOIN photo ON (answer.id = answer_id)
      WHERE
        product_id = $1
      LIMIT $2
      OFFSET $3
    `, [id, count, skip]);
  },

  postQuestions: (params) => db.query(`
    INSERT INTO question(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
  `, [...params]),

  helpfulQuestion: () => db.query(`
    UPDATE
  `),

  reportQuestion: () => db.query(`
    UPDATE
  `),
};
