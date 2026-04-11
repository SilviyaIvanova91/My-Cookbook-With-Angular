import { Comment } from './comments';

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  comments: Comment[];
  likes: number;
}
