const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  const templateData = { projects }
  res.render('index', templateData);
});

app.get('/project/:id', (req, res, next) => {
  const { id } = req.params;

  if (id > projects.length || isNaN(id)) {
    return next();
  }

  const project = projects[id];
  const projectName = project.project_name;
  const description = project.description;
  const technologies = project.technologies;
  const liveLink = project.live_link;
  const githubLink = project.github_link;
  const imageUrls = project.image_urls;

  const templateData = { projectName, description, technologies, liveLink, githubLink, imageUrls }

  res.render('project', templateData);


});

app.get('/about', (req, res) => {
  res.render('about');
});




app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error')
})

let port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});