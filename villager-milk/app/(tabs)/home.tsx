import { products } from "@/Data/products";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Searchbar";
import { useRouter } from "expo-router";
import { MapPinCheckInside, ShoppingCart } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";




export default function HomeScreen() {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  // console.log(products);


  return (
    <View className=" flex-1 bg-slate-100">
      <View className="flex flex-row items-center justify-between h-16 px-4">

        <View className="flex-row justify-center items-center gap-1">

          <MapPinCheckInside
            size={26}
            color="#0F0D23"
            onPress={() => router.push("/address")} />



          <Text>Nashik</Text>
        </View>
        <View className="scale-x-[-1]">
          <ShoppingCart
            size={26}
            color="#0F0D23"
            onPress={() => router.push("/(tabs)/order")} />
        </View>


      </View>
      <Search placeholder={"Search For Milk "} onChangeText={handleSearch} value={searchQuery} />


      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} onAddToCart={undefined} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 15,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingTop: 10,
        }}
        ListHeaderComponent={
          <>
            <Banner />
            <View className="flex m-3">
              <Text className="text-md font-bold text-black">Exclusive Offer</Text>
            </View>

          </>
        }

      />

    </View>
  );
}
