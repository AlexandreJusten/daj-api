import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async create(@Body()  data: UserDTO){
    return this.userService.create(data)
  }

  @Get()
  async findAll(){
    return this.userService.findAll()
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data:UserDTO){
    return this.userService.update(id, data)
  }
}
