import { Image, View } from "react-native"




function Banner() {
  return (

    <View className="h-40 mx-3 mt-4 rounded-3xl overflow-hidden bg-[#6DD1EB] relative shadow-lg">

      {/* Background Image */}
      <Image
        source={require("@/assets/images/homeBanner.png")}
        className="w-full h-full absolute"
        resizeMode="cover"
      />
      
      {/* Gradient Overlay */}
       
      
       

      

    </View>

  )
}

export default Banner
