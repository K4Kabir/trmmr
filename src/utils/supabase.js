import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ceerhlurthkovoqmvlay.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZXJobHVydGhrb3ZvcW12bGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMTE4NTgsImV4cCI6MjAzNDc4Nzg1OH0.XeZXkz_mXo1NNmyFzwrtwotNZk9M6geHMRJmdXxk2h4";

export const supabase = createClient(supabaseUrl, supabaseKey);
