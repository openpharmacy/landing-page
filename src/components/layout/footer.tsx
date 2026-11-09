"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { SUPPORT_EMAIL } from "@/features/help/data/support";
import { useShowHidden } from "@/providers/hidden-screens";

import { NoticeDialog } from "./notice-dialog";

type Notice = "store" | "compliance";

type FooterLink = {
  label: string;
  href?: string;
  notice?: Notice;
  hiddenHref?: string;
};

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Pharmacy Store", notice: "store" },
      { label: "Prescriptions", href: "/scripts" },
      {
        label: "Compliance Tracking",
        notice: "compliance",
        hiddenHref: "/compliance",
      },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Contact Us", href: `mailto:${SUPPORT_EMAIL}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const LINK =
  "w-fit text-left text-body-14 text-footer-text transition-colors hover:text-white";

const ABOUT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export function Footer() {
  const showHidden = useShowHidden();
  const pathname = usePathname();
  const [notice, setNotice] = useState<{ name: Notice; on: string } | null>(
    null,
  );
  if (notice && notice.on !== pathname) setNotice(null);
  return (
    <footer className="border-t border-footer-border bg-secondary-700 px-4 lg:pr-10 lg:pl-[120px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 pt-[63px] pb-16 lg:pb-[65px]">
        <div className="flex flex-col gap-9 lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Icon src="/icons/logo.svg" size={36} alt="" loading="eager" />
              <Image
                loading="eager"
                src="/images/footer-wordmark.webp"
                alt="OpenPharmacy"
                width={124}
                height={21}
                unoptimized
                className="h-[20.5px] w-[124.4px]"
              />
            </div>
            <p className="max-h-[180px] overflow-hidden text-body-14 text-footer-text lg:max-h-20 lg:max-w-[220px]">
              {ABOUT}
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-body-18 font-bold text-white">{col.title}</h3>
              {col.links.map((link) => {
                const href = (showHidden && link.hiddenHref) || link.href;
                if (href?.startsWith("mailto:")) {
                  return (
                    <a key={link.label} href={href} className={LINK}>
                      {link.label}
                    </a>
                  );
                }
                if (href) {
                  return (
                    <Link key={link.label} href={href} className={LINK}>
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() =>
                      setNotice(
                        link.notice
                          ? { name: link.notice, on: pathname }
                          : null,
                      )
                    }
                    className={LINK}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <p className="w-fit border-t border-footer-border pt-8 text-body-14 text-footer-text lg:w-full lg:pr-20 lg:text-center">
          © 2026 OpenPharmacy. All rights reserved.
        </p>
      </div>

      {notice?.name === "store" && (
        <NoticeDialog
          icon="/icons/help/box.svg"
          tint="bg-success-500/10"
          title="The pharmacy store isn’t available yet"
          onClose={() => setNotice(null)}
        >
          You can’t buy medicines through OpenPharmacy yet. Take your eScript to
          any pharmacy.
        </NoticeDialog>
      )}
      {notice?.name === "compliance" && (
        <NoticeDialog
          icon="/icons/home/card-compliance.svg"
          tint="bg-[#e18cb2]/10"
          title="Compliance tracking isn’t available yet"
          onClose={() => setNotice(null)}
        >
          Logging doses, side effects and vitals isn’t on the web yet.
        </NoticeDialog>
      )}
    </footer>
  );
}
