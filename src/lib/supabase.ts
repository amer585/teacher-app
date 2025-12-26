import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = 'https://ulkperthcztnnmnfjsbz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsa3BlcnRoY3p0bm5tbmZqc2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NTcwNDcsImV4cCI6MjA4MTMzMzA0N30.zl-xXG-pNPmsyPgZ57viXlQMuvS4jOQPUirSMg8GNUs';

// Platform-aware storage configuration
const getStorageConfig = () => {
    if (Platform.OS === 'web') {
        // For web/Tauri, use built-in localStorage
        return {
            storage: {
                getItem: (key: string) => {
                    if (typeof window !== 'undefined') {
                        return window.localStorage.getItem(key);
                    }
                    return null;
                },
                setItem: (key: string, value: string) => {
                    if (typeof window !== 'undefined') {
                        window.localStorage.setItem(key, value);
                    }
                },
                removeItem: (key: string) => {
                    if (typeof window !== 'undefined') {
                        window.localStorage.removeItem(key);
                    }
                },
            },
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        };
    } else {
        // For mobile, use AsyncStorage
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        };
    }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: getStorageConfig(),
});
