import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() body: { content: string, articleId: string }) {
    return this.commentsService.create(body.content, body.articleId, req.user.username);
  }

  @Get('article/:articleId')
  async findByArticleId(@Param('articleId') articleId: string) {
    return this.commentsService.findByArticleId(articleId);
  }
}
