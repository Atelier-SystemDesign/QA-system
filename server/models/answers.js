const db = require('../db/pg');

module.exports = {
  getAnswers: (id, count = 5, page = 1) => {
    const skip = (page - 1) * count;
    console.log('number of rows to skip', skip);
    return db.query(`
      SELECT
        answer.answer_id,
        answer.body,
        answer.date,
        answer.answerer_name,
        answer.helpfulness,
        COALESCE(
          (
            SELECT
              JSON_AGG(photo.url)
            FROM
              photo
            WHERE
              answer.answer_id = photo.answer_id
          ),
          '[]'::json
        ) AS photos
      FROM
        answer
      WHERE
        answer.question_id = $1
      GROUP BY
        answer.answer_id,
        answer.body,
        answer.date,
        answer.answerer_name,
        answer.helpfulness
      LIMIT $2
      OFFSET $3
    `, [id, count, skip]);
  },

  postAnswer: () => db.query(`
    INSERT INTO answer(id,)
  `),

  helpfulAnswer: () => db.query(`
    UPDATE
  `),

  reportAnswer: () => db.query(`
    UPDATE
  `),
};
