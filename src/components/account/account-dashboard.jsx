"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddAddressModal } from "@/components/account/add-address-modal";
import { useAuth } from "@/contexts/auth-context";

const MENU_ITEMS = [
  { id: "profile", label: "Profile" },
  { id: "orders", label: "Order History" },
  { id: "addresses", label: "Addresses" },
  { id: "gift-cards", label: "Gift Cards" },
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-stone-200 bg-white px-6 py-16 text-center">
      <p className="text-base font-semibold text-stone-900">No Data</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-500">
        Currently, there are no entries to display. Please add data to populate
        this table.
      </p>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
      {action}
    </div>
  );
}

function ProfileSection({ user }) {
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone ? `+880${user.phone}` : "",
  });

  return (
    <div>
      <SectionHeader
        title="Profile"
        action={
          <button
            type="button"
            onClick={() => setEditing((value) => !value)}
            className="text-sm font-medium text-[var(--primary)] underline-offset-2 transition-opacity hover:underline hover:opacity-80"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        }
      />
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        {editing ? (
          <form className="divide-y divide-stone-100">
            <label className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="text-sm font-medium text-stone-500">Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="text-sm font-medium text-stone-500">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                className="rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="text-sm font-medium text-stone-500">Phone</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                className="rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-none focus:border-[var(--primary)]"
              />
            </label>
            <div className="flex justify-end px-5 py-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <dl className="divide-y divide-stone-100">
            <div className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]">
              <dt className="text-sm font-medium text-stone-500">Name</dt>
              <dd className="text-sm text-stone-900">{form.name}</dd>
            </div>
            <div className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]">
              <dt className="text-sm font-medium text-stone-500">Email</dt>
              <dd className="text-sm text-stone-900">{form.email}</dd>
            </div>
            {form.phone ? (
              <div className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr]">
                <dt className="text-sm font-medium text-stone-500">Phone</dt>
                <dd className="text-sm text-stone-900">{form.phone}</dd>
              </div>
            ) : null}
          </dl>
        )}
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-stone-200 bg-white">
        {changingPassword ? (
          <form className="divide-y divide-stone-100">
            <label className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="text-sm font-medium text-stone-500">Current Password</span>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    current: event.target.value,
                  }))
                }
                className="rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="text-sm font-medium text-stone-500">New Password</span>
              <input
                type="password"
                value={passwordForm.next}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    next: event.target.value,
                  }))
                }
                className="rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="text-sm font-medium text-stone-500">Confirm Password</span>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    confirm: event.target.value,
                  }))
                }
                className="rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-none focus:border-[var(--primary)]"
              />
            </label>
            <div className="flex justify-end gap-3 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  setChangingPassword(false);
                  setPasswordForm({ current: "", next: "", confirm: "" });
                }}
                className="inline-flex items-center justify-center rounded-md border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setChangingPassword(false);
                  setPasswordForm({ current: "", next: "", confirm: "" });
                }}
                className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <dl>
            <div className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center">
              <dt className="text-sm font-medium text-stone-500">Password</dt>
              <dd className="flex items-center justify-between gap-3 text-sm text-stone-900">
                <span className="tracking-widest text-stone-600">••••••••</span>
                <button
                  type="button"
                  onClick={() => setChangingPassword(true)}
                  className="shrink-0 text-sm font-medium text-[var(--primary)] underline-offset-2 transition-opacity hover:underline hover:opacity-80"
                >
                  Change pass
                </button>
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}

function AddressesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  function handleSaveAddress(address) {
    setAddresses((current) => {
      const next = address.isDefault
        ? current.map((item) => ({ ...item, isDefault: false }))
        : current;
      return [...next, { ...address, id: crypto.randomUUID() }];
    });
  }

  return (
    <div>
      <SectionHeader
        title="Saved Addresses"
        action={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Add New Address
          </button>
        }
      />

      {addresses.length > 0 ? (
        <ul className="space-y-4">
          {addresses.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-stone-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-stone-900">{item.title}</p>
                  <p className="mt-1 text-sm text-stone-600">{item.recipientName}</p>
                </div>
                {item.isDefault ? (
                  <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600">
                    Default
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {item.address}
                <br />
                {item.city}, {item.country}
              </p>
              <p className="mt-2 text-sm text-stone-600">
                +{item.dialCode ?? "880"}
                {item.phone}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState />
      )}

      <AddAddressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAddress}
      />
    </div>
  );
}

function GenericSection({ title }) {
  return (
    <div>
      <SectionHeader title={title} />
      <EmptyState />
    </div>
  );
}

function getFirstName(name) {
  return name.split(" ")[0]?.toLowerCase() ?? name.toLowerCase();
}

export function AccountDashboard() {
  const router = useRouter();
  const { user, ready, isAuthenticated, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace("/login?redirect=/account");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated || !user) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-14">
        <div className="space-y-6">
          <div className="h-16 rounded bg-stone-200" />
          <div className="h-12 rounded bg-stone-200" />
          <div className="h-80 rounded bg-stone-200" />
        </div>
      </div>
    );
  }

  const firstName = getFirstName(user.name);

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  function renderSection() {
    switch (activeSection) {
      case "profile":
        return <ProfileSection user={user} />;
      case "orders":
        return <GenericSection title="Order History" />;
      case "addresses":
        return <AddressesSection />;
      case "gift-cards":
        return <GenericSection title="Gift Cards" />;
      default:
        return <ProfileSection user={user} />;
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-stone-500">Welcome Back,</p>
          <p className="mt-0.5 text-xl font-semibold text-stone-900">{firstName}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm font-medium text-[var(--primary)] underline-offset-2 transition-opacity hover:underline hover:opacity-80"
        >
          Sign Out
        </button>
      </div>

      <nav className="mt-6 border-b border-stone-200">
        <ul className="-mb-px flex gap-1 overflow-x-auto pb-px">
          {MENU_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors ${
                    active
                      ? "border-[var(--primary)] font-semibold text-[var(--primary)]"
                      : "border-transparent font-medium text-stone-600 hover:border-stone-300 hover:text-stone-900"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="mt-8 min-w-0">{renderSection()}</main>
    </div>
  );
}
