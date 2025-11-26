import React from 'react'
import { ScrollView } from "react-native"
import UnitInput from './UnitInput'

function CustomSubscription() {
    const week = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday"]
    return (
        <ScrollView
            className="mt-2 "
            style={{ maxHeight: 220 }}
            showsVerticalScrollIndicator={false}
        >
            {
                week.map((val, idx) => (
                    <UnitInput key={idx} lable={val} unit={1} />
                ))
            }
        </ScrollView>
    )
}

export default CustomSubscription