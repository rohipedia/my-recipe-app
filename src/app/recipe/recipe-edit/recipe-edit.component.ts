import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router, Params } from '@angular/router';

import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id:number;
    editMode:boolean = false;
    recipeForm: FormGroup;

    constructor(private route:ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            (param:Params) => {
                this.id = param['id'];
                this.editMode = this.id !== undefined;
                this.initForm();
            }
        );
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern('^[1-9]+[0-9]*$')
                ])
            })
        )
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath  = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);
        
        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern('^[1-9]+[0-9]*$')
                            ])
                        })
                    );
                }
            }
        }
        
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }

    onSubmit() {
        const newRecipe = new Recipe(
            this.recipeForm.value['name'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
        );
        if (this.editMode) {
            this.recipeService.updateRecipe(newRecipe, this.id);
            this.router.navigate(['recipes', this.id]);
        } else {
            this.recipeService.addRecipe(newRecipe);
            this.router.navigate(['recipes', this.recipeService.getRecipes().length - 1]);
        }
        this.onCancel();
        this.editMode = false;
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onClear() {
        this.recipeForm.reset();
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
}
