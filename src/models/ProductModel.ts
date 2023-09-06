import type { ProductStatusEnum } from "@/enums";
import { BaseModel } from ".";
import type { ProductSizeModel } from "./ProductSizes";
import type { ProductColorModel } from "./ProductColors";

export class ProductModel extends BaseModel {
    ProductID: number;
    ProductCode: string;
    ProductName: string;
    ProductPrice: number;
    Description: string;
    CollectionID: number;
    CollectionName: string;
    CategoryID: number;
    Categoryname: string;
    Sale: number;
    DiscountPercent: number;
    TotalQuantity: number;
    Material?: string;
    QuickDescription?: string;
    Images: string;
    ProductColors: ProductColorModel[];
    ProductSizes: ProductSizeModel[];
    ProductImages: any;
    ProductVariants: any;
    ProductStatus: ProductStatusEnum;

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductCode = "";
        this.ProductName = "";
        this.ProductPrice = 0;
        this.Description = "";
        this.Sale = 0;
        this.DiscountPercent = 0;
        this.TotalQuantity = 0;
        this.CollectionID = 0;
        this.CollectionName = "";
        this.CategoryID = 0;
        this.Categoryname = "";
        this.Images = ""
        this.Material = "";
        this.ProductStatus = 1;
        this.ProductSizes = []
        this.ProductColors = []
    }
}
