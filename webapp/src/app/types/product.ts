export interface product {
    _id?: string;
    name: string;
    price: number;
    shortDescription: string;
    description:string,
    discount?: number;
    images: string;
    categoryId: string; 
    isFeatured:Boolean;
    isNew:Boolean; 
  }
  