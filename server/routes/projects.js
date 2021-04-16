const router = require('express').Router();
const projects = require('../data/projects.json');
const fs = require('fs');
const path = require('path');

router.get('/projects', function (req, res) {
  res.send(projects);
});

router.get('/projects/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const project = projects.filter(function (project) {
    return project.id === id;
  });
  res.send(project);
});

router.post('/upload', function (req, res) {
  let project = req.body;
  project.year = Number(project.year);

  // get path
  const myPath = path.join(__dirname, '..', 'data', 'projects.json');

  // read file
  fs.readFile(myPath, 'utf8', (err, data) => {
    let parsedData = JSON.parse(data);
    parsedData = JSON.parse(data);
    parsedData.push(project);
    fs.writeFile(myPath, JSON.stringify(parsedData), err => {
      if (err) throw err;
      console.log('Successfully updated!');
      res.send('end');
    });
  });
});

module.exports = router;
