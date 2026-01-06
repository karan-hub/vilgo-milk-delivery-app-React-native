import { Search } from "lucide-react-native";
import { View, TextInput } from "react-native";



interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}


export default function SearchBar({ placeholder, value, onChangeText, onPress }: Props) {
    return (
        <View className=' flex-row items-center bg-dark-200   px-2 mx-3  border-b border-gray-200 ' >
            <Search  color={"#8CA9FF"} />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-gray-800  "
                placeholderTextColor="#A8B5DB"
            />
        </View>
    )
}