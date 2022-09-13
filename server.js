const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expressServer = express()
expressServer.use(express.static(__dirname + '/app'))
expressServer.get('/', function (request, response) {
  response.sendFile(__dirname + '/app/index.html')
})
const JSONParser = express.json({ type: 'application/json' })

mongoose.connect(
  //atlas mongodb
  'mongodb+srv://user12345:12345@cluster1.mgmwwie.mongodb.net/myTasks_react',
  //'mongodb://localhost:27017/tasksdb',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log(err)
    else if (mongoose.connection.readyState === 1)
      console.log('Mongoose connection established')
    expressServer.listen(process.env.PORT || 3000, function () {
      console.log(`The server is up at PORT ${process.env.PORT || 3000}`)
    })
  }
)

const tasksScheme = new Schema({
  _id: { type: String, required: true },
  column: { type: Number, required: true },
  row: { type: Number, required: true },
  text: { type: String, default: '' },
  color: { type: String, default: '#ffffff' },
})
const Task = mongoose.model('Task', tasksScheme)

const tasksTypeScheme = new Schema({
  _id: { type: String, required: true },
  column: { type: Number, required: true },
  text: { type: String },
})
const TaskType = mongoose.model('TaskType', tasksTypeScheme)

const globalVarsScheme = new Schema(
  {
    value: String,
    _id: String,
  },
  { _id: false }
)
const GlobalVar = mongoose.model('GlobalVars', globalVarsScheme)

GlobalVar.findById('bodyColor', (err, found) => {
  if (!found) {
    const bodyColor = new GlobalVar({ value: '#7f3594' })
    bodyColor._id = 'bodyColor'
    bodyColor.save()
  }
})

expressServer.post('/tasks', JSONParser, (request, response) => {
  let newTask = new Task(request.body)
  newTask._id = request.headers.id
  newTask
    .save()
    .then(() => {
      console.log(`Created task "${newTask._id}"`)
      response.send(`Server: created task "${newTask._id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.post('/tasktypes', JSONParser, (request, response) => {
  let newTaskType = new TaskType(request.body)
  newTaskType._id = request.headers.id
  newTaskType
    .save()
    .then(() => {
      console.log(`Created task type "${newTaskType._id}"`)
      response.send(`Server: created task type "${newTaskType._id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.put('/tasks', JSONParser, (request, response) => {
  Task.findByIdAndUpdate(request.headers.id.replace(/['"]+/g, ''), {
    column: request.body.column,
    row: request.body.row,
    text: request.body.text,
    color: request.body.color,
  })
    .then(() => {
      console.log(`Updated task "${request.headers.id}"`)
      response.send(`Server: updated task "${request.headers.id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.put('/tasktypes', JSONParser, (request, response) => {
  TaskType.findByIdAndUpdate(request.headers.id.replace(/['"]+/g, ''), {
    column: request.body.column,
    text: request.body.text,
  })
    .then(() => {
      console.log(`Updated task type "${request.headers.id}"`)
      response.send(`Server: updated task type "${request.headers.id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.put('/globalVars', JSONParser, (request, response) => {
  GlobalVar.findByIdAndUpdate(request.headers.id.replace(/['"]+/g, ''), {
    value: request.body.value,
  })
    .then(() => {
      console.log(`Updated global variable "${request.headers.id}"`)
      response.send(`Server: updated global variable "${request.headers.id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.delete('/tasks', (request, response) => {
  Task.findByIdAndDelete(request.headers.id.replace(/['"]+/g, ''))
    .then(() => {
      console.log(`Deleted task "${request.headers.id}"`)
      response.send(`Server: deleted task "${request.headers.id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.delete('/tasktypes', (request, response) => {
  TaskType.findByIdAndDelete(request.headers.id.replace(/['"]+/g, ''))
    .then(() => {
      console.log(`Deleted task type "${request.headers.id}"`)
      response.send(`Server: deleted task type "${request.headers.id}"`)
    })
    .catch((err) => {
      if (err) return console.log(err)
    })
})

expressServer.get('/tasks', (request, response) => {
  Task.find({}, function (err, tasks) {
    if (err) console.log(err)
    response.send(tasks)
  })
})

expressServer.get('/tasktypes', (request, response) => {
  TaskType.find({}, function (err, taskTypes) {
    if (err) console.log(err)
    response.send(taskTypes)
  })
})

expressServer.get('/globalVars', (request, response) => {
  GlobalVar.findById(
    request.headers.id.replace(/['"]+/g, ''),
    function (err, foundVar) {
      if (err) console.log(err)
      response.send(foundVar)
    }
  )
})
