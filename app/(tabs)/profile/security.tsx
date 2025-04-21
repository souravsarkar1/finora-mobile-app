
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SecurityScreen = () => {
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [pinEnabled, setPinEnabled] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [appLockEnabled, setAppLockEnabled] = useState(false);

    const SecurityItem = ({
        icon,
        title,
        subtitle,
        showToggle = false,
        isEnabled = false,
        onToggle,
        onPress
    }: any) => (
        <TouchableOpacity
            className="flex-row items-center bg-dark-card p-4 rounded-xl border border-dark-border mb-3"
            activeOpacity={0.7}
            onPress={onPress}
            disabled={showToggle}
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
            {showToggle ? (
                <Switch
                    value={isEnabled}
                    onValueChange={onToggle}
                    trackColor={{ false: '#2A2A2A', true: '#6366F1' }}
                    thumbColor={isEnabled ? '#FFFFFF' : '#A0A0A0'}
                />
            ) : (
                <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
            )}
        </TouchableOpacity>
    );

    return (
        <ScrollView className="flex-1 bg-dark-bg px-4 pt-12">
            <View className="space-y-6">
                {/* Header */}
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="text-dark-text text-2xl font-bold">Security</Text>
                </View>

                {/* Authentication Methods */}
                <View>
                    <Text className="text-dark-subtext mb-3">Authentication</Text>
                    <SecurityItem
                        icon="finger-print"
                        title="Biometric Authentication"
                        subtitle="Use Face ID or Fingerprint to unlock"
                        showToggle={true}
                        isEnabled={biometricEnabled}
                        onToggle={setBiometricEnabled}
                    />
                    <SecurityItem
                        icon="keypad"
                        title="PIN Code"
                        subtitle="Use a 6-digit PIN to unlock"
                        showToggle={true}
                        isEnabled={pinEnabled}
                        onToggle={setPinEnabled}
                    />
                    <SecurityItem
                        icon="shield-checkmark"
                        title="Two-Factor Authentication"
                        subtitle="Add an extra layer of security"
                        showToggle={true}
                        isEnabled={twoFactorEnabled}
                        onToggle={setTwoFactorEnabled}
                    />
                </View>

                {/* App Security */}
                <View>
                    <Text className="text-dark-subtext mb-3">App Security</Text>
                    <SecurityItem
                        icon="lock-closed"
                        title="Auto-Lock"
                        subtitle="Lock app when inactive"
                        showToggle={true}
                        isEnabled={appLockEnabled}
                        onToggle={setAppLockEnabled}
                    />
                    <SecurityItem
                        icon="key"
                        title="Change Password"
                        subtitle="Update your account password"
                        onPress={() => {/* Handle password change */ }}
                    />
                    <SecurityItem
                        icon="apps"
                        title="App Permissions"
                        subtitle="Manage app access permissions"
                        onPress={() => {/* Handle permissions */ }}
                    />
                </View>

                {/* Security Status */}
                <View>
                    <Text className="text-dark-subtext mb-3">Security Status</Text>
                    <SecurityItem
                        icon="shield"
                        title="Security Check"
                        subtitle="Review your security settings"
                        onPress={() => {/* Handle security check */ }}
                    />
                    <SecurityItem
                        icon="time"
                        title="Recent Activity"
                        subtitle="View recent account activity"
                        onPress={() => {/* Handle activity log */ }}
                    />
                </View>

                {/* Additional Info */}
                <View className="mt-6 p-4 bg-dark-card rounded-xl border border-dark-border">
                    <Text className="text-dark-text font-bold mb-2">Security Tips</Text>
                    <Text className="text-dark-subtext text-sm">
                        • Use a strong, unique password{'\n'}
                        • Enable two-factor authentication{'\n'}
                        • Regularly review your security settings{'\n'}
                        • Never share your login credentials
                    </Text>
                </View>
            </View>
            <View className="h-6" />
        </ScrollView>
    );
};

export default SecurityScreen;

