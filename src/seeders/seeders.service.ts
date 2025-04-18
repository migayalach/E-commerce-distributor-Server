import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { Level } from 'src/level/schema/level.schema';
import { Product } from 'src/products/schema/product.schema';
import { Subscribe } from 'src/subscribe/schema/subscribe.schema';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class SeedersService {
  constructor(
    @InjectModel(Subscribe.name) private subscribeModel: Model<Subscribe>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Level.name) private levelModel: Model<Level>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  run() {
    console.log('Loading data...');
  }
}
