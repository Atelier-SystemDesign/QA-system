const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`listening on port ${process.env.EXPRESS_PORT}`);
});
