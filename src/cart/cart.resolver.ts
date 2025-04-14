import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { ActionCartDto } from './dto/actionCart.dto';
import { ResponseInfo } from '@interface/response.interface';
import { PagCartResponse } from './dto/pag-cart-res.dto';
import { RespInfoBase } from '@interface/data.info.interface';
import { Response } from '@interface/response.results.interface';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => PagCartResponse)
  async getAllIdCart(
    @Args('idCart', { type: () => String, nullable: false }) idCart: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.cartService.getListCart(idCart, page);
  }

  @Mutation(() => ResponseInfo)
  async actionCart(
    @Args('dataCart') dataCart: ActionCartDto,
  ): Promise<RespInfoBase> {
    return await this.cartService.actionCart(dataCart);
  }

  @Mutation(() => ResponseInfo)
  async clearCart(
    @Args('idCart', { type: () => String, nullable: false }) idCart: string,
  ): Promise<void> {
    return await this.cartService.clearCart(idCart);
  }
}
