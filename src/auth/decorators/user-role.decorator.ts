import { SetMetadata } from '@nestjs/common';

export const UserRole = (...roles: string[]) => SetMetadata('roles', roles);
