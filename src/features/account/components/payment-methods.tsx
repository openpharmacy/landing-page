"use client";

import { ArrowLeft, Plus, SquarePen, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Card = {
  id: number;
  brand: string;
  last4: string;
  expiry: string;
};

const INITIAL: Card[] = [
  { id: 1, brand: "Visa", last4: "3456", expiry: "12/25" },
];

/** Payment Methods (Figma `257:3429`). UI-only — no payments backend. */
export function PaymentMethods() {
  const [cards, setCards] = useState<Card[]>(INITIAL);
  const [defaultId, setDefaultId] = useState(1);
  const [editing, setEditing] = useState<Card | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }
  function save(data: Omit<Card, "id">) {
    if (editing) {
      setCards((list) =>
        list.map((c) => (c.id === editing.id ? { ...c, ...data } : c)),
      );
    } else {
      setCards((list) => [...list, { ...data, id: Date.now() }]);
    }
    setFormOpen(false);
  }

  return (
    <div className="mx-auto w-full max-w-[670px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-6">
        <Link
          href="/account"
          className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Payment Methods
          </h1>
          <button
            type="button"
            onClick={openAdd}
            aria-label="Add payment method"
            className="flex size-14 shrink-0 items-center justify-center rounded-card bg-gradient-primary text-white shadow-float transition-opacity hover:opacity-95"
          >
            <Plus className="size-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-start gap-4 rounded-card-lg border border-[#E5E7EB] bg-white p-6"
            >
              <Icon
                src="/icons/account/payment.svg"
                size={44}
                className="shrink-0"
              />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-body-16-bold text-[#101828]">
                    {card.brand}
                  </span>
                  {card.id === defaultId && (
                    <span className="rounded-full bg-info-500/10 px-2 py-0.5 text-caption-12-bold text-info-500">
                      Default
                    </span>
                  )}
                </div>
                <span className="text-body-14 text-secondary-500">
                  Credit/Debit Card
                </span>
                <span className="text-body-14 text-secondary-900">
                  •••• {card.last4}
                </span>
                <span className="text-body-14 text-secondary-300">
                  Expires {card.expiry}
                </span>
                {card.id !== defaultId && (
                  <button
                    type="button"
                    onClick={() => setDefaultId(card.id)}
                    className="mt-1 w-fit text-body-14 font-bold text-info-500 hover:underline"
                  >
                    Set as default
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 text-secondary-900">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(card);
                    setFormOpen(true);
                  }}
                  aria-label="Edit card"
                  className="transition-colors hover:text-info-500"
                >
                  <SquarePen className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCards((list) => list.filter((c) => c.id !== card.id))
                  }
                  aria-label="Delete card"
                  className="transition-colors hover:text-error-500"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {formOpen && (
        <CardFormModal
          card={editing}
          onSave={save}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}

function CardFormModal({
  card,
  onSave,
  onClose,
}: {
  card: Card | null;
  onSave: (data: Omit<Card, "id">) => void;
  onClose: () => void;
}) {
  const [number, setNumber] = useState(
    card ? `•••• •••• •••• ${card.last4}` : "",
  );
  const [expiry, setExpiry] = useState(card?.expiry ?? "");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const digits = number.replace(/\D/g, "");
    const last4 =
      digits.length >= 4 ? digits.slice(-4) : (card?.last4 ?? "0000");
    onSave({ brand: card?.brand ?? "Visa", last4, expiry: expiry || "12/25" });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={card ? "Edit card" : "Add card"}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[448px] rounded-card bg-white shadow-card">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-300 p-6">
          <h2 className="text-h4-24 text-[#101828]">
            {card ? "Edit Card" : "Add Card"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-900 transition-colors hover:text-secondary-500"
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-[23px] p-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-expiry">Expiry Date</Label>
            <Input
              id="card-expiry"
              inputMode="numeric"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            {card ? "Save Changes" : "Add Card"}
          </Button>
        </form>
      </div>
    </div>
  );
}
