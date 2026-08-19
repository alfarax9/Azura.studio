import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Sanity webhook target. Point a document-change webhook at this route with a
 * shared secret and edits go live without a redeploy.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 501 });
  }

  if (request.headers.get("x-webhook-secret") !== secret) {
    return NextResponse.json({ message: "Invalid secret." }, { status: 401 });
  }

  let body: { _type?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed payload." }, { status: 400 });
  }

  if (!body._type) {
    return NextResponse.json({ message: "Payload is missing _type." }, { status: 400 });
  }

  // "max" purges the tag outright; the next request re-fetches from Sanity.
  revalidateTag(body._type, "max");
  return NextResponse.json({ revalidated: body._type, now: Date.now() });
}
