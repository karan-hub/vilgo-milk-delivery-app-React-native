import React from 'react'
import { Text, View } from 'react-native'
import QuantitySelector from './QuantitySelector'

function UnitInput({ label, unit, onIncrease, onDecrease }: UnitInputProps) {
    return (
        <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-[#0F0D23] w-1/2">
                {label}
            </Text>

            <QuantitySelector
                quantity={Number(unit)}
                onIncrease={onIncrease || (() => { })}
                onDecrease={onDecrease || (() => { })} />
        </View>
    )
}

export default UnitInput