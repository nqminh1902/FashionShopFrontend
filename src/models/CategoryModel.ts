import { BaseModel } from '.';

export class CategoryModel extends BaseModel {
    CategoryID: number
    CategoryName: string 
    Status?: number
    constructor(){
        super()
        this.CategoryID = 0
        this.CategoryName = ""
        this.Status = 0
    } 
}