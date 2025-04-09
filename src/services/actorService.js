const { readData, writeData } = require('../db/db');

exports.getAllActors = () => {
  return readData('actors');
};

exports.getActorById = (id) => {
  const actors = readData('actors');
  return actors.find(a => a.id === +id);
};

exports.createActor = (newActor) => {
  const actors = readData('actors');
  actors.push({ id: Date.now(), ...newActor });
  writeData('actors', actors);
};

exports.updateActor = (id, updatedData) => {
  const actors = readData('actors');
  const index = actors.findIndex(a => a.id === +id);
  if (index !== -1) {
    actors[index] = { ...actors[index], ...updatedData };
    writeData('actors', actors);
    return actors[index];
  }
  return null;
};

exports.patchActor = (id, partialData) => {
  const actors = readData('actors');
  const index = actors.findIndex(a => a.id === +id);
  if (index !== -1) {
    for (let key in partialData) {
      actors[index][key] = partialData[key];
    }
    writeData('actors', actors);
    return actors[index];
  }
  return null;
};