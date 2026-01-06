// /types/product.d.ts


export interface Product {
  id: string;                      
  name: string;
  type: any ;

  unit: string;                    
  price: number;                   
  inStock: boolean;

  imageUrl: string;                

  tags?: string[];

  highlights: string[];
  benefits: string[];

  nutrition: {
    calories: string;
    protein?: string;
    fat?: string;
    calcium?: string;
  };

  
  rating?: number;
  reviewsCount?: number;
}
