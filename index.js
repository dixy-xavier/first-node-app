const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

app.post('/api/courses', (req, res) => {
  const result = validateCourse(req.body);

  // if (!req.body.name || req.body.name.length < 3) {
  if (result.error) {
    // res.status(400).send('Name is required and should have minimum 3 characters');
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(item => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course of given id is not found');

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(item => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course of given id is not found');
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(item => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course of given id is not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send({ params: req.params, query: req.query });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
