const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) =>{
    res.render('09-home')
})

app.get('/page1', (req, res) => {
    res.render('09-page', { page: 1 })
})

app.get('/page2', (req, res) => {
    res.render('89-page', { page: 2 })
})


app.get('/page3', (req, res) => {
    res.render('09-page', { page: 3 })
})

app.use((req, res) => 
    res.status(404).render('484')
)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))