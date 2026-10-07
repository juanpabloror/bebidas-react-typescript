
import axios from "axios";
import { CategoriesAPIResponseSchema } from "../utils/recipe-schema";
export async function getCategories(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result  = CategoriesAPIResponseSchema.safeParse(data)

    if(result.success){
        console.log("El resultado: "+result.data)
        return result.data
    }else{
        console.log("ERROR: "+result.error)
    }
}