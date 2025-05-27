import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { ActionCartDto } from './dto/actionCart.dto';
import { ResponseInfo } from '@interface/response.interface';
import { PagCartResponse } from './dto/pag-cart-res.dto';
import { RespInfoBase } from '@interface/data.info.interface';
import { Response } from '@interface/response.results.interface';
import { CartModelGQL } from '@model/cart.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Query(() => [CartModelGQL])
  async getAllCart(
    @Args('idCart', { type: () => String, nullable: false }) idCart: string,
  ): Promise<CartModelGQL[]> {
    return await this.cartService.getAllList(idCart);
  }

  @UseGuards(AuthGuard)
  @Query(() => PagCartResponse)
  async getAllIdCart(
    @Args('idCart', { type: () => String, nullable: false }) idCart: string,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.cartService.getListCart(idCart, page);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ResponseInfo)
  async actionCart(
    @Args('dataCart') dataCart: ActionCartDto,
  ): Promise<RespInfoBase> {
    return await this.cartService.actionCart(dataCart);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ResponseInfo)
  async deleleItemCart(
    @Args('idProduct', { type: () => String, nullable: false })
    idProduct: string,
    @Args('idCart', { type: () => String, nullable: false }) idCart: string,
  ): Promise<RespInfoBase> {
    return await this.cartService.removeItemCart(idProduct, idCart);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ResponseInfo)
  async clearCart(
    @Args('idCart', { type: () => String, nullable: false }) idCart: string,
  ): Promise<void> {
    return await this.cartService.clearCart(idCart);
  }
}
