import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://n8n.srv1472583.hstgr.cloud/webhook/dashboard-summary", {
      method: "GET",
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return new NextResponse(
        text || JSON.stringify({ error: "Upstream dashboard webhook failed." }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Dashboard webhook returned an empty response body." },
        { status: 502 }
      );
    }

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed, { status: 200 });
    } catch {
      return NextResponse.json(
        {
          error: "Dashboard webhook returned non-JSON response.",
          raw: text,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Dashboard summary proxy failed:", error);

    return NextResponse.json(
      { error: "Failed to reach dashboard summary service." },
      { status: 500 }
    );
  }
}