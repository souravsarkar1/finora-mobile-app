import { View, Text, ScrollView, TouchableOpacity, Switch, Modal, Pressable, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from "@/lib/currency";

const Settings = () => {
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(true);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [isCurrencyModalVisible, setIsCurrencyModalVisible] = useState(false);




    const handleCurrencySelect = (currencyCode: string) => {
        setSelectedCurrency(currencyCode);
        setIsCurrencyModalVisible(false);
    };

    const SettingItem = ({ icon, title, value, onPress, showToggle = false, isEnabled = false, onToggle }: any) => (
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
                {value && (
                    <Text className="text-dark-subtext text-sm">{value}</Text>
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

    const CurrencyModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isCurrencyModalVisible}
            onRequestClose={() => setIsCurrencyModalVisible(false)}
        >
            <View className="flex-1 bg-black/50">
                <View className="flex-1 mt-24 bg-dark-bg rounded-t-3xl">
                    {/* Header */}
                    <View className="flex-row justify-between items-center p-6 border-b border-dark-border">
                        <Text className="text-dark-text text-xl font-bold">
                            Select Currency
                        </Text>
                        <TouchableOpacity
                            className="w-8 h-8 items-center justify-center"
                            onPress={() => setIsCurrencyModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="#A0A0A0" />
                        </TouchableOpacity>
                    </View>

                    {/* Currency List */}
                    <ScrollView className="flex-1 px-4">
                        {currencies.map((currency) => (
                            <TouchableOpacity
                                key={currency.code}
                                className={`flex-row items-center justify-between p-4 rounded-xl mb-2 ${selectedCurrency === currency.code
                                    ? 'bg-primary-500/20 border border-primary-500'
                                    : 'bg-dark-card border border-dark-border'
                                    }`}
                                onPress={() => handleCurrencySelect(currency.code)}
                            >
                                <View className="flex-row items-center">
                                    <Text className="text-2xl mr-3">
                                        {currency.symbol}
                                    </Text>
                                    <View>
                                        <Text className="text-dark-text font-medium">
                                            {currency.name}
                                        </Text>
                                        <Text className="text-dark-subtext text-sm">
                                            {currency.code}
                                        </Text>
                                    </View>
                                </View>

                                {selectedCurrency === currency.code && (
                                    <View className="w-6 h-6 items-center justify-center bg-primary-500 rounded-full">
                                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                        <View className="h-6" />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <ScrollView className="flex-1 bg-dark-bg px-4 pt-12">
            {/* Currency Modal */}
            <CurrencyModal />

            <View className="space-y-6">
                {/* Header */}
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="text-dark-text text-2xl font-bold">Settings</Text>
                </View>

                {/* General Settings */}
                <View>
                    <Text className="text-dark-subtext mb-3">General</Text>
                    <SettingItem
                        icon="cash"
                        title="Currency"
                        value={`Selected: ${selectedCurrency}`}
                        onPress={() => setIsCurrencyModalVisible(true)}
                    />
                    <SettingItem
                        icon="notifications"
                        title="Notifications"
                        showToggle={true}
                        isEnabled={notificationsEnabled}
                        onToggle={setNotificationsEnabled}
                    />
                    <SettingItem
                        icon="moon"
                        title="Dark Mode"
                        showToggle={true}
                        isEnabled={darkModeEnabled}
                        onToggle={setDarkModeEnabled}
                    />
                </View>

                {/* Security Settings */}
                <View>
                    <Text className="text-dark-subtext mb-3">Security</Text>
                    <SettingItem
                        icon="shield-checkmark"
                        title="Security Settings"
                        subtitle="Manage your security preferences"
                        onPress={() => router.push('/profile/security')}
                    />
                    <SettingItem
                        icon="finger-print"
                        title="Biometric Authentication"
                        showToggle={true}
                        isEnabled={biometricEnabled}
                        onToggle={setBiometricEnabled}
                    />
                </View>

                {/* About */}
                <View>
                    <Text className="text-dark-subtext mb-3">About</Text>
                    <SettingItem
                        icon="information-circle"
                        title="App Version"
                        value="1.0.0"
                    />
                    <SettingItem
                        icon="document-text"
                        title="Terms of Service"
                        onPress={() => {/* Handle terms */ }}
                    />
                    <SettingItem
                        icon="shield"
                        title="Privacy Policy"
                        onPress={() => {/* Handle privacy */ }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Settings;
