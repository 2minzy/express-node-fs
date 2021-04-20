const router = require('express').Router();
const upload = require('../middlewares/upload-photo');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// @desc    get all projects
// @route   GET /api/projects
// @access  Private/Admin
router.get('/projects', function(req, res) {
  res.header('Content-Type', 'application/json');
  res.sendFile(path.resolve(__dirname, '../data/projects.json'));
});

// @desc    get a project
// @route   GET /api/projects/:id
// @access  Private/Admin
router.get('/projects/:id', function(req, res) {
  let data = '[]';
  const id = req.params.id || 0;

  try {
    data = fs.readFileSync(
      path.resolve(__dirname, '../data/projects.json'),
      'utf-8'
    );
  } catch (e) {
    console.log(e);
  }

  const projects = JSON.parse(data);
  const project = projects.filter(p => p.id === id);

  res.json(project);
});

// @desc    create a project
// @route   POST /api/upload
// @access  Private/Admin

// upload.fields([{name: 'projectThumbnail'}, {name: 'projectLogo'}]),
router.post('/upload', function(req, res) {
  let project = req.body;
  // project.modules.projectThumbnail = req.files['projectThumbnail'][0].location
  // project.modules.logo = req.files['projectLogo'][0].location

  project.id = uuid.v4();

  // get path
  const myPath = path.join(__dirname, '..', 'data', 'projects.json');

  // read file
  fs.readFile(myPath, 'utf8', (err, data) => {
    const parsedData = JSON.parse(data);
    parsedData.push(project);

    fs.writeFile(myPath, JSON.stringify(parsedData), err => {
      if (err) throw err;
      console.log('Successfully updated!');
      res.json({
        succes: true,
        project,
      });
    });
  });
});

module.exports = router;

