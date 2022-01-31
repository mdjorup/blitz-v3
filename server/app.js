var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blitz.mhwar.mongodb.net/blitz?retryWrites=true&w=majority`;


var app = express();

app.use(bodyParser.json());



