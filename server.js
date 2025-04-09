const Framework = require('./src/framework');
const routes = require('./src/routes');
const logger = require('./src/middlewares/logger');

const app = new Framework();

app.use(logger);

routes(app);

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});