import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

interface AddTransactionModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
    isModalVisible,
    setIsModalVisible,
    selectedCategory,
    setSelectedCategory
}) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    const [incomeSource, setIncomeSource] = useState(["Salary", "Business", "Investment", "Other"]);
    const [expenseSource, setExpenseSource] = useState(['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare'])
    const handleAddTransaction = () => {
        // Add your transaction logic here
        setIsModalVisible(false);
        // Reset form
        setAmount('');
        setDescription('');
        setType('expense');
    };

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-dark-card p-6 rounded-2xl w-[90%]">
                    <Text className="text-dark-text text-xl font-bold mb-4">
                        Add New Transaction
                    </Text>

                    <Text className="text-dark-subtext mb-2">Type</Text>
                    <View className="flex-row space-x-2 mb-4">
                        <TouchableOpacity
                            className={`flex-1 p-3 rounded-xl ${type === 'expense' ? 'bg-primary-500' : 'bg-dark-border'}`}
                            onPress={() => setType('expense')}
                        >
                            <Text className={`text-center ${type === 'expense' ? 'text-white' : 'text-dark-subtext'}`}>
                                Expense
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 p-3 rounded-xl ${type === 'income' ? 'bg-primary-500' : 'bg-dark-border'}`}
                            onPress={() => setType('income')}
                        >
                            <Text className={`text-center ${type === 'income' ? 'text-white' : 'text-dark-subtext'}`}>
                                Income
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <Text className="text-dark-subtext mb-2">Category</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-4"
                    >
                        {type === 'expense' ? expenseSource : incomeSource.map((category: string) => (
                            <TouchableOpacity
                                key={category}
                                className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === category ? 'bg-primary-500' : 'bg-dark-border'
                                    }`}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text className={selectedCategory === category ? 'text-white' : 'text-dark-subtext'}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text className="text-dark-subtext mb-2">Amount</Text>
                    <TextInput
                        className="bg-dark-border p-4 rounded-xl text-dark-text mb-4"
                        placeholder="Enter amount"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <Text className="text-dark-subtext mb-2">Description</Text>
                    <TextInput
                        className="bg-dark-border p-4 rounded-xl text-dark-text mb-6"
                        placeholder="Enter description"
                        placeholderTextColor="#A0A0A0"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View className="flex-row space-x-3">
                        <TouchableOpacity
                            className="flex-1 bg-dark-border p-4 rounded-xl"
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text className="text-dark-text text-center font-bold">
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 bg-primary-500 p-4 rounded-xl"
                            onPress={handleAddTransaction}
                        >
                            <Text className="text-white text-center font-bold">
                                Add Transaction
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const TransactionsScreen = () => {
    const [filterType, setFilterType] = useState("all");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Food');
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
    ]);



    const filteredTransactions = transactions.filter(transaction => {
        if (filterType === "all") return true;
        return transaction.type === filterType;
    });

    const FilterButton = ({ title, type, currentFilter, onPress }: any) => (
        <TouchableOpacity
            onPress={() => onPress(type)}
            className={`px-4 py-2 rounded-full ${currentFilter === type ? "bg-primary-500" : "bg-dark-border"}`}
        >
            <Text className={currentFilter === type ? "text-white" : "text-dark-subtext"}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    const TransactionCard = ({ transaction }: any) => (
        <TouchableOpacity
            className="bg-dark-card p-4 rounded-xl border border-dark-border mb-3"
            activeOpacity={0.7}
        >
            <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary-500/10 rounded-full items-center justify-center">
                    <Ionicons
                        name={transaction.icon}
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
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View className="flex-row gap-2 space-x-2 mb-5">
                    <FilterButton
                        title="All"
                        type="all"
                        currentFilter={filterType}
                        onPress={setFilterType}
                    />
                    <FilterButton
                        title="Income"
                        type="income"
                        currentFilter={filterType}
                        onPress={setFilterType}
                    />
                    <FilterButton
                        title="Expense"
                        type="expense"
                        currentFilter={filterType}
                        onPress={setFilterType}
                    />
                </View>

                {/* Transactions List */}
                <View>
                    {filteredTransactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </View>
            </View>

            <AddTransactionModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
        </ScrollView>
    );
};

export default TransactionsScreen;
