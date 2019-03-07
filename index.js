const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 5000;
const routes = require('./routes');
const app = express();

app.use(helmet()); // Some security defaults. Check on npm for details
app.use(morgan('combined'));
app.use(cors());

app.use('/api', routes);

app.use((err, req, res, next) => {
    let status = err.status || 500;
    res.status(status).send({ error: err.message });
});

// 404 handler, request has passed through all middleware and has not been processed.
app.use((req, res, next) => {
    res.status(404).send({
        error: 'Not found.'
    });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
