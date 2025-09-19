import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c29f6e7f683f461e8b34a246850c6104',
  appName: 'Presence - Smart Attendance',
  webDir: 'dist',
  server: {
    url: 'https://c29f6e7f-683f-461e-8b34-a246850c6104.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#8B5CF6",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  }
};

export default config;