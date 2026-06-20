"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProductInfo } from "@/lib/product-info";

const EASE = [0.22, 1, 0.36, 1];

function AccordionItem({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-stone-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-stone-900 transition-colors hover:text-[var(--accent)]"
      >
        {title}
        <span
          aria-hidden
          className="relative inline-flex h-5 w-5 items-center justify-center text-lg leading-none text-stone-500"
        >
          <motion.span
            initial={false}
            animate={{ opacity: open ? 0 : 1, rotate: open ? -90 : 0, scale: open ? 0.6 : 1 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute"
          >
            +
          </motion.span>
          <motion.span
            initial={false}
            animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : 90, scale: open ? 1 : 0.6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute"
          >
            −
          </motion.span>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.32, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="pb-4">{children}</div>
      </motion.div>
    </div>
  );
}

export function ProductInfoSections({ product }) {
  const info = getProductInfo(product);
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState("");

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? "" : section));
  };

  return (
    <div className="mt-8 border-t border-stone-200 pt-8">
      <div className="text-sm leading-relaxed text-stone-600">
        <p>{info.preview}</p>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="read-more-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4">
                {info.moreParagraphs.map((paragraph) => (
                  <motion.p
                    key={paragraph}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="mt-3 text-sm font-medium text-[var(--accent)] underline-offset-2 transition-opacity hover:underline hover:opacity-80"
      >
        {expanded ? "Read less" : "Read more"}
      </button>

      <div className="mt-6 border-t border-stone-200">
        <AccordionItem
          title="Details"
          open={openSection === "details"}
          onToggle={() => toggleSection("details")}
        >
          <ul className="space-y-2 text-sm leading-relaxed text-stone-600">
            {info.details.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem
          title="Materials"
          open={openSection === "materials"}
          onToggle={() => toggleSection("materials")}
        >
          <p className="text-sm leading-relaxed text-stone-600">{info.materials}</p>
        </AccordionItem>

        <AccordionItem
          title="Care"
          open={openSection === "care"}
          onToggle={() => toggleSection("care")}
        >
          <ul className="space-y-2 text-sm leading-relaxed text-stone-600">
            {info.care.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionItem>
      </div>
    </div>
  );
}
