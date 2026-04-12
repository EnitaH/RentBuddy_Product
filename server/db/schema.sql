CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT DEFAULT 'Birmingham',
  member_since TEXT DEFAULT 'Jan 2026',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  rating REAL DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  address TEXT NOT NULL,
  location TEXT NOT NULL,
  nearby_to TEXT NOT NULL,
  type TEXT NOT NULL,
  furnished TEXT NOT NULL,
  bills INTEGER DEFAULT 0,
  image TEXT,
  deposit INTEGER DEFAULT 0,
  council_tax INTEGER DEFAULT 0,
  move_in TEXT,
  landlord TEXT,
  landlord_rating REAL DEFAULT 0,
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  tenant_reviews TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  user_id INTEGER,
  reviewer_name TEXT NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  landlord_communication INTEGER NOT NULL CHECK (landlord_communication BETWEEN 1 AND 5),
  maintenance_speed INTEGER NOT NULL CHECK (maintenance_speed BETWEEN 1 AND 5),
  cleanliness INTEGER NOT NULL CHECK (cleanliness BETWEEN 1 AND 5),
  safety INTEGER NOT NULL CHECK (safety BETWEEN 1 AND 5),
  value_for_money INTEGER NOT NULL CHECK (value_for_money BETWEEN 1 AND 5),
  monthly_bills TEXT DEFAULT '',
  hidden_costs INTEGER DEFAULT 0,
  review_text TEXT NOT NULL,
  would_rent_again INTEGER DEFAULT 1,
  is_anonymous INTEGER DEFAULT 1,
  review_photos TEXT DEFAULT '[]',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS saved_properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  property_id INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id),
  UNIQUE(user_id, property_id)
);
CREATE TABLE IF NOT EXISTS property_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  user_id INTEGER,
  landlord_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'sent',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);