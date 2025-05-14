// This is a simple test file for MongoDB v0 code generation
// It represents a sample response structure that the Gemini AI would generate

export const sampleGeneratedCode = {
  "repositoryName": "task-manager-mongodb",
  "files": [
    {
      "path": "README.md",
      "content": "# Task Manager API\n\nA simple task management API built with Express and MongoDB.\n\n## Setup\n\n1. Clone this repository\n2. Install dependencies: `npm install`\n3. Create a `.env` file with your MongoDB connection string:\n\n```\nMONGODB_URI=your_mongodb_connection_string_here\nPORT=3000\n```\n\n4. Run the application: `npm start`\n\n## API Endpoints\n\n- GET /tasks - List all tasks\n- POST /tasks - Create a new task\n- GET /tasks/:id - Get a task by ID\n- PATCH /tasks/:id - Update a task\n- DELETE /tasks/:id - Delete a task\n\n## Deployment\n\nThis application can be deployed on any platform that supports Node.js."
    },
    {
      "path": "package.json",
      "content": "{\n  \"name\": \"task-manager-mongodb\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Task Manager API with MongoDB\",\n  \"main\": \"src/index.js\",\n  \"scripts\": {\n    \"start\": \"node src/index.js\",\n    \"dev\": \"nodemon src/index.js\"\n  },\n  \"dependencies\": {\n    \"cors\": \"^2.8.5\",\n    \"dotenv\": \"^16.0.3\",\n    \"express\": \"^4.18.2\",\n    \"mongodb\": \"^5.0.1\",\n    \"mongoose\": \"^7.0.0\"\n  },\n  \"devDependencies\": {\n    \"nodemon\": \"^2.0.20\"\n  }\n}"
    },
    {
      "path": ".env.example",
      "content": "MONGODB_URI=your_mongodb_connection_string_here\nPORT=3000"
    },
    {
      "path": "src/index.js",
      "content": "const express = require('express');\nconst cors = require('cors');\nrequire('dotenv').config();\nconst { connectDB } = require('./db/mongoose');\nconst taskRouter = require('./routes/task');\n\n// Initialize express app\nconst app = express();\nconst port = process.env.PORT || 3000;\n\n// Middleware\napp.use(cors());\napp.use(express.json());\n\n// Routes\napp.use('/tasks', taskRouter);\n\n// Connect to database and start server\nconnectDB()\n  .then(() => {\n    app.listen(port, () => {\n      console.log(`Server is running on port ${port}`);\n    });\n  })\n  .catch((err) => {\n    console.error('Failed to connect to MongoDB:', err);\n    process.exit(1);\n  });"
    },
    {
      "path": "src/db/mongoose.js",
      "content": "const mongoose = require('mongoose');\n\n// MongoDB connection function\nasync function connectDB() {\n  try {\n    await mongoose.connect(process.env.MONGODB_URI, {\n      useNewUrlParser: true,\n      useUnifiedTopology: true,\n    });\n    console.log('Connected to MongoDB');\n  } catch (error) {\n    console.error('Error connecting to MongoDB:', error.message);\n    throw error;\n  }\n}\n\nmodule.exports = { connectDB };"
    },
    {
      "path": "src/models/task.js",
      "content": "const mongoose = require('mongoose');\n\nconst taskSchema = new mongoose.Schema({\n  title: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  description: {\n    type: String,\n    trim: true\n  },\n  completed: {\n    type: Boolean,\n    default: false\n  }\n}, {\n  timestamps: true\n});\n\nconst Task = mongoose.model('Task', taskSchema);\n\nmodule.exports = Task;"
    },
    {
      "path": "src/routes/task.js",
      "content": "const express = require('express');\nconst Task = require('../models/task');\nconst router = express.Router();\n\n// Create a new task\nrouter.post('/', async (req, res) => {\n  try {\n    const task = new Task(req.body);\n    await task.save();\n    res.status(201).send(task);\n  } catch (error) {\n    res.status(400).send(error);\n  }\n});\n\n// Get all tasks\nrouter.get('/', async (req, res) => {\n  try {\n    const tasks = await Task.find({});\n    res.send(tasks);\n  } catch (error) {\n    res.status(500).send(error);\n  }\n});\n\n// Get a specific task by id\nrouter.get('/:id', async (req, res) => {\n  try {\n    const task = await Task.findById(req.params.id);\n    if (!task) {\n      return res.status(404).send();\n    }\n    res.send(task);\n  } catch (error) {\n    res.status(500).send(error);\n  }\n});\n\n// Update a task\nrouter.patch('/:id', async (req, res) => {\n  const updates = Object.keys(req.body);\n  const allowedUpdates = ['title', 'description', 'completed'];\n  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));\n\n  if (!isValidOperation) {\n    return res.status(400).send({ error: 'Invalid updates!' });\n  }\n\n  try {\n    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });\n    if (!task) {\n      return res.status(404).send();\n    }\n    res.send(task);\n  } catch (error) {\n    res.status(400).send(error);\n  }\n});\n\n// Delete a task\nrouter.delete('/:id', async (req, res) => {\n  try {\n    const task = await Task.findByIdAndDelete(req.params.id);\n    if (!task) {\n      return res.status(404).send();\n    }\n    res.send(task);\n  } catch (error) {\n    res.status(500).send(error);\n  }\n});\n\nmodule.exports = router;"
    }
  ]
};
