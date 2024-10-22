const Event = require("../models/event");
const Ticket = require("../models/ticket");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventPopularity = async (req, res) => {
  try {
    const popularEvents = await Ticket.aggregate([
      {
        $group: {
          _id: "$event_id",
          totalTicketsSold: { $sum: "$quantity" },
          totalRevenue: { $sum: "$total_price" },
        },
      },
      {
        $sort: { totalTicketsSold: -1 },
      },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
    ]);

    res.json(popularEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchEvents = async (req, res) => {
  try {
    const query = req.query.q;
    const events = await Event.find({ $text: { $search: query } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
