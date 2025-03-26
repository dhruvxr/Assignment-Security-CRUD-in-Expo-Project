import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nygsvmruhgzalyoanekx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55Z3N2bXJ1aGd6YWx5b2FuZWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTQzNzYsImV4cCI6MjA1ODQ5MDM3Nn0.Qlxo4r7juZxvj_efwWhlnMiWp79codJ0zhbtbUAFnbo"; // Replace with your actual key

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // Ensures the user stays logged in
  },
});

export default supabase  ;
