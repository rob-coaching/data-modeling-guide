const mongoose = require('mongoose')
const Project = require('./Project.model')
const Employee = require('./Employee.model')
const ProjectEmployee = require('./ProjectEmployee')

const strConn = "mongodb://localhost/relationship-demo-db"
mongoose.connect(strConn)
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))

// insert some related data
const seed = async () => {

  // cleanup DB collections before seeding
  ProjectEmployee.deleteMany({})
  Project.deleteMany({})
  Employee.deleteMany({})

  // create project
  const projectFinal = await Project.create({
    title: "The Final Project"
  })
  const projectDebug = await Project.create({
    title: "Debugging Everything",
  });
  
  // create user
  const employees = await Employee.insertMany([
    {
      firstName: "Waldo",
      lastName: "Emerson",
      salary: 25000,
    },
    {
      firstName: "Philipp",
      lastName: "Mueller",
      salary: 55000,
    },
    {
      firstName: "Sandra",
      lastName: "Schwarz",
      salary: 125000,
    },
  ]);


  // create relations between projects and employees by mapping
  const projectEmployees = await ProjectEmployee.insertMany([
    {
      project: projectDebug,
      employee: employees[0]
    },
    {
      project: projectFinal,
      employee: employees[1]
    },
    {
      project: projectFinal,
      employee: employees[2]
    }
  ])

  // Related data
  console.log("Relations:")
  console.log(projectEmployees)

  mongoose.connection.close()
}

seed()

