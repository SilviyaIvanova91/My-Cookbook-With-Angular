import { Comment } from './comments';

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  comments?: Comment[];
  likes?: number;
}

export interface CreateRecipeData {
  _id: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
}
