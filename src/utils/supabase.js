import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwibzytoscsywzulyinv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aWJ6eXRvc2NzeXd6dWx5aW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTAyNjgsImV4cCI6MjA3NzU2NjI2OH0.vzK08OAEaanbn6X1W5ViFzs10PNcc10Cy5JsVzN7W7g";

export const supabase = createClient(supabaseUrl, supabaseKey);
