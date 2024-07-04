import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(content: string, articleId: string, author: string): Promise<Comment> {
    const comment = new this.commentModel({ content, articleId, author });
    return comment.save();
  }

  async findByArticleId(articleId: string): Promise<Comment[]> {
    return this.commentModel.find({ articleId }).exec();
  }
}
