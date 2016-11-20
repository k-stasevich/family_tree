'use strict';

const express = require('express');
const path = require('path');
const ENV = process.env.NODE_ENV || 'development';

const port = process.env.port || 3000;

let app = express();

const BUILD_PATH = path.join(__dirname, '../front/build/' + ENV);
app.set('view engine', 'html');
app.set('views', BUILD_PATH);
app.use(express.static(BUILD_PATH));

app.listen(port, () => {
  console.log('Run server on port: ' + port);
});