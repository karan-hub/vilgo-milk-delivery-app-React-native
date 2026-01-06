import { Weight } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface Props {
  price: number;
  unit: string;
  inStock: boolean;
}

export default function ProductPricing({ price, unit, inStock }: Props) {
  return (
    <View className="mx-5 mb-5">
      <View className="bg-white rounded-xl px-5 py-5 shadow-sm border border-slate-100">
        <View className="flex-row justify-between items-center">

          <Text className="text-3xl font-black text-[#0F0D23]">
            ₹{price}
          </Text>

          <View  className='flex-row justify-center items-center gap-1'>
            
            <Weight size={22} color="#0F0D23" />
            <Text className="text-xl text-slate-500  font-medium">
              {unit}
            </Text>
          </View>


        </View>
      </View>
    </View>
  );
}