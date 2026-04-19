import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const upstream = await fetch("https://n8n.srv1472583.hstgr.cloud/webhook/meal-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      return new NextResponse(text || JSON.stringify({ error: "Upstream webhook failed." }), {
        status: upstream.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Webhook returned an empty response body." },
        { status: 502 }
      );
    }

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed, { status: 200 });
    } catch {
      
      return NextResponse.json(
        {
          error: "Webhook returned non-JSON response.",
          raw: text,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Meal upload proxy failed:", error);

    return NextResponse.json(
      { error: "Failed to reach meal analysis service." },
      { status: 500 }
    );
  }
}