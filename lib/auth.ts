import { NextResponse } from "next/server";

import { getIngestApiKey } from "@/lib/env";

export function hasValidApiKey(request: Request): boolean {
  const expected = getIngestApiKey();

  if (!expected) {
    return false;
  }

  return request.headers.get("x-api-key") === expected;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
