const fs = require('fs')
const express = require('express')

const PAGE_HTML = fs.readFileSync(__dirname + '/page.html', 'utf-8')

const app = express()

app.get('/', (request, response) => {
  response.send(PAGE_HTML)
})

app.get('/data', (request, response) => {
  response.json({ foo: 'bar' })
})

app.listen(8080)
