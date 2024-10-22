const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  available_tickets: { type: Number, required: true },
  ticket_price: { type: Number, required: true },
});

// Create indexes on the fields for performance
eventSchema.index({ date: 1 });
eventSchema.index({ available_tickets: 1 });
eventSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Event", eventSchema);
