const db = require('../db/pg');

module.exports = {
  getQuestions: (id, count = 5, page = 1) => {
    let skip = (page - 1) * count;
    console.log('number of a rows to skip', skip, 'page #', page, 'count: ', count);
    if (Number.isNaN(skip)) { skip = 0; }
    return db.query(`
      SELECT
        question.id,
        product_id,
        body,
        date_written,
        asker_name,
        reported,
        helpful,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'question_id', answer.question_id,
            'answer_id', answer.id,
            'body', answer.answer_body,
            'date', answer.answer_date_written,
            'answerer_name', answer.answerer_name,
            'reported', answer.answer_reported,
            'helpfullness', answer.answer_helpful,
            'photos', (
              SELECT
                JSON_AGG(
                  JSON_BUILD_OBJECT(
                    'answer_id', photo.answer_id,
                    'url', photo.url
                  )
                )
              FROM
                photo
              WHERE
                answer.id = photo.answer_id )
          )
        ) AS answers
      FROM
        question
      INNER JOIN answer ON question.id = answer.question_id
      WHERE
        product_id = $1
      GROUP BY
        question.id, question.product_id, question.body, question.date_written, question.asker_name, question.reported, question.helpful
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
