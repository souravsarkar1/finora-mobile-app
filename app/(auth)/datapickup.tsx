import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { updateIncomeAndExpense } from "@/services/authService";

interface Source {
    id: string;
    name: string;
    icon: string;
    selected: boolean;
}

const Datapickup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const progressValue = useRef(new Animated.Value(0)).current;
    const [selectedSources, setSelectedSources] = useState<{ [key: string]: boolean }>({});

    const steps = [
        {
            title: "What's your main income?",
            subtitle: "Select your primary source of income",
            options: [
                { id: '1', name: 'Full-time Employment', icon: 'briefcase' },
                { id: '2', name: 'Business Owner', icon: 'business' },
                { id: '3', name: 'Freelancer', icon: 'laptop' },
                { id: '4', name: 'Student', icon: 'school' },
            ]
        },
        {
            title: "Any additional income?",
            subtitle: "Select other sources of income (optional)",
            options: [
                { id: '5', name: 'Investments', icon: 'trending-up' },
                { id: '6', name: 'Rental Income', icon: 'home' },
                { id: '7', name: 'Part-time Work', icon: 'time' },
                { id: '8', name: 'Other', icon: 'ellipsis-horizontal' },
            ]
        },
        {
            title: "What do you spend on?",
            subtitle: "Select your main expense categories",
            options: [
                { id: '9', name: 'Housing', icon: 'home' },
                { id: '10', name: 'Transportation', icon: 'car' },
                { id: '11', name: 'Food & Dining', icon: 'restaurant' },
                { id: '12', name: 'Shopping', icon: 'cart' },
                { id: '13', name: 'Entertainment', icon: 'film' },
                { id: '14', name: 'Bills & Utilities', icon: 'receipt' },
            ]
        }
    ];

    const animateProgress = (toValue: number) => {
        Animated.timing(progressValue, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleSelect = (id: string) => {
        setSelectedSources(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
            animateProgress((currentStep + 1) / (steps.length - 1));
        } else {
            try {
                // Get selected IDs for each step
                const mainIncome = Object.entries(selectedSources)
                    .filter(([id, selected]) => selected && parseInt(id) >= 1 && parseInt(id) <= 4)
                    .map(([id]) => steps[0].options.find(opt => opt.id === id)?.name || '');

                const additionalIncome = Object.entries(selectedSources)
                    .filter(([id, selected]) => selected && parseInt(id) >= 5 && parseInt(id) <= 8)
                    .map(([id]) => steps[1].options.find(opt => opt.id === id)?.name || '');

                const expenses = Object.entries(selectedSources)
                    .filter(([id, selected]) => selected && parseInt(id) >= 9 && parseInt(id) <= 14)
                    .map(([id]) => steps[2].options.find(opt => opt.id === id)?.name || '');

                const payload = {
                    incomeSources: [...mainIncome, ...additionalIncome],
                    expenseSources: expenses
                };

                const res = await updateIncomeAndExpense(payload);

                if (res) {
                    router.push('/(tabs)/dashboard');
                }
            } catch (error) {
                console.log('Error updating income and expense sources:', error);
            }
        }
    };

    const OptionItem = ({ id, name, icon }: { id: string; name: string; icon: string }) => (
        <TouchableOpacity
            onPress={() => handleSelect(id)}
            className={`mb-3 px-4 py-3.5 rounded-2xl border ${selectedSources[id]
                ? 'bg-primary-500/10 border-primary-500'
                : 'bg-dark-card border-dark-border'
                }`}
        >
            <View className="flex-row items-center">
                <View className={`w-10 h-10 rounded-full items-center justify-center ${selectedSources[id] ? 'bg-primary-500' : 'bg-dark-border'
                    }`}>
                    <Ionicons
                        name={icon as any}
                        size={20}
                        color={selectedSources[id] ? '#FFFFFF' : '#A0A0A0'}
                    />
                </View>
                <Text className={`flex-1 ml-3 font-medium text-base ${selectedSources[id] ? 'text-primary-500' : 'text-dark-text'
                    }`}>
                    {name}
                </Text>
                {selectedSources[id] && (
                    <Ionicons name="checkmark-circle" size={24} color="#6366F1" />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-dark-bg">
            <View className="flex-1 px-4 pt-12">
                {/* Progress Bar */}
                <View className="h-1 bg-dark-border rounded-full mb-8">
                    <Animated.View
                        className="h-1 bg-primary-500 rounded-full"
                        style={{
                            width: progressValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            })
                        }}
                    />
                </View>

                {/* Step Content */}
                <View className="flex-1">
                    <Text className="text-dark-text text-2xl font-bold mb-2">
                        {steps[currentStep].title}
                    </Text>
                    <Text className="text-dark-subtext text-base mb-8">
                        {steps[currentStep].subtitle}
                    </Text>

                    <View className="space-y-2">
                        {steps[currentStep].options.map((option) => (
                            <OptionItem
                                key={option.id}
                                id={option.id}
                                name={option.name}
                                icon={option.icon}
                            />
                        ))}
                    </View>
                </View>

                {/* Bottom Navigation */}
                <View className="py-4">
                    <TouchableOpacity
                        className="bg-primary-500 rounded-full py-4"
                        onPress={handleNext}
                    >
                        <Text className="text-dark-text text-center font-bold text-lg">
                            {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Datapickup;
