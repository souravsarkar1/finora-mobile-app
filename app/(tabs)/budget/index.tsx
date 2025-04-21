import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { addNewBugget, getAllBuget } from "@/services/bugetServices";
import { getMonthWiseReport } from "@/services/dashboardServices";
import { useAppSelector } from "@/redux/store/store";
import { currencies } from "@/lib/currency";

interface MonthYearPickerProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (date: Date) => void;
    initialDate: Date;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ visible, onClose, onSelect, initialDate }) => {
    const [year, setYear] = useState(initialDate.getFullYear());
    const [month, setMonth] = useState(initialDate.getMonth());

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Generate array of years (current year ± 5 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    const handleSelect = () => {
        const selectedDate = new Date(year, month, 1);
        onSelect(selectedDate);
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                onPress={onClose}
            >
                <View
                    className="bg-dark-card p-4 rounded-xl border border-dark-border w-4/5"
                    onStartShouldSetResponder={() => true}
                >
                    <Text className="text-dark-text text-lg font-bold mb-4 text-center">
                        Select Month & Year
                    </Text>

                    {/* Month Selector */}
                    <View className="mb-4">
                        <Text className="text-dark-subtext mb-2">Month:</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 8 }}
                        >
                            {months.map((monthName, index) => (
                                <TouchableOpacity
                                    key={monthName}
                                    className={`px-4 py-2 mr-2 rounded-lg ${month === index ? 'bg-primary-500' : 'bg-dark-border'}`}
                                    onPress={() => setMonth(index)}
                                >
                                    <Text className={`${month === index ? 'text-white' : 'text-dark-text'}`}>
                                        {monthName}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Year Selector */}
                    <View className="mb-4">
                        <Text className="text-dark-subtext mb-2">Year:</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 8 }}
                        >
                            {years.map((yearNum) => (
                                <TouchableOpacity
                                    key={yearNum}
                                    className={`px-4 py-2 mr-2 rounded-lg ${year === yearNum ? 'bg-primary-500' : 'bg-dark-border'}`}
                                    onPress={() => setYear(yearNum)}
                                >
                                    <Text className={`${year === yearNum ? 'text-white' : 'text-dark-text'}`}>
                                        {yearNum}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <TouchableOpacity
                        className="bg-primary-500 py-3 rounded-lg mt-4"
                        onPress={handleSelect}
                    >
                        <Text className="text-white text-center font-bold">
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const BudgetScreen = () => {
    const [budgets, setBudgets] = useState<any>([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Food');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [monthlyReports, setMonthlyReports] = useState<any>(null);
    const [currency, setCurrency] = useState<string>("");
    const { user } = useAppSelector(st => st.auth);
    console.log(user, "123");

    const getCurrencySymbol = () => {
        try {
            const userCurrency = user?.currency || 'USD';
            const currencyInfo = currencies.find(c => c.code === userCurrency);
            return currencyInfo?.symbol || '$';
        } catch (error) {
            return '$'; // fallback to $ if any error occurs
        }
    }

    // Add useEffect to fetch budgets when selectedDate changes
    useEffect(() => {
        fetchBudgets();
        getMonthWiseReports();
        getCurrencySymbol();
    }, [selectedDate]);

    const fetchBudgets = async () => {
        try {
            // Add your API call here
            const fetchedBudgets = await getAllBuget({
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1
            });
            if (fetchedBudgets) {
                const mappedBudgets = fetchedBudgets.categories.map((category: any) => ({
                    id: category._id,
                    category: category.name,
                    spent: 0, // Since the API doesn't provide spent amount yet
                    limit: category.target,
                    icon: getCategoryIcon(category.name),
                    color: getCategoryColor(category.name)
                }));
                setBudgets(mappedBudgets);
            }
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const getMonthWiseReports = async () => {
        try {
            const res = await getMonthWiseReport(selectedDate.getMonth() + 1, selectedDate.getFullYear());
            console.log(res, "155");
            setMonthlyReports(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddBudget = async () => {
        try {
            const newBudget = {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                categories: [{
                    name: selectedCategory,
                    target: parseFloat(budgetAmount)
                }]
            };

            // Add your API call here
            const res = await addNewBugget(newBudget);

            setSelectedCategory('Food');
            setBudgetAmount('');
            // setIsModalVisible(false);
            // Refresh budgets after adding new one
            fetchBudgets();
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    const BudgetCard = ({ budget }: any) => {
        const percentage = (budget.spent / budget.limit) * 100;

        return (
            <View className="bg-dark-card p-4 rounded-xl border border-dark-border mb-4">
                <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                        <View
                            style={{ backgroundColor: `${budget.color}20` }}
                            className="w-10 h-10 rounded-full items-center justify-center"
                        >
                            <Ionicons name={budget.icon as any} size={20} color={budget.color} />
                        </View>
                        <Text className="text-dark-text font-bold ml-3">{budget.category}</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-horizontal" size={20} color="#A0A0A0" />
                    </TouchableOpacity>
                </View>

                <View className="space-y-2">
                    <View className="h-2 bg-dark-border rounded-full overflow-hidden">
                        <View
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: percentage > 90 ? '#EF4444' : budget.color
                            }}
                            className="h-full rounded-full"
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-dark-subtext">
                            ${budget.spent} spent
                        </Text>
                        <Text className="text-dark-subtext">
                            ${budget.limit} limit
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const getCategoryIcon = (name: string): string => {
        const icons: { [key: string]: string } = {
            'Food': 'fast-food',
            'Transportation': 'car',
            'Entertainment': 'game-controller',
            'Shopping': 'cart',
            'Bills': 'receipt',
            'Healthcare': 'medical'
        };
        return icons[name] || 'help-circle';
    };

    const getCategoryColor = (name: string): string => {
        const colors: { [key: string]: string } = {
            'Food': '#6366F1',
            'Transportation': '#EC4899',
            'Entertainment': '#10B981',
            'Shopping': '#F59E0B',
            'Bills': '#3B82F6',
            'Healthcare': '#EF4444'
        };
        return colors[name] || '#A0A0A0';
    };

    return (
        <ScrollView className="flex-1 bg-dark-bg px-4 pt-12">
            {/* Month Year Picker Modal */}
            <MonthYearPicker
                visible={showDateModal}
                onClose={() => setShowDateModal(false)}
                onSelect={(date) => setSelectedDate(date)}
                initialDate={selectedDate}
            />

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-dark-card p-6 rounded-2xl w-[90%]">
                        <Text className="text-dark-text text-xl font-bold mb-4">
                            Add New Budget
                        </Text>

                        <Text className="text-dark-subtext mb-2">Category</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        >
                            {['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare'].map((category: string) => (
                                <TouchableOpacity
                                    key={category}
                                    className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === category
                                        ? 'bg-primary-500'
                                        : 'bg-dark-border'
                                        }`}
                                    onPress={() => setSelectedCategory(category)}
                                >
                                    <Text className={`${selectedCategory === category
                                        ? 'text-white'
                                        : 'text-dark-subtext'
                                        }`}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text className="text-dark-subtext mb-2">Budget Amount</Text>
                        <TextInput
                            className="bg-dark-border p-4 rounded-xl text-dark-text mb-6"
                            placeholder="Enter amount"
                            placeholderTextColor="#A0A0A0"
                            keyboardType="numeric"
                            value={budgetAmount}
                            onChangeText={setBudgetAmount}
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
                                onPress={handleAddBudget}
                            >
                                <Text className="text-white text-center font-bold">
                                    Add Budget
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View className="space-y-6">
                {/* Header with Month Selection */}
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-dark-text text-2xl font-bold">
                            Budget
                        </Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <TouchableOpacity
                            className="p-2"
                            onPress={() => {
                                const newDate = new Date(selectedDate);
                                newDate.setMonth(newDate.getMonth() - 1);
                                setSelectedDate(newDate);
                            }}
                        >
                            <Ionicons name="chevron-back" size={24} color="#A0A0A0" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowDateModal(true)}
                        >
                            <Text className="text-dark-text font-medium">
                                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="p-2"
                            onPress={() => {
                                const newDate = new Date(selectedDate);
                                newDate.setMonth(newDate.getMonth() + 1);
                                setSelectedDate(newDate);
                            }}
                        >
                            <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-primary-500 p-2 rounded-full ml-2"
                            activeOpacity={0.7}
                            onPress={() => setIsModalVisible(true)}
                        >
                            <Ionicons name="add" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Monthly Overview */}
                <View className="bg-dark-card p-4 rounded-xl border border-dark-border">
                    <Text className="text-dark-text font-bold text-lg mb-2">
                        Monthly Overview
                    </Text>
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-dark-subtext">Total Budget</Text>
                            <Text className="text-dark-text text-2xl font-bold">
                                {getCurrencySymbol()}{budgets.reduce((acc: number, budget: any) => acc + budget.limit, 0)}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-dark-subtext">Spent</Text>
                            <Text className="text-dark-text text-2xl font-bold">
                                {getCurrencySymbol()}{monthlyReports?.data?.totalAmount || 0}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-dark-subtext">Remaining</Text>
                            <Text className="text-dark-text text-2xl font-bold">
                                {getCurrencySymbol()}300
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Budget Categories */}
                <View>
                    <Text className="text-dark-text font-bold text-lg mb-4">
                        Budget Categories
                    </Text>
                    {budgets.map((budget: any) => (
                        <BudgetCard key={budget.id} budget={budget} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default BudgetScreen;
