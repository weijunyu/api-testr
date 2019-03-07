const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;
const Router = require('./routes');
const app = express();

app.use(morgan('combined'));

Router(app)
    .use(cors())
    .use((err, req, res, next) => {
        res.status(500).send({ error: err.message });
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
