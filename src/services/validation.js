

// Form Validation 

const validateForm = (data) => {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "Invalid email address";
  }
  if (!data.phone.match(/^\d{10}$/)) {
    errors.phone = "Phone must be 10 digits";
  }
  if (!data.postalCode.match(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)) {
    errors.postalCode = "Invalid Canadian postal code";
  }
  if (!data.city.trim()) {
    errors.city = "City is required";
  }
  if (!data.province) {
    errors.province = "Province is required";
  }
  if (!data.country) {
    errors.country = "Country is required";
  }

  return errors;
};


// Generic validation function for shipping form
export const validateShippingForm = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) errors.firstName = "First name is required";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required";

  if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = "Invalid email address";

  if (!data.phone?.match(/^\d{10}$/)) errors.phone = "Phone must be 10 digits";

  if (!data.postalCode?.match(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/))
    errors.postalCode = "Invalid Canadian postal code";

  if (!data.city?.trim()) errors.city = "City is required";
  if (!data.province) errors.province = "Province is required";
  if (!data.country) errors.country = "Country is required";

  return errors;
};


// Generic validation function for signup form
export const validateSignupForm = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) errors.firstName = "First name is required";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required";

  if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = "Invalid email address";

  if (!data.password) errors.password = "Password is required";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  if (data.phone && !data.phone.match(/^\d{10}$/))
    errors.phone = "Phone must be 10 digits";

  return errors;
};