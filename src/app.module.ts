import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './shared/infrastructure/auth/auth.module';
import { JwtAuthGuard } from './shared/infrastructure/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EquipmentsModule } from './modules/equipments/equipments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    EquipmentsModule,
  ],
  exports: [],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
