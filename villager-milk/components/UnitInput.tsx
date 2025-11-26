import { Minus, Plus } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

function UnitInput({ lable, unit }: { lable: string, unit: Number }) {
    return (
        <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-[#0F0D23] w-1/2">
                {lable}
            </Text>

            <View className="flex-row items-center bg-[#E9F7FF] rounded-xl px-3 py-2 w-1/2 justify-between">
                <Pressable
                    onPress={() => { }}
                    className="bg-[#6DD1EB] w-7 h-7 rounded-md items-center justify-center"
                >
                    <Minus size={14} color="#fff" />
                </Pressable>

                <Text className="text-lg font-semibold text-[#0F0D23]">
                    {JSON.stringify(unit)}
                </Text>

                <Pressable
                    onPress={() => { }}
                    className="bg-[#6DD1EB] w-7 h-7 rounded-md items-center justify-center"
                >
                    <Plus size={14} color="#fff" />
                </Pressable>
            </View>
        </View>
    )
}

export default UnitInput