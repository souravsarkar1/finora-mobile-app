import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../redux/store/store';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { verifyToken } from "@/services/authService";

const LandingScreen = () => {

  const { token } = useAppSelector(st => st.auth);


  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const res = await verifyToken({ token: token });
          console.log(res, "res");
          if (res) {
            router.replace('/(tabs)/dashboard');
          }
        } catch (error) {
          console.log(error);

        }
      })()
    }
  }, [])
  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <StatusBar style="light" />

      {/* Main Container */}
      <View className="flex-1 px-6">
        {/* Top Section */}
        <View className="flex-row justify-end pt-4">
          <TouchableOpacity className="p-2">
            <Ionicons name="settings-outline" size={24} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View className="flex-1 justify-center items-center">
          {/* Logo/Brand */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary-500 rounded-3xl mb-6 items-center justify-center">
              <Text className="text-dark-text text-4xl font-bold">F</Text>
            </View>
            <Text className="text-primary-400 text-5xl font-bold tracking-wider">
              Finora
            </Text>
            <Text className="text-dark-subtext text-lg mt-3 max-w-[250px] text-center">
              Your Financial Future, Simplified
            </Text>
          </View>

          {/* Feature Highlights */}
          <View className="w-full gap-4 space-y-3 mb-12">
            <FeatureItem
              icon="bar-chart-outline"
              title="Smart Tracking"
              description="AI-powered expense insights"
            />
            <FeatureItem
              icon="shield-checkmark-outline"
              title="Secure Banking"
              description="Bank-level security protocols"
            />
            <FeatureItem
              icon="trending-up-outline"
              title="Investment Tools"
              description="Intelligent portfolio management"
            />
          </View>

          {/* CTA Buttons */}
          <View className="w-full gap-4 space-y-3">
            <TouchableOpacity
              className="w-full bg-primary-500 py-4 rounded-2xl shadow-lg"
              activeOpacity={0.8}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text className="text-dark-text text-center font-bold text-lg">
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full border border-primary-500/30 py-4 rounded-2xl"
              activeOpacity={0.8}
            >
              <Text className="text-primary-400 text-center font-bold text-lg">
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Text */}
        <Text className="text-dark-subtext text-center text-sm pb-4">
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

// Helper Component for Feature Items
const FeatureItem = ({ icon, title, description }: {
  icon: React.ComponentProps<typeof Ionicons>['name'],
  title: string,
  description: string
}) => (
  <View className="flex-row items-center bg-dark-card p-4 rounded-2xl border border-dark-border">
    <View className="w-10 h-10 bg-primary-500/10 rounded-xl items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#6366F1" />
    </View>
    <View className="flex-1">
      <Text className="text-dark-text font-bold text-base">{title}</Text>
      <Text className="text-dark-subtext text-sm">{description}</Text>
    </View>
  </View>
);

export default LandingScreen;
