const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const port = 3000;
const request = require('request');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/product/:id', express.static('public'));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`proxy server running at port: ${port}`);
});


app.get('/productDetails/:id', (req, res) => {
  console.log(`${req.url}`)
  axios.get(`http://ec2-54-219-171-140.us-west-1.compute.amazonaws.com${req.url}`)
    .then((response) => {
      console.log('this is the response', response.data)
      res.send(response.data);
    })
    .catch((err) => {
      console.log('your axios has an error', err)
    });
});

app.get('/reviews-module/reviews/product/:id', (req, res) => {
  console.log(`http://18.191.180.179${req.url}`);
  request(`http://18.191.180.179${req.url}`, (error, response, body) => {
    if (error) throw new Error(error);
    res.end(body);
  });
});

app.put('/reviews-module/reviews', (req, res) => {
  console.log('req.body', req.body);
  axios.put(`http://18.191.180.179${req.url}`, req.body)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      throw (err);
    });
});

app.get('/product/:id/related', (req, res) => {
  axios.get(`http://you-may-also-like-load-balancer-1474842517.us-west-1.elb.amazonaws.com${req.url}`)
    .then((response) => {
      console.log('this is the response', response.data)
      res.send(response.data);
    })
    .catch((err) => {
      console.log('your axios has an error', err)
    });
});

app.get('/product/:id/images', (req, res) => {
  console.log(`${req.url}`);
  axios.get(`http://ec2-18-219-118-99.us-east-2.compute.amazonaws.com${req.url}`)
    .then((response) => {
      console.log('this is the response', response.data)
      res.send(response.data);
    })
    .catch((err) => {
      console.log('your axios has an error', err)
    });
});  

