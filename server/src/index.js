const PORT = process.env.PORT || 3001;
const ENV = require('./environment');

const app = require('./app')(ENV);
const server = require('http').Server(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});