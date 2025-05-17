import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { registerNewUser } from "@/services/authService";

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!fullName) {
            newErrors.fullName = "Full name is required";
            isValid = false;
        }

        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handleSignup = async () => {

        if (validateForm()) {

            // Perform signup logic here
            setLoading(true);
            try {
                const res = await registerNewUser({ name: fullName, email, password });
                if (res) {
                    router.push("/(tabs)/dashboard")
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-dark-bg">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 justify-center  px-6 pt-12 pb-6">
                    {/* Top Section */}
                    <View>
                        {/* Header */}
                        <View className="mb-8">
                            <Text className="text-primary-400 text-3xl font-bold mb-2">
                                Create Account
                            </Text>
                            <Text className="text-dark-subtext text-base">
                                Sign up to get started
                            </Text>
                        </View>

                        {/* Form Fields */}
                        <View className="space-y-4">
                            {/* Full Name */}
                            <View>
                                <Text className="text-dark-text text-sm mb-2 ml-1">
                                    Full Name
                                </Text>
                                <View className="flex-row items-center bg-dark-card border border-dark-border rounded-xl px-4 py-3">
                                    <Ionicons name="person-outline" size={20} color="#6366F1" />
                                    <TextInput
                                        className="flex-1 ml-3 text-dark-text text-base"
                                        placeholder="Enter your full name"
                                        placeholderTextColor="#A0A0A0"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        autoCapitalize="words"
                                    />
                                </View>
                                {formErrors.fullName ? (
                                    <Text className="text-red-500 text-sm mt-1 ml-1">
                                        {formErrors.fullName}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Email */}
                            <View>
                                <Text className="text-dark-text text-sm mb-2 ml-1">
                                    Email Address
                                </Text>
                                <View className="flex-row items-center bg-dark-card border border-dark-border rounded-xl px-4 py-3">
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
                                {formErrors.email ? (
                                    <Text className="text-red-500 text-sm mt-1 ml-1">
                                        {formErrors.email}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Password */}
                            <View>
                                <Text className="text-dark-text text-sm mb-2 ml-1">Password</Text>
                                <View className="flex-row items-center bg-dark-card border border-dark-border rounded-xl px-4 py-3">
                                    <Ionicons name="lock-closed-outline" size={20} color="#6366F1" />
                                    <TextInput
                                        className="flex-1 ml-3 text-dark-text text-base"
                                        placeholder="Create a password"
                                        placeholderTextColor="#A0A0A0"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                                        <Ionicons
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color="#A0A0A0"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {formErrors.password ? (
                                    <Text className="text-red-500 text-sm mt-1 ml-1">
                                        {formErrors.password}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Confirm Password */}
                            <View>
                                <Text className="text-dark-text text-sm mb-2 ml-1">Confirm Password</Text>
                                <View className="flex-row items-center bg-dark-card border border-dark-border rounded-xl px-4 py-3">
                                    <Ionicons name="lock-closed-outline" size={20} color="#6366F1" />
                                    <TextInput
                                        className="flex-1 ml-3 text-dark-text text-base"
                                        placeholder="Confirm your password"
                                        placeholderTextColor="#A0A0A0"
                                        secureTextEntry={!showConfirmPassword}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="p-1"
                                    >
                                        <Ionicons
                                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color="#A0A0A0"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {formErrors.confirmPassword ? (
                                    <Text className="text-red-500 text-sm mt-1 ml-1">
                                        {formErrors.confirmPassword}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Global Error */}
                            {/* {error && (
                                <Text className="text-red-500 text-center text-sm mt-2">{error}</Text>
                            )} */}
                        </View>
                    </View>

                    {/* Bottom Section */}
                    <View className="space-y-4 mt-6">
                        {/* Signup Button */}
                        <TouchableOpacity
                            className={`bg-primary-500 rounded-xl py-4 ${loading ? "opacity-50" : ""}`}
                            onPress={handleSignup}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="text-dark-text text-center font-bold text-lg">
                                    Create Account
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View className="flex-row justify-center mt-2">
                            <Text className="text-dark-subtext">Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                                <Text className="text-primary-400 font-bold">Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;