const API_BASE_URL = "http://localhost:5000/api";

async function handleJsonResponse(response, fallbackMessage) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage);
  }

  return data;
}

export async function getProperties() {
  const response = await fetch(`${API_BASE_URL}/properties`);
  return handleJsonResponse(response, "Failed to fetch properties");
}

export async function getPropertyById(id) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`);
  return handleJsonResponse(response, "Failed to fetch property");
}

export async function getPropertyReviews(id) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}/reviews`);
  return handleJsonResponse(response, "Failed to fetch reviews");
}

export async function getReviewSummary(id) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}/reviews/summary`);
  return handleJsonResponse(response, "Failed to fetch review summary");
}

export async function addReviewToProperty(id, reviewPayload) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewPayload),
  });

  return handleJsonResponse(response, "Failed to submit review");
}

export async function saveProperty(userId, propertyId) {
  const response = await fetch(`${API_BASE_URL}/saved-properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, propertyId }),
  });

  return handleJsonResponse(response, "Failed to save property");
}

export async function removeSavedProperty(userId, propertyId) {
  const response = await fetch(`${API_BASE_URL}/saved-properties/${userId}/${propertyId}`, {
    method: "DELETE",
  });

  return handleJsonResponse(response, "Failed to remove saved property");
}

export async function getSavedProperties(userId) {
  const response = await fetch(`${API_BASE_URL}/saved-properties/${userId}`);
  return handleJsonResponse(response, "Failed to fetch saved properties");
}

export async function checkSavedProperty(userId, propertyId) {
  const response = await fetch(`${API_BASE_URL}/saved-properties/${userId}/${propertyId}`);
  return handleJsonResponse(response, "Failed to check saved property");
}

export async function sendPropertyInquiry(payload) {
  const response = await fetch(`${API_BASE_URL}/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleJsonResponse(response, "Failed to send inquiry");
}

export async function getUserInquiries(userId) {
  const response = await fetch(`${API_BASE_URL}/inquiries/user/${userId}`);
  return handleJsonResponse(response, "Failed to fetch user inquiries");
}

export async function getPropertyInquiries(propertyId) {
  const response = await fetch(`${API_BASE_URL}/inquiries/property/${propertyId}`);
  return handleJsonResponse(response, "Failed to fetch property inquiries");
}