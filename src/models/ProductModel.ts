import { BaseModel } from '.';

export class ProductModel extends BaseModel {
    ProductID: number;
    ProductCode: string;
    ProductName: string;
    Price: number;
    ProductImage: string[];
    Description: string;
    Sale: number;
    DiscountPercent: number;
    Quantity: number;
    CollectionID?: number;
    CollectionName?: string;
    Summary?: string;

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductCode = '';
        this.ProductName = '';
        this.Price = 0;
        this.ProductImage = [];
        this.Description = '';
        this.Sale = 0;
        this.DiscountPercent = 0;
        this.Quantity = 0;
        this.CollectionID = 0;
        this.CollectionName = '';
        this.Summary = '';
    }
}
