var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();

app.use(express.static('.'));
app.engine('handlebars', exphbs({
  defaultLayout: 'master',
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {
    assets: require('./builds/manifest.json'),
  });
});

app.listen(3000);
