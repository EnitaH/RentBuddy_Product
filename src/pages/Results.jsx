import { ArrowLeft, MapPin, Star, BedSingle, Sofa } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/results.css";

export default function Results() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const filters = state || {
        searchTerm: "",
        minPrice: 400,
        maxPrice: 1200,
        location: "Aberdeenshire",
        distanceFrom: [],
        rating: "Any",
        billsIncluded: false,
        propertyType: [],
        furnished: "Any",
    };

    const properties = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    price: 750,
    rating: 4.5,
    reviews: 12,
    address: "25 King Street, Aberdeen AB24 5RU",
    location: "Aberdeenshire",
    nearbyTo: ["City Centre"],
    type: "Studio",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    deposit: 750,
    councilTax: 95,
    moveIn: "Available now",
    landlord: "Trusted Landlord",
    landlordRating: 4.7,
    pros: [
      "Perfect for students",
      "Bills included in rent",
      "Modern appliances",
      "Good Wi-Fi connection",
      "Close to city centre",
    ],
    cons: [
      "Limited storage space",
      "Can get noisy on weekends",
      "No parking available",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 5,
    text: "Perfect studio for a student. Everything was clean, modern, and easy to manage. Bills being included made budgeting much easier.",
    time: "1 hr. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Great little place and the location is very convenient. It can feel a bit small when studying at home all day, but overall I was happy here.",
    time: "8 hrs. ago",
  },
  {
    id: 3,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Nice modern finish and the kitchen appliances worked well. Good option if you want something central and straightforward.",
    time: "1 day ago",
  },
],
  },
  {
    id: 2,
    title: "Spacious 2-Bed Flatshare",
    price: 550,
    rating: 4.2,
    reviews: 8,
    address: "14 Shiprow, Aberdeen AB11 5BY",
    location: "Aberdeenshire",
    nearbyTo: ["Aberdeen University"],
    type: "Flatshare",
    furnished: "Furnished",
    bills: false,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    deposit: 625,
    councilTax: 110,
    moveIn: "From next month",
    landlord: "Responsive Owner",
    landlordRating: 4.0,
    pros: [
      "Large shared living area",
      "Spacious bedrooms",
      "Friendly flatmates",
      "Good natural light",
      "Close to university",
    ],
    cons: [
      "Bills not included",
      "Street parking can be inconvenient",
      "Limited storage space during term",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "The room was bigger than I expected and the shared living room was actually useful. Flatmates were friendly and respectful.",
    time: "3 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Good choice if you do not mind sharing. The space is bright and the landlord sorted maintenance issues fairly quickly.",
    time: "11 hrs. ago",
  },
],
  },
  {
    id: 3,
    title: "Cosy One-Bedroom Flat",
    price: 850,
    rating: 4.8,
    reviews: 15,
    address: "102 Union Street, Aberdeen AB10 1AA",
    location: "Aberdeenshire",
    nearbyTo: ["City Centre"],
    type: "One-Bed",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    deposit: 975,
    councilTax: 0,
    moveIn: "Available now",
    landlord: "Top Rated Host",
    landlordRating: 4.8,
    pros: [
      "Excellent city-centre location",
      "Very modern interior",
      "Bills included",
      "Quiet building",
      "High review score",
    ],
    cons: [
      "Smaller kitchen",
      "No private parking",
      "Rent is on the higher side",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 5,
    text: "Loved living here. It felt private, secure, and very comfortable. The flat was exactly like the photos and in excellent condition.",
    time: "2 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Really nice one-bed with a modern feel. Slightly pricey, but the quality of the flat makes up for it.",
    time: "10 hrs. ago",
  },
  {
    id: 3,
    name: "Anonymous Tenant",
    rating: 5,
    text: "Quiet building, great location, and everything worked properly from day one. I would definitely rent this place again.",
    time: "2 days ago",
  },
],
  },
  {
    id: 4,
    title: "Student Studio Near Campus",
    price: 680,
    rating: 4.0,
    reviews: 6,
    address: "8 Garthdee Road, Aberdeen AB10 7QE",
    location: "Aberdeenshire",
    nearbyTo: ["Robert Gordon University"],
    type: "Studio",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    deposit: 680,
    councilTax: 0,
    moveIn: "Available in 2 weeks",
    landlord: "Student Lettings Co.",
    landlordRating: 4.1,
    pros: [
      "Very close to RGU",
      "Bills included",
      "Compact and easy to maintain",
      "Secure entry system",
      "Good choice for first-year students",
    ],
    cons: [
      "Limited floor space",
      "Small kitchen area",
      "Can feel warm in summer",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Very handy for RGU. I could walk to campus in a few minutes and never had to worry about separate utility bills.",
    time: "4 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "A good first student flat. Small, but practical and easy to keep tidy. The secure entry was reassuring too.",
    time: "1 day ago",
  },
],
  },
  {
    id: 5,
    title: "Shared House in Rosemount",
    price: 480,
    rating: 3.9,
    reviews: 10,
    address: "45 Rosemount Place, Aberdeen AB25 2XJ",
    location: "Aberdeenshire",
    nearbyTo: ["Aberdeen University"],
    type: "Flatshare",
    furnished: "Unfurnished",
    bills: false,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    deposit: 575,
    councilTax: 85,
    moveIn: "Available now",
    landlord: "Local Agency",
    landlordRating: 3.9,
    pros: [
      "Very affordable",
      "Large bedrooms",
      "Good transport links",
      "Quiet residential area",
      "Near local shops",
    ],
    cons: [
      "Unfurnished",
      "Further from campus",
      "Older interior style",
      "Shared bathroom",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Affordable and in a quiet area. The house is older, but it has plenty of space and decent transport links.",
    time: "6 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 3,
    text: "Good value overall, though you can tell the property is a bit dated. Best suited to someone who wants lower rent over fancy interiors.",
    time: "1 day ago",
  },
],
  },
  {
    id: 6,
    title: "Luxury City Centre Apartment",
    price: 1200,
    rating: 4.9,
    reviews: 20,
    address: "The Links, Aberdeen AB24 5EN",
    location: "Aberdeenshire",
    nearbyTo: ["City Centre"],
    type: "One-Bed",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    deposit: 1800,
    councilTax: 140,
    moveIn: "Available next week",
    landlord: "Premium Lets",
    landlordRating: 4.9,
    pros: [
      "Beautiful modern design",
      "Prime city-centre location",
      "Bills included",
      "Excellent landlord response",
      "High-end furniture and fittings",
    ],
    cons: [
      "Highest monthly cost",
      "Limited availability",
      "Less suited to tight student budgets",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 5,
    text: "Beautiful apartment with a premium feel throughout. The furnishings were excellent and the city-centre location was unbeatable.",
    time: "2 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 5,
    text: "Probably the nicest rental I have stayed in. Everything felt high quality and the landlord was professional from start to finish.",
    time: "9 hrs. ago",
  },
  {
    id: 3,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Really impressive property, just expensive. If your budget allows it, it is one of the better options around.",
    time: "2 days ago",
  },
],
  },
  {
    id: 7,
    title: "Budget Student Flatshare",
    price: 420,
    rating: 3.5,
    reviews: 9,
    address: "79 Holburn Street, Aberdeen AB10 6BR",
    location: "Aberdeenshire",
    nearbyTo: ["Robert Gordon University", "City Centre"],
    type: "Flatshare",
    furnished: "Furnished",
    bills: false,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    deposit: 450,
    councilTax: 70,
    moveIn: "Available now",
    landlord: "Budget Rooms Ltd",
    landlordRating: 3.6,
    pros: [
      "Very affordable rent",
      "Good bus links",
      "Furnished rooms",
      "Close to supermarkets",
      "Suitable for students on a budget",
    ],
    cons: [
      "Bills not included",
      "Basic interior finish",
      "Lower review score than alternatives",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 3,
    text: "Very affordable and practical for student life. It is not fancy, but it did the job and helped me keep costs down.",
    time: "5 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Good if you need something cheap near transport links. Shared areas were basic but usable.",
    time: "1 day ago",
  },
],
  },
  {
    id: 8,
    title: "Quiet One-Bed Near NESCO",
    price: 890,
    rating: 4.4,
    reviews: 11,
    address: "18 Riverside Drive, Aberdeen AB12 3LT",
    location: "Aberdeenshire",
    nearbyTo: ["NESCO"],
    type: "One-Bed",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
    deposit: 950,
    councilTax: 0,
    moveIn: "Available in 1 week",
    landlord: "Professional Lets",
    landlordRating: 4.4,
    pros: [
      "Very quiet area",
      "Bills included",
      "Ideal for professionals",
      "Well-maintained kitchen",
      "Good privacy",
    ],
    cons: [
      "Further from city centre",
      "Less nightlife nearby",
      "Smaller bedroom than some alternatives",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Very peaceful area and ideal if you want somewhere calmer after work. The flat felt well looked after and private.",
    time: "7 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 5,
    text: "I really liked living here. It is not the most central, but the quiet surroundings and included bills made it worth it.",
    time: "1 day ago",
  },
],
  },
  {
    id: 9,
    title: "Compact Studio in Dundee",
    price: 610,
    rating: 4.1,
    reviews: 7,
    address: "12 Reform Street, Dundee DD1 1UG",
    location: "Dundee",
    nearbyTo: ["City Centre"],
    type: "Studio",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    deposit: 610,
    councilTax: 0,
    moveIn: "Available now",
    landlord: "Dundee Student Homes",
    landlordRating: 4.2,
    pros: [
      "Central Dundee location",
      "Bills included",
      "Compact but practical layout",
      "Good for solo tenants",
      "Close to shops and transport",
    ],
    cons: [
      "Limited space",
      "Not suitable for couples",
      "Smaller kitchen area",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Small but very functional. Good central location in Dundee and everything I needed was within walking distance.",
    time: "3 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Worked well as a solo rental. Best for someone who values convenience over space.",
    time: "15 hrs. ago",
  },
],
  },
  {
    id: 10,
    title: "Modern Edinburgh Flatshare",
    price: 980,
    rating: 4.7,
    reviews: 18,
    address: "40 Leith Walk, Edinburgh EH6 5BR",
    location: "Edinburgh",
    nearbyTo: ["City Centre"],
    type: "Flatshare",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=900&q=80",
    deposit: 1100,
    councilTax: 0,
    moveIn: "From next month",
    landlord: "Capital Rentals",
    landlordRating: 4.7,
    pros: [
      "Stylish modern interior",
      "Excellent transport links",
      "Bills included",
      "Popular area",
      "Great shared kitchen",
    ],
    cons: [
      "Higher price",
      "Busy area at weekends",
      "Shared living space may not suit everyone",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 5,
    text: "Excellent location and a really stylish flatshare. The common spaces were much nicer than most shared rentals I viewed.",
    time: "2 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Leith Walk is a great area and transport was easy. It is a busier neighbourhood, but that was part of the appeal for me.",
    time: "13 hrs. ago",
  },
],
  },
  {
    id: 11,
    title: "Aberdeen Studio with Bills",
    price: 700,
    rating: 4.3,
    reviews: 13,
    address: "30 George Street, Aberdeen AB25 1HJ",
    location: "Aberdeen City",
    nearbyTo: ["City Centre", "Aberdeen University"],
    type: "Studio",
    furnished: "Furnished",
    bills: true,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    deposit: 700,
    councilTax: 0,
    moveIn: "Available now",
    landlord: "City Stay Aberdeen",
    landlordRating: 4.3,
    pros: [
      "Bills included",
      "Close to university and centre",
      "Simple modern design",
      "Easy to maintain",
      "Good mid-range option",
    ],
    cons: [
      "Smaller bathroom",
      "Limited built-in storage",
      "Can feel compact for long-term stays",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Solid mid-range studio. Bills included was a big advantage and the location worked well for both uni and town.",
    time: "4 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Clean, straightforward, and easy to live in. Not huge, but very manageable for one person.",
    time: "1 day ago",
  },
],
  },
  {
    id: 12,
    title: "Unfurnished One-Bed Retreat",
    price: 760,
    rating: 3.8,
    reviews: 5,
    address: "9 Willowbank Road, Aberdeen AB11 6XS",
    location: "Aberdeenshire",
    nearbyTo: ["NESCO"],
    type: "One-Bed",
    furnished: "Unfurnished",
    bills: false,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    deposit: 760,
    councilTax: 90,
    moveIn: "Available in 3 weeks",
    landlord: "Independent Owner",
    landlordRating: 3.8,
    pros: [
      "Good space for the price",
      "Quiet neighbourhood",
      "Lets you furnish to your own taste",
      "Suitable for long-term tenants",
      "Near work areas",
    ],
    cons: [
      "Unfurnished",
      "Bills not included",
      "Lower rating than some alternatives",
    ],
    tenantReviews: [
  {
    id: 1,
    name: "Anonymous Tenant",
    rating: 4,
    text: "Good option if you already have your own furniture. The area was quiet and the space felt more personal once set up properly.",
    time: "8 hrs. ago",
  },
  {
    id: 2,
    name: "Anonymous Tenant",
    rating: 3,
    text: "Decent size and peaceful, but you do need to budget for extra costs since bills are not included.",
    time: "2 days ago",
  },
],
  },
];

    function getMinimumRating(ratingValue) {
        if (ratingValue === "3+") return 3;
        if (ratingValue === "4+") return 4;
        if (ratingValue === "5+") return 5;
        return 0;
    }

    const minimumRating = getMinimumRating(filters.rating);

    const filteredProperties = properties.filter((property) => {
        const normalizedSearch = filters.searchTerm.trim().toLowerCase();

        const matchesSearch =
            normalizedSearch === "" ||
            property.title.toLowerCase().includes(normalizedSearch) ||
            property.address.toLowerCase().includes(normalizedSearch) ||
            property.location.toLowerCase().includes(normalizedSearch) ||
            property.nearbyTo.some((place) =>
                place.toLowerCase().includes(normalizedSearch)
            );
        const matchesPrice =
            property.price >= filters.minPrice && property.price <= filters.maxPrice;

        const matchesLocation =
            !filters.location || property.location === filters.location;

        const matchesDistance =
            !filters.distanceFrom ||
            filters.distanceFrom.length === 0 ||
            filters.distanceFrom.some((place) => property.nearbyTo.includes(place));

        const matchesRating = property.rating >= minimumRating;

        const matchesBills = !filters.billsIncluded || property.bills === true;

        const matchesPropertyType =
            !filters.propertyType ||
            filters.propertyType.length === 0 ||
            filters.propertyType.includes(property.type);

        const matchesFurnished =
            filters.furnished === "Any" ||
            (filters.furnished === "Yes" &&
                (property.furnished === "Yes" || property.furnished === "Furnished")) ||
            (filters.furnished === "No" &&
                (property.furnished === "No" || property.furnished === "Unfurnished"));

        return (
            matchesSearch &&
            matchesPrice &&
            matchesLocation &&
            matchesDistance &&
            matchesRating &&
            matchesBills &&
            matchesPropertyType &&
            matchesFurnished
        );
    });

    return (
        <div className="page-container results-page">
            <header className="results-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                    Back
                </button>
                <Logo />
            </header>

            {filters.searchTerm && (
                <p className="results-summary">
                    Results for "<strong>{filters.searchTerm}</strong>"
                </p>
            )}

            <div className="results-list">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        <div className="property-card" key={property.id} onClick={() => navigate(`/property/${property.id}`, { state: { property } })}>
                            <div className="property-image">
                                <img src={property.image} alt={property.title} />
                                {property.bills && <span className="badge">Bills Inc.</span>}
                            </div>

                            <div className="property-info">
                                <div className="top-row">
                                    <h3>{property.title}</h3>
                                    <div className="price">
                                        <span>£{property.price}</span>
                                        <small>/month</small>
                                    </div>
                                </div>

                                <div className="meta">
                                    <MapPin size={13} />
                                    <span>{property.address}</span>
                                </div>

                                <div className="distance-text">
                                    {property.nearbyTo.join(" • ")}
                                </div>

                                <div className="rating">
                                    <Star size={13} fill="currentColor" />
                                    <span>
                                        {property.rating} ({property.reviews} reviews)
                                    </span>
                                </div>

                                <div className="tags">
                                    <span className="tag">
                                        <BedSingle size={12} />
                                        {property.type}
                                    </span>
                                    <span className="tag">
                                        <Sofa size={12} />
                                        {property.furnished === "Yes"
                                            ? "Furnished"
                                            : property.furnished === "No"
                                                ? "Unfurnished"
                                                : property.furnished}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results-card">
                        <h3>No properties found</h3>
                        <p>Try widening your price range or removing some filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}