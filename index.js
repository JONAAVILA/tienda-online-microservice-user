import server from './src/server.js';
import { models } from './src/db.js';

const conn = models.conn
const PORT = process.env.PORT || 10000;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server-User listening on port ${PORT}`);
  })
  }).catch(error => console.error(error))
