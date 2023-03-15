import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
   private readonly saltRounds = 10;

   async hashPassword(plainPassword: string): Promise<string> {
      const hash = await bcrypt.hash(plainPassword, this.saltRounds);
      return hash;
   }

   async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
   }
}
