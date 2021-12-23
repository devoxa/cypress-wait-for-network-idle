const fs = require('fs')
const express = require('express')

const app = express()

app.get('/no-requests', (request, response) => {
  const html = fs.readFileSync(__dirname + '/no-requests.html', 'utf-8')
  response.send(html)
})

app.get('/fast-requests', (request, response) => {
  const html = fs.readFileSync(__dirname + '/fast-requests.html', 'utf-8')
  response.send(html)
})

app.get('/delayed-fast-requests', (request, response) => {
  const html = fs.readFileSync(__dirname + '/delayed-fast-requests.html', 'utf-8')
  response.send(html)
})

app.get('/multi-stage-fast-requests', (request, response) => {
  const html = fs.readFileSync(__dirname + '/multi-stage-fast-requests.html', 'utf-8')
  response.send(html)
})

app.get('/slow-requests', (request, response) => {
  const html = fs.readFileSync(__dirname + '/slow-requests.html', 'utf-8')
  response.send(html)
})

app.get('/delayed-slow-requests', (request, response) => {
  const html = fs.readFileSync(__dirname + '/delayed-slow-requests.html', 'utf-8')
  response.send(html)
})

app.get('/fast', (request, response) => {
  response.json({ foo: 'bar' })
})

app.get('/slow', (request, response) => {
  setTimeout(() => {
    response.json({ foo: 'bar' })
  }, 1000)
})

app.listen(8080)
