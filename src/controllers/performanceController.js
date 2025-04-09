const performanceService = require('../services/performanceService');

exports.getPerformances = (req, res) => {
  const performances = performanceService.getAllPerformances();
  res.json(performances);
};

exports.getPerformanceById = (req, res) => {
  const performance = performanceService.getPerformanceById(req.params.id);

  if (performance) {
    res.json(performance);
  } else {
    res.status(404).json({ message: 'Постановка не найдена' });
  }
};

exports.createPerformance = (req, res) => {
  const newPerformance = req.body;
  performanceService.createPerformance(newPerformance);
  res.status(201).json(newPerformance);
};

exports.updatePerformance = (req, res) => {
  const updatedPerformance = performanceService.updatePerformance(req.params.id, req.body);
  if (updatedPerformance) {
    res.json(updatedPerformance);
  } else {
    res.status(404).json({ message: 'Постановка не найдена' });
  }
};

exports.patchPerformance = (req, res) => {
  const patchedPerformance = performanceService.patchPerformance(req.params.id, req.body);
  if (patchedPerformance) {
    res.json(patchedPerformance);
  } else {
    res.status(404).json({ message: 'Постановка не найдена' });
  }
};