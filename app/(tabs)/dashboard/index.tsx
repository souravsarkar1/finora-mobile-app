// Import a simple modal date picker that doesn't require native modules
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { getMonthWiseReport } from "@/services/dashboardServices";
import { LineChart, BarChart } from "react-native-chart-kit";

interface MonthYearPickerProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (date: Date) => void;
    initialDate: Date;
}

interface Expense {
    _id: string;
    category: string;
    description: string;
    amount: number;
    date: string;
}

interface MonthlyData {
    totalAmount: number;
    expenses: Expense[];
}

interface ChartData {
    labels: string[];
    datasets: Array<{
        data: number[];
    }>;
}

type GraphType = 'line' | 'bar';

// Define a simple month picker
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

const Dashboard: React.FC = () => {
    const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null);
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [graphType, setGraphType] = useState<GraphType>('line');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMonthWiseReport(
                selectedDate.getMonth() + 1,
                selectedDate.getFullYear()
            );
            setMonthlyData(response.data);

            if (response.data?.expenses) {
                const processedData = processExpensesData(response.data.expenses);
                setChartData(processedData);
            }
        };
        fetchData();
    }, [selectedDate]);

    const processExpensesData = (expenses: Expense[]): ChartData => {
        // Group expenses by date and sum amounts
        const groupedByDate = expenses.reduce((acc: { [key: string]: number }, curr) => {
            const date = new Date(curr.date).getDate();
            acc[date] = (acc[date] || 0) + curr.amount;
            return acc;
        }, {});

        // Convert to arrays for the chart
        const dates = Object.keys(groupedByDate);
        const amounts = Object.values(groupedByDate);

        return {
            labels: dates,
            datasets: [{
                data: amounts
            }]
        };
    };

    const renderChart = () => {
        if (!chartData) return null;

        const commonProps = {
            data: chartData,
            width: Dimensions.get("window").width - 48,
            height: 220,
            chartConfig: {
                backgroundColor: "#1E1E1E",
                backgroundGradientFrom: "#1E1E1E",
                backgroundGradientTo: "#1E1E1E",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#6366F1"
                }
            },
            style: {
                marginVertical: 8,
                borderRadius: 16
            },
            yAxisLabel: "$", // Add a label for the Y-axis
            yAxisSuffix: ""  // Optional suffix for the Y-axis
        };

        return graphType === 'line' ? (
            <LineChart {...commonProps} bezier />
        ) : (
            <BarChart {...commonProps} />
        );
    };

    return (
        <ScrollView className="flex-1 bg-dark-bg px-4 pt-12">
            {/* Custom Month Year Picker */}
            <MonthYearPicker
                visible={showDateModal}
                onClose={() => setShowDateModal(false)}
                onSelect={(date) => setSelectedDate(date)}
                initialDate={selectedDate}
            />

            <View className="space-y-6">
                {/* Header */}
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-dark-text text-2xl font-bold">
                            Monthly Overview
                        </Text>
                        <Text className="text-dark-subtext mt-1">
                            Total Spent: ${monthlyData?.totalAmount || 0}
                        </Text>
                    </View>
                    <View className="flex-row mt-5 items-center space-x-2">
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
                    </View>
                </View>

                {/* Chart */}
                {chartData && (
                    <View className="bg-dark-card p-4 rounded-xl border border-dark-border">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-dark-text text-lg font-bold">
                                Daily Expenses
                            </Text>
                            <View className="flex-row space-x-2">
                                <TouchableOpacity
                                    className={`px-4 py-2 rounded-lg ${graphType === 'line'
                                        ? 'bg-primary-500'
                                        : 'bg-dark-border'
                                        }`}
                                    onPress={() => setGraphType('line')}
                                >
                                    <Text className={`${graphType === 'line'
                                        ? 'text-white'
                                        : 'text-dark-text'
                                        }`}>
                                        Line
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={`px-4 py-2 rounded-lg ${graphType === 'bar'
                                        ? 'bg-primary-500'
                                        : 'bg-dark-border'
                                        }`}
                                    onPress={() => setGraphType('bar')}
                                >
                                    <Text className={`${graphType === 'bar'
                                        ? 'text-white'
                                        : 'text-dark-text'
                                        }`}>
                                        Bar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {renderChart()}
                    </View>
                )}

                {/* Expenses List */}
                <View style={{ marginBottom: 20 }} className="space-y-4 pt-3 pb-3">
                    <Text className="text-dark-text text-lg font-bold">
                        Recent Expenses
                    </Text>
                    {monthlyData?.expenses?.map((expense) => (
                        <View
                            key={expense._id}
                            className="bg-dark-card p-4 rounded-xl mt-4 border border-dark-border"
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-dark-text font-bold">
                                        {expense.category}
                                    </Text>
                                    <Text className="text-dark-subtext text-sm">
                                        {expense.description}
                                    </Text>
                                    <Text className="text-dark-subtext text-sm">
                                        {new Date(expense.date).toLocaleDateString()}
                                    </Text>
                                </View>
                                <Text className="text-primary-400 font-bold">
                                    ${expense.amount}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Dashboard;
