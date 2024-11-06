import { Currencies } from 'src/enums/Currencies';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  googleId: string;
  @Column({
    type: 'enum',
    enum: Currencies,
    nullable: true,
    default: Currencies.USD,
  })
  currency: Currencies;
  @Column({ nullable: true })
  salt: string;
}
