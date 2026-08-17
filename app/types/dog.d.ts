type  TDog = {
     _id?: string;
    breed: string;
    age: string;
    gender: string;
    color: string;
    price: number;

    photos: string[];
    video: string;

    description: string;
    vaccinated: string;
    deworm: string;
    location: string;

    status: "Available" | "Reserved" | "Sold";
}