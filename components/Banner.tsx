import { ImageBackground, View } from "react-native";

function Banner() {
  return (
    <View className="mx-4   rounded-3xl overflow-hidden shadow-lg">
      <ImageBackground
        source={require("@/assets/images/homeBanner v2.png")}
        className="w-full"
        style={{ aspectRatio: 2.4 }} 
        resizeMode="contain"
      />
    </View>
  );
}

export default Banner;
