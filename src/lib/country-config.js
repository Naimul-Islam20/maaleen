export const COUNTRY_OPTIONS = {
  BD: {
    code: "BD",
    label: "Bangladesh",
    dialCode: "880",
    phoneMaxLength: 10,
  },
  AU: {
    code: "AU",
    label: "Australia",
    dialCode: "61",
    phoneMaxLength: 9,
  },
};

export const COUNTRY_CITIES = {
  BD: [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
};

export function getCountryConfig(code) {
  return COUNTRY_OPTIONS[code] ?? COUNTRY_OPTIONS.BD;
}
