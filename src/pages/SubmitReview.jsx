import { useEffect, useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addReviewToProperty, getPropertyById } from '../utils/propertyStore';
import '../styles/submit-review.css';

function StarRatingInput({ value, onChange }) {
  return (
    <div className="star-input-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="star-button"
          onClick={() => onChange(star)}
        >
          <Star
            size={22}
            fill={star <= value ? 'currentColor' : 'none'}
            strokeWidth={1.8}
          />
        </button>
      ))}
    </div>
  );
}

function SliderField({ label, value, onChange }) {
  return (
    <div className="slider-field">
      <div className="slider-label-row">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>

      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default function SubmitReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const [property, setProperty] = useState(
    state?.property || {
      id: Number(id),
      title: 'Loading property...',
    }
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const savedUserRaw = localStorage.getItem('user');
  const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;
  const userName = savedUser?.full_name || savedUser?.fullName || 'Verified Tenant';
  const userId = savedUser?.id || null;

  const [postAnonymously, setPostAnonymously] = useState(true);
  const [overallRating, setOverallRating] = useState(0);
  const [landlordCommunication, setLandlordCommunication] = useState(3);
  const [maintenanceSpeed, setMaintenanceSpeed] = useState(3);
  const [cleanliness, setCleanliness] = useState(3);
  const [safety, setSafety] = useState(3);
  const [valueForMoney, setValueForMoney] = useState(3);
  const [monthlyBills, setMonthlyBills] = useState('');
  const [hiddenCosts, setHiddenCosts] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [wouldRentAgain, setWouldRentAgain] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      try {
        setLoading(true);
        setErrorMessage('');
        const propertyData = await getPropertyById(id);
        setProperty(propertyData);
      } catch (error) {
        console.error('Failed to load property for review:', error);
        if (state?.property) {
          setProperty(state.property);
        } else {
          setErrorMessage(error.message || 'Unable to load property.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id, state]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!overallRating || !reviewText.trim()) {
      setErrorMessage('Please add an overall rating and write your review.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');

      const payload = {
        userId,
        name: postAnonymously ? 'Anonymous Tenant' : userName,
        rating: overallRating,
        reviewText: reviewText.trim(),
        monthlyBills: monthlyBills.trim(),
        hiddenCosts,
        wouldRentAgain,
        categoryRatings: {
          landlordCommunication,
          maintenanceSpeed,
          cleanliness,
          safety,
          valueForMoney,
        },
      };

      const result = await addReviewToProperty(property.id, payload);

      navigate('/review-submitted', {
        state: {
          property,
          review: result.review,
          summary: result.summary,
        },
      });
    } catch (error) {
      console.error('Failed to submit review:', error);
      setErrorMessage(error.message || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="page-container submit-review-page">
        <header className="submit-review-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
          </button>
          <h1>Submit Review</h1>
          <div className="submit-review-spacer" />
        </header>
        <div className="submit-review-form">
          <section className="submit-card">
            <p>Loading property...</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container submit-review-page">
      <header className="submit-review-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
        </button>
        <h1>Submit Review</h1>
        <div className="submit-review-spacer" />
      </header>

      <form className="submit-review-form" onSubmit={handleSubmit}>
        <section className="submit-card">
          <label className="submit-label">Select Property</label>
          <div className="property-display-box">{property.title}</div>
        </section>

        <section className="submit-card toggle-card">
          <div>
            <h3>Post Anonymously</h3>
            <p>Your real identity is hidden</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={postAnonymously}
              onChange={() => setPostAnonymously(!postAnonymously)}
            />
            <span className="slider"></span>
          </label>
        </section>

        <section className="submit-card">
          <label className="submit-label">Overall Rating *</label>
          <StarRatingInput value={overallRating} onChange={setOverallRating} />
        </section>

        <section className="submit-card">
          <h3>Category Ratings</h3>

          <SliderField
            label="Landlord Communication"
            value={landlordCommunication}
            onChange={setLandlordCommunication}
          />
          <SliderField
            label="Maintenance Speed"
            value={maintenanceSpeed}
            onChange={setMaintenanceSpeed}
          />
          <SliderField label="Cleanliness" value={cleanliness} onChange={setCleanliness} />
          <SliderField label="Safety" value={safety} onChange={setSafety} />
          <SliderField
            label="Value for Money"
            value={valueForMoney}
            onChange={setValueForMoney}
          />
        </section>

        <section className="submit-card">
          <label className="submit-label">Monthly Bills (£)</label>
          <input
            className="text-input"
            type="number"
            placeholder="e.g. 120"
            value={monthlyBills}
            onChange={(e) => setMonthlyBills(e.target.value)}
          />
        </section>

        <section className="submit-card">
          <label className="submit-label">Were there any hidden costs? *</label>
          <div className="choice-row">
            <button
              type="button"
              className={`choice-btn ${hiddenCosts ? 'active' : ''}`}
              onClick={() => setHiddenCosts(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`choice-btn ${!hiddenCosts ? 'active' : ''}`}
              onClick={() => setHiddenCosts(false)}
            >
              No
            </button>
          </div>
        </section>

        <section className="submit-card">
          <label className="submit-label">Your Review *</label>
          <textarea
            rows={6}
            maxLength={500}
            placeholder="Tell us about your experience living here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <small>{reviewText.length}/500 characters</small>
        </section>

        <section className="submit-card">
          <label className="submit-label">Would you rent here again? *</label>
          <div className="choice-row">
            <button
              type="button"
              className={`choice-btn ${wouldRentAgain ? 'active' : ''}`}
              onClick={() => setWouldRentAgain(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`choice-btn ${!wouldRentAgain ? 'active' : ''}`}
              onClick={() => setWouldRentAgain(false)}
            >
              No
            </button>
          </div>
        </section>

        {errorMessage && <div className="submit-note">{errorMessage}</div>}

        <div className="submit-note">
          All reviews are moderated to ensure authenticity and helpfulness. Your review will be visible within 24 hours.
        </div>

        <button type="submit" className="submit-review-btn" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}