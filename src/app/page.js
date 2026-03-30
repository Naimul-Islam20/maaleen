import { CollectionsSection } from "@/components/home/collections-section";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductsSliderSection } from "@/components/home/products-slider-section";
import {
  getFeaturedProducts,
  getNewArrivals,
  getProducts,
} from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals(4);
  const sliderProducts = getProducts().slice(0, 12);

  return (
    <div>
      <section className="border-b border-stone-200">
        <HeroSlider />
      </section>

      <CollectionsSection />

      <ProductsSliderSection products={sliderProducts} />

      <ProductsSliderSection
        products={featured}
        title="Featured"
        ctaLabel="See all"
        ctaHref="/shop"
      />

      <ProductsSliderSection
        products={newArrivals}
        title="New arrivals"
        ctaLabel="Shop new"
        ctaHref="/shop"
        sectionClassName="border-t border-stone-200 bg-stone-100/40"
      />
    </div>
  );
}
