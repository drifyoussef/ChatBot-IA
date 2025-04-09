// filepath: c:\Users\youss\Desktop\Dev projects\ChatBot IA\front\src\vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_OPENAI_API_KEY: string;
    // Add other environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }