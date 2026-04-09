const db = require("./database");
const propertiesSeed = require("./propertiesSeed");

const insert = db.prepare(`
  INSERT OR REPLACE INTO properties (
    id,
    title,
    price,
    rating,
    reviews_count,
    address,
    location,
    nearby_to,
    type,
    furnished,
    bills,
    image,
    deposit,
    council_tax,
    move_in,
    landlord,
    landlord_rating,
    pros,
    cons,
    tenant_reviews
  ) VALUES (
    @id,
    @title,
    @price,
    @rating,
    @reviews_count,
    @address,
    @location,
    @nearby_to,
    @type,
    @furnished,
    @bills,
    @image,
    @deposit,
    @council_tax,
    @move_in,
    @landlord,
    @landlord_rating,
    @pros,
    @cons,
    @tenant_reviews
  )
`);

for (const property of propertiesSeed) {
  insert.run({
    id: property.id,
    title: property.title,
    price: property.price,
    rating: property.rating,
    reviews_count: property.reviews,
    address: property.address,
    location: property.location,
    nearby_to: JSON.stringify(property.nearbyTo || []),
    type: property.type,
    furnished: property.furnished,
    bills: property.bills ? 1 : 0,
    image: property.image,
    deposit: property.deposit || 0,
    council_tax: property.councilTax || 0,
    move_in: property.moveIn || "",
    landlord: property.landlord || "",
    landlord_rating: property.landlordRating || 0,
    pros: JSON.stringify(property.pros || []),
    cons: JSON.stringify(property.cons || []),
    tenant_reviews: JSON.stringify(property.tenantReviews || []),
  });
}

console.log("Properties seeded successfully.");