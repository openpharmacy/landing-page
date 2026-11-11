import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { HelpfulVote } from "./helpful-vote";

const yes = () => screen.getByRole("button", { name: "Yes" });
const no = () => screen.getByRole("button", { name: "No" });

beforeEach(() => {
  localStorage.clear();
});

describe("HelpfulVote", () => {
  it("thanks the reader and keeps the vote for that article", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<HelpfulVote slug="a" />);
    expect(screen.getByText("Was this article helpful?")).toBeInTheDocument();
    expect(yes()).toHaveAttribute("aria-pressed", "false");

    await user.click(yes());
    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
    expect(yes()).toHaveAttribute("aria-pressed", "true");
    expect(JSON.parse(localStorage.getItem("op_help_votes")!)).toEqual({
      a: "yes",
    });

    unmount();
    render(<HelpfulVote slug="a" />);
    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
    expect(yes()).toHaveAttribute("aria-pressed", "true");
  });

  it("lets the vote change and keeps other articles apart", async () => {
    const user = userEvent.setup();
    localStorage.setItem("op_help_votes", JSON.stringify({ a: "yes" }));
    render(<HelpfulVote slug="b" />);
    expect(screen.getByText("Was this article helpful?")).toBeInTheDocument();
    await user.click(no());
    await user.click(yes());
    expect(yes()).toHaveAttribute("aria-pressed", "true");
    expect(no()).toHaveAttribute("aria-pressed", "false");
    expect(JSON.parse(localStorage.getItem("op_help_votes")!)).toEqual({
      a: "yes",
      b: "yes",
    });
  });

  it("ignores a damaged stored value", () => {
    localStorage.setItem("op_help_votes", "{not json");
    render(<HelpfulVote slug="a" />);
    expect(screen.getByText("Was this article helpful?")).toBeInTheDocument();
  });
});
