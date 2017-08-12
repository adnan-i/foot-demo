const Confidence = require('confidence');
const Path = require('path');

const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file configures the plot device.',
    projectName: 'foot',
    port: {
        web: {
            $filter: 'env',
            test: 9090,
            $default: process.env.PORT || 8080
        }
    },
    apiPrefix: '/api',
    dataPath: {
        $filter: 'env',
        test: Path.join(__dirname, 'test/fixtures/clients.json'),
        $default: Path.join(__dirname, 'data/clients.json'),
    }
};

const store = new Confidence.Store(config);
exports.get = (key) => store.get(key, criteria);
exports.meta = (key) => store.meta(key, criteria);
