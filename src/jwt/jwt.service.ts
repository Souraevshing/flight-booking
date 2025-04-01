import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestJsJwtService {
  constructor(private jwtService: JwtService) {}

  async signInAsync(payload: any): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.jwtService.signAsync(payload);
  }

  async verifyAsync(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
