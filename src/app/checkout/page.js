"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useCountry } from "@/contexts/country-context";
import { currency } from "@/lib/format";
import { COUNTRY_CITIES } from "@/lib/country-config";
import { Container } from "@/components/layout/container";
import SuccessPopup from "@/components/checkout/success-popup";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const shippingOptionsByCountry = {
  BD: [
    {
      id: "inside-chattagram",
      label: "Inside Chattagram City",
      cost: 70,
    },
    {
      id: "inside-dhaka",
      label: "Inside Dhaka City",
      cost: 70,
    },
    {
      id: "outside-dhaka-ctg",
      label: "Outside Dhaka & Chittagong City",
      cost: 130,
    },
  ],
  AU: [
    {
      id: "standard-au",
      label: "Standard Shipping",
      cost: 15,
    },
    {
      id: "express-au",
      label: "Express Shipping",
      cost: 25,
    },
  ],
};

const paymentMethods = [
  {
    id: "sslcommerz",
    label: "SSLCOMMERZ",
    description:
      'After clicking "Pay now", you will be redirected to SSLCOMMERZ to complete your purchase securely.',
    icons: ["visa", "master", "amex", "+2"],
  },
  { id: "cod", label: "Cash on Delivery (COD)", description: "" },
];

export default function CheckoutPage() {
  const { items: cartItems, subtotal, clearCart, updateQuantity } = useCart();
  const { country, countryCode } = useCountry();
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Map Maaleen cart items to the checkout component's expected format
  const detailedItems = useMemo(() => cartItems.map(item => ({
    ...item,
    title: item.name,
    variantKey: item.size ? `Size: ${item.size}` : ""
  })), [cartItems]);

  const totals = useMemo(() => ({ subtotal }), [subtotal]);

  const [form, setForm] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    deliveryPhone: "",
    saveInfo: false,
    shippingMethod: "inside-dhaka",
    payment: "sslcommerz",
    billingAddress: "same",
  });
  const [errors, setErrors] = useState({});
  const [shippingUpdating, setShippingUpdating] = useState(false);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const firstShippingRender = useRef(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const cartListRef = useRef(null);

  const hasItems = detailedItems.length > 0;

  const shippingOptions = useMemo(
    () => shippingOptionsByCountry[countryCode] ?? shippingOptionsByCountry.BD,
    [countryCode],
  );

  const cities = COUNTRY_CITIES[countryCode] ?? [];

  const selectedShipping = useMemo(
    () =>
      shippingOptions.find((option) => option.id === form.shippingMethod) ??
      shippingOptions[0],
    [form.shippingMethod, shippingOptions],
  );

  const totalWithShipping = useMemo(
    () => totals.subtotal + (selectedShipping?.cost ?? 0),
    [totals.subtotal, selectedShipping]
  );

  // Show "scroll for more" only when list is scrollable and not at bottom
  useEffect(() => {
    const list = cartListRef.current;
    if (!list) return;
    const updateHint = () => {
      const canScroll = list.scrollHeight > list.clientHeight;
      const nearBottom =
        list.scrollTop >= list.scrollHeight - list.clientHeight - 4;
      setShowScrollHint(canScroll && !nearBottom);
    };
    updateHint();
    list.addEventListener("scroll", updateHint);
    return () => list.removeEventListener("scroll", updateHint);
  }, [detailedItems.length]);

  useEffect(() => {
    const options = shippingOptionsByCountry[countryCode] ?? shippingOptionsByCountry.BD;
    setForm((prev) => ({
      ...prev,
      city: "",
      shippingMethod: options[0]?.id ?? prev.shippingMethod,
    }));
  }, [countryCode]);

  useEffect(() => {
    if (firstShippingRender.current) {
      firstShippingRender.current = false;
      return;
    }
    setShippingUpdating(true);
    const timer = setTimeout(() => setShippingUpdating(false), 400);
    return () => clearTimeout(timer);
  }, [form.shippingMethod]);

  useEffect(() => {
    if (!shippingUpdating) {
      setDisplayTotal(totalWithShipping);
    }
  }, [totalWithShipping, shippingUpdating]);

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhoneChange = (field) => (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, country.phoneMaxLength);
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "phone") {
      setErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 50);
    }, 100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!hasItems) {
      setError("Your cart is empty. Add items before checking out.");
      scrollToTop();
      return;
    }

    // Simple validation
    if (!form.phone.trim()) {
      setErrors({ phone: true });
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the error
      return;
    }

    // Validate required fields
    const newErrors = {};

    if (!form.lastName || form.lastName.trim() === "") {
      newErrors.lastName = "Please enter your last name";
    }

    if (!form.address || form.address.trim() === "") {
      newErrors.address = "Please enter your address";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        scrollToTop();
        return;
    }

    if (!form.city || form.city.trim() === "") {
      errors.city = "Please enter your city";
    }

    if (!form.deliveryPhone || form.deliveryPhone.trim() === "") {
      errors.deliveryPhone = "Please enter your phone number";
    }

    // If there are errors, set them and scroll to top
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      scrollToTop();
      return;
    }

    const generatedId = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setFinalTotal(totalWithShipping);
    setSubmitted(true);
    clearCart();
  };

  if (!hasItems && !submitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-16 flex flex-col items-center gap-3 sm:gap-4 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Your cart is empty
        </h1>
        <p className="text-sm sm:text-base text-stone-500 max-w-xl px-4 text-justify">
          Add products to your cart to start checkout.
        </p>
        <Link 
          className="mt-4 rounded-full bg-stone-900 px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90" 
          href="/shop"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 relative bg-stone-50 font-[family-name:var(--font-dm-sans)]">
      {/* Success Popup Overlay */}
      {submitted && <SuccessPopup orderId={orderId} total={finalTotal} />}
      

      <Container className="max-w-none">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px] lg:pl-0"
        >
          {/* Left Column - Form */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
            {/* Phone Number & Sign In */}
            <div className="bg-white rounded-lg px-4 sm:px-5 md:px-6 pt-3 sm:pt-4 space-y-3 sm:space-y-4 pb-6 border border-stone-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-cormorant)] text-stone-900">
                  Phone Number
                </h2>
                <Link
                  href="/login?redirect=/checkout"
                  className="text-xs sm:text-sm text-[var(--accent)] hover:underline"
                >
                  Sign in
                </Link>
              </div>
              <PhoneField
                country={country}
                value={form.phone}
                onChange={handlePhoneChange("phone")}
                hasError={errors.phone}
              />
                {errors.phone && (
                  <p className="text-[10px] sm:text-xs text-[#8b3a3a] mt-1 font-medium">Please enter your phone number to continue</p>
                )}
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg px-4 sm:px-5 md:px-6 pt-3 sm:pt-4 space-y-2.5 sm:space-y-3 pb-6 border border-stone-200">
              <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-cormorant)] text-stone-900">Delivery</h2>

              <div className="grid gap-3 sm:gap-4">
                <input
                  type="text"
                  readOnly
                  value={country.label}
                  className="w-full cursor-not-allowed rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-xs sm:text-sm text-stone-700"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="First name (optional)"
                  />
                  <Input
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Last name"
                    error={fieldErrors.lastName}
                  />
                </div>

                <Input
                  value={form.address}
                  onChange={handleChange("address")}
                  placeholder="Address"
                  error={fieldErrors.address}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <select
                      value={form.city}
                      onChange={handleChange("city")}
                      className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-stone-900 focus:border-[#8b3a3a] focus:ring-1 focus:ring-[#8b3a3a] focus:outline-none transition-colors ${
                        fieldErrors.city ? "border-[#8b3a3a]" : "border-stone-200"
                      }`}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.city ? (
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600">
                        {fieldErrors.city}
                      </p>
                    ) : null}
                  </div>
                  <Input
                    value={form.postalCode}
                    onChange={handleChange("postalCode")}
                    placeholder="Postal code (optional)"
                  />
                </div>

                <PhoneField
                  country={country}
                  value={form.deliveryPhone}
                  onChange={handlePhoneChange("deliveryPhone")}
                  hasError={Boolean(fieldErrors.deliveryPhone)}
                />
                {fieldErrors.deliveryPhone ? (
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600">
                    {fieldErrors.deliveryPhone}
                  </p>
                ) : null}
              </div>

              <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer mt-4">
                <input
                  type="checkbox"
                  checked={form.saveInfo}
                  onChange={handleChange("saveInfo")}
                  className="accent-[#8b3a3a]"
                />
                <span className="text-stone-600">Save this information for next time</span>
              </label>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg px-4 sm:px-5 md:px-6 py-4 space-y-3 sm:space-y-4 border border-stone-200">
              <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-cormorant)] text-stone-900">
                Billing address
              </h2>

              <div className="rounded-lg border border-stone-200 overflow-hidden divide-y divide-stone-100">
                <label
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 cursor-pointer transition ${
                    form.billingAddress === "same" ? "bg-stone-50" : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={form.billingAddress === "same"}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, billingAddress: "same" }))
                    }
                    className="accent-[var(--accent)] w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span className="text-xs sm:text-sm font-medium text-stone-700">
                    Same as shipping address
                  </span>
                </label>
                <label
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 cursor-pointer transition ${
                    form.billingAddress === "different" ? "bg-stone-50" : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={form.billingAddress === "different"}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        billingAddress: "different",
                      }))
                    }
                    className="accent-[var(--accent)] w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span className="text-xs sm:text-sm font-medium text-stone-700">
                    Use a different billing address
                  </span>
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg px-4 sm:px-5 md:px-6 py-4 space-y-3 sm:space-y-4 border border-stone-200">
              <h2 className="text-base sm:text-lg font-bold font-[family-name:var(--font-cormorant)] text-stone-900">
                Shipping method
              </h2>

              <div className="rounded-lg overflow-hidden border border-stone-200 divide-y divide-stone-100">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer transition ${
                      form.shippingMethod === option.id ? "bg-stone-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={form.shippingMethod === option.id}
                        onChange={() =>
                          setForm((prev) => ({
                            ...prev,
                            shippingMethod: option.id,
                          }))
                        }
                        className="accent-[var(--accent)] w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                      <span className="text-xs sm:text-sm font-medium text-stone-700">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-stone-900">
                      {currency(option.cost)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg px-4 sm:px-5 md:px-6 py-4 space-y-2 border border-stone-200">
              <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-cormorant)] text-stone-900">Payment</h2>
              <p className="text-xs sm:text-sm text-stone-500">
                All transactions are secure and encrypted.
              </p>

              <div className="rounded-lg border border-stone-200 overflow-hidden divide-y divide-stone-100 mt-4">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <label
                      className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer transition ${
                        form.payment === method.id ? "bg-stone-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={form.payment === method.id}
                          onChange={() =>
                            setForm((prev) => ({ ...prev, payment: method.id }))
                          }
                          className="accent-[var(--accent)] w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                        <span className="text-xs sm:text-sm font-medium text-stone-700">
                          {method.label}
                        </span>
                      </div>
                      {method.icons && (
                        <div className="flex items-center gap-1 sm:gap-2">
                          {method.icons.map((icon, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-stone-100 rounded text-stone-500 uppercase font-bold tracking-wider"
                            >
                              {icon}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                    {form.payment === method.id && method.description && (
                      <div className="px-3 sm:px-4 pb-4 pt-0 text-xs sm:text-sm text-stone-500 bg-stone-50 text-justify">
                        {method.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
                <button
                type="submit"
                className="w-full rounded-full bg-[var(--accent)] py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 max-w-lg"
              >
                Pay now
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:border-l lg:border-stone-200 lg:pl-6 xl:pl-8 order-1 lg:order-2">
            <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 lg:sticky lg:top-50 border border-stone-200 shadow-sm">
              {/* Shopping Cart */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <div
                    ref={cartListRef}
                    className="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto pt-2 pr-1 custom-scrollbar"
                  >
                    {detailedItems.map((item) => (
                      <div
                        key={`${item.lineId}`}
                        className="flex gap-2 sm:gap-3 md:gap-4 pb-3 sm:pb-4 border-b border-stone-100 last:border-0"
                      >
                        <div className="relative w-14 aspect-square sm:w-16 md:w-20 bg-stone-50 rounded shrink-0 border border-stone-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            fill
                            imageClassName="object-cover rounded"
                            sizes="(max-width: 640px) 56px, 80px"
                            fallbackLabel="MAALEEN"
                            fallbackLabelClassName="font-[family-name:var(--font-display)] text-[10px] sm:text-[12px] tracking-[0.1em]"
                          />
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 shadow-sm">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[13px] sm:text-sm text-stone-900 truncate uppercase tracking-wide">
                            {item.title}
                          </p>
                          {item.variantKey && (
                            <p className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mt-1">
                              {item.variantKey}
                            </p>
                          )}
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-stone-900">
                          {currency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {showScrollHint && (
                    <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-stone-900/90 text-white px-4 py-1.5 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest shadow-xl backdrop-blur-sm">
                      <span className="leading-none">Scroll for more</span>
                      <span className="text-sm leading-none">↓</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-stone-100">
                <div className="space-y-1.5 sm:space-y-2">
                  <Row
                    label={`Subtotal · ${detailedItems.length} items`}
                    value={currency(totals.subtotal)}
                  />
                  <Row
                    label="Shipping"
                    value={
                      shippingUpdating ? (
                        <span className="inline-flex h-4 w-14 rounded bg-stone-100 animate-pulse" />
                      ) : (
                        currency(selectedShipping?.cost ?? 0)
                      )
                    }
                  />
                  <div className="border-t border-stone-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold font-[family-name:var(--font-cormorant)] uppercase tracking-widest text-stone-900">
                        Total
                      </span>
                      <div className="text-right w-auto flex flex-col items-end">
                        <div className="text-[10px] sm:text-xs text-stone-400 font-bold tracking-widest uppercase">
                          BDT
                        </div>
                        <div className="text-lg sm:text-2xl font-bold h-7 sm:h-8 flex items-center justify-end w-full text-stone-900">
                          {shippingUpdating ? (
                            <span className="h-6 w-24 rounded bg-stone-100 animate-pulse" />
                          ) : (
                            currency(displayTotal)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

function PhoneField({ country, value, onChange, hasError = false }) {
  return (
    <div
      className={`flex overflow-hidden rounded-md border bg-white transition-colors focus-within:border-[#8b3a3a] focus-within:ring-1 focus-within:ring-[#8b3a3a] ${
        hasError ? "border-[#8b3a3a] ring-1 ring-[#8b3a3a]" : "border-stone-200"
      }`}
    >
      <span className="inline-flex items-center border-r border-stone-200 bg-stone-50 px-3 text-xs sm:text-sm text-stone-600">
        {country.label}
      </span>
      <span className="inline-flex items-center border-r border-stone-200 bg-stone-50 px-3 text-xs sm:text-sm text-stone-600">
        {country.dialCode}
      </span>
      <input
        type="tel"
        inputMode="numeric"
        placeholder="Phone Number"
        value={value}
        onChange={onChange}
        className="min-w-0 flex-1 px-3 py-2.5 text-sm sm:text-base text-stone-900 outline-none"
      />
    </div>
  );
}

function Input({ label, className = "", error, ...props }) {
  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold font-[family-name:var(--font-cormorant)] uppercase tracking-wider text-stone-500">{label}</label>
      )}
      <input
        className={`w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-300 focus:border-[#8b3a3a] focus:ring-1 focus:ring-[#8b3a3a] focus:outline-none transition-colors ${
          error ? "border-[#8b3a3a]" : "border-stone-200"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] font-semibold text-red-600 uppercase tracking-wider">{error}</p>}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs sm:text-sm">
      <span className="text-stone-500 uppercase tracking-wider text-[11px] font-bold">{label}</span>
      <div className="font-bold flex items-center justify-end text-stone-900">
        {value}
      </div>
    </div>
  );
}
