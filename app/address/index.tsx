import { createAddress, deleteAddress, getAddresses, updateAddress } from "@/api/addressApi";
import FormInput from "@/components/FormInput";
import type { Address, CreateAddressRequest, UpdateAddressRequest } from "@/types/api";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { ArrowLeft, Building, Edit, Globe, Hash, Home, Landmark, LocateFixed, MapPin, Plus, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

type AddressFormData = {
    flatNumber: string;
    buildingName: string;
    area: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    latitude: string;
    longitude: string;
};

export default function AddressScreen() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState<AddressFormData>({
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

    const router = useRouter();

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load addresses");
            console.error("Load addresses error:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
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
        setEditingAddress(null);
        setShowForm(false);
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setFormData({
            flatNumber: address.flatNumber,
            buildingName: address.buildingName,
            area: address.area,
            landmark: address.landmark || "",
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            latitude: address.latitude.toString(),
            longitude: address.longitude.toString()
        });
        setShowForm(true);
    };

    const handleDelete = async (addressId: string) => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteAddress(addressId);
                            await loadAddresses();
                            Alert.alert("Success", "Address deleted successfully");
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete address");
                            console.error("Delete address error:", error);
                        }
                    }
                }
            ]
        );
    };

    const getCurrentLocation = async () => {
        try {
            setLocationLoading(true);

            // Request location permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    "Permission Denied",
                    "Location permission is required to get your current coordinates."
                );
                return;
            }

            // Get current position
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            // Update form data with coordinates
            setFormData({
                ...formData,
                latitude: location.coords.latitude.toString(),
                longitude: location.coords.longitude.toString()
            });

            Alert.alert("Success", "Location coordinates updated!");
        } catch (error) {
            console.error("Location error:", error);
            Alert.alert(
                "Location Error",
                "Unable to get your current location. Please enter coordinates manually."
            );
        } finally {
            setLocationLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.pincode || !formData.city || !formData.area) {
            Alert.alert("Missing Fields", "Please fill in Pincode, City, and Area.");
            return;
        }

        if (!formData.latitude || !formData.longitude) {
            Alert.alert("Missing Fields", "Please provide latitude and longitude coordinates.");
            return;
        }

        const lat = parseFloat(formData.latitude);
        const lng = parseFloat(formData.longitude);

        if (isNaN(lat) || isNaN(lng)) {
            Alert.alert("Invalid Coordinates", "Please enter valid numeric coordinates.");
            return;
        }

        try {
            setSaving(true);
            const addressData: CreateAddressRequest | UpdateAddressRequest = {
                flatNumber: formData.flatNumber,
                buildingName: formData.buildingName,
                area: formData.area,
                landmark: formData.landmark,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                latitude: lat,
                longitude: lng
            };

            if (editingAddress?.id) {
                await updateAddress(editingAddress.id, addressData);
                Alert.alert("Success", "Address updated successfully!");
            } else {
                await createAddress(addressData);
                Alert.alert("Success", "Address added successfully!");
            }

            await loadAddresses();
            resetForm();
        } catch (error) {
            Alert.alert("Error", editingAddress ? "Failed to update address" : "Failed to add address");
            console.error("Save address error:", error);
        } finally {
            setSaving(false);
        }
    };

    const formatAddress = (address: Address) => {
        return `${address.flatNumber}, ${address.buildingName}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;
    };

    if (loading) {
        return (
            <View className="flex-1 bg-[#D9F2FF] justify-center items-center">
                <ActivityIndicator size="large" color="#6DD1EB" />
                <Text className="mt-4 text-[#0F0D23]">Loading addresses...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#D9F2FF] pt-5">
            <View className="flex-row justify-between items-center mb-3 px-5">
                <Text className="text-2xl font-semibold text-[#0F0D23]">My Addresses</Text>
                <Pressable
                    onPress={() => router.back()}
                    className="w-12 h-12 bg-[#0F80FF] rounded-2xl items-center justify-center"
                >
                    <ArrowLeft size={20} color="#FFFFFF" />
                </Pressable>
            </View>

            <ScrollView
                className="flex-1 bg-[#EAF6FF] px-5 pt-5 border-t-white rounded-3xl"
                showsVerticalScrollIndicator={false}
            >
                {/* Address List */}
                {addresses.length > 0 && !showForm && (
                    <View className="mb-6">
                        <Text className="text-lg font-semibold text-[#0F0D23] mb-3">Saved Addresses</Text>
                        {addresses.map((address) => (
                            <View key={address.id} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
                                <View className="flex-row justify-between items-start">
                                    <View className="flex-1">
                                        <Text className="text-[#0F0D23] font-medium mb-1">
                                            {formatAddress(address)}
                                        </Text>
                                        {address.landmark && (
                                            <Text className="text-[#6B7280] text-sm">
                                                Landmark: {address.landmark}
                                            </Text>
                                        )}
                                        {address.default && (
                                            <View className="bg-[#6DD1EB] px-2 py-1 rounded-full mt-2 self-start">
                                                <Text className="text-white text-xs font-medium">Default</Text>
                                            </View>
                                        )}
                                    </View>
                                    <View className="flex-row ml-2">
                                        <TouchableOpacity
                                            onPress={() => handleEdit(address)}
                                            className="w-8 h-8 bg-[#E0F7FA] rounded-lg items-center justify-center mr-2"
                                        >
                                            <Edit size={16} color="#0F80FF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => address.id && handleDelete(address.id)}
                                            className="w-8 h-8 bg-[#FEE2E2] rounded-lg items-center justify-center"
                                        >
                                            <Trash2 size={16} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Add New Address Button */}
                {!showForm && (
                    <Pressable
                        onPress={() => setShowForm(true)}
                        className="flex-row items-center justify-center py-4 border-2 border-dashed border-[#6DD1EB] rounded-xl mb-6 bg-[#E0F7FA]"
                    >
                        <Plus size={20} color="#0F80FF" />
                        <Text className="text-[#0F80FF] font-semibold text-base ml-2">
                            Add New Address
                        </Text>
                    </Pressable>
                )}

                {/* Address Form */}
                {showForm && (
                    <View>
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-semibold text-[#0F0D23]">
                                {editingAddress ? "Edit Address" : "Add New Address"}
                            </Text>
                            <TouchableOpacity
                                onPress={resetForm}
                                className="px-3 py-1 bg-[#F3F4F6] rounded-lg"
                            >
                                <Text className="text-[#6B7280] text-sm">Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-base font-semibold text-[#0F0D23] mb-3 border-b border-[#E0E7FF] pb-1">
                            Primary Details
                        </Text>

                        <View className="flex-col justify-between">
                            <FormInput
                                label="Flat / House No."
                                placeholder="E.g., 101"
                                value={formData.flatNumber}
                                onChangeText={(t: string) => setFormData({ ...formData, flatNumber: t })}
                                icon={<Home size={18} color="#6DD1EB" />}
                                keyboardType="numeric"
                            />

                            <FormInput
                                label="Building Name"
                                placeholder="Tower A / Lotus Apts."
                                value={formData.buildingName}
                                onChangeText={(t: string) => setFormData({ ...formData, buildingName: t })}
                                icon={<Building size={18} color="#6DD1EB" />}
                            />

                            <FormInput
                                label="Area / Locality"
                                placeholder="Sector 45, XYZ Colony"
                                value={formData.area}
                                onChangeText={(t: string) => setFormData({ ...formData, area: t })}
                                icon={<MapPin size={18} color="#6DD1EB" />}
                            />
                        </View>

                        <Text className="text-base font-semibold text-[#0F0D23] mb-2 border-b border-[#E0E7FF] pb-1">
                            Location Details
                        </Text>

                        <View>
                            <View className="flex-row justify-between">
                                <View className="flex-1 mr-2">
                                    <FormInput
                                        label="Pincode"
                                        placeholder="6 digit code"
                                        keyboardType="numeric"
                                        value={formData.pincode}
                                        onChangeText={(t: string) => setFormData({ ...formData, pincode: t })}
                                        icon={<Hash size={18} color="#6DD1EB" />}
                                        maxLength={6}
                                    />
                                </View>
                                <View className="flex-1 ml-2">
                                    <FormInput
                                        label="City"
                                        placeholder="Enter City"
                                        value={formData.city}
                                        onChangeText={(t: string) => setFormData({ ...formData, city: t })}
                                        icon={<Globe size={18} color="#6DD1EB" />}
                                    />
                                </View>
                            </View>

                            <FormInput
                                label="State"
                                placeholder="Enter State"
                                value={formData.state}
                                onChangeText={(t: string) => setFormData({ ...formData, state: t })}
                                icon={<Globe size={18} color="#6DD1EB" />}
                            />
                        </View>

                        <FormInput
                            label="Landmark (Optional)"
                            placeholder="Near school, temple etc."
                            value={formData.landmark}
                            onChangeText={(t: string) => setFormData({ ...formData, landmark: t })}
                            icon={<Landmark size={18} color="#6DD1EB" />}
                        />

                        <Text className="text-base font-semibold text-[#0F0D23] mb-2 border-b border-[#E0E7FF] pb-1">
                            Coordinates
                        </Text>

                        <View className="flex-row justify-between">
                            <View className="flex-1 mr-2">
                                <FormInput
                                    label="Latitude"
                                    placeholder="e.g., 19.9975"
                                    keyboardType="numeric"
                                    value={formData.latitude}
                                    onChangeText={(t: string) => setFormData({ ...formData, latitude: t })}
                                    icon={<LocateFixed size={18} color="#6DD1EB" />}
                                />
                            </View>
                            <View className="flex-1 ml-2">
                                <FormInput
                                    label="Longitude"
                                    placeholder="e.g., 73.7898"
                                    keyboardType="numeric"
                                    value={formData.longitude}
                                    onChangeText={(t: string) => setFormData({ ...formData, longitude: t })}
                                    icon={<LocateFixed size={18} color="#6DD1EB" />}
                                />
                            </View>
                        </View>

                        <Pressable
                            onPress={getCurrentLocation}
                            disabled={locationLoading}
                            className="flex-row items-center justify-center py-3 border border-[#6DD1EB] rounded-xl mt-4 bg-[#E0F7FA] shadow-sm disabled:opacity-50"
                        >
                            {locationLoading ? (
                                <ActivityIndicator size="small" color="#0F80FF" />
                            ) : (
                                <LocateFixed size={18} color="#0F80FF" />
                            )}
                            <Text className="text-center text-[#0F80FF] font-semibold text-base ml-2">
                                {locationLoading ? "Getting Location..." : "Use Current Location"}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={handleSave}
                            disabled={saving}
                            className="bg-[#0F80FF] py-4 rounded-xl mt-8 mb-16 shadow-lg active:opacity-80 disabled:opacity-50"
                        >
                            {saving ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-center text-white font-extrabold text-lg uppercase tracking-wider">
                                    {editingAddress ? "Update Address" : "Save Address"}
                                </Text>
                            )}
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}