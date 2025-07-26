// models/Product.js
export class Product {
  constructor({ name, price, description = '', stock = 0 }) {
    if (!name || typeof name !== 'string') {
      throw new Error('Nombre inválido');
    }

    if (typeof price !== 'number' || price < 0) {
      throw new Error('Precio inválido');
    }

    this.name = name;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.createdAt = new Date().toISOString();
  }

  toFirestoreObject() {
    return {
      name: this.name,
      price: this.price,
      description: this.description,
      stock: this.stock,
      createdAt: this.createdAt
    };
  }
}
