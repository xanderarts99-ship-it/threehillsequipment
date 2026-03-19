export interface Machine {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    status: string;
    description?: string;
    specs?: { label: string; value: string }[];
    gallery?: string[];
}
