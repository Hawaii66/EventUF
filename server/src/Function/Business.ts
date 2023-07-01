import { createServerClient } from "@/Functions/CreateSupabaseServer";
import { Business } from "@/Interfaces/Business";

export const GetBusiness = async (
  id: string | number
): Promise<Business | null> => {
  const localId = typeof id === "string" ? parseInt(id) : id;

  const supabase = await createServerClient();
  const data = await supabase
    .from("business")
    .select("*")
    .eq("id", localId)
    .single();
  if (data.error) {
    return null;
  }

  const business: Business = {
    city: data.data.city,
    description: data.data.description,
    id: data.data.id,
    image: data.data.image,
    name: data.data.name,
  };

  return business;
};
