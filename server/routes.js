const router = require('express').Router();
const controller = require('./controllers');

router.get('/qa/questions', controller.questions.get);
router.post('/qa/questions', controller.questions.post);
router.put('/qa/questions/:question_id/helpful', controller.questions.putHelpful);
router.put('/qa/questions/:question_id/report', controller.questions.putReport);

router.get('/qa/questions/:question_id/answers', controller.answers.get);
router.post('/qa/questions/:question_id/answers', controller.answers.post);
router.put('/qa/answers/:answer_id/helpful', controller.answers.putHelpful);
router.put('/qa/answers/:answer_id/report', controller.answers.putReport);

module.exports = router;
