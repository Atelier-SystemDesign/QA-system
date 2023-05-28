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
        COALESCE(photo_urls, '[]'::json) AS photos
      FROM
        answer
      LEFT JOIN(
        SELECT
          photo.answer_id,
          JSON_AGG(url) AS photo_urls
        FROM
          photo
        GROUP BY
          photo.answer_id
      ) AS photos ON answer.answer_id::text = photos.answer_id::text
      WHERE
        answer.question_id = $1
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
