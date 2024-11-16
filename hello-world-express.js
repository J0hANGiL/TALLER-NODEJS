const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send('hola Johan al mundon de express')
}) 

app.listen(port, () => {
    console.log(`ejemplo de app escuchando en el puerto ${port}`)
})