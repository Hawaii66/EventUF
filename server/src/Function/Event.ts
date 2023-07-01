import { createServerClient } from "@/Functions/CreateSupabaseServer";
import { GetBusiness } from "./Business";
import { Event } from "@/Interfaces/Event";

export const GetEvent = async (id: number): Promise<Event | null> => {
  const supabase = createServerClient();
  const data = await supabase.from("events").select("*").eq("id", id).single();
  if (data.error) {
    return null;
  }

  const business = await GetBusiness(data.data.business);

  if (business === null) {
    return null;
  }

  const colaborator =
    data.data.colaborator === null
      ? null
      : await GetBusiness(data.data.colaborator);

  const event: Event = {
    business: business,
    colaboration: colaborator,
    description: data.data.description,
    end: data.data.end,
    id: data.data.id,
    name: data.data.name,
    price: data.data.price,
    sponsored: data.data.sponsored,
    start: data.data.start,
    type: data.data.type,
    image: data.data.image,
  };

  return event;
};

export const GetAllEvents = async (city: string): Promise<(Event | null)[]> => {
  const supabase = createServerClient();
  const data = await supabase.from("events").select("id").eq("city", city);

  if (data.error) {
    return [];
  }

  console.log(data);

  const promises: Promise<Event | null>[] = [];
  for (var i = 0; i < data.data.length; i++) {
    const id = data.data[i].id;
    promises.push(GetEvent(id));
  }

  return Promise.all(promises);
};
