import express from 'express'
import { productsRouter } from './routes/products.js'

const app = express() 
const PORT = 8000
/*
Challenge 1:
    1. Use express.static() to serve all the files in 'public'.
*/
app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.type('html')
//     res.send('<!doctype html><html><body>Hello Express!</body></html>')
// })

app.use('/api/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 
