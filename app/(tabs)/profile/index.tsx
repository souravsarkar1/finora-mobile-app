import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppDispatch } from '@/redux/store/store';

const ProfileScreen = () => {
    const dispatch = useAppDispatch();

    const MenuItem = ({ icon, title, subtitle, onPress }: any) => (
        <TouchableOpacity
            className="flex-row items-center bg-dark-card p-4 rounded-xl border border-dark-border mb-3"
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View className="w-10 h-10 bg-primary-500/10 rounded-full items-center justify-center">
                <Ionicons name={icon} size={20} color="#6366F1" />
            </View>
            <View className="flex-1 ml-3">
                <Text className="text-dark-text font-bold">{title}</Text>
                {subtitle && (
                    <Text className="text-dark-subtext text-sm">{subtitle}</Text>
                )}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
        </TouchableOpacity>
    );

    return (
        <ScrollView className="flex-1 bg-dark-bg px-4 pt-12">
            <View className="space-y-6">
                {/* Header */}
                <View className="items-center">
                    <View className="w-24 h-24 bg-primary-500/10 rounded-full items-center justify-center mb-4">
                        <Text className="text-primary-500 text-4xl font-bold">JD</Text>
                    </View>
                    <Text className="text-dark-text text-2xl font-bold">John Doe</Text>
                    <Text className="text-dark-subtext">john.doe@example.com</Text>
                </View>

                {/* Quick Stats */}
                <View className="flex-row justify-between bg-dark-card p-4 rounded-xl border border-dark-border">
                    <View className="items-center">
                        <Text className="text-dark-subtext mb-1">Balance</Text>
                        <Text className="text-dark-text font-bold">$2,450</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-dark-subtext mb-1">Savings</Text>
                        <Text className="text-dark-text font-bold">$8,750</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-dark-subtext mb-1">Points</Text>
                        <Text className="text-dark-text font-bold">2,840</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="space-y-6">
                    {/* <MenuItem
                        icon="card"
                        title="Payment Methods"
                        subtitle="Manage your payment options"
                    /> */}
                    <MenuItem
                        icon="notifications"
                        title="Notifications"
                        subtitle="Customize your alerts"
                    />
                    <MenuItem
                        icon="shield-checkmark"
                        title="Security"
                        subtitle="Protect your account"
                        onPress={() => router.push('/profile/security')}
                    />
                    <MenuItem
                        icon="settings"
                        title="Settings"
                        subtitle="App preferences"
                        onPress={() => router.push('/profile/settings')}
                    />
                    <MenuItem
                        icon="help-circle"
                        title="Help & Support"
                        subtitle="Get assistance"
                        onPress={() => router.push('/profile/help')}
                    />
                    <TouchableOpacity
                        className="flex-row items-center bg-dark-card p-4 rounded-xl border border-dark-border mt-4"
                        activeOpacity={0.7}
                        onPress={() => {
                            // Handle logout
                            router.replace('/(auth)/login');
                        }}
                    >
                        <View className="w-10 h-10 bg-red-500/10 rounded-full items-center justify-center">
                            <Ionicons name="log-out" size={20} color="#EF4444" />
                        </View>
                        <Text className="flex-1 ml-3 text-red-500 font-bold">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;