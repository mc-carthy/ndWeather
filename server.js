const request = require('request');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const apiKey = process.env.API_KEY

app.locals.weather = '';
app.locals.error = '';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again!' });
        } else {
            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again!' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))