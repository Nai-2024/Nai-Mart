

// ---------------- Shipping Form Validation ----------------
export const validateShippingForm = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) errors.firstName = "First name is required";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required";
  if (!data.email?.trim()) errors.email = "Email is required";
  else if (!validateEmail(data.email)) errors.email = "Invalid email address";

  if (data.phone && !validatePhone(data.phone))
    errors.phone = "Phone must be 10 digits";

  if (!data.postalCode?.trim()) errors.postalCode = "Postal code is required";
  else if (!validatePostalCode(data.postalCode))
    errors.postalCode = "Invalid Canadian postal code";

  if (!data.city?.trim()) errors.city = "City is required";
  if (!data.province?.trim()) errors.province = "Province is required";
  if (!data.country?.trim()) errors.country = "Country is required";

  return errors;
};
// ---------------- Payment Form Validation ----------------

// Only alphabets and spaces
export const validateCardholder = (name) => /^[A-Za-z\s]+$/.test(name.trim());

// Exactly 16 digits
export const validateCardNumber = (number) => /^\d{16}$/.test(number.replace(/\s+/g, ""));

// MM/YY format, future month
export const validateExpiry = (expiry) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return false;
  const [month, year] = expiry.split("/").map(Number);
  const now = new Date();
  const expiryDate = new Date(2000 + year, month - 1, 1);
  return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
};

// 3 or 4 digit number
export const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

// Non-empty selection
export const validateCardType = (type) => type.trim().length > 0;

// ---------------- Contact Form Validation ----------------
export function validateContactName(name) {
  return /^[A-Za-z\s]+$/.test(name.trim());
}

export function validateContactEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateContactSubject(subject) {
  return subject.trim().length > 0;
}

export function validateContactMessage(message) {
  return message.trim().length > 0;
}

// ✅ Live validation logic
export function liveValidateField(name, value) {
  switch (name) {
    case "name":
      return validateContactName(value)
        ? ""
        : "Name must contain only letters";

    case "email":
      return validateContactEmail(value)
        ? ""
        : "Enter a valid email";

    case "subject":
      return validateContactSubject(value)
        ? ""
        : "Subject is required";

    case "message":
      return validateContactMessage(value)
        ? ""
        : "Message is required";

    default:
      return "";
  }
}

// ---------------- SignUp Form Validation ----------------

// Validate first and last name: only letters, not empty
export function validateName(name) {
  if (!name || name.trim() === "") return "This field is required";
  if (!/^[A-Za-z\s]+$/.test(name.trim())) return "Name must contain only letters";
  return "";
}

// Validate email
export function validateEmail(email) {
  if (!email || email.trim() === "") return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email";
  return "";
}

// Validate phone (optional)
export function validatePhone(phone) {
  if (!phone) return ""; // optional
  if (!/^\+?\d{10,15}$/.test(phone.trim())) return "Enter a valid phone number";
  return "";
}

// Validate password
export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
}

// Validate confirm password
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
}

// Validate address fields
export function validateAddress(address) {
  return address && address.trim() !== "" ? "" : "Address is required";
}

export function validateCity(city) {
  return city && city.trim() !== "" ? "" : "City is required";
}

export function validatePostalCode(postalCode) {
  return postalCode && postalCode.trim() !== "" ? "" : "Postal Code is required";
}

export function validateProvince(province) {
  return province && province.trim() !== "" ? "" : "Province is required";
}

export function validateCountry(country) {
  return country && country.trim() !== "" ? "" : "Country is required";
}

// ---------------- Live field validation ----------------

export function validateSignupForm(name, value, formData = {}) {
  switch (name) {
    case "firstName":
    case "lastName":
      return validateName(value);

    case "email":
      return validateEmail(value);

    case "phone":
      return validatePhone(value);

    case "password":
      return validatePassword(value);

    case "confirmPassword":
      return validateConfirmPassword(formData.password, value);

    case "address":
      return validateAddress(value);

    case "city":
      return validateCity(value);

    case "postalCode":
      return validatePostalCode(value);

    case "province":
      return validateProvince(value);

    case "country":
      return validateCountry(value);

    default:
      return "";
  }
}
