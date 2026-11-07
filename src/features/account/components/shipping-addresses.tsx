"use client";

import { ArrowLeft, Plus, SquarePen, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Address = {
  id: number;
  name: string;
  line: string;
  phone: string;
};

const INITIAL: Address[] = [
  {
    id: 1,
    name: "John Smith",
    line: "12 George Street, Sydney NSW 2000, AU",
    phone: "0412 345 678",
  },
  {
    id: 2,
    name: "John Smith",
    line: "45 Other Street, Sydney NSW 2000, AU",
    phone: "0412 345 678",
  },
];

/** Shipping Addresses (Figma `256:3299`). UI-only — no addresses backend. */
export function ShippingAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL);
  const [defaultId, setDefaultId] = useState(1);
  const [editing, setEditing] = useState<Address | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(address: Address) {
    setEditing(address);
    setFormOpen(true);
  }
  function remove(id: number) {
    setAddresses((list) => list.filter((a) => a.id !== id));
  }
  function save(data: Omit<Address, "id">) {
    if (editing) {
      setAddresses((list) =>
        list.map((a) => (a.id === editing.id ? { ...a, ...data } : a)),
      );
    } else {
      setAddresses((list) => [...list, { ...data, id: Date.now() }]);
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
            Shipping Addresses
          </h1>
          <button
            type="button"
            onClick={openAdd}
            aria-label="Add address"
            className="flex size-14 shrink-0 items-center justify-center rounded-card bg-gradient-primary text-white shadow-float transition-opacity hover:opacity-95"
          >
            <Plus className="size-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isDefault={address.id === defaultId}
              onEdit={() => openEdit(address)}
              onDelete={() => remove(address.id)}
              onSetDefault={() => setDefaultId(address.id)}
            />
          ))}
        </div>
      </div>

      {formOpen && (
        <AddressFormModal
          address={editing}
          onSave={save}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}

function AddressCard({
  address,
  isDefault,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: Address;
  isDefault: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-card-lg border border-[#E5E7EB] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-body-16-bold text-[#101828]">
            {address.name}
          </span>
          {isDefault && (
            <span className="rounded-full bg-info-500/10 px-2 py-0.5 text-caption-12-bold text-info-500">
              Default
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-secondary-900">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit address"
            className="transition-colors hover:text-info-500"
          >
            <SquarePen className="size-5" />
          </button>
          {!isDefault && (
            <button
              type="button"
              onClick={onDelete}
              aria-label="Delete address"
              className="transition-colors hover:text-error-500"
            >
              <Trash2 className="size-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-body-14 text-secondary-900">
          <Icon
            src="/icons/checkout/map-pin.svg"
            size={18}
            className="shrink-0"
          />
          {address.line}
        </span>
        <span className="flex items-center gap-2 text-body-14 text-secondary-900">
          <Icon
            src="/icons/checkout/phone.svg"
            size={18}
            className="shrink-0"
          />
          {address.phone}
        </span>
      </div>

      {!isDefault && (
        <button
          type="button"
          onClick={onSetDefault}
          className="w-fit text-body-14 font-bold text-info-500 hover:underline"
        >
          Set as default
        </button>
      )}
    </div>
  );
}

function AddressFormModal({
  address,
  onSave,
  onClose,
}: {
  address: Address | null;
  onSave: (data: Omit<Address, "id">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(address?.name ?? "");
  const [line, setLine] = useState(address?.line ?? "");
  const [phone, setPhone] = useState(address?.phone ?? "");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !line.trim()) return;
    onSave({ name: name.trim(), line: line.trim(), phone: phone.trim() });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={address ? "Edit address" : "Add address"}
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
            {address ? "Edit Address" : "Add Address"}
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
            <Label htmlFor="addr-name">Full Name</Label>
            <Input
              id="addr-name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="addr-line">Address</Label>
            <Input
              id="addr-line"
              placeholder="Street, city, state, postcode"
              value={line}
              onChange={(e) => setLine(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="addr-phone">Phone Number</Label>
            <Input
              id="addr-phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            {address ? "Save Changes" : "Add Address"}
          </Button>
        </form>
      </div>
    </div>
  );
}
