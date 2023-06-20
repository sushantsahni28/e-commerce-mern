const app = require('./app')
const http = require('http')
const db = require('./models/sql.model')
const port = 3000

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to MySql');
});

const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})