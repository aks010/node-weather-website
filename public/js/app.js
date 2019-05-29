
const weatherForm = document.querySelector('button')
const search = document.querySelector('input')
const displayWeather = document.querySelector('.displayWeather')

weatherForm.addEventListener("click",(e) => {
    e.preventDefault()
    const location = search.value
    let markup
    // console.log(location)
    displayWeather.innerHTML = "Loading..."
    fetch('/weather?address='+location).then((response)=> {
    response.json().then((data) => {
        if(data.error) {
            return displayWeather.innerHTML = `<div style="color:white; background: red; padding: 10px; width: max-content; border-radius: 0.1rem">${data.error}</div>`
        }
        displayWeather.innerHTML = `<div>Location: ${data.location}</div><div>ForeCast: ${data.forecastData}</div>`
    })
})
})
// console.log(search.value)
