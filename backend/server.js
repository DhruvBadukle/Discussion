const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/discuss');

app.use('/auth', require('./routes/auth'));

app.listen(5000, () => console.log('Backend running'));