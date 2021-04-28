const router = require('express').Router();
const upload = require('../middlewares/upload-photo');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const projects = require('../data/projects.json');

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
  const id = parseInt(req.params.id || 0);

  try {
    data = fs.readFileSync(
      path.resolve(__dirname, '../data/projects.json'),
      'utf-8'
    );
  } catch (e) {
    console.log(e);
  }

  const project = projects.filter(project => project.id === id);
  res.json(project);
});

// @description    Update a product
// @route          PUT /api/products/:id
// @access         Private/Admin

router.put('/products/:id', function(req, res) {
  let newData = req.body;
  let data = '[]';
  const id = parseInt(req.params.id || 0);

  try {
    data = fs.readFileSync(
      path.resolve(__dirname, '../data/projects.json'),
      'utf-8'
    );
  } catch (e) {
    console.log(e);
  }

  const projects = JSON.parse(data);

  for (let i = 0; i < projects.length; i++) {
    if (id === projects[i].id) {
      projects[i].modules = [];
      projects[i].modules.push(newData);
    }
  }
})

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

// Test Create Project
router.post('/test', function(req, res) {
  const project = req.body;
  const fileName = project.fileName;

  const dir = `../work/${fileName}`;

  !fs.existsSync(dir) && fs.mkdirSync(dir);

  // const myPath = path.join(__dirname, '..', 'work', `${fileName}`, `${fileName}.json`);
  const myPath = `../work/${fileName}/${fileName}.json`;

  fs.writeFile(myPath, JSON.stringify(project), err => {
    if (err) throw err;
    console.log('Successfully updated!');
    res.json({
      success: true,
      project,
    });
  });
})

// Test get all project
// router.get('/test', function(req, res) {
//   res.header('Content-Type', 'application/json');
//   res.sendFile(path.resolve(__dirname, '../data/projects.json'));

// });

// Test a single project
router.get('/test/:id', function(req, res) {
  const id = req.params.id || '';

  res.header('Content-Type', 'application/json');
  res.sendFile(path.resolve(__dirname, `../data/${id}.json`));
});

module.exports = router;

