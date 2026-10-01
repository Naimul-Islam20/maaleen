export const DEMO_USER = {
  id: "admin-1",
  name: "Admin",
  email: "admin@gmail.com",
  password: "11111",
  phone: null,
  otp: null,
};

export function validateEmailLogin(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = String(password ?? "").trim();
  if (
    normalizedEmail === DEMO_USER.email.toLowerCase() &&
    normalizedPassword === DEMO_USER.password
  ) {
    return {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      phone: DEMO_USER.phone,
    };
  }
  return null;
}

/** Phone login disabled — only email admin@gmail.com works. */
export function validatePhoneOtp() {
  return null;
}
