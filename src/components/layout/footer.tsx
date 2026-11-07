import Link from "next/link";

import { Icon } from "@/components/ui/icon";

import { Container } from "./container";

const COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Pharmacy Store", href: "/shop" },
      { label: "Prescriptions", href: "/scripts" },
      { label: "Compliance Tracking", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary-700 text-footer-text">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon src="/icons/logo.svg" size={32} alt="OpenPharmacy" />
              <span className="text-wordmark text-white">OpenPharmacy</span>
            </div>
            <p className="max-w-xs text-body-14">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-subtitle-18-bold text-white">{col.title}</h3>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-body-14 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-footer-border pt-8 text-center text-body-14">
          © 2026 OpenPharmacy. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
