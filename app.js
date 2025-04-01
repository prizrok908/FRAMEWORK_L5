const Framework = require('./framework');

const app = new Framework();

app.use((req, res, next) => {
  console.log(`Запрос получен: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('лаба 5 Колотов');
});

app.post('/данные', (req, res) => {
  res.json({ сообщение: 'Данные получены', тело: req.body });
});

app.get('/пользователь/:id', (req, res) => {
  const userId = req.query.id || 'Неизвестно';
  res.json({ пользователь: `ID пользователя: ${userId}` });
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});