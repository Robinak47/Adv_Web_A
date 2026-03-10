import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get(':id')
  public login(@Param('id') id: string): object | undefined {
    return this.authService.login(id);
  }
}
