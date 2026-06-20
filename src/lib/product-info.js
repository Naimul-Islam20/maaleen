const CATEGORY_COPY = {
  dress: {
    detailSuffix: "Designed for graceful movement from day to evening.",
    materials:
      "Premium fabric blend with a soft hand-feel. Fully lined where noted. Maaleen signature finish on selected styles.",
    care: [
      "Dry clean or gentle hand wash recommended",
      "Iron on low heat inside out",
      "Store on a padded hanger to preserve shape",
      "Avoid direct heat on embellished areas",
    ],
  },
  tops: {
    detailSuffix: "A refined essential built for layering and everyday wear.",
    materials:
      "Natural fibre blend with breathable structure. Reinforced seams and matte finish buttons.",
    care: [
      "Machine wash cold on gentle cycle",
      "Do not bleach",
      "Lay flat or hang to dry",
      "Cool iron if needed",
    ],
  },
  bottoms: {
    detailSuffix: "Tailored for comfort with a polished, modern line.",
    materials:
      "Structured weave with comfortable stretch recovery. Pocket bags in cotton blend.",
    care: [
      "Machine wash cold with similar colours",
      "Turn inside out before washing",
      "Hang dry to maintain crease",
      "Steam or iron on medium heat",
    ],
  },
  outerwear: {
    detailSuffix: "Trans-seasonal layering with quiet, confident structure.",
    materials:
      "Weather-ready shell with soft inner finish. Belt and hardware in brushed metal tone.",
    care: [
      "Professional dry clean recommended",
      "Spot clean when possible",
      "Store ventilated on a broad hanger",
      "Do not tumble dry",
    ],
  },
};

function buildDetails(product, categoryCopy) {
  const colors =
    product.colors?.map((color) => color.name).join(", ") || "signature tones";
  const sizes = product.sizes?.join(", ") || "standard sizing";

  return [
    `${product.name} in ${colors} offers a clean, modern profile`,
    categoryCopy.detailSuffix,
    `Available in sizes ${sizes} for a considered fit`,
    "Thoughtfully finished with Maaleen attention to detail",
    "Versatile styling for formal settings and everyday wear",
    "Designed for comfort, movement, and lasting wear",
  ];
}

export function getProductInfo(product) {
  const categoryCopy = CATEGORY_COPY[product.category] ?? CATEGORY_COPY.dress;
  const colorText =
    product.colors?.map((color) => color.name).join(" and ") || "neutral palette";

  return {
    preview: `The lightness of this ${product.category.replace("_", " ")} fabric grants ${product.name.toLowerCase()} a refined ease with natural drape and everyday polish.`,
    moreParagraphs: [
      product.description,
      `Finished in ${colorText}, this piece balances structure and softness for a calm, elevated look that moves effortlessly from morning plans to evening occasions.`,
      "The Maaleen Collection comprises minimalistic, impeccable designs crafted from the world's finest materials.",
    ],
    details: buildDetails(product, categoryCopy),
    materials: categoryCopy.materials,
    care: categoryCopy.care,
  };
}
