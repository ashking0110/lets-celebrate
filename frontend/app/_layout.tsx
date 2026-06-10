import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { store, RootState } from '../store';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthScreen = segments[0] === 'login';
    if (!token && !inAuthScreen) {
      router.replace('/login');
    }
  }, [token, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthGuard>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="service/[id]" options={{ presentation: 'modal', title: 'Service Details' }} />
            <Stack.Screen name="vendor/[id]" options={{ presentation: 'modal', title: 'Vendor Details' }} />
            <Stack.Screen name="checkout" options={{ presentation: 'modal', title: 'Checkout' }} />
          </Stack>
        </AuthGuard>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
