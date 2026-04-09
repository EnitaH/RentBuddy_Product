const db = require('./database');
const propertiesSeed = require('./propertiesSeed');

const insert = db.prepare(`
  INSERT INTO reviews (
    property_id,
    reviewer_name,
    overall_rating,
    landlord_communication,
    maintenance_speed,
    cleanliness,
    safety,
    value_for_money,
    monthly_bills,
    hidden_costs,
    review_text,
    would_rent_again,
    is_anonymous,
    created_at
  ) VALUES (
    @property_id,
    @reviewer_name,
    @overall_rating,
    @landlord_communication,
    @maintenance_speed,
    @cleanliness,
    @safety,
    @value_for_money,
    @monthly_bills,
    @hidden_costs,
    @review_text,
    @would_rent_again,
    @is_anonymous,
    @created_at
  )
`);

const existingCount = db.prepare('SELECT COUNT(*) AS count FROM reviews').get().count;
if (existingCount > 0) {
  console.log('Reviews already exist. Skipping review seed.');
  process.exit(0);
}

const monthMap = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

function toIsoDate(label, index) {
  if (!label) return `2026-01-${String(index + 1).padStart(2, '0')} 12:00:00`;
  const [month, year] = String(label).split(' ');
  const monthNumber = monthMap[month] || '01';
  const safeYear = year || '2026';
  return `${safeYear}-${monthNumber}-${String((index % 28) + 1).padStart(2, '0')} 12:00:00`;
}

for (const property of propertiesSeed) {
  const reviews = Array.isArray(property.tenantReviews) ? property.tenantReviews : [];

  reviews.forEach((review, index) => {
    insert.run({
      property_id: property.id,
      reviewer_name: review.name || 'Anonymous Tenant',
      overall_rating: Number(review.rating) || 0,
      landlord_communication: Number(review.categoryRatings?.landlordCommunication) || 3,
      maintenance_speed: Number(review.categoryRatings?.maintenanceSpeed) || 3,
      cleanliness: Number(review.categoryRatings?.cleanliness) || 3,
      safety: Number(review.categoryRatings?.safety) || 3,
      value_for_money: Number(review.categoryRatings?.valueForMoney) || 3,
      monthly_bills: String(review.billsNote || '').replace(/[^0-9.]/g, ''),
      hidden_costs: review.hiddenCosts ? 1 : 0,
      review_text: review.text || '',
      would_rent_again: review.wouldRentAgain ? 1 : 0,
      is_anonymous: (review.name || 'Anonymous Tenant') === 'Anonymous Tenant' ? 1 : 0,
      created_at: toIsoDate(review.date, index),
    });
  });
}

console.log('Reviews seeded successfully.');