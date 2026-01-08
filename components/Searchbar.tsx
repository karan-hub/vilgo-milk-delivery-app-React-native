import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export default function SearchBar({ placeholder, value, onChangeText, onFocus, onBlur }: Props) {
    return (
        <View className='flex-row items-center bg-white rounded-2xl px-4 py-1 mx-1 border border-blue-100 shadow-md'>
            <Search color={"#0F80FF"} size={20} />
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                className="flex-1 ml-3 text-[#0F0D23] text-base font-medium"
                placeholderTextColor="#6B7B9E"
                style={{
                    fontSize: 15,
                    fontWeight: '500',
                }}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    )
}