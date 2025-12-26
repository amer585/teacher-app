import React from 'react';
import { View, Text } from 'react-native';

export const Footer: React.FC = () => {
    return (
        <View className="w-full py-8 border-t border-gray-100 dark:border-slate-800 mt-auto">
            <View className="px-6 items-center">
                <Text className="text-center text-slate-500 font-medium dark:text-slate-400">
                    Powered by <Text className="font-bold text-slate-700 dark:text-slate-200">مصنع الرجال</Text>
                </Text>
            </View>
        </View>
    );
};
