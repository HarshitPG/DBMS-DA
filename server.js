const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./db/dbConnection.js");
const Event = require("./models/event");
const Ticket = require("./models/ticket");

// Load environment variables
dotenv.config();

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Change Streams for monitoring database changes
// Watching event changes
const eventChangeStream = Event.watch();
eventChangeStream.on("change", (change) => {
  console.log("Event Change Detected:", change);
  // Handle the change event (e.g., send notifications or update availability)
});

// Watching ticket changes
const ticketChangeStream = Ticket.watch();
ticketChangeStream.on("change", (change) => {
  console.log("Ticket Change Detected:", change);
  // Handle the change event (e.g., notify user about successful purchase)
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
