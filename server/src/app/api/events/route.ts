import { GetBusiness } from "@/Function/Business";
import { GetEvent } from "@/Function/Event";
import { createServerClient } from "@/Functions/CreateSupabaseServer";
import { Business } from "@/Interfaces/Business";
import { Event } from "@/Interfaces/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id === null) {
    return NextResponse.json({
      error: "No business found",
    });
  }

  const event = await GetEvent(parseInt(id));

  if (event === null) {
    return NextResponse.json({
      error: "No event found",
    });
  }

  return NextResponse.json(event);
}
