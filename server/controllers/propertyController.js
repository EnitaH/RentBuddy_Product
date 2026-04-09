const db = require('../db/database');

function formatReviewDate(input) {
  if (!input) return 'Recent';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return 'Recent';
  return date.toLocaleString('en-GB', { month: 'short', year: 'numeric' });
}

function mapReview(row) {
  return {
    id: row.id,
    name: row.reviewer_name,
    rating: row.overall_rating,
    date: formatReviewDate(row.created_at),
    text: row.review_text,
    billsNote: row.monthly_bills ? `£${row.monthly_bills}/month` : 'Included',
    wouldRentAgain: Boolean(row.would_rent_again),
    hiddenCosts: row.hidden_costs
      ? 'Reviewer reported additional hidden costs.'
      : '',
    categoryRatings: {
      landlordCommunication: row.landlord_communication,
      maintenanceSpeed: row.maintenance_speed,
      cleanliness: row.cleanliness,
      safety: row.safety,
      valueForMoney: row.value_for_money,
    },
  };
}

function mapProperty(row, reviewRows = null) {
  return {
    ...row,
    bills: Boolean(row.bills),
    nearbyTo: JSON.parse(row.nearby_to || '[]'),
    pros: JSON.parse(row.pros || '[]'),
    cons: JSON.parse(row.cons || '[]'),
    tenantReviews: reviewRows
      ? reviewRows.map(mapReview)
      : JSON.parse(row.tenant_reviews || '[]'),
    reviews: row.reviews_count,
    councilTax: row.council_tax,
    moveIn: row.move_in,
    landlordRating: row.landlord_rating,
  };
}

function getAllProperties(req, res) {
  try {
    const rows = db.prepare('SELECT * FROM properties ORDER BY id ASC').all();
    const properties = rows.map((row) => mapProperty(row));
    return res.json(properties);
  } catch (error) {
    console.error('Get properties error:', error);
    return res.status(500).json({ message: 'Failed to fetch properties.' });
  }
}

function getPropertyById(req, res) {
  try {
    const row = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id);

    if (!row) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    const reviewRows = db
      .prepare(
        `SELECT *
         FROM reviews
         WHERE property_id = ?
         ORDER BY datetime(created_at) DESC, id DESC`
      )
      .all(req.params.id);

    return res.json(mapProperty(row, reviewRows));
  } catch (error) {
    console.error('Get property by id error:', error);
    return res.status(500).json({ message: 'Failed to fetch property.' });
  }
}

module.exports = {
  getAllProperties,
  getPropertyById,
};