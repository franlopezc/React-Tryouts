interface ImportMetaEnv {
  VITE_WEATHER_API_KEY: string;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_KEY: string;
  // Add other environment variables you need here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
