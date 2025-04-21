import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

const TransactionsScreen = () => {
    const [transactions] = useState([
        {
            id: 1,
            type: 'expense',
            amount: 45.99,
            category: 'Food & Dining',
            description: 'Grocery Shopping',
            date: '2024-02-20',
            icon: 'fast-food'
        },
        {
            id: 2,
            type: 'income',
            amount: 2500.00,
            category: 'Salary',
            description: 'Monthly Salary',
            date: '2024-02-19',
            icon: 'cash'
        },
        // Add more mock transactions as needed
    ]);

    const TransactionCard = ({ transaction }: any) => (
        <TouchableOpacity
            className="bg-dark-card p-4 rounded-xl border border-dark-border mb-3"
            activeOpacity={0.7}
        >
            <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary-500/10 rounded-full items-center justify-center">
                    <Ionicons
                        name={transaction.icon as any}
                        size={20}
                        color="#6366F1"
                    />
                </View>
                <View className="flex-1 ml-3">
                    <Text className="text-dark-text font-bold">{transaction.category}</Text>
                    <Text className="text-dark-subtext text-sm">{transaction.description}</Text>
                </View>
                <View className="items-end">
                    <Text className={`font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </Text>
                    <Text className="text-dark-subtext text-sm">{transaction.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView className="flex-1 bg-dark-bg px-4 pt-12">
            <View className="space-y-6">
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-dark-text text-2xl font-bold">
                        Transactions
                    </Text>
                    <TouchableOpacity
                        className="bg-primary-500 p-2 rounded-full"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View className="flex-row space-x-2">
                    <TouchableOpacity className="bg-primary-500 px-4 py-2 rounded-full">
                        <Text className="text-dark-text">All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-dark-card border border-dark-border px-4 py-2 rounded-full">
                        <Text className="text-dark-subtext">Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-dark-card border border-dark-border px-4 py-2 rounded-full">
                        <Text className="text-dark-subtext">Expense</Text>
                    </TouchableOpacity>
                </View>

                {/* Transactions List */}
                <View>
                    {transactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default TransactionsScreen;