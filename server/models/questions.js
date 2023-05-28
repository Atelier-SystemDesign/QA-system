const db = require('../db/pg');

module.exports = {
  getQuestions: (id, count = 5, page = 1) => {
    let skip = (page - 1) * count;
    console.log('number of a rows to skip', skip, 'page #', page, 'count: ', count);
    if (Number.isNaN(skip)) { skip = 0; }
    return db.query(`
      SELECT
        question.question_id,
        question.question_body,
        question.question_date,
        question.asker_name,
        question.reported,
        question.question_helpfulness,
        (
          JSON_OBJECT_AGG(
            answer.answer_id, JSON_BUILD_OBJECT(
              'id', answer.answer_id,
              'body', answer.body,
              'date', answer.date,
              'answerer_name', answer.answerer_name,
              'helpfullness', answer.helpfulness,
              'photos', COALESCE(photo_urls, '[]'::json)
            )
          )
        ) AS answers
      FROM
        question
      INNER JOIN
        answer ON question.question_id = answer.question_id
      LEFT JOIN(
        SELECT
          photo.answer_id,
          JSON_AGG(url) AS photo_urls
        FROM
          photo
        GROUP BY
          photo.answer_id
      ) AS photos ON answer.answer_id = photos.answer_id
      WHERE
        question.product_id = $1 AND question.reported = 0
      GROUP BY
        question.question_id,
        question.question_body,
        question.question_date,
        question.asker_name,
        question.reported,
        question.question_helpfulness
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
