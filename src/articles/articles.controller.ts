import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() body: { title: string, content: string }) {
    return this.articlesService.create(body.title, body.content, req.user.username);
  }

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.articlesService.findById(id);
  }
}
