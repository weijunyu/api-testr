const _ = require('lodash');
const crypto = require('crypto');

const NAME = require('./package.json').name;
const VERSION = require('./package.json').version;
module.exports = Router;
/**
 * @param {*} app Express app instance
 * @returns {*} app instance passed in, with all routes defined.
 */
function Router(app) {
    app.get('/', (req, res) => {
        res.json({
            name: NAME,
            version: VERSION
        });
    });
    app.get('/echo', (req, res) => {
        let interval = _.get(req, 'query.interval');
        if (!interval) {
            throw new Error('Specify response interval in ms.');
        }
        setTimeout(() => {
            res.json({
                interval: interval + 'ms'
            });
        }, interval);
    });
    app.get('/payload', (req, res) => {
        let size =_.get(req, 'query.size'); 
        if (!size) {
            throw new Error('Specify a response size in bytes.');
        }
        // Divide by 2 for more accurate payload size
        let payload = crypto.randomBytes(parseInt(size / 2)).toString('hex');
        res.json({
            payload: payload
        });
    });
    app.get('/headers', (req, res) => {
        res.json({
            headers: req.headers
        });
    });
    return app;
}
