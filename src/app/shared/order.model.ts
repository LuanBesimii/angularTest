import { Ingredient } from './ingredient.model';

export class Order{

    constructor(public name: string, public imagePath: string, public description: string, public ingredients: Ingredient [], public amount: number){
    
    }
}