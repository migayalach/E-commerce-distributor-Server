import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProductos.dto';
import { ProductResponse } from './interface/responseData.interface';
import { ProductModel } from '@model/product.model';
import { UpdateProductDto } from './dto/updateProducts.dto';
import { PagProductResponse } from './dto/pag-product-res.dto';
import { Response } from '@interface/response.results.interface';
import { DataProductRes } from './interface/product.interface';
import { ResProduct } from '@interface/data.info.interface';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => PagProductResponse)
  async getProduct(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.productsService.getAllProduct(page);
  }

  @Query(() => ProductModel)
  async getIdProduct(
    @Args('idProduct', { type: () => String, nullable: false })
    idProduct: string,
  ): Promise<DataProductRes> {
    return await this.productsService.getIdProduct(idProduct);
  }

  @Mutation(() => ProductResponse)
  async createProduct(
    @Args('dataProduct') dataProduct: CreateProductDto,
  ): Promise<ResProduct> {
    return await this.productsService.addProduct(dataProduct);
  }

  @Mutation(() => ProductResponse)
  async updateProduct(
    @Args('dataPruduct') dataProduct: UpdateProductDto,
  ): Promise<ResProduct> {
    return await this.productsService.updateProduct(dataProduct);
  }

  @Mutation(() => ProductResponse)
  async deleteProduct(
    @Args('idProduct', { type: () => String, nullable: false })
    idProduct: string,
  ): Promise<ResProduct> {
    return await this.productsService.removeProduct(idProduct);
  }
}
