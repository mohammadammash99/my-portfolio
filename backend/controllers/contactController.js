const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    const contact = await Contact.create({ name, email, service, message });
    res.status(201).json({ success: true, data: contact });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};