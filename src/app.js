const path= require('path'); //require core modules before npm modules just to stay organized;
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));
// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Sa3eed Elhawa'
    }); //matching with the name of the hbs file in views
})

// app.get('', (req, res)=>{
//     res.send('<h1>Hello express! perfect :v</h1>');
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     },{name: 'Sarah', age: 220}]);
// })

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        res.send({
            error: 'Please provide an address'
        })
    } else {
        geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{
            if(!error){
                // console.log("location",location);
                // console.log("lat long",latitude, longitude)
                forecast(latitude,longitude,(error,{summary, temperature, precipProb, humidity})=>{
                    if(!error)
                    {
                        // console.log("data",forecastData);
                        // console.log(summary+' It\'s currently '+temperature+'. There is a '+precipProb+'% chance of rain, Humidity: '+humidity);
                        res.send({
                            latitude: latitude,
                            longitude: longitude,
                            temperature: temperature,
                            precipitationProbablility: precipProb,
                            humidity: humidity,
                            location: location,
                            summary: ' It\'s currently '+temperature+'°C. There is a '+precipProb+'% chance of rain, Humidity: '+humidity
                        });
                    }
                    else{
                        // console.log("forecastError",error);
                        res.send({forecastError: error});
                    }
                });
            } else{
                res.send({error: error});
            }
        });
        // res.send({
        //     forcast: '',
        //     location: '',
        //     theStaticJSON : 'static data ',
        //     address: req.query.address
        // });
    }
    
    // res.send({
    //     forecast: 'cloudy with a chance of zeft 3ala rasak and it\'s over 9000000000', 
    //     location: 'henak'});
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search);
        res.send({
            products: []
        });
    }
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'help template',
        message: 'example message',
        name: 'Andrew Ryan'
    })
})
app.get('/help/*', (req, res) =>{
    // res.send('Help Article not found')
    res.render('404', {
        name: 'くろさき　いちご',
        errorMessage: 'Help Page Not Found'
    })
})
//app.com
//app.com/help
//app.com/about
app.get('*', (req, res) =>{
    res.render('404',{
        name: 'Jhon CENA',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000.');
})