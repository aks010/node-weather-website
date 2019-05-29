
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener("click",(e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=> {
    response.json().then((data) => {
        if(data.error) {
            return console.log(data.error)
        }
        console.log(data)
    })
})
})
console.log(search.value)
