import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create_post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  //Create a POST
  @Post('/post')
  async addPost(@Res() res, @Body() create: CreatePostDTO) {
    const newPost = await this.blogService.addPost(create);
    return res.status(HttpStatus.OK).json({
      message: 'Submitted post successfully',
      post: newPost,
    });
  }

  // Get a post using a specific Id
  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) throw new NotFoundException('No post Found');
    return res.status(HttpStatus.OK).json(post);
  }

  // Get all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  // Edit a post using a specific Id
  @Put('/edit')
  async editPost(
    @Res() res,
    @Query('postID', new ValidateObjectId()) postID:string,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  @Delete('/delete')
  async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }
}
