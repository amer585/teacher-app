import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { X, Smartphone, Monitor, Share, MoreVertical } from 'lucide-react-native';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/60 p-4">
                <View className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-200 dark:border-slate-800">

                    <Pressable onPress={onClose} className="absolute top-4 left-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full z-10">
                        <X size={20} className="text-slate-500" color="#64748B" />
                    </Pressable>

                    <View className="p-6 items-center">
                        <Text className="text-2xl font-bold text-emerald-600 mb-2">
                            تثبيت التطبيق
                        </Text>
                        <Text className="text-slate-500 dark:text-slate-400 mb-6 text-center">
                            اختر جهازك لمعرفة كيفية التثبيت
                        </Text>

                        <View className="space-y-4 w-full">

                            <View className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl flex-row items-start gap-4" style={{ direction: 'rtl' }}>
                                <View className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Smartphone size={24} color="#16A34A" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-slate-900 dark:text-white mb-1 text-right">Android</Text>
                                    <Text className="text-sm text-slate-500 text-right">
                                        اضغط على القائمة <MoreVertical size={12} color="#64748B" /> ثم اختر
                                        <Text className="font-bold text-emerald-600"> الإضافة إلى الشاشة الرئيسية</Text>
                                    </Text>
                                </View>
                            </View>

                            <View className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl flex-row items-start gap-4" style={{ direction: 'rtl' }}>
                                <View className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <Smartphone size={24} color="#2563EB" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-slate-900 dark:text-white mb-1 text-right">iPhone</Text>
                                    <Text className="text-sm text-slate-500 text-right">
                                        اضغط على مشاركة <Share size={12} color="#64748B" /> ثم اختر
                                        <Text className="font-bold text-blue-600"> Add to Home Screen</Text>
                                    </Text>
                                </View>
                            </View>

                            <View className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl flex-row items-start gap-4" style={{ direction: 'rtl' }}>
                                <View className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                                    <Monitor size={24} color="#475569" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-slate-900 dark:text-white mb-1 text-right">Windows</Text>
                                    <Text className="text-sm text-slate-500 text-right">
                                        قم بتحميل ملف التثبيت (.exe) وتشغيله
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <Pressable onPress={onClose} className="mt-6 w-full py-3 bg-emerald-600 rounded-xl items-center">
                            <Text className="text-white font-bold text-lg">حسناً، فهمت</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
