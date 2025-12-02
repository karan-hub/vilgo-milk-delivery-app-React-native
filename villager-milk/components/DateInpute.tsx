import { Calendar } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

function DateInpute({ lable }: { lable: string }) {
    return (
        <View className="flex-row items-center justify-between  ">
            <Text className="text-base font-semibold text-[#0F0D23] w-1/2  ">
                {lable}
            </Text>

            <Pressable className="flex-row items-center bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                <Text className="text-slate-600">Select Date</Text>
                <Calendar size={18} color="#6DD1EB" />
            </Pressable>
        </View>
    )
}

export default DateInpute