const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utlis/forecast')
const geocode = require('./utlis/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashish Kumar Singh'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Ashish Kumar Singh"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help Page",
        name: "Ashish Kumar Singh",
        message: "Let us get you through the problem"
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "address must be provided"
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location }={}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastData,
                address
            })
            
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send([{
        products: []
    }])
})
// app.com
// app.com/help
// app.com/about
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: "404",
        name: "Ashish Kumar",
        errorMessage: 'Help article not found.'
    })
})
app.get('*',(req,res) => {
    
    res.render('404',{
        title: "404",
        errorMessage: ' Page not found :('
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})