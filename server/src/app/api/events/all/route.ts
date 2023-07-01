import { GetBusiness } from "@/Function/Business";
import { GetAllEvents, GetEvent } from "@/Function/Event";
import { createServerClient } from "@/Functions/CreateSupabaseServer";
import { Business } from "@/Interfaces/Business";
import { Event } from "@/Interfaces/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  if (city === null) {
    return NextResponse.json({
      error: "No events found",
    });
  }

  const event = await GetAllEvents(city);

  return NextResponse.json(event);
}
