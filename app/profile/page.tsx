"use client";

import { useState, type FormEvent } from "react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useProfile, useUpdateProfile } from "@/lib/hook";

function ProfileForm() {
  const { data: profile, isLoading, error } = useProfile();
  const updateProfile = useUpdateProfile();
  const [fullName, setFullName] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      await updateProfile.mutateAsync({
        fullName: (fullName ?? profile?.fullName ?? "").trim(),
        ...((displayName ?? profile?.displayName ?? "").trim()
          ? {
              displayName: (
                displayName ??
                profile?.displayName ??
                ""
              ).trim(),
            }
          : {}),
        phone: (phone ?? profile?.phone ?? "").trim(),
        address: (address ?? profile?.address ?? "").trim(),
      });
      setMessage("Profile updated successfully.");
    } catch (updateError) {
      setMessage(
        updateError instanceof Error
          ? updateError.message
          : "Could not update your profile.",
      );
    }
  }

  if (isLoading) {
    return <p className="py-12 text-center text-gray-500">Loading profile...</p>;
  }

  if (error || !profile) {
    return (
      <p role="alert" className="py-12 text-center text-red-600">
        {error instanceof Error ? error.message : "Could not load your profile."}
      </p>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-sky-500";

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid max-w-2xl gap-5">
      <label className="text-sm font-medium text-gray-700">
        Email
        <input value={profile.email} readOnly className={`${inputClass} bg-gray-100`} />
      </label>
      <label className="text-sm font-medium text-gray-700">
        Full name
        <input
          value={fullName ?? profile.fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          minLength={3}
          maxLength={140}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-gray-700">
        Display name
        <input
          value={displayName ?? profile.displayName ?? ""}
          onChange={(event) => setDisplayName(event.target.value)}
          minLength={3}
          maxLength={70}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-gray-700">
        Phone
        <input
          type="tel"
          value={phone ?? profile.phone ?? ""}
          onChange={(event) => setPhone(event.target.value)}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-medium text-gray-700">
        Address
        <input
          value={address ?? profile.address ?? ""}
          onChange={(event) => setAddress(event.target.value)}
          className={inputClass}
        />
      </label>
      {message && (
        <p
          role={updateProfile.isError ? "alert" : "status"}
          className={updateProfile.isError ? "text-sm text-red-600" : "text-sm text-green-700"}
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={updateProfile.isPending}
        className="w-fit rounded-lg bg-black px-5 py-2.5 font-medium text-white disabled:opacity-60"
      >
        {updateProfile.isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <main className="px-4 pb-24 pt-28 md:px-24 md:pt-32">
        <h1 className="text-3xl font-bold md:text-4xl">Profile settings</h1>
        <p className="mt-2 text-gray-500">
          Update your account details.
        </p>
        <ProfileForm />
      </main>
    </AuthGuard>
  );
}
