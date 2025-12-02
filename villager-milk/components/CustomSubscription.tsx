import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import DateInput from "./DateInpute";
import QuantitySelector from "./QuantitySelector";


export default function CustomSubscription({ productId }: { productId: number }) {
    const { dispatch } = useCart();

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [dayUnits, setDayUnits] = useState<{ [key: number]: number }>({});
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const toggleDay = (i: number) => {
        if (selectedDays.includes(i)) {
            setSelectedDays(prev => prev.filter(day => day !== i));
            const updated = { ...dayUnits };
            delete updated[i];
            setDayUnits(updated);
        } else {
            setSelectedDays(prev => [...prev, i]);
            setDayUnits(prev => ({ ...prev, [i]: 1 }));
        }
    };

    const updateUnit = (i: number, value: number) => {
        if (value < 1) return;
        setDayUnits(prev => ({ ...prev, [i]: value }));
    };

    const handleAddCustom = () => {
        if (!startDate) {
            Alert.alert("Start Date Required", "Please select a start date.");
            return;
        }

        if (!endDate) {
            Alert.alert("End Date Required", "Please select an end date.");
            return;
        }

        if (new Date(endDate) <= new Date(startDate)) {
            Alert.alert("Invalid End Date", "End date must be after Start date.");
            return;
        }

        if (selectedDays.length === 0) {
            Alert.alert("Select Days", "Choose at least one delivery day.");
            return;
        }

        const subscription = {
            id: Date.now().toString(),
            productId,
            type: "custom",
            dayUnits,
            selectedDays,
            startDate,
            endDate,
            createdAt: new Date().toISOString(),
        };

        dispatch({
            type: "ADD_SUBSCRIPTION",
            payload: subscription,
        });

        Alert.alert("Added!", "Your custom subscription has been added.");
    };

    return (
        <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mt-1">

            <Text className="text-sm font-semibold text-[#0F0D23] mb-3">
                Custom Delivery Schedule
            </Text>

            {/* Days Selector */}
            <Text className="text-xs text-gray-600 mb-2">Select delivery days</Text>

            <View className="flex-row flex-wrap gap-2 mb-3">
                {weekDays.map((day, i) => {
                    const active = selectedDays.includes(i);
                    return (
                        <Pressable
                            key={i}
                            onPress={() => toggleDay(i)}
                            className={`px-4 py-2 rounded-xl border ${active
                                ? "bg-[#0F80FF] border-[#0F80FF]"
                                : "bg-white border-gray-300"
                                }`}
                        >
                            <Text
                                className={`text-xs font-medium ${active ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                {day}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {/* Unit Selector For Each Selected Day */}
            {selectedDays.length > 0 && (
                <View className="mt-2 mb-3">
                    <Text className="text-xs font-semibold text-gray-600 mb-1">
                        Units per selected day
                    </Text>

                    {selectedDays.map((i) => (
                        <View
                            key={i}
                            className="flex-row justify-between items-center py-2"
                        >
                            <Text className="text-sm font-semibold text-gray-700 w-20">
                                {weekDays[i]}
                            </Text>

                            <QuantitySelector
                                quantity={dayUnits[i] || 1}
                                onIncrease={() => updateUnit(i, (dayUnits[i] || 1) + 1)}
                                onDecrease={() => updateUnit(i, (dayUnits[i] || 1) - 1)}
                            />
                        </View>
                    ))}
                </View>
            )}

            {/* Date Pickers */}
            <DateInput label="Start Date" value={startDate} onChange={setStartDate} />

            <View className="mt-2">
                <DateInput label="End Date" value={endDate} onChange={setEndDate} />
            </View>

            {/* Add Button */}
            <Pressable
                onPress={handleAddCustom}
                className="bg-[#0F80FF] py-3 rounded-2xl items-center mt-4 shadow-sm active:opacity-85"
            >
                <Text className="text-white font-semibold text-sm">
                    Add Custom Plan
                </Text>
            </Pressable>
        </View>
    );
}
