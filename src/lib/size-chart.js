export const SIZE_MEASUREMENTS = {
  XS: { bust: "31–32", waist: "24–25", hip: "34–35", length: "38" },
  S: { bust: "33–34", waist: "26–27", hip: "36–37", length: "39" },
  M: { bust: "35–36", waist: "28–29", hip: "38–39", length: "40" },
  L: { bust: "37–39", waist: "30–32", hip: "40–42", length: "41" },
  XL: { bust: "40–42", waist: "33–35", hip: "43–45", length: "42" },
};

export function sizeOptionLabel(size, category) {
  const row = SIZE_MEASUREMENTS[size];
  if (!row) return size;
  const raw = category === "bottoms" ? row.waist : row.bust;
  return `${size}(${raw.replaceAll("–", "-")})`;
}
