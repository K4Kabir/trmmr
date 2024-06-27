import { supabase } from "../supabase";

export const getClicksForUrl = async function (urlIds) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .in("url_id", urlIds);

    if (error) {
      throw new Error("Cannot get clicks");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
