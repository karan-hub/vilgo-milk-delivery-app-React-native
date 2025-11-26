import { View, Text, Image } from "react-native"




function Banner() {
  return (

    <View className="h-40 mx-3 mt-4 rounded-3xl overflow-hidden bg-[#6DD1EB] relative shadow-lg">

      {/* Background Image */}
      <Image
        source={require("@/assets/images/banner.png")}
        className="w-full h-full absolute"
        resizeMode="cover"
      />
      
      {/* Gradient Overlay */}
      <View className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      
      {/* Overlay Content */}
      <View className="w-full h-full justify-center items-end px-6">

        <View className="flex justify-center items-end mb-8">
          <Text className="text-[26px] font-black text-white drop-shadow-2xl tracking-tight">
            Villager Milk
          </Text>

          <Text className="text-[13px] mt-0.5 text-white/95 font-semibold drop-shadow-lg tracking-wide">
            Fresh from Farm to Home.
          </Text>
        </View>

      </View>

    </View>

  )
}

export default Banner
