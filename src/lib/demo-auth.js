export const DEMO_USER = {
  id: "demo-1",
  name: "Naimul Islam",
  email: "naimulislam8828@gmail.com",
  password: "11111111",
  phone: "1786493740",
  otp: "111111",
};

export function validateEmailLogin(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  if (
    normalizedEmail === DEMO_USER.email.toLowerCase() &&
    password === DEMO_USER.password
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

export function validatePhoneOtp(phone, otp) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length === 10 && otp === DEMO_USER.otp) {
    return {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      phone: digits,
    };
  }
  return null;
}
