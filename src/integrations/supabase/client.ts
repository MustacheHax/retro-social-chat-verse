// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dedpfpvpitpqikhqfawk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZHBmcHZwaXRwcWlraHFmYXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTEyMzUsImV4cCI6MjA2NDU2NzIzNX0.rgiRmfRr_SOOLKwRaWdCLi7m4pB5LEd9_L3b_98tSkg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);