
export interface ApiProduct {
  id: string;
  name: string;
  type: "cow" | "buffolw";
  unit: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
  tags: string[];
  highlights: string[];
  benefits: string[];
  nutrition: {
    protein: string;
    fat: string;
    calories: string;
  };
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  address: any; // or define Address type if needed
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expire: number;
  tokenType: string;
  user: User;
}

export interface LoginResponse extends AuthResponse {}

export interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
}

export interface Address {
  id?: string;
  flatNumber: string;
  buildingName: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  latitude: number;
  longitude: number;
  default?: boolean;
}

export interface CreateAddressRequest {
  flatNumber: string;
  buildingName: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export interface UpdateAddressRequest extends CreateAddressRequest {
  // Same fields as create, backend handles the ID from URL
}

export interface RegisterResponse extends User {}

export interface RefreshResponse {
  accessToken: string;
}
