import { GetBusiness } from "@/Function/Business";
import { createServerClient } from "@/Functions/CreateSupabaseServer";
import { Business } from "@/Interfaces/Business";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id === null) {
    return NextResponse.json({
      error: "No business found",
    });
  }

  const business = await GetBusiness(id);

  return NextResponse.json(
    business
      ? {
          error: "No business found",
        }
      : business
  );
}
