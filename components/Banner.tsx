import { ImageBackground, View } from "react-native";

function Banner() {
  return (
    <View className="mx-4   rounded-3xl overflow-hidden shadow-lg">
      <ImageBackground
        source={{uri:"https://res.cloudinary.com/dsykkejzw/image/upload/v1767424252/homeBanner_v2_kmnenr.png"}}
        className="w-full"
        style={{ aspectRatio: 2.4 }} 
        resizeMode="contain"
      />
    </View>
  );
}

export default Banner;
