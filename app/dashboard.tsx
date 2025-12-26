import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, Plus, Trash2, Edit2, LogOut, Users, BookOpen, X, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StudentData } from '../src/types';
import { supabase } from '../src/lib/supabase';
import { Toast } from '../components/Toast';
import { Header } from '../components/Header';
import { useColorScheme } from 'nativewind';

export default function TeacherDashboard() {
    const router = useRouter();
    const params = useLocalSearchParams();
    // Ensure subject is a string, handle array case if routed weirdly
    const teacherSubject = typeof params.subject === 'string' ? params.subject : 'عام';

    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<StudentData>>({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: '', national_id: '', grade: '' });
    const [toast, setToast] = useState<{ msg: string, type?: 'success' | 'info' | 'error' } | null>(null);

    const triggerToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000); // Auto cleanup ref logic handled in Toast component too
    };

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('students').select('*');
            if (error) throw error;
            if (data) setStudents(data as any);
        } catch (err: any) {
            console.error(err);
            triggerToast(err.message || 'حدث خطأ في جلب البيانات', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(s =>
        s.name.includes(searchTerm) || s.national_id.includes(searchTerm)
    );

    const startEdit = (student: StudentData) => {
        setEditingId(student.id);
        setEditForm({ name: student.name, grade: student.grade });
    };

    const saveEdit = async () => {
        if (editingId && editForm) {
            try {
                const { error } = await supabase.from('students').update(editForm).eq('id', editingId);
                if (error) throw error;
                setStudents(prev => prev.map(s => s.id === editingId ? { ...s, ...editForm } : s));
                setEditingId(null);
                triggerToast('تم التحديث بنجاح', 'success');
            } catch (err: any) {
                triggerToast(err.message, 'error');
            }
        }
    };

    const handleDeleteStudent = async (id: string) => {
        Alert.alert(
            'تأكيد الحذف',
            'هل أنت متأكد من حذف هذا الطالب؟ لا يمكن التراجع عن هذا الإجراء.',
            [
                { text: 'إلغاء', style: 'cancel' },
                {
                    text: 'حذف',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { error } = await supabase.from('students').delete().eq('id', id);
                            if (error) throw error;
                            setStudents(prev => prev.filter(s => s.id !== id));
                            triggerToast('تم حذف الطالب بنجاح', 'info');
                        } catch (err: any) {
                            triggerToast(err.message, 'error');
                        }
                    }
                }
            ]
        );
    };

    const handleAddStudent = async () => {
        if (!newStudent.name || !newStudent.national_id || !newStudent.grade) {
            triggerToast('يرجى ملء جميع الحقول', 'error');
            return;
        }
        if (newStudent.national_id.length !== 14) {
            triggerToast('الرقم القومي يجب أن يكون 14 رقم', 'error');
            return;
        }

        try {
            const { data, error } = await supabase.from('students').insert([newStudent]).select();
            if (error) throw error;
            if (data) {
                setStudents(prev => [...prev, data[0] as StudentData]);
                setNewStudent({ name: '', national_id: '', grade: '' });
                setShowAddModal(false);
                triggerToast('تم إضافة الطالب بنجاح', 'success');
            }
        } catch (err: any) {
            triggerToast(err.message, 'error');
        }
    };

    const renderStudentRow = ({ item }: { item: StudentData }) => (
        <View className="flex-row border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 min-w-[600px]">
            {/* Name */}
            <View className="flex-[2] p-4 justify-center">
                {editingId === item.id ? (
                    <TextInput
                        value={editForm.name}
                        onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                        className="border border-slate-200 dark:border-slate-700 rounded p-2 text-right bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                ) : (
                    <Text className="text-slate-900 dark:text-white font-medium text-right">{item.name}</Text>
                )}
            </View>

            {/* National ID */}
            <View className="flex-1 p-4 justify-center">
                <Text className="text-slate-500 font-mono text-sm text-right">{item.national_id}</Text>
            </View>

            {/* Grade */}
            <View className="flex-1 p-4 justify-center">
                {editingId === item.id ? (
                    <TextInput
                        value={editForm.grade}
                        onChangeText={(text) => setEditForm({ ...editForm, grade: text })}
                        className="border border-slate-200 dark:border-slate-700 rounded p-2 text-right bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                ) : (
                    <Text className="text-slate-600 dark:text-slate-300 text-right">{item.grade}</Text>
                )}
            </View>

            {/* Actions */}
            <View className="flex-1 p-4 flex-row items-center justify-end gap-2">
                {editingId === item.id ? (
                    <Pressable onPress={saveEdit} className="bg-green-100 p-2 rounded-lg">
                        <Check size={16} color="green" />
                    </Pressable>
                ) : (
                    <Pressable onPress={() => startEdit(item)} className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                        <Edit2 size={16} color="#3B82F6" />
                    </Pressable>
                )}
                <Pressable onPress={() => handleDeleteStudent(item.id)} className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                    <Trash2 size={16} color="#EF4444" />
                </Pressable>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
            <Header isDarkMode={colorScheme === 'dark'} toggleTheme={toggleColorScheme} isLoggedIn={true} onLogout={() => router.replace('/')} />

            {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            <ScrollView className="flex-1 p-4">

                {/* Stats Grid */}
                <View className="flex-row flex-wrap gap-4 mb-6">
                    <View className="flex-1 min-w-[150px] bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex-row items-center gap-3">
                        <View className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                            <Users size={24} color="#2563EB" />
                        </View>
                        <View>
                            <Text className="text-sm text-slate-500 dark:text-slate-400 text-right">إجمالي الطلاب</Text>
                            <Text className="text-2xl font-bold text-slate-900 dark:text-white text-right">{students.length}</Text>
                        </View>
                    </View>

                    <View className="flex-1 min-w-[150px] bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex-row items-center gap-3">
                        <View className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/20">
                            <BookOpen size={24} color="#9333EA" />
                        </View>
                        <View>
                            <Text className="text-sm text-slate-500 dark:text-slate-400 text-right">المادة الحالية</Text>
                            <Text className="text-2xl font-bold text-slate-900 dark:text-white text-right">{teacherSubject}</Text>
                        </View>
                    </View>

                    <View className="w-full bg-emerald-500 p-4 rounded-2xl shadow-lg flex-row items-center justify-between">
                        <View>
                            <Text className="text-emerald-100 mb-1 text-right">أهلاً بك</Text>
                            <Text className="text-xl font-bold text-white text-right">لوحة المعلم</Text>
                        </View>
                        <Pressable onPress={() => router.replace('/')} className="bg-white/20 p-2 rounded-lg">
                            <LogOut size={20} color="white" />
                        </Pressable>
                    </View>
                </View>

                {/* Actions Bar */}
                <View className="flex-col md:flex-row gap-4 mb-6 z-10">
                    <Pressable
                        onPress={() => setShowAddModal(true)}
                        className="bg-emerald-600 flex-row items-center justify-center px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 gap-2"
                    >
                        <Plus size={20} color="white" />
                        <Text className="text-white font-bold">إضافة طالب جديد</Text>
                    </Pressable>

                    <View className="flex-1 relative">
                        <View className="absolute right-3 top-3 z-10">
                            <Search size={20} color="#94A3B8" />
                        </View>
                        <TextInput
                            placeholder="بحث باسم الطالب أو الرقم القومي..."
                            placeholderTextColor="#94A3B8"
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            style={{ textAlign: 'right' }}
                            className="w-full pr-10 pl-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                    </View>
                </View>

                {/* Table Container - Mobile Responsive */}
                <View className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-20">
                    <ScrollView horizontal showsHorizontalScrollIndicator>
                        <View>
                            {/* Header */}
                            <View className="flex-row bg-slate-50 dark:bg-slate-800/50 min-w-[600px] border-b border-slate-100 dark:border-slate-800">
                                <Text className="flex-[2] px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-right">اسم الطالب</Text>
                                <Text className="flex-1 px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-right">الرقم القومي</Text>
                                <Text className="flex-1 px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-right">الصف</Text>
                                <Text className="flex-1 px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-center">الإجراءات</Text>
                            </View>

                            {/* Rows */}
                            {loading ? (
                                <View className="p-8 items-center min-w-[600px]">
                                    <ActivityIndicator size="large" color="#059669" />
                                </View>
                            ) : filteredStudents.length === 0 ? (
                                <View className="p-8 items-center min-w-[600px]">
                                    <Text className="text-slate-500">لا يوجد طلاب مطابقين للبحث.</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={filteredStudents}
                                    keyExtractor={item => item.id}
                                    renderItem={renderStudentRow}
                                    scrollEnabled={false} // We rely on parent ScrollView
                                />
                            )}
                        </View>
                    </ScrollView>
                </View>

            </ScrollView>

            {/* Add Student Modal */}
            <Modal visible={showAddModal} transparent animationType="fade" onRequestClose={() => setShowAddModal(false)}>
                <View className="flex-1 justify-center items-center bg-black/50 p-4">
                    <View className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800">
                        <View className="flex-row items-center justify-between mb-6">
                            <Pressable onPress={() => setShowAddModal(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <X size={20} color="#64748B" />
                            </Pressable>
                            <Text className="text-xl font-bold text-slate-900 dark:text-white">إضافة طالب جديد</Text>
                        </View>

                        <View className="space-y-4">
                            <View className="space-y-1">
                                <Text className="text-sm font-medium text-slate-900 dark:text-white text-right">اسم الطالب</Text>
                                <TextInput
                                    value={newStudent.name}
                                    onChangeText={(t) => setNewStudent({ ...newStudent, name: t })}
                                    placeholder="أدخل اسم الطالب"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-right text-slate-900 dark:text-white"
                                />
                            </View>
                            <View className="space-y-1">
                                <Text className="text-sm font-medium text-slate-900 dark:text-white text-right">الرقم القومي</Text>
                                <TextInput
                                    value={newStudent.national_id}
                                    onChangeText={(t) => setNewStudent({ ...newStudent, national_id: t.replace(/\D/g, '').slice(0, 14) })}
                                    placeholder="14 رقم"
                                    keyboardType="numeric"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-right text-slate-900 dark:text-white font-mono"
                                />
                            </View>
                            <View className="space-y-1">
                                <Text className="text-sm font-medium text-slate-900 dark:text-white text-right">الصف الدراسي</Text>
                                <TextInput
                                    value={newStudent.grade}
                                    onChangeText={(t) => setNewStudent({ ...newStudent, grade: t })}
                                    placeholder="مثال: الصف الثالث"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-right text-slate-900 dark:text-white"
                                />
                            </View>

                            <Pressable onPress={handleAddStudent} className="w-full bg-emerald-600 py-3 rounded-xl mt-4 items-center">
                                <Text className="text-white font-bold text-lg">إضافة الطالب</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}
