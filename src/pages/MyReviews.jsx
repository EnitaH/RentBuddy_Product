import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  MessageSquare,
  PenSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProperties, getReviewsByUser } from "../utils/propertyStore";
import "../styles/my-reviews.css";

export default function MyReviews() {
  const navigate = useNavigate();

  const savedUserRaw = localStorage.getItem("user");
  const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;

  const [viewMode, setViewMode] = useState("write");
  const [properties, setProperties] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const allProperties = getProperties();
    setProperties(allProperties);

    const userReviews = getReviewsByUser(
      savedUser?.email || "",
      savedUser?.fullName || ""
    );
    setMyReviews(userReviews);
  }, [savedUser?.email, savedUser?.fullName]);

  const reviewCountText = useMemo(() => {
    if (myReviews.length === 1) return "1 review written";
    return `${myReviews.length} reviews written`;
  }, [myReviews.length]);

  return (
    <div className="page-container my-reviews-page">
      <header className="my-reviews-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="my-reviews-header-text">
          <h1>Write a Review</h1>
          <p>{reviewCountText}</p>
        </div>

        <div className="my-reviews-header-spacer" />
      </header>

      <div className="my-reviews-toggle-row">
        <button
          className={`my-reviews-toggle-btn ${
            viewMode === "write" ? "active" : ""
          }`}
          onClick={() => setViewMode("write")}
        >
          Write Review
        </button>

        <button
          className={`my-reviews-toggle-btn ${
            viewMode === "mine" ? "active" : ""
          }`}
          onClick={() => setViewMode("mine")}
        >
          My Reviews
        </button>
      </div>

      {viewMode === "write" ? (
        <>
          <section className="my-reviews-intro">
            <h2>Help other renters make informed decisions</h2>
            <p>
              Share your honest experience about a property you've rented
            </p>
          </section>

          <div className="review-property-grid">
            {properties.map((property) => (
              <article className="review-property-card" key={property.id}>
                <div className="review-property-image-wrap">
                  {property.image ? (
                    <img src={property.image} alt={property.title} />
                  ) : (
                    <div className="review-property-image-placeholder" />
                  )}

                  <div className="review-rating-badge">
                    <Star size={11} fill="currentColor" />
                    <span>{property.rating || 0}</span>
                  </div>
                </div>

                <div className="review-property-body">
                  <h3>{property.title}</h3>

                  <div className="review-property-address">
                    <MapPin size={12} />
                    <span>{property.address}</span>
                  </div>

                  <button
                    className="review-property-btn"
                    onClick={() =>
                      navigate(`/property/${property.id}/review/new`, {
                        state: { property },
                      })
                    }
                  >
                    Review This Property
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="my-reviews-list">
          {myReviews.length === 0 ? (
            <div className="my-reviews-empty-card">
              <h3>No reviews written yet</h3>
              <p>Once you submit a review, it will appear here.</p>
            </div>
          ) : (
            myReviews.map((review) => (
              <article className="my-review-card" key={review.id}>
                <div className="my-review-top">
                  <div>
                    <h3>{review.propertyTitle}</h3>
                    <div className="my-review-address">
                      <MapPin size={12} />
                      <span>{review.propertyAddress}</span>
                    </div>
                  </div>

                  <div className="my-review-rating">
                    <Star size={12} fill="currentColor" />
                    <span>{review.rating}</span>
                  </div>
                </div>

                <div className="my-review-meta">
                  <span>{review.date}</span>
                  <span>{review.isAnonymous ? "Posted anonymously" : "Posted with name"}</span>
                </div>

                <p className="my-review-text">{review.text}</p>

                <div className="my-review-footer">
                  <span className="my-review-bills">
                    Bills: {review.billsNote || "Included"}
                  </span>

                  <span
                    className={`my-review-rent-again ${
                      review.wouldRentAgain ? "yes" : "no"
                    }`}
                  >
                    {review.wouldRentAgain
                      ? "Would Rent Again"
                      : "Would Not Rent Again"}
                  </span>
                </div>

                <button
                  className="my-review-view-btn"
                  onClick={() =>
                    navigate(`/property/${review.propertyId}/reviews`, {
                      state: {
                        property: properties.find(
                          (property) => property.id === review.propertyId
                        ),
                      },
                    })
                  }
                >
                  <MessageSquare size={13} />
                  <span>View Property Reviews</span>
                </button>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}