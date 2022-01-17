import { Matches } from 'class-validator';
import { RegexHelper } from 'src/helpers/regex.helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  @Matches(RegexHelper.password)
  password: string;
}
