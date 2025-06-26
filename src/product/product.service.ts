import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductModule } from './product.module';

@Injectable()
export class ProductService {
  private products: ProductModule[] = [];
  private idCounter = 1;

  create(createProductInput: CreateProductInput): ProductModule {
    const newProduct: ProductModule = {
      id: this.idCounter++,
      ...createProductInput,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): ProductModule[] {
    return this.products;
  }

  findOne(id: number): ProductModule {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductInput: UpdateProductInput): ProductModule {
    const index = this.products.findIndex((p) => p.id === updateProductInput.id);
    if (index === -1) throw new NotFoundException();

    this.products[index] = {
      ...this.products[index],
      ...updateProductInput,
    };
    return this.products[index];
  }

  remove(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException();
    this.products.splice(index, 1);
    return true;
  }
}
