// ShopModels.ts
export class Category {
  id?: number;
  name: string = '';
}

export class Product {
  id: number = 0;
  name: string = '';
  price: number = 0;
  category: Category = new Category(); // Initialize to an empty Category

  // Optionally, you can still use a constructor here if needed
}


