var fs = require('fs');
var https = require('https');
var path = require('path');

var cookieParser = require('cookie-parser');
var httpErrors = require('http-errors');
var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/games', gamesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.urlencoded);
  next(httpErrors(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  res.status(err.status || 500).send();
});

var key = fs.readFileSync('../key.pem');
var cert = fs.readFileSync('../cert.pem');
const options = {
  key: key,
  cert: cert
}

var server = https.createServer(options, app);

const port = 3000;
server.listen(port, () => console.log("Listening on port 3000"));