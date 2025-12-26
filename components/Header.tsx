import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { GraduationCap, Moon, Sun, LogOut } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

// Prepare icons for NativeWind if needed (though lucide-react-native usually handles it, passing className might require View wrapping or interop)
// For simplicity, we just pass color/size props or use parent text classes if applicable. 
// But Lucide React Native icons accept `color` and `size`.

interface HeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, isLoggedIn, onLogout }) => {
    return (
        <View className="w-full px-6 py-4 flex-row items-center justify-between border-b border-gray-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md z-50">

            {/* Right Side: Logo */}
            <View className="flex-row items-center gap-3">
                <View className="p-2 bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20">
                    <GraduationCap color="white" size={24} />
                </View>
                <Text className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">بوابة المدرسة</Text>
            </View>

            {/* Left Side: Controls */}
            <View className="flex-row items-center gap-4">
                {isLoggedIn && (
                    <Pressable
                        onPress={onLogout}
                        className="flex-row items-center gap-2"
                    >
                        <LogOut size={16} color={isDarkMode ? '#F87171' : '#EF4444'} />
                        <Text className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400">تسجيل خروج</Text>
                    </Pressable>
                )}

                <Pressable
                    onPress={toggleTheme}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent active:scale-95"
                    accessibilityLabel="Toggle Theme"
                >
                    {isDarkMode ?
                        <Sun size={20} color="#FBBF24" /> :
                        <Moon size={20} color="#475569" />
                    }
                </Pressable>
            </View>
        </View>
    );
};
