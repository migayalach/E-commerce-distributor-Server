import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponse } from './interface/responseData.interface';
import { PagUserResponse } from './dto/pag-user-res.dto';
import { UserIdModelGQL } from '@model/user.model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response } from '@interface/response.results.interface';
import { DataUserRes } from './interface/user.interface';
import { ResUser } from '@interface/data.info.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/sign/guard/auth.guard.guard.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => PagUserResponse)
  async getUsers(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.userService.getAllUsers(page);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserIdModelGQL)
  async getIdUser(
    @Args('idUser', { type: () => String, nullable: false }) idUser: string,
  ): Promise<DataUserRes> {
    return await this.userService.getIdUser(idUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserResponse)
  async createUser(
    @Args('dataUser') dataUser: CreateUserDto,
  ): Promise<ResUser> {
    return await this.userService.addUser(dataUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserResponse)
  async updateUser(
    @Args('dataUser') dataUser: UpdateUserDto,
  ): Promise<ResUser> {
    return await this.userService.updateUser(dataUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserResponse)
  async deleteUser(
    @Args('idUser', { type: () => String, nullable: false }) idUser: string,
  ): Promise<ResUser> {
    return await this.userService.removeUser(idUser);
  }
}
