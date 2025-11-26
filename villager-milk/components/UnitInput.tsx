import React from 'react'
import { Text, View } from 'react-native'
import QuantitySelector from './QuantitySelector'

function UnitInput({ lable, unit }: { lable: string, unit: Number }) {
    return (
        <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-[#0F0D23] w-1/2">
                {lable}
            </Text>

            <QuantitySelector
                quantity={Number(unit)}
                onIncrease={function (): void {
                    throw new Error('Function not implemented.')
                }} onDecrease={function (): void {
                    throw new Error('Function not implemented.')
                }} />
        </View>
    )
}

export default UnitInput