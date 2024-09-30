import server from './src/server.js';
import { models } from './src/db.js';

const conn = models.conn
const PORT = process.env.PORT || 3000;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server-User listening on port ${PORT}`);
  })
  }).catch(error => console.error(error))