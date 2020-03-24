const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const commentsRoute = require('./routes/commentsRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();
app.use(cors());

const PORT = 5000;
const nameDB = 'liverpool';

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true })
);

app.use('/api/comments', commentsRoute);
app.use('/api/news', newsRoute);

mongoose
  .connect(`mongodb://localhost:27017/${nameDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connection to database established');
  })
  .catch(err => {
    console.log(`DB on error: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server port ${PORT}`);
});
