const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/78ff6271a474ef0622e7ed8cc8352ccb/${latitude},${longitude}`
    
    request({url: url, json:true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather service!")
        } else if (response.body.error) {
            callback("Unable to find location!")
        } else {
            const data = response.body.currently
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast