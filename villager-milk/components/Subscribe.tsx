import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Pressable, View } from 'react-native'

function Subscribe() {
    return (
        <View className='flex-1 bg-slate-100'>
            <Pressable
                onPress={() => router.back()}
                className="bg-[#6DD1EB] p-3 rounded-2xl shadow-sm active:opacity-80"
            >
                <ArrowLeft size={20} color="#FFFFFF" />
            </Pressable>
        </View>
    )
}

export default Subscribe()