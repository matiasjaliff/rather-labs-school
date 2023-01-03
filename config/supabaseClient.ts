import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with the database
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
