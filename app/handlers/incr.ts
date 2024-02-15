import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Create a Redis client using environment variables
const redis = Redis.fromEnv();

// Define the Route Handler function
export default async function incrHandler(req: NextRequest): Promise<NextResponse> {
  // Check if the request method is not POST
  if (req.method !== "POST") {
    // Return a 405 Method Not Allowed response
    return new NextResponse("use POST", { status: 405 });
  }

  // Check if the request Content-Type is not application/json
  if (req.headers.get("Content-Type") !== "application/json") {
    // Return a 400 Bad Request response
    return new NextResponse("must be json", { status: 400 });
  }

  // Parse the JSON body of the request
  const body = await req.json();
  // Initialize the slug variable
  let slug: string | undefined = undefined;
  // Check if the body contains a 'slug' property
  if ("slug" in body) {
    slug = body.slug;
  }
  // If slug is not found in the request body, return a 400 Bad Request response
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  // Get the IP address of the client making the request
  const ip = req.ip;
  // If IP address is available
  if (ip) {
    // Hash the IP address using SHA-256 to anonymize it
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    // Convert the hash to a hexadecimal string
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Deduplicate the IP address for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      // Set expiration time to 24 hours
      nx: true,
      ex: 24 * 60 * 60,
    });
    // If IP address is not new for this slug, return a 202 Accepted response
    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }

  // Increment the pageviews count for the specified project slug
  await redis.incr(["pageviews", "projects", slug].join(":"));
  // Return a 202 Accepted response
  return new NextResponse(null, { status: 202 });
}