const db = require("../db/database");

function formatInquiry(row) {
  return {
    id: row.id,
    propertyId: row.property_id,
    userId: row.user_id,
    landlordName: row.landlord_name,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function createInquiry(req, res) {
  try {
    const {
      propertyId,
      userId = null,
      landlordName,
      fullName,
      email,
      phone = "",
      message,
    } = req.body;

    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required." });
    }

    const property = db
      .prepare("SELECT id, landlord, title FROM properties WHERE id = ?")
      .get(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    if (!fullName || !String(fullName).trim()) {
      return res.status(400).json({ message: "Full name is required." });
    }

    if (!email || !String(email).trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ message: "Message is required." });
    }

    if (String(message).trim().length < 10) {
      return res.status(400).json({
        message: "Message must be at least 10 characters long.",
      });
    }

    const result = db
      .prepare(
        `INSERT INTO property_inquiries (
          property_id,
          user_id,
          landlord_name,
          full_name,
          email,
          phone,
          message,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        Number(propertyId),
        userId || null,
        String(landlordName || property.landlord || "Property Manager").trim(),
        String(fullName).trim(),
        String(email).trim(),
        String(phone || "").trim(),
        String(message).trim(),
        "sent"
      );

    const inserted = db
      .prepare("SELECT * FROM property_inquiries WHERE id = ?")
      .get(result.lastInsertRowid);

    return res.status(201).json({
      message: "Inquiry sent successfully.",
      inquiry: formatInquiry(inserted),
    });
  } catch (error) {
    console.error("Create inquiry error:", error);
    return res.status(500).json({ message: "Failed to send inquiry." });
  }
}

function getInquiriesByUser(req, res) {
  try {
    const userId = Number(req.params.userId);

    const rows = db
      .prepare(
        `SELECT pi.*
         FROM property_inquiries pi
         WHERE pi.user_id = ?
         ORDER BY datetime(pi.created_at) DESC, pi.id DESC`
      )
      .all(userId);

    return res.json(rows.map(formatInquiry));
  } catch (error) {
    console.error("Get inquiries by user error:", error);
    return res.status(500).json({ message: "Failed to fetch inquiries." });
  }
}

function getInquiriesByProperty(req, res) {
  try {
    const propertyId = Number(req.params.propertyId);

    const rows = db
      .prepare(
        `SELECT pi.*
         FROM property_inquiries pi
         WHERE pi.property_id = ?
         ORDER BY datetime(pi.created_at) DESC, pi.id DESC`
      )
      .all(propertyId);

    return res.json(rows.map(formatInquiry));
  } catch (error) {
    console.error("Get inquiries by property error:", error);
    return res.status(500).json({ message: "Failed to fetch property inquiries." });
  }
}

module.exports = {
  createInquiry,
  getInquiriesByUser,
  getInquiriesByProperty,
};