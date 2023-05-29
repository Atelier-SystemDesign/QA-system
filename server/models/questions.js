const db = require('../db/pg');

module.exports = {
  getQuestions: (id, count = 5, page = 1) => {
    let skip = (page - 1) * count;
    // console.log('number of a rows to skip', skip, 'page #', page, 'count: ', count);
    if (Number.isNaN(skip)) { skip = 0; }
    return db.query(`
      SELECT
        question.question_id,
        question.question_body,
        question.question_date,
        question.asker_name,
        question.reported,
        question.question_helpfulness,
        COALESCE(
          (
          SELECT
            JSON_OBJECT_AGG(
              answer.answer_id, JSON_BUILD_OBJECT(
                'id', answer.answer_id,
                'body', answer.body,
                'date', answer.date,
                'answerer_name', answer.answerer_name,
                'helpfullness', answer.helpfulness,
                'photos', COALESCE(
                  (
                    SELECT
                      JSON_AGG(photo.url)
                    FROM
                      photo
                    WHERE
                      answer.answer_id = photo.answer_id
                  ),
                  '[]'::json
                )
              )
            )
          FROM
            answer
          WHERE
            question.question_id = answer.question_id
            AND answer.answer_reported = false
          ),
          '{}'::json
        ) AS answers
      FROM
        question
      WHERE
        question.product_id = $1
        AND question.reported = false
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

  postQuestion: (data) => db.query(`
    INSERT INTO question (
      product_id,
      question_body,
      question_date,
      asker_name,
      asker_email,
      reported,
      question_helpfulness
    )
    VALUES (
      $1, $2, CURRENT_TIMESTAMP(0), $3, $4, $5, $6
    )
  `, [data.product_id, data.body, data.name, data.email, false, 0]),

  helpfulQuestion: (questionId) => db.query(`
    UPDATE
      question
    SET
      question_helpfulness = question_helpfulness + 1
    Where
      question_id = $1

  `, [questionId]),

  reportQuestion: (questionId) => db.query(`
    UPDATE
      question
    SET
      reported = true
    Where
      question_id = $1
  `, [questionId]),
};
