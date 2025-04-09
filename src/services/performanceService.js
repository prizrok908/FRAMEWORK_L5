const { readData, writeData } = require('../db/db');

exports.getAllPerformances = () => {
  return readData('performances');
};

exports.getPerformanceById = (id) => {
  const performances = readData('performances');
  return performances.find(p => p.id === +id);
};

exports.createPerformance = (newPerformance) => {
  const performances = readData('performances');
  performances.push({ id: Date.now(), ...newPerformance });
  writeData('performances', performances);
};

exports.updatePerformance = (id, updatedData) => {
  const performances = readData('performances');
  const index = performances.findIndex(p => p.id === +id);
  if (index !== -1) {
    performances[index] = { ...performances[index], ...updatedData };
    writeData('performances', performances);
    return performances[index];
  }
  return null;
};

exports.patchPerformance = (id, partialData) => {
  const performances = readData('performances');
  const index = performances.findIndex(p => p.id === +id);
  if (index !== -1) {
    for (let key in partialData) {
      performances[index][key] = partialData[key];
    }
    writeData('performances', performances);
    return performances[index];
  }
  return null;
};