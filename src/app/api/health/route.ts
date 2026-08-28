import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "Bondor · বন্দর",
    timestamp: new Date().toISOString(),
  });
}
