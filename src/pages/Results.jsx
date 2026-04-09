import { ArrowLeft, MapPin, Star, BedSingle, Sofa } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/results.css";
import { useEffect, useMemo, useState } from "react";
import { getProperties } from "../utils/propertyStore";

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

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties:", error);
        setErrorMessage("Unable to load properties right now.");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  function getMinimumRating(ratingValue) {
    if (ratingValue === "3+") return 3;
    if (ratingValue === "4+") return 4;
    if (ratingValue === "5+") return 5;
    return 0;
  }

  const minimumRating = getMinimumRating(filters.rating);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const normalizedSearch = filters.searchTerm.trim().toLowerCase();

      const nearbyPlaces = Array.isArray(property.nearbyTo) ? property.nearbyTo : [];

      const matchesSearch =
        normalizedSearch === "" ||
        property.title?.toLowerCase().includes(normalizedSearch) ||
        property.address?.toLowerCase().includes(normalizedSearch) ||
        property.location?.toLowerCase().includes(normalizedSearch) ||
        nearbyPlaces.some((place) =>
          place.toLowerCase().includes(normalizedSearch)
        );

      const matchesPrice =
        Number(property.price) >= filters.minPrice &&
        Number(property.price) <= filters.maxPrice;

      const matchesLocation =
        !filters.location || property.location === filters.location;

      const matchesDistance =
        !filters.distanceFrom ||
        filters.distanceFrom.length === 0 ||
        filters.distanceFrom.some((place) => nearbyPlaces.includes(place));

      const matchesRating = Number(property.rating || 0) >= minimumRating;

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
  }, [properties, filters, minimumRating]);

  if (loading) {
    return (
      <div className="page-container results-page">
        <header className="results-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </button>
          <Logo />
        </header>

        <div className="no-results-card">
          <h3>Loading properties...</h3>
          <p>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="page-container results-page">
        <header className="results-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back
          </button>
          <Logo />
        </header>

        <div className="no-results-card">
          <h3>Something went wrong</h3>
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }

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
            <div
              className="property-card"
              key={property.id}
              onClick={() =>
                navigate(`/property/${property.id}`, { state: { property } })
              }
            >
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
                  {(property.nearbyTo || []).join(" • ")}
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