require('dotenv').config();

// setup database
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.log(err));

const app = require('./server');

app.listen(process.env.PORT || 8443, () => {
  console.log('Starting the server');
});
