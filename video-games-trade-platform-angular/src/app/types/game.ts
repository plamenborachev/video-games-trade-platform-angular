import { User } from "./user";

enum Ganre{
    'Action',
    'Adventure',
    'Arcade',
    'Board game',
    'Education',
    'Fighting',
    'First-person',
    'Lifestyle',
    'Multiplayer',
    'Music',
    'Other',
    'Party',
    'Platformer',
    'Puzzle',
    'Racing',
    'Role-playing',
    'Simulation',
    'Sports',
    'Strategy',
    'Training'
}

export interface Game {    
    _id: string;
    title: string;
    ganre: Ganre;
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