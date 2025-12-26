import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CheckCircle2, X, Info, AlertTriangle } from 'lucide-react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

interface ToastProps {
    message: string;
    type?: 'success' | 'info' | 'error';
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const getStyles = () => {
        switch (type) {
            case 'info': return 'bg-blue-600 border-blue-500';
            case 'error': return 'bg-red-600 border-red-500';
            default: return 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-700 dark:border-slate-200';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'info': return <Info size={20} color="white" />;
            case 'error': return <AlertTriangle size={20} color="white" />;
            default: return <CheckCircle2 size={20} color="#34D399" />;
        }
    };

    const getTextColor = () => {
        // Logic from web: 
        // success: text-white dark:text-slate-900 (Wait, web said text-white for success usually, but let's check web classes)
        // Web: ${type === 'success' ? 'bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 ...' : ''}
        if (type === 'success') return 'text-white dark:text-slate-900';
        return 'text-white';
    };

    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            className="absolute bottom-10 left-0 right-0 items-center z-[100] pointer-events-none"
        >
            <View className={`px-6 py-3 rounded-full shadow-2xl flex-row items-center gap-3 border ${getStyles()}`}>
                {getIcon()}
                <Text className={`font-medium text-sm ${getTextColor()}`}>{message}</Text>
                <Pressable onPress={onClose} className="ml-2 opacity-70">
                    <X size={16} color={type === 'success' ? '#9CA3AF' : 'white'} />
                </Pressable>
            </View>
        </Animated.View>
    );
};
