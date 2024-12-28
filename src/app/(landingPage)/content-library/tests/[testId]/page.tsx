import { notFound } from "next/navigation";

import { onGetSingleTest } from "@/actions/learnings";
import TestComponent from "./_components/test-component";

export default async function TestPage({
  params,
}: {
  params: { testId: string };
}) {
  const test = await onGetSingleTest(params.testId);

  if (!test.data) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <TestComponent test={test.data} />
    </div>
  );
}
