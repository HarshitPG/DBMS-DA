const Ticket = require("../models/ticket");
const Event = require("../models/event");

exports.purchaseTicket = async (req, res) => {
  const { event_name, ticket_type, quantity } = req.body;
  const user_id = req.userId;
  try {
    const event = await Event.findOne({ name: event_name });
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.available_tickets < quantity)
      return res.status(400).json({ message: "Not enough tickets available" });

    const total_price = event.ticket_price * quantity;
    const ticket = new Ticket({
      event_id: event._id,
      event_name,
      user_id,
      ticket_type,
      quantity,
      total_price,
    });
    await ticket.save();

    event.available_tickets -= quantity;
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
