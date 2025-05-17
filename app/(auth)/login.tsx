import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/store/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { loginuUser } from "@/redux/features/auth/action";

const Login = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            // Cleanup function
            setEmail('');
            setPassword('');
            setFormErrors({ email: '', password: '' });
        };
    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        console.log(email, password);
        const data = await dispatch(loginuUser({ email, password }));
        if (data) {
            router.replace('/(tabs)/dashboard');
        }

    };

    return (
        <SafeAreaView className="flex-1 bg-dark-bg">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 justify-center items-center px-6">
                    <View className="w-full max-w-md space-y-10">
                        {/* Top Section */}
                        <View>
                            <View className="mb-10">
                                <Text className="text-primary-400 text-4xl font-bold mb-2 text-center">Welcome Back</Text>
                                <Text className="text-dark-subtext text-lg text-center">Sign in to continue</Text>
                            </View>

                            <View className="space-y-6">
                                {/* Email Input */}
                                <View>
                                    <Text className="text-dark-text text-sm mb-2 ml-1">Email Address</Text>
                                    <View className="flex-row items-center bg-dark-card border border-dark-border rounded-xl px-4 py-3.5">
                                        <Ionicons name="mail-outline" size={20} color="#6366F1" />
                                        <TextInput
                                            className="flex-1 ml-3 text-dark-text text-base"
                                            placeholder="Enter your email"
                                            placeholderTextColor="#A0A0A0"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    {formErrors.email && (
                                        <Text className="text-red-500 text-sm mt-2 ml-1">{formErrors.email}</Text>
                                    )}
                                </View>

                                {/* Password Input */}
                                <View>
                                    <Text className="text-dark-text text-sm mb-2 ml-1">Password</Text>
                                    <View className="flex-row items-center bg-dark-card border border-dark-border rounded-xl px-4 py-3.5">
                                        <Ionicons name="lock-closed-outline" size={20} color="#6366F1" />
                                        <TextInput
                                            className="flex-1 ml-3 text-dark-text text-base"
                                            placeholder="Enter your password"
                                            placeholderTextColor="#A0A0A0"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            className="p-1"
                                        >
                                            <Ionicons
                                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                                size={20}
                                                color="#A0A0A0"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {formErrors.password && (
                                        <Text className="text-red-500 text-sm mt-2 ml-1">{formErrors.password}</Text>
                                    )}
                                </View>

                                {/* Forgot Password */}
                                <TouchableOpacity className="mb-3 self-end">
                                    <Text className="text-primary-400 text-sm">Forgot Password?</Text>
                                </TouchableOpacity>

                                {/* Error Message */}
                                {/* {error && (
                                    <Text className="text-red-500 text-center text-sm">{error}</Text>
                                )} */}
                            </View>
                        </View>

                        {/* Bottom Section */}
                        <View className="space-y-6">
                            <TouchableOpacity
                                className="bg-primary-500 rounded-xl py-4"
                                onPress={handleLogin}
                            // disabled={isLoading}
                            >
                                {
                                    // isLoading ? (
                                    //     <ActivityIndicator color="#ffffff" />
                                    // ) :
                                    (
                                        <Text className="text-dark-text text-center font-bold text-lg">
                                            Sign In
                                        </Text>
                                    )}
                            </TouchableOpacity>

                            <View className="flex-row mt-5 justify-center">
                                <Text className="text-dark-subtext">Don't have an account? </Text>
                                <TouchableOpacity onPress={() => router.push('/(auth)/datapickup')}>
                                    <Text className="text-primary-400 font-bold">Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

export default Login;
