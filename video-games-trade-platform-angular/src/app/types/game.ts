import { User } from "./user";

export interface Game {    
    _id: string;
    title: string;
    ganre: string;
    description: string;
    location: string; 
    image: string;
    price: number;
    likesList: User[];
    owner: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
}