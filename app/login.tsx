import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { UserCog, ArrowRight, Loader2, BookOpen, ChevronDown, Check } from 'lucide-react-native';
import { SUBJECTS } from '../src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useColorScheme } from 'nativewind';

export default function LoginPage() {
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [password, setPassword] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSubjectModal, setShowSubjectModal] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setError('');

        if (password === 'admin123') {
            setTimeout(() => {
                setIsLoading(false);
                // Pass params to dashboard if needed, or clear params logic
                router.replace({ pathname: '/dashboard', params: { subject: selectedSubject } });
            }, 1000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                setError('كلمة المرور غير صحيحة');
            }, 1000);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
            <Header isDarkMode={colorScheme === 'dark'} toggleTheme={toggleColorScheme} isLoggedIn={false} onLogout={() => { }} />

            <View className="flex-1 justify-center items-center px-4">
                <View className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 md:p-12 relative overflow-hidden">

                    {/* Top Gradient Line */}
                    <View className="absolute top-0 left-0 right-0 h-2 bg-emerald-500" />

                    <View className="items-center mb-10 mt-4">
                        <View className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full items-center justify-center mb-4">
                            <UserCog size={32} color={colorScheme === 'dark' ? '#34D399' : '#059669'} />
                        </View>
                        <Text className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">بوابة المعلمين</Text>
                        <Text className="text-slate-500 dark:text-slate-400 text-lg">النسخة الخاصة بالمدرسين</Text>
                    </View>

                    <View className="space-y-6 w-full">
                        {/* Subject Selector */}
                        <View className="space-y-2">
                            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 text-right">المادة الدراسية</Text>
                            <Pressable
                                onPress={() => setShowSubjectModal(true)}
                                className="flex-row items-center justify-between w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl"
                            >
                                <ChevronDown size={20} color="#94A3B8" />
                                <Text className="text-slate-900 dark:text-white font-medium text-base">{selectedSubject}</Text>
                                <BookOpen size={20} color="#94A3B8" />
                            </Pressable>
                        </View>

                        {/* Password Input */}
                        <View className="space-y-2">
                            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 text-right">كلمة المرور</Text>
                            <TextInput
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                placeholder="أدخل كلمة المرور"
                                placeholderTextColor="#94A3B8"
                                style={{ textAlign: 'right' }} // Force RTL alignment for input text
                                className="block w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
                            />
                            {error ? <Text className="text-red-500 text-sm mt-1 text-right">{error}</Text> : null}
                        </View>

                        {/* Login Button */}
                        <Pressable
                            onPress={handleLogin}
                            disabled={isLoading || !password}
                            className={`w-full flex-row items-center justify-center py-4 px-6 rounded-xl shadow-lg mt-4 ${(!password || isLoading) ? 'bg-emerald-600/50' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    {/* Icon first in code (left), Text second (right) -> RTL means Text on Right, Icon on Left (visually) ? No, Flex Row means Left -> Right. 
                       If we want Text Right, Icon Left visually in FlexRow, we just place them Order: Icon, Text.
                       But Hebrew/Arabic usually want Icon right text center or something.
                       Source: Text then ArrowRight.
                       Let's mimic source code order but ensure visual flow is good.
                   */}
                                    <ArrowRight size={20} color="white" className="mr-2" />
                                    <Text className="text-white font-bold text-lg ml-2">تسجيل الدخول</Text>
                                </>
                            )}
                        </Pressable>
                    </View>

                    <View className="mt-8 items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 w-full">
                        <Text className="text-sm text-slate-500 mb-1">بيانات تجريبية:</Text>
                        <View className="bg-slate-200 dark:bg-slate-900 px-2 py-1 rounded">
                            <Text className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">admin123</Text>
                        </View>
                    </View>

                </View>
            </View>

            <Footer />

            {/* Subject Selection Modal */}
            <Modal visible={showSubjectModal} transparent animationType="slide" onRequestClose={() => setShowSubjectModal(false)} >
                <Pressable onPress={() => setShowSubjectModal(false)} className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 h-[50%]">
                        <View className="items-center mb-4">
                            <View className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                        </View>
                        <Text className="text-xl font-bold text-center text-slate-900 dark:text-white mb-6">اختر المادة الدراسية</Text>
                        <FlatList
                            data={SUBJECTS}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => { setSelectedSubject(item); setShowSubjectModal(false); }}
                                    className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${selectedSubject === item ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800 border-transparent'}`}
                                >
                                    {selectedSubject === item && <Check size={20} color="#059669" />}
                                    <Text className={`text-lg font-medium ${selectedSubject === item ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {item}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>

        </SafeAreaView>
    );
}
