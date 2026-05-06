import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('users')
export class User extends BaseModel {
  @Column({ length: 255, unique: true })
  login!: string;

  @Column({ length: 255 })
  password!: string;
}
