const _ = require('lodash');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const NAME = require('./package.json').name;
const VERSION = require('./package.json').version;

router.get('/', (req, res) => {
    res.json({
        name: NAME,
        version: VERSION
    });
});

router.get('/echo', (req, res) => {
    let interval = _.get(req, 'query.interval');
    if (!interval) {
        throw {
            status: 400,
            message: 'Specify response interval in ms.'
        };
    }
    setTimeout(() => {
        res.json({
            interval: interval + 'ms'
        });
    }, interval);
});
router.get('/payload', (req, res) => {
    let size = _.get(req, 'query.size');
    if (!size) {
        throw {
            status: 400,
            message: 'Specify a response size in bytes.'
        };
    }

    let sizeInt = parseInt(size);
    if (Number.isNaN(sizeInt)) {
        throw {
            status: 400,
            message: 'Response size specified is not an integer.'
        };
    }
    if (sizeInt < 0) {
        throw {
            status: 400,
            message: `Specified payload size should be a positive integer. Received ${sizeInt}`
        };
    }

    // Divide by 2 for more accurate payload size
    let payload = crypto.randomBytes(parseInt(size / 2)).toString('hex');
    res.json({
        payload: payload
    });
});
router.get('/headers', (req, res) => {
    res.json({
        headers: req.headers
    });
});

module.exports = router;
