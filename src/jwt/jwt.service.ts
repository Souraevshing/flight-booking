/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestJsJwtService {
  constructor(private jwtService: JwtService) {}

  async signInAsync(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  async verifyAsync(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
