export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    fabric: string;
    sizes: string[];
    colors: string[];
    image: string;
    images: string[];
    availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export type Category = 'Sarees' | 'Kurtis' | 'Salwars' | 'Dresses' | 'Tops' | 'Ethnic Wear';
