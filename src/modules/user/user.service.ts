import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {

    constructor(private prisma : PrismaService){}

    async create(data: UserDTO){

     const userExists = await this.prisma.user.findFirst({
        where: {
            cpf : data.cpf
        }
     }) 

     if(userExists){
        throw new Error(`User already exists`);
     }
        

     const user = await this.prisma.user.create({
            data,
        })

        return user
    }

    async findAll(){
        return this.prisma.user.findMany();
    }

    async update(id : string, data : UserDTO){
        const userExists = await this.prisma.user.findUnique({
            where:{
                id,
            }
        })
        if(!userExists){
            throw new Error("User does not exist")
        }

        return await this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }
}
