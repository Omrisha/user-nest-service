import { UseGuards, Request, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { UserLoginDto } from './auth/dto/UserLoginDto';
import { JwtAuthGauard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/loacl-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @ApiBody({ type: UserLoginDto })
    @ApiOkResponse({ description: 'result Token' })
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGauard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
