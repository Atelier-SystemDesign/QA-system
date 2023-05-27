const db = require('../db/pg');

module.exports = {
  getAnswers: (id, count, page = 1) => {
    const skip = (page - 1) * count;
    console.log('number of rows to skip', skip);
    return db.query(`
      SELECT * FROM answer WHERE question_id = $1
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
