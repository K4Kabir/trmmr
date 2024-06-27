import { UAParser } from "ua-parser-js";
import { supabase } from "../supabase";

export const getUrls = async function (user_id, title) {
  try {
    let query = supabase.from("urls").select("*").eq("user_id", user_id);

    if (title) {
      query = query.ilike("title", `%${title}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error("Cannot get URLs");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUrlsById = async function (urlId) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("*")
      .eq("id", urlId)
      .single();

    if (error) {
      throw new Error("Cannot get URL details");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStats = async function (urlId) {
  try {
    const { data, error } = await supabase
      .from("clicks")
      .select("*")
      .eq("url_id", urlId);

    if (error) {
      throw new Error(
        "Cannot Fetch the Stats.. Please contact the administrator"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUrls = async function (urlId) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .delete()
      .eq("id", urlId);

    if (error) {
      throw new Error("Cannot delete URLs");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUrl = async function ({
  title,
  long_url,
  custom_url,
  user_id,
}) {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  // const fileName = `qr-${shortUrl}`;

  // const { error: storageError } = await supabase.storage
  //   .from("qrs")
  //   .upload(fileName, qrCode);

  // if (storageError) {
  //   throw new Error("Something went wrong while saving qr code");
  // }

  //const qr = `https://ceerhlurthkovoqmvlay.supabase.co/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: long_url,
        custom_url: custom_url || null,
        user_id,
        short_url: shortUrl,
        // qr,
      },
    ])
    .select();
  if (error) throw new Error("Something went wrong while creating custom URL");
  return data;
};

export const getLongUrl = async function (id) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("id, original_url")
      .or(`short_url.eq.${id}, custom_url.eq.${id}`)
      .single();

    if (error) {
      throw new Error("No URL Found to Redirect");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const parser = new UAParser();

export const storeClicks = async function ({ id, original_url }) {
  try {
    const res = parser.getResult();
    console.log(res, "RESULT");
    const device = res.type || "desktop";
    let res2 = await fetch("https://ipapi.co/json");
    const { country, city } = await res2.json();

    let { error } = await supabase.from("clicks").insert({
      url_id: id,
      device,
      country,
      city,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!/^https?:\/\//i.test(original_url)) {
      original_url = "http://" + original_url;
    }
    window.location.href = original_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
