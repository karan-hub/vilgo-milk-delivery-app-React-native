import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity ,Text } from "react-native";

function MenuItem({ title, action }: { title: string, action: () => void }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-[#E2E8F0]" onPress={action} >
      <Text className="text-[#0F0D23] text-base">{title}</Text>
      <ChevronRight size={20} color="#94A3B8" />
    </TouchableOpacity>
  );
}
export default MenuItem;