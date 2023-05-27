const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const questionSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    {
      question_id: Number,
      question_body: String,
      question_date: Date,
      asker_name: String,
      asker_email: String,
      reported: Number,
      question_helpfulness: Number,
    },
  ],
});

const answerSchema = new mongoose.Schema({
  question_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpfulness: Number,
  photos: [],
});

const Question = mongoose.model('Question', questionSchema);

const Answer = mongoose.model('Answer', answerSchema);
