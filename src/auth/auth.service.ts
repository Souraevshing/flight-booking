import { Injectable } from '@nestjs/common';
import { NestJsJwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    //     private usersService: UsersService,
    private nestJsJwtService: NestJsJwtService,
  ) {}
}
