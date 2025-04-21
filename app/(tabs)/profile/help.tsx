import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const HelpScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const HelpItem = ({ icon, title, subtitle, onPress }: any) => (
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

    const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        return (
            <TouchableOpacity
                className={`bg-dark-card rounded-xl border border-dark-border mb-3 p-4 ${
                    isExpanded ? 'bg-dark-card/80' : ''
                }`}
                activeOpacity={0.7}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View className="flex-row justify-between items-center">
                    <Text className="text-dark-text font-bold flex-1 pr-4">{question}</Text>
                    <Ionicons
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#A0A0A0"
                    />
                </View>
                {isExpanded && (
                    <Text className="text-dark-subtext mt-3 leading-5">{answer}</Text>
                )}
            </TouchableOpacity>
        );
    };

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
                    <Text className="text-dark-text text-2xl font-bold">Help & Support</Text>
                </View>

                {/* Search Bar */}
                <View className="bg-dark-card border border-dark-border rounded-xl p-2 flex-row items-center">
                    <Ionicons name="search" size={20} color="#A0A0A0" />
                    <TextInput
                        className="flex-1 ml-2 text-dark-text"
                        placeholder="Search for help"
                        placeholderTextColor="#A0A0A0"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Quick Actions */}
                <View>
                    <Text className="text-dark-subtext mb-3">Quick Actions</Text>
                    <HelpItem
                        icon="chatbubble-ellipses"
                        title="Chat with Support"
                        subtitle="Get instant help from our team"
                        onPress={() => {/* Handle chat */}}
                    />
                    <HelpItem
                        icon="mail"
                        title="Email Support"
                        subtitle="Send us a detailed message"
                        onPress={() => {/* Handle email */}}
                    />
                    <HelpItem
                        icon="call"
                        title="Phone Support"
                        subtitle="Talk to a representative"
                        onPress={() => {/* Handle call */}}
                    />
                </View>

                {/* Common Issues */}
                <View>
                    <Text className="text-dark-subtext mb-3">Common Issues</Text>
                    <FaqItem
                        question="How do I reset my password?"
                        answer="To reset your password, go to the login screen and tap 'Forgot Password'. Follow the instructions sent to your email to create a new password."
                    />
                    <FaqItem
                        question="How to enable biometric login?"
                        answer="Go to Settings > Security > Biometric Authentication and toggle it on. You'll need to verify your identity to enable this feature."
                    />
                    <FaqItem
                        question="Why isn't my transaction showing up?"
                        answer="Transactions can take up to 24 hours to appear in your account. If it's been longer, please contact our support team for assistance."
                    />
                    <FaqItem
                        question="How do I export my transaction history?"
                        answer="Navigate to Transactions > Filter > Export. You can choose your preferred date range and file format for the export."
                    />
                </View>

                {/* Help Categories */}
                <View>
                    <Text className="text-dark-subtext mb-3">Help Categories</Text>
                    <HelpItem
                        icon="card"
                        title="Payments & Transfers"
                        subtitle="Issues with transactions"
                        onPress={() => {/* Handle navigation */}}
                    />
                    <HelpItem
                        icon="shield-checkmark"
                        title="Account Security"
                        subtitle="Privacy and security help"
                        onPress={() => {/* Handle navigation */}}
                    />
                    <HelpItem
                        icon="settings"
                        title="App Features"
                        subtitle="How to use app features"
                        onPress={() => {/* Handle navigation */}}
                    />
                </View>

                {/* Contact Info */}
                <View className="bg-dark-card rounded-xl border border-dark-border p-4 mb-6">
                    <Text className="text-dark-text font-bold mb-2">Contact Information</Text>
                    <Text className="text-dark-subtext text-sm">
                        Support Hours: 24/7{'\n'}
                        Email: support@finora.com{'\n'}
                        Phone: 1-800-FINORA{'\n'}
                        Address: 123 Finance St, NY 10001
                    </Text>
                </View>
            </View>
            <View className="h-6" />
        </ScrollView>
    );
};

export default HelpScreen;