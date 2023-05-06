const { errorConverter, errorHandler } = require('./middlewares/error');

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const routes = require('./routes');

console.log('environment    ', process.env.ENVIRONMENT)
console.log('PORT    ', process.env.PORT)
console.log('MONGO_CONNECTION_STRING    ', process.env.MONGO_CONNECTION_STRING)

if(process.env.ENVIRONMENT !== 'production') {
    require('dotenv').config()
}

const app = express();
const port = process.env.PORT || 3080;


// set security HTTP headers
app.use(helmet());

// enable cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: false,
  })
);
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: false,
  })
);

app.use(express.static(path.join(__dirname, './ui/build')));
app.use(bodyParser.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './ui/build/index.html'));
});


// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})