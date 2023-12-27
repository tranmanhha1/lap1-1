const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();

// Set up view engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Route for the '/about' page
app.get('/about', (req, res) => {
  res.render('about');
});

// Catch-all route for other paths
app.get('*', (req, res) => {
  res.send('Check out our "<a href="/about">About</a>" page!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nNavigate to http://localhost: ${port}/about\n`));