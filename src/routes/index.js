const actorController = require('../controllers/actorController');
const performanceController = require('../controllers/performanceController');

module.exports = (app) => {

  app.get('/api/v1/actors', actorController.getActors);
  app.get('/api/v1/actors/:id', actorController.getActorById);
  app.post('/api/v1/actors', actorController.createActor);
  app.put('/api/v1/actors/:id', actorController.updateActor);
  app.patch('/api/v1/actors/:id', actorController.patchActor);

  app.get('/api/v1/performances', performanceController.getPerformances);
  app.get('/api/v1/performances/:id', performanceController.getPerformanceById);
  app.post('/api/v1/performances', performanceController.createPerformance);
  app.put('/api/v1/performances/:id', performanceController.updatePerformance);
  app.patch('/api/v1/performances/:id', performanceController.patchPerformance);
};