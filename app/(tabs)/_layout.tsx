import { Tabs } from 'expo-router';
import { CalendarRange, Home, ShoppingCart, UserRound } from "lucide-react-native";
import React from 'react';
import { View } from 'react-native';

const ICONS = {
    home: Home,
    subscription: CalendarRange,
    orders: ShoppingCart,
    profile: UserRound,
} as const;

type IconName = keyof typeof ICONS;

function TabIcon({ focused, icon, title }: { focused: boolean; icon: IconName; title: string }) {
    const Icon = ICONS[icon];

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon 
                size={focused ? 28 :26} 
                color={focused ? "#8CA9FF" : "#34656D"} 
                strokeWidth={focused ? 1.5 : 1}
            />
        </View>
    );
}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#FFFCFB",
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    elevation: 0,
                    shadowOpacity: 1,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="home" title="home" />
                    )
                }}
            />

            <Tabs.Screen
                name="subscription/index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="subscription" title="subscription" />
                    )
                }}
            />

            <Tabs.Screen
                name="order/index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="orders" title="orders" />
                    )
                }}
            />

            <Tabs.Screen
                name="profile/index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="profile" title="profile" />
                    )
                }}
            />
        </Tabs>
    );
}