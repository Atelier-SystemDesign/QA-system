const db = require('../../db/pg');

module.exports = {
  getAnswers: (id, count = 5, page = 1) => {
    const skip = (page - 1) * count;
    // console.log('number of rows to skip', skip);
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

  postAnswer: (data, questionId) => {
    db.query(`
      WITH ins_one AS (
        INSERT INTO answer (
          question_id,
          body,
          date,
          answerer_name,
          answerer_email,
          answer_reported,
          helpfulness
        )
        VALUES (
          $1, $2, CURRENT_TIMESTAMP(0), $3, $4, $5, $6
        )
        RETURNING answer_id
      )
      INSERT INTO photo (
        answer_id,
        url
      )
      SELECT
        ins_one.answer_id, unnest(CAST($7 AS text[])) AS url
      FROM
        ins_one
    `, [questionId, data.body, data.name, data.email, false, 0, data.photos]);
  },

  helpfulAnswer: (answerId) => db.query(`
    UPDATE
      answer
    SET
      helpfulness = helpfulness + 1
    Where
      answer_id = $1
  `, [answerId]),

  reportAnswer: (answerId) => db.query(`
    UPDATE
      answer
    SET
      answer_reported = true
    Where
      answer_id = $1
  `, [answerId]),
};
