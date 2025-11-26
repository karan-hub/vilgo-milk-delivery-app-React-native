import { Calendar } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

function StartFrom({ lable }: { lable: string }) {
    return (
        <View className="flex-row items-center justify-between  ">
            <Text className="text-base font-semibold text-[#0F0D23] w-1/2  ">
                {lable}
            </Text>

            <Pressable className="flex-row items-center justify-between px-4 py-3 bg-[#F3F8FF] rounded-xl w-1/2">
                <Text className="text-slate-600">Select Date</Text>
                <Calendar size={18} color="#6DD1EB" />
            </Pressable>
        </View>
    )
}

export default StartFrom