import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://ulkperthcztnnmnfjsbz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsa3BlcnRoY3p0bm5tbmZqc2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NTcwNDcsImV4cCI6MjA4MTMzMzA0N30.zl-xXG-pNPmsyPgZ57viXlQMuvS4jOQPUirSMg8GNUs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
