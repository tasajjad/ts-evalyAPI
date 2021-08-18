const app = require('./app')
const database = require('./database')


database()
    .then(res => {
        console.log('Database Connection Succesfull !')
    })
    .catch(err => {
        console.log(err.message)
    })

let port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})