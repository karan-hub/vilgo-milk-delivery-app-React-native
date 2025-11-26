import FormInput from "@/components/FormInput";
import { router } from "expo-router";
import { ArrowLeft, Building, Globe, Hash, Home, Landmark, LocateFixed, MapPin } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

export default function AddressScreen() {
    const [address, setAddress] = useState({
        flatNumber: "",
        buildingName: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        latitude: "",
        longitude: ""
    });

    const updateField = (key: string, value: string) => {
        setAddress({ ...address, [key]: value });
    };

    const handleSave = () => {
        if (!address.pincode || !address.city || !address.area) {
            Alert.alert("Missing Fields", "Please fill in Pincode, City, and Area.");
            return;
        }
        console.log("Saving Address:", address);
        router.back();
        Alert.alert("Success", "Address saved successfully!");
    };

    return (
        <View className="flex-1 bg-[#D9F2FF] pt-5">
            <View className="flex-row justify-between items-center mb-3 px-5">
                <Text className="text-2xl font-semibold text-[#0F0D23]">Address</Text>
                <Pressable
                    onPress={() => router.back()}
                    className="w-12 h-12 bg-[#6DD1EB] rounded-2xl items-center justify-center"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </Pressable>
            </View>

            <ScrollView
                className="flex-1 bg-[#F5FAFF] px-5 pt-5 border-t-white rounded-3xl"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-lg font-semibold text-[#0F0D23] mb-3 border-b border-[#E0E7FF] pb-1">
                    Primary Details
                </Text>

                <View className="flex-col justify-between">
                    <FormInput
                        label="Flat / House No."
                        placeholder="E.g., 101"
                        value={address.flatNumber}
                        onChangeText={(t: string) => updateField("flatNumber", t)}
                        icon={<Home size={18} color="#6DD1EB" />}
                        keyboardType="numeric"
                    />

                    <FormInput
                        label="Building Name"
                        placeholder="Tower A / Lotus Apts."
                        value={address.buildingName}
                        onChangeText={(t: string) => updateField("buildingName", t)}
                        icon={<Building size={18} color="#6DD1EB" />}
                    />

                    <FormInput
                        label="Area / Locality"
                        placeholder="Sector 45, XYZ Colony"
                        value={address.area}
                        onChangeText={(t: string) => updateField("area", t)}
                        icon={<MapPin size={18} color="#6DD1EB" />}
                    />
                </View>

                <Text className="text-lg font-semibold text-[#0F0D23] mb-2 border-b border-[#E0E7FF] pb-1">
                    Location Details
                </Text>

                <View>
                    <View className="flex-row justify-between">
                        <View className="flex-1 mr-2">
                            <FormInput
                                label="Pincode"
                                placeholder="6 digit code"
                                keyboardType="numeric"
                                value={address.pincode}
                                onChangeText={(t: string) => updateField("pincode", t)}
                                icon={<Hash size={18} color="#6DD1EB" />}
                                maxLength={6}
                            />
                        </View>
                        <View className="flex-1 ml-2">
                            <FormInput
                                label="City"
                                placeholder="Enter City"
                                value={address.city}
                                onChangeText={(t: string) => updateField("city", t)}
                                icon={<Globe size={18} color="#6DD1EB" />}
                            />
                        </View>
                    </View>

                    <FormInput
                        label="State"
                        placeholder="Enter State"
                        value={address.state}
                        onChangeText={(t: string) => updateField("state", t)}
                        icon={<Globe size={18} color="#6DD1EB" />}
                    />
                </View>

                <FormInput
                    label="Landmark (Optional)"
                    placeholder="Near school, temple etc."
                    value={address.landmark}
                    onChangeText={(t: string) => updateField("landmark", t)}
                    icon={<Landmark size={18} color="#6DD1EB" />}
                />

                <Pressable className="flex-row items-center justify-center py-3 border border-[#6DD1EB] rounded-xl mt-4 bg-[#E0F7FA] shadow-sm">
                    <LocateFixed size={18} color="#0F80FF" />
                    <Text className="text-center text-[#0F80FF] font-semibold text-base ml-2">
                        Use Current Location
                    </Text>
                </Pressable>

                <Pressable
                    onPress={handleSave}
                    className="bg-[#0F80FF] py-4 rounded-xl mt-8 mb-16 shadow-lg active:opacity-80"
                >
                    <Text className="text-center text-white font-extrabold text-lg uppercase tracking-wider">
                        Save Address
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}