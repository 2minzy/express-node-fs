const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
// to access bodyparser middleware
app.use(express.json());
app.use(cookieParser());

// require APIs
const projectsRoute = require('./routes/projects');
app.use('/api', projectsRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on PORT', 3000);
  }
});
