import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Landing } from "@/features/home/components/landing";

describe("Landing", () => {
  it("renders the hero heading and the sign-up call to action", () => {
    render(<Landing />);
    expect(
      screen.getByRole("heading", { level: 1, name: /smarter prescriptions/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Get Started Free" }),
    ).toHaveAttribute("href", "/sign-up");
  });

  it("links the store badges to the app's store pages", () => {
    render(<Landing />);
    const play = screen.getByRole("link", { name: "Get it on Google Play" });
    const appStore = screen.getByRole("link", {
      name: "Download on the App Store",
    });
    expect(play).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.openpharmacy.production",
    );
    expect(appStore).toHaveAttribute(
      "href",
      "https://apps.apple.com/au/app/openpharmacy/id6751562406",
    );
    for (const link of [play, appStore]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("has no pharmacy or shop content", () => {
    render(<Landing />);
    expect(screen.queryByText(/easier refills/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/browse shop/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/order without/i)).not.toBeInTheDocument();
  });

  it("lists three features and three steps ending with Stay on Track", () => {
    render(<Landing />);
    const features = screen
      .getByRole("heading", { name: "Medication management made simple." })
      .closest("section");
    expect(features).not.toBeNull();
    expect(within(features!).getAllByRole("listitem")).toHaveLength(3);

    const steps = screen
      .getByRole("heading", { name: "How It Works" })
      .closest("section");
    expect(steps).not.toBeNull();
    const items = within(steps!).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[2]).toHaveTextContent("Stay on Track");
  });
});
