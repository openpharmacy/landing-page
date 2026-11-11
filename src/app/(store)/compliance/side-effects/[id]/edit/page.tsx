import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { EditSideEffect } from "@/features/compliance/components/log/edit-side-effect";
import { SideEffectDiary } from "@/features/compliance/components/reports/side-effect-diary";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Edit Side Effect · Open Pharmacy" };

export default async function EditSideEffectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const { id } = await params;
  const user = await getServerSession();
  if (!user) {
    redirect(
      `/sign-in?next=${encodeURIComponent(`/compliance/side-effects/${encodeURIComponent(id)}/edit`)}`,
    );
  }

  return (
    <>
      <div className="max-lg:hidden" inert>
        <SideEffectDiary />
      </div>
      <EditSideEffect id={id} />
    </>
  );
}
