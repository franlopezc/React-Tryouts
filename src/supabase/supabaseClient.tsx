import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://ubmemlobornousvbpbwq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVibWVtbG9ib3Jub3VzdmJwYndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4OTY3MjcsImV4cCI6MjA1MjQ3MjcyN30.n_YZBEk__gLzNMFXrauaYzbeZnmtA2bhZgdEoltzSI8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;