import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponse } from './interface/responseData.interface';
import { PagUserResponse } from './dto/pag-user-res.dto';
import { UserModelGQL } from '@model/user.model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response } from '@interface/response.results.interface';
import { DataUserRes } from './interface/user.interface';
import { ResUser } from '@interface/data.info.interface';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => PagUserResponse)
  async getUsers(
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
  ): Promise<Response> {
    return await this.userService.getAllUsers(page);
  }

  @Query(() => UserModelGQL)
  async getIdUser(
    @Args('idUser', { type: () => String, nullable: false }) idUser: string,
  ): Promise<DataUserRes> {
    return await this.userService.getIdUser(idUser);
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Args('dataUser') dataUser: CreateUserDto,
  ): Promise<ResUser> {
    return await this.userService.addUser(dataUser);
  }

  @Mutation(() => UserResponse)
  async updateUser(
    @Args('dataUser') dataUser: UpdateUserDto,
  ): Promise<ResUser> {
    return await this.userService.updateUser(dataUser);
  }

  @Mutation(() => UserResponse)
  async deleteUser(
    @Args('idUser', { type: () => String, nullable: false }) idUser: string,
  ): Promise<ResUser> {
    return await this.userService.removeUser(idUser);
  }
}
