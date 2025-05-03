// global.d.ts
export {};

declare global {
  interface Window {
    ic: {
      authClient: any; // bisa juga gunakan AuthClient dari @dfinity/auth-client
    };
  }
}
