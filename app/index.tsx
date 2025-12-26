import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, TrendingUp, CheckCircle2, User } from 'lucide-react-native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useColorScheme } from 'nativewind';
import { HelpModal } from '../components/HelpModal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingPage() {
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [showHelp, setShowHelp] = React.useState(false);

    // Default to false for isLoggedIn on landing page
    // RTL Flex direction handled by "flex-row-reverse" or standard flex with text-right?
    // React Native supports `I18nManager` but for quick port we use flex direction manually if needed.
    // The source uses `dir="rtl"`.
    // In RN, we might need to be explicit or trust the OS.
    // Let's rely on standard Flexbox but maybe force items-end?
    // Source has `text-right` everywhere.

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
            <Header
                isDarkMode={colorScheme === 'dark'}
                toggleTheme={toggleColorScheme}
                isLoggedIn={false}
                onLogout={() => { }}
            />

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Background Gradient Blobs */}
                <View className="absolute left-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full" style={{ transform: [{ scale: 1.5 }], filter: 'blur(64px)' }} />
                <View className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full" style={{ transform: [{ scale: 1.5 }], filter: 'blur(64px)' }} />

                <View className="flex-1 justify-center px-4 py-6 max-w-[1400px] mx-auto w-full">

                    {/* Wrapper for Columns - LG row reverse for RTL equivalent */}
                    <View className="flex-col lg:flex-row-reverse items-center justify-between gap-12">

                        {/* Text Content */}
                        <View className="w-full lg:w-1/2 items-end space-y-8">
                            <View className="space-y-4 items-end">
                                <Text className="text-5xl font-bold leading-tight text-right text-slate-900 dark:text-white">
                                    منصة مدرستنا
                                </Text>
                                <Text className="text-5xl font-bold leading-tight text-right text-blue-500">
                                    الشاملة
                                </Text>
                                <Text className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed text-right mt-4">
                                    منصة رسمية لعرض تفاصيل الطلاب وبياناتهم الدراسية باستخدام الرقم القومي، بطريقة آمنة ومنظمة.
                                </Text>
                            </View>

                            <View className="flex-row gap-4 justify-end mt-8">
                                <Pressable
                                    onPress={() => router.push('/login')}
                                    className="bg-slate-900 dark:bg-white px-8 py-4 rounded-xl flex-row items-center gap-3 active:opacity-80 shadow-sm"
                                >
                                    <View className="bg-white/20 dark:bg-slate-900/20 p-1.5 rounded-lg">
                                        <ChevronLeft size={20} color={colorScheme === 'dark' ? 'black' : 'white'} />
                                    </View>
                                    <Text className="text-white dark:text-slate-900 font-bold text-lg">الدخول إلى عرض التفاصيل</Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* Visual/Stats Side */}
                        <View className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
                            <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
                                {/* Stats Grid */}
                                <View className="flex-row flex-wrap gap-4 justify-center">
                                    <View className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex-row items-center gap-4 flex-1 min-w-[150px] justify-end">
                                        <View>
                                            <Text className="text-sm text-slate-500 dark:text-slate-400 text-right">الأداء العام</Text>
                                            <Text className="text-2xl font-bold text-slate-900 dark:text-white text-right">92%</Text>
                                        </View>
                                        <View className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <TrendingUp size={24} color="#2563EB" />
                                        </View>
                                    </View>

                                    <View className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex-row items-center gap-4 flex-1 min-w-[150px] justify-end">
                                        <View>
                                            <Text className="text-sm text-slate-500 dark:text-slate-400 text-right">الحضور</Text>
                                            <View className="flex-row items-baseline justify-end">
                                                <Text className="text-xs text-slate-400">/30</Text>
                                                <Text className="text-2xl font-bold text-slate-900 dark:text-white">28</Text>
                                            </View>
                                        </View>
                                        <View className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                            <CheckCircle2 size={24} color="#D97706" />
                                        </View>
                                    </View>
                                </View>

                                {/* Main Visual */}
                                <View className="mt-6 h-48 bg-slate-50 dark:bg-slate-800 rounded-xl relative overflow-hidden items-center justify-center">
                                    <View className="absolute top-4 right-4 bg-white dark:bg-slate-700 px-3 py-1 rounded-full shadow-sm flex-row items-center gap-1">
                                        <Text className="text-xs font-medium text-emerald-600">منتظم</Text>
                                        <CheckCircle2 size={12} color="#059669" />
                                    </View>

                                    <User size={64} color={colorScheme === 'dark' ? '#334155' : '#E2E8F0'} />

                                    <View className="absolute bottom-4 left-4 bg-blue-500 p-3 rounded-xl shadow-lg">
                                        <User size={24} color="white" />
                                    </View>
                                </View>

                                <View className="absolute -top-4 self-center bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg flex-row items-center gap-2 border border-slate-100 dark:border-slate-700">
                                    <Text className="text-sm font-medium text-slate-900 dark:text-white">تم تسجيل الحضور</Text>
                                    <CheckCircle2 size={16} color="#10B981" />
                                </View>

                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
}
