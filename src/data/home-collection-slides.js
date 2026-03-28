/**
 * Home collection slider and /collections page — single source of truth.
 */
import { buildShopEditHref } from "@/data/shop-edits";

export const HOME_COLLECTION_SLIDES = [
  {
    id: "s1",
    left: {
      title: "Evening silhouettes",
      description:
        "Fluid dresses and refined cuts for dinners, galleries, and nights that run late.",
      href: buildShopEditHref("evening-silhouettes"),
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&q=80",
    },
    right: {
      title: "Outer layers",
      description:
        "Trenches and coats that sharpen every outfit — rain or shine.",
      href: buildShopEditHref("outer-layers"),
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=900&q=80",
    },
  },
  {
    id: "s2",
    left: {
      title: "Everyday tops",
      description:
        "Rib knits, crisp shirts, and soft bases you will reach for daily.",
      href: buildShopEditHref("everyday-tops"),
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80",
    },
    right: {
      title: "Tailored bottoms",
      description:
        "Wide-leg trousers and skirts with clean lines and easy movement.",
      href: buildShopEditHref("tailored-bottoms"),
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80",
    },
  },
  {
    id: "s3",
    left: {
      title: "New arrivals",
      description:
        "Fresh drops in limited quantities — curated for the season ahead.",
      href: buildShopEditHref("new-arrivals"),
      image:
        "https://images.unsplash.com/photo-1612336307429-947a7e3e8cfe?w=900&q=80",
    },
    right: {
      title: "The full edit",
      description:
        "Browse dresses, tops, bottoms, and outerwear in one calm grid.",
      href: buildShopEditHref("full-edit"),
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80",
    },
  },
];
