import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Loops.so API endpoint
    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
    
    if (!LOOPS_API_KEY) {
      // If no API key, just log and return success (for testing)
      console.log("Waitlist signup (no Loops API key):", email);
      return NextResponse.json(
        { success: true, message: "Added to waitlist", email: email },
        { status: 200 }
      );
    }

    // Send to Loops.so
    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "wearx_waitlist",
        subscribed: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Loops.so error:", error);
      return NextResponse.json(
        { error: "Failed to add to waitlist" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
