import mongoose from "mongoose";

const tasks = [
  {
    name: "Review API documentation",
    description: "Check and update Swagger definitions for new endpoints",
    priority: "priority 2",
    deadline: new Date("2025-11-20"),
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a001"),
    label: [
      new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b001"),
      new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b002")
    ]
  },
  {
    name: "Implement login feature",
    description: "Add authentication with JWT and bcrypt password hashing",
    priority: "priority 1",
    deadline: new Date("2025-11-15"),
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a002"),
    label: [new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b003")]
  },
  {
    name: "Design dashboard layout",
    description: "Create mockups for the main dashboard page in Figma",
    priority: "priority 3",
    deadline: new Date("2025-11-25"),
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a001"),
    label: [
      new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b004"),
      new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b005")
    ]
  },
  {
    name: "Optimize database queries",
    description: "Review Mongoose queries and add necessary indexes",
    priority: "priority 2",
    deadline: new Date("2025-12-01"),
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a003"),
    label: [
      new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b002"),
      new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b006")
    ]
  },
  {
    name: "Write unit tests for services",
    description: "Increase code coverage of user and task services",
    priority: "priority 3",
    deadline: new Date("2025-11-30"),
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a002"),
    label: [new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b007")]
  },
  {
    name: "Deploy app to Vercel",
    description: "Prepare environment variables and connect MongoDB Atlas",
    priority: "priority 1",
    deadline: new Date("2025-11-18"),
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a001"),
    label: [new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b008")]
  },
  {
    name: "Update README.md",
    description: "Add setup instructions and example .env configuration",
    priority: "priority 4",
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a003"),
    label: [new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b001")]
  },
  {
    name: "Create labels seed",
    description: "Generate initial labels for project categories",
    priority: "priority 4",
    user: new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1a002"),
    label: [new mongoose.Types.ObjectId("64f9a7c2f1d3e3b8a0e1b009")]
  }
];

export default tasks;
