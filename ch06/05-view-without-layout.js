const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();

// Set up Handlebars as the view engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Route for rendering a page without a layout
app.get('/no-layout', (req, res) => 
  res.render('no-layout', { layout: null }))

// Home route
app.get('*', (req, res) => {
  res.send('Check out the "<a href="/no-layout">no layout</a>" page!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nNavigate to http://localhost:${port}/no-layout\n`))
