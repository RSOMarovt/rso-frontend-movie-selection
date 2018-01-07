export default {
    locationServiceUrl: process.env.locationServiceUrl ? process.env.locationServiceUrl : 'http://169.51.16.3:31437',
    streamServiceUrl: process.env.streamServiceUrl ? process.env.streamServiceUrl : 'http://169.51.16.3:31017',
    streamServiceWs: process.env.streamServiceWs ?  process.env.streamServiceUrl : 'ws://169.51.16.3:31017',
    // locationServiceUrl: process.env.locationServiceUrl ? process.env.locationServiceUrl : 'http://localhost:8081',
    // streamServiceUrl: process.env.streamServiceUrl ? process.env.streamServiceUrl : 'http://localhost:8080',
    // streamServiceWs: process.env.streamServiceWs ?  process.env.streamServiceUrl : 'ws://localhost:8080',
}