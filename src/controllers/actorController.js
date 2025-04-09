const actorService = require('../services/actorService');

exports.getActors = (req, res) => {
  const actors = actorService.getAllActors();
  res.json(actors);
};

exports.getActorById = (req, res) => {
  const actor = actorService.getActorById(req.params.id);

  if (actor) {
    res.json(actor);
  } else {
    res.status(404).json({ message: 'Актёр не найден' });
  }
};

exports.createActor = (req, res) => {
  const newActor = req.body;

  if (!newActor.name || !newActor.age || newActor.isActive === undefined || !newActor.hireDate || !newActor.roles) {
    return res.status(400).json({ message: 'Необходимо заполнить все поля: name, age, isActive, hireDate, roles' });
  }

  actorService.createActor(newActor);
  res.status(201).json(newActor);
};

exports.updateActor = (req, res) => {
  const updatedActor = actorService.updateActor(req.params.id, req.body);

  if (updatedActor) {
    res.json(updatedActor);
  } else {
    res.status(404).json({ message: 'Актёр не найден' });
  }
};

exports.patchActor = (req, res) => {
  const patchedActor = actorService.patchActor(req.params.id, req.body);

  if (patchedActor) {
    res.json(patchedActor);
  } else {
    res.status(404).json({ message: 'Актёр не найден' });
  }
};