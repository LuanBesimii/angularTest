import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public category : string;
    public ingredients: Ingredient[];
    public prepTime: string;
    public prepInstruction: string;
    public sourcePath: string;


    constructor(id:number, name:string, desc: string, imagePath: string, category: string,  ingredients: Ingredient[], prepTime: string = '00:30', prepInstruction: string= "", sourcePath: string = "" ) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.category = category;
        this.ingredients = ingredients;
        this.prepTime = prepTime;
        this.prepInstruction = prepInstruction;
        this.sourcePath = sourcePath;

    }
}
