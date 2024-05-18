import { User } from '@/shared/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class Login {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  @ApiProperty({
    example: {
      id: 1,

      firstName: 'John',
      lastName: 'Doe',
    },
  })
  user: User;

  @ApiProperty({
    example:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiI4Y2U2MmI5Ny1hZTNhLTRiM2MtODlhNy01NDcxZjg0MmNlOTAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMjJlYzViNTEtMzlkYi00ZDZmLTg2YmQtYzVmMzI4ODNjZWI0L3YyLjAiLCJpYXQiOjE3MTU4NjQxODAsIm5iZiI6MTcxNTg2NDE4MCwiZXhwIjoxNzE1ODY4MTg5LCJhY2N0IjowLCJhaW8iOiJBVVFBdS84V0FBQUFpUzVHZE9aemREVzYza29OTEZtRzdqUktvNDQvMFNtbXFtU2d6ZVlUTVh6bHo4V281WDJXUGRrcFlyQXkzaWNic3N4cDZjUUs2Yi92SWd5ekNRejRpZz09IiwiYXpwIjoiOGNlNjJiOTctYWUzYS00YjNjLTg5YTctNTQ3MWY4NDJjZTkwIiwiYXpwYWNyIjoiMCIsImVtYWlsIjoiZXh0LmFsbGFuLnNvdXphQG1pbGxzLmNvbS5iciIsImxvZ2luX2hpbnQiOiJPLkNpUmhaak5sTlRneFlTMDRNR1l5TFRRMlkyWXRZVEE0TkMwMVpEYzNPRFF4T0RrMU9EZ1NKREl5WldNMVlqVXhMVE01WkdJdE5HUTJaaTA0Tm1Ka0xXTTFaak15T0RnelkyVmlOQm9jWlhoMExtRnNiR0Z1TG5OdmRYcGhRRzFwYkd4ekxtTnZiUzVpY2lBdSIsIm5hbWUiOiJhbGxhbiBtYXJjZWxpbm8gZGUgc291emEiLCJvaWQiOiJhZjNlNTgxYS04MGYyLTQ2Y2YtYTA4NC01ZDc3ODQxODk1ODgiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHQuYWxsYW4uc291emFAbWlsbHMuY29tLmJyIiwicmgiOiIwLkFVVUFVVnZzSXRzNWIwMkd2Y1h6S0lQT3RKY3I1b3c2cmp4TGlhZFVjZmhDenBCRkFDRS4iLCJyb2xlcyI6WyJBRE1JTiJdLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJkdFVOdk9ObFlvNWlobzNla21YdHZ4NDhrMlluRmVJYzUwbTNUVlJoS0tnIiwidGlkIjoiMjJlYzViNTEtMzlkYi00ZDZmLTg2YmQtYzVmMzI4ODNjZWI0IiwidXRpIjoiX2FScFVTUFJwRUNmZmEyVWlwR3ZBQSIsInZlciI6IjIuMCJ9.WeQJQ9D0v5FexPvzlZoTNUzyX1qs-8q_-DKNWjiDz6032iiQ9eq-L9AFsNdCUKs0h8nSq4zayupIiBsJq_kCVoZAGc8WVDFVzmnq-ryAnKNJ3j6OYQnPAACJHcuLau1YJ_yD-wnm44g7cP8U1VifthtJbG-jS18XOc72Kn_yhx15w3e3A2N02p3p30FDRGjKiPHAdaM6gSW6OOAfFKtFZFJCkisPqc-FK5X0Sv5Tvn8SYql406Dv_IqDgUbiLlXjUGYlcln31xSL-YFTb0NBG2FN0WmetqK_Bfzj618nPOhTqIWUO0N1q9IbZ1Qd87h0LWYHoLZ_qMNU1Ho_GC_Kug',
    description:
      'The user token, it is used to authenticate your access in the application.',
  })
  accessToken: string;
}

export interface UserPayload {
  id: string;
  iat?: number;
  exp?: number;
}
