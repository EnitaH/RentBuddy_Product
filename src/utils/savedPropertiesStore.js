const STORAGE_KEY = "rentbuddy_saved_properties";

export function getSavedProperties() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSavedProperties(properties) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

export function isPropertySaved(propertyId) {
  const saved = getSavedProperties();
  return saved.some((property) => String(property.id) === String(propertyId));
}

export function toggleSavedProperty(property) {
  const saved = getSavedProperties();
  const exists = saved.some((item) => String(item.id) === String(property.id));

  let updated;

  if (exists) {
    updated = saved.filter((item) => String(item.id) !== String(property.id));
  } else {
    updated = [
      {
        ...property,
        savedAt: new Date().toISOString(),
      },
      ...saved,
    ];
  }

  saveSavedProperties(updated);
  return !exists;
}

export function removeSavedProperty(propertyId) {
  const saved = getSavedProperties();
  const updated = saved.filter((item) => String(item.id) !== String(propertyId));
  saveSavedProperties(updated);
  return updated;
}