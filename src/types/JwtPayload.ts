import { Role } from '../typeorm/entities/users/types';

export type JwtPayload = {
  id: number;
  email: string;
  role: Role;
  created_at: Date;
};
