const client = require('prom-client');
const register = new client.Registry();


const httpRequestTimer = new client.Histogram({
    name: 'user_api_http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
});

const counter = new client.Counter({
    name: 'user_api_counts',
    help: 'No of API calls',
    labelNames: ['namespace', 'status'],
});


// Register the histogram
register.registerMetric(httpRequestTimer);
register.registerMetric(counter);

module.exports = {
    httpRequestTimer,
    counter
}