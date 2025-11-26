import { useCart } from "@/context/CartContext";
import { products } from "@/Data/products";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, BadgeCheck, HeartPlus, Repeat, ShoppingBag, ShoppingCart, Sparkles, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id == Number(id));
  if (!product) return <Text>Product not found</Text>;
  const [activeTab, setActiveTab] = useState<"highlights" | "benefits" | "nutrition">("highlights");

  const { dispatch } = useCart()
  const [cart, setToCart] = useState(false);

  const router = useRouter();

  const AddToCart = () => {
    setToCart(true)
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: typeof product.images[0] === "string"
          ? { uri: product.images[0] }
          : product.images[0],
        unit: product.volume || product.weight,
        count: 1,
      }

    })
  }

  useEffect(() => {
    if (cart) {
      const timer = setTimeout(() => setToCart(false), 2000)
      return () => clearTimeout(timer)
    }
  })




  return (
    <View className="flex-1 bg-[#D9F2FF]">

      <View className="bg-[#D9F2FF]  pb-2 pt-2">

        {cart && (
          <View className="absolute bottom-10 z-40 left-0 right-0 items-center ">
            <View className="bg-green-500 px-4 py-2 rounded-xl shadow flex-row items-center gap-1">
              <BadgeCheck color="#FFFFFF" />
              <Text className="text-white font-semibold">
                {product.name} added successfully
              </Text>
            </View>
          </View>
        )}



        <View className="flex-row items-center justify-between px-5 pt-6">
          <Text
            className="text-xl font-semibold text-[#0F0D23]  "
            numberOfLines={1}
          >
            {product.name}
          </Text>


          <Pressable
            onPress={() => router.back()}
            className="bg-[#6DD1EB] p-3 rounded-2xl shadow-sm active:opacity-80"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>




        </View>


        {/* Product Image */}
        <View className="items-center mt-5">
          <Image
            source={
              typeof product.images[0] === "string"
                ? { uri: product.images[0] }
                : product.images[0]}
            className="w-56 h-56"
            resizeMode="contain"
          />
        </View>

      </View>


      {/* White Content Box */}
      <View className="flex-1 rounded-t-3xl bg-white pt-5 px-5">

        {/* Quantity  + Price  +  Ratings*/}
        <View className="flex-row items-center justify-between py-1 mb-2   border-b border-b-gray-100 ">
          <View className="flex-row items-baseline gap-1">
            <Text className="text-2xl font-extrabold text-[#0F0D23]">₹{product.price}</Text>
            <Text className="text-sm font-semibold text-[#6DD1EB]">
              /{product.volume || product.weight}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <View className="flex-row gap-1 items-center">
              <Star size={18} color="#6DD1EB" />
              <Text className="text-xs text-[#59c6e1]">4.8 Rating</Text>
            </View>

          </View>
        </View>


        {/* Stats Row */}
        <View className="flex-row justify-between items-center mb-3 py-2 border-b border-gray-100">

          <Pressable
            className="flex-row gap-1 items-center"
            onPress={() => setActiveTab("highlights")}
          >
            <BadgeCheck size={16} color="#6DD1EB" />
            <Text className={`text-xs font-medium ${activeTab === "highlights" ? "text-[#0F0D23]" : "text-[#59c6e1]"}`}>
              Highlights
            </Text>
          </Pressable>

          <Pressable
            className="flex-row gap-1 items-center"
            onPress={() => setActiveTab("benefits")}
          >
            <Sparkles size={16} color="#6DD1EB" />
            <Text className={`text-xs font-medium ${activeTab === "benefits" ? "text-[#0F0D23]" : "text-[#59c6e1]"}`}>
              Benefits
            </Text>
          </Pressable>

          <Pressable
            className="flex-row gap-1 items-center"
            onPress={() => setActiveTab("nutrition")}
          >
            <HeartPlus size={16} color="#6DD1EB" />
            <Text className={`text-xs font-medium ${activeTab === "nutrition" ? "text-[#0F0D23]" : "text-[#59c6e1]"}`}>
              Nutrition
            </Text>
          </Pressable>

        </View>


        {/* Active Tab */}

        {activeTab === "highlights" && (

          <ScrollView
            className="rounded-xl "
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
          >

            {<View className="  space-y-2.5">
              {product.highlights.map((item, idx) => (
                <View
                  key={idx}
                  className="flex-row items-start bg-blue-50/50 p-3.5  mb-1 rounded-xl border border-blue-100"
                >
                  <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                  <Text className="text-slate-700 text-sm flex-1 leading-5">
                    {item}
                  </Text>
                </View>
              ))}
            </View>}
          </ScrollView>
        )}

        {activeTab === "benefits" && (
          <ScrollView
            className="rounded-xl"
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
          >
            {<View className="  space-y-2.5">
              {product.benefits.map((item, idx) => (
                <View
                  key={idx}
                  className="flex-row items-start bg-green-50/50 p-3.5 mb-1 rounded-xl border border-green-100"
                >
                  <View className="w-5 h-5 rounded-full bg-green-500 items-center justify-center mr-3 mt-0.5">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                  <Text className="text-slate-700 text-sm flex-1 leading-5">
                    {item}
                  </Text>
                </View>
              ))}
            </View>}
          </ScrollView>
        )}

        {activeTab === "nutrition" && (
          <ScrollView
            className=" rounded-xl"
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
          >
            {<View className="  space-y-2">
              {Object.entries(product.nutrition).map(([key, val], idx) => (
                <View
                  key={idx}
                  className="flex-row items-center justify-between bg-amber-50/50 p-3.5 mb-1 rounded-xl border border-amber-100"
                >
                  <Text className="text-slate-700 font-semibold text-sm capitalize flex-1">
                    {key.replace(/_/g, ' ')}
                  </Text>
                  <View className="bg-amber-500 px-3 py-1.5 rounded-full ml-2">
                    <Text className="text-white font-bold text-xs">
                      {val}
                    </Text>
                  </View>
                </View>
              ))}
            </View>}
          </ScrollView>
        )}


        {/* Add to Cart */}
        <View className="mt-6 mb-10">
          {product.inStock
            ? <View className="flex-row justify-evenly items-center">
              <Pressable
                className="flex-row justify-center items-center py-3 px-5  rounded-2xl shadow bg-blue-600"
                onPress={AddToCart}>
                <ShoppingBag size={20} color="#FFFFFF" />
                <Text className=" text-white font-semibold ml-2">{"Buy Once"}</Text>
              </Pressable>
              <Pressable
                className="flex-row justify-center items-center py-3  px-5 rounded-2xl shadow bg-blue-600"
                onPress={() => router.push({
                  pathname: "/subscribe",
                  params: { id: product.id }
                })}>
                <Repeat size={20} color="#FFFFFF" />
                <Text className=" text-white font-semibold ml-2">{"SubScribe"}</Text>
              </Pressable>
            </View>

            : <View className="bg-red-500 flex-row justify-center items-center py-4 rounded-2xl shadow">
              <Text className="text-white text-lg font-bold">

                <ShoppingCart size={20} color="#FFFFFF" />
              </Text>
              <Text className="text-white font-semibold ml-2">
                {"Out of Stock"}
              </Text>
            </View>
          }
        </View>

      </View>

    </View>
  );
}

{/*  */ }

