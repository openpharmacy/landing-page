import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

import { SignInOptions } from "./sign-in-options";
import { SignUpOptions } from "./sign-up-options";

const push = vi.fn();
const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const actions = vi.hoisted(() => ({ signInWithProvider: vi.fn() }));
vi.mock("../hooks/use-auth-actions", () => ({
  useAuthActions: () => actions,
}));

const mode = vi.hoisted(() => ({ mock: false }));
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return mode.mock;
  },
}));

const sdk = vi.hoisted(() => ({
  prepareGoogle: vi.fn(),
  prepareApple: vi.fn(),
}));
vi.mock("../api/provider-sdk", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../api/provider-sdk")>()),
  ...sdk,
}));

const click = (name: string) =>
  fireEvent.click(screen.getByRole("button", { name }));

beforeEach(() => {
  mode.mock = false;
  push.mockClear();
  refresh.mockClear();
  actions.signInWithProvider.mockReset();
  sdk.prepareGoogle.mockReset();
  sdk.prepareApple.mockReset();
});
afterEach(() => vi.unstubAllEnvs());

describe("mock mode", () => {
  beforeEach(() => {
    mode.mock = true;
  });

  it("signs in through the mock account chooser and the real route", async () => {
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "demo", email: "j@e.com" },
      isNewUser: false,
    });
    render(<SignInOptions next="/scripts" />);
    click("Sign in with Google");
    fireEvent.click(screen.getByRole("button", { name: /cody\.b@gmail\.com/ }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/scripts"));
    expect(actions.signInWithProvider).toHaveBeenCalledWith("google", {
      id_token: expect.any(String),
    });
    expect(sdk.prepareGoogle).not.toHaveBeenCalled();
  });

  it("continues sign-up to the name step with the picked account", async () => {
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "demo", email: "j@e.com" },
      isNewUser: false,
    });
    render(<SignUpOptions next={null} />);
    click("Sign up with Google");
    fireEvent.click(screen.getByRole("button", { name: /cody\.b@gmail\.com/ }));
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith(
        "/sign-up/google?first=Cody&last=Banks",
      ),
    );
  });

  it("keeps ?next= through the name step", async () => {
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "demo", email: "j@e.com" },
      isNewUser: false,
    });
    render(<SignUpOptions next="/scripts" />);
    click("Sign up with Google");
    fireEvent.click(screen.getByRole("button", { name: /cody\.b@gmail\.com/ }));
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith(
        "/sign-up/google?first=Cody&last=Banks&next=%2Fscripts",
      ),
    );
  });
});

describe("real mode", () => {
  it("says Google and Apple are not available without client ids", () => {
    render(<SignInOptions next={null} />);
    click("Sign in with Google");
    expect(
      screen.getByText("Social sign-in isn't available yet."),
    ).toBeInTheDocument();
    click("Sign in with Apple");
    expect(
      screen.getByText("Social sign-in isn't available yet."),
    ).toBeInTheDocument();
    expect(sdk.prepareGoogle).not.toHaveBeenCalled();
    expect(sdk.prepareApple).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("signs in with Google's ID token and goes to ?next=", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    const request = vi
      .fn()
      .mockResolvedValue({ id_token: "google-token", nonce: "raw-nonce" });
    sdk.prepareGoogle.mockResolvedValue({ request });
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "u-1", email: "g@b.com" },
      isNewUser: false,
    });

    render(<SignInOptions next="/account" />);
    await waitFor(() =>
      expect(sdk.prepareGoogle).toHaveBeenCalledWith("client-1", "signin"),
    );
    await Promise.resolve();
    click("Sign in with Google");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/account"));
    expect(actions.signInWithProvider).toHaveBeenCalledWith("google", {
      id_token: "google-token",
      nonce: "raw-nonce",
    });
  });

  it("sends a new Apple user to the name step", async () => {
    vi.stubEnv("NEXT_PUBLIC_APPLE_SERVICES_ID", "services-1");
    const request = vi.fn().mockResolvedValue({
      id_token: "apple-token",
      nonce: "raw-nonce",
      name: "Gail",
      surname: "Ng",
    });
    sdk.prepareApple.mockResolvedValue({ request });
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "u-1", email: "g@b.com" },
      isNewUser: true,
    });

    render(<SignInOptions next="/account" />);
    await waitFor(() => expect(sdk.prepareApple).toHaveBeenCalled());
    await Promise.resolve();
    click("Sign in with Apple");
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/sign-up/google?next=%2Faccount"),
    );
    expect(actions.signInWithProvider).toHaveBeenCalledWith(
      "apple",
      expect.objectContaining({ name: "Gail", surname: "Ng" }),
    );
  });

  it("signs an existing account in from sign-up and goes to ?next=", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    sdk.prepareGoogle.mockResolvedValue({
      request: vi.fn().mockResolvedValue({ id_token: "t", nonce: "n" }),
    });
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "u-1", email: "g@b.com" },
      isNewUser: false,
    });
    render(<SignUpOptions next="/scripts" />);
    await waitFor(() =>
      expect(sdk.prepareGoogle).toHaveBeenCalledWith("client-1", "signup"),
    );
    await Promise.resolve();
    click("Sign up with Google");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/scripts"));
  });

  it("sends a new account from sign-up to the name step with ?next=", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    sdk.prepareGoogle.mockResolvedValue({
      request: vi.fn().mockResolvedValue({ id_token: "t", nonce: "n" }),
    });
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "u-1", email: "g@b.com" },
      isNewUser: true,
    });
    render(<SignUpOptions next="/scripts" />);
    await waitFor(() => expect(sdk.prepareGoogle).toHaveBeenCalled());
    await Promise.resolve();
    click("Sign up with Google");
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/sign-up/google?next=%2Fscripts"),
    );
  });

  it("waits for a script that is still loading when clicked", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    let loaded: (prepared: unknown) => void = () => {};
    sdk.prepareGoogle.mockReturnValue(
      new Promise((resolve) => {
        loaded = resolve;
      }),
    );
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "u-1", email: "g@b.com" },
      isNewUser: false,
    });
    render(<SignInOptions next={null} />);
    click("Sign in with Google");
    expect(screen.queryByText(/isn't available/)).not.toBeInTheDocument();

    loaded({
      request: vi.fn().mockResolvedValue({ id_token: "t", nonce: "n" }),
    });
    await waitFor(() => expect(push).toHaveBeenCalledWith("/home"));
    expect(sdk.prepareGoogle).toHaveBeenCalledOnce();
  });

  it("tries a script that failed to load again on the next click", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    sdk.prepareGoogle
      .mockRejectedValueOnce(new Error("Could not load"))
      .mockRejectedValueOnce(new Error("Could not load"))
      .mockResolvedValue({
        request: vi.fn().mockResolvedValue({ id_token: "t", nonce: "n" }),
      });
    actions.signInWithProvider.mockResolvedValue({
      user: { id: "u-1", email: "g@b.com" },
      isNewUser: false,
    });
    render(<SignInOptions next={null} />);
    await waitFor(() => expect(sdk.prepareGoogle).toHaveBeenCalledTimes(1));
    click("Sign in with Google");
    expect(
      await screen.findByText(
        "Google sign-in could not load. Check your connection and try again.",
      ),
    ).toBeInTheDocument();
    click("Sign in with Google");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/home"));
    expect(sdk.prepareGoogle).toHaveBeenCalledTimes(3);
  });

  it("shows the API's message when it refuses the token", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    sdk.prepareGoogle.mockResolvedValue({
      request: vi.fn().mockResolvedValue({ id_token: "t", nonce: "n" }),
    });
    actions.signInWithProvider.mockRejectedValue(
      new ApiError({
        status: 401,
        message: "Invalid Credentials. Please try again.",
        code: "http_401",
      }),
    );
    render(<SignUpOptions next={null} />);
    await waitFor(() => expect(sdk.prepareGoogle).toHaveBeenCalled());
    await Promise.resolve();
    click("Sign up with Google");
    expect(
      await screen.findByText("Invalid Credentials. Please try again."),
    ).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("says nothing when the user closes the provider's window", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID", "client-1");
    sdk.prepareGoogle.mockResolvedValue({
      request: vi.fn().mockRejectedValue(new Error("cancelled")),
    });
    render(<SignInOptions next={null} />);
    await waitFor(() => expect(sdk.prepareGoogle).toHaveBeenCalled());
    await Promise.resolve();
    click("Sign in with Google");
    await Promise.resolve();
    expect(actions.signInWithProvider).not.toHaveBeenCalled();
    expect(screen.queryByText(/isn't available/)).not.toBeInTheDocument();
  });
});

describe("links", () => {
  const href = (name: string) =>
    screen.getByRole("link", { name }).getAttribute("href");

  it("keeps ?next= from sign-in to sign-up", () => {
    const { unmount } = render(<SignInOptions next="/scripts" />);
    expect(href("Sign up")).toBe("/sign-up?next=%2Fscripts");
    unmount();
    render(<SignInOptions next={null} />);
    expect(href("Sign up")).toBe("/sign-up");
  });

  it("keeps ?next= on the sign-up chooser's links", () => {
    const { unmount } = render(<SignUpOptions next="/scripts" />);
    expect(href("Sign up email")).toBe("/sign-up/email?next=%2Fscripts");
    expect(href("Sign in")).toBe("/sign-in?next=%2Fscripts");
    unmount();
    render(<SignUpOptions next={null} />);
    expect(href("Sign up email")).toBe("/sign-up/email");
    expect(href("Sign in")).toBe("/sign-in");
  });
});
