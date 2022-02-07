import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface'
import { CreatePostDTO} from './dto/create_post.dto';


@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel:Model<Post>) { }

    async addPost(create: CreatePostDTO): Promise<Post> {
        const newPost = new this.postModel(create);
        return newPost.save();
    }

    async getPost(postID: any) : Promise<Post> {
        const post = this.postModel
        .findById(postID)
        .exec();

        return post;
    }

    async getPosts() : Promise<Post[]> {
        const posts = this.postModel.find().exec();
        return posts;
    }

    async editPost(postID: any , create:CreatePostDTO) : Promise<Post>{
        const edited = this.postModel
        .findByIdAndUpdate(postID ,create, { new: true});
        return edited;
    }

    async deletePost(postID: any): Promise<any>{
        const deletedPost = await this.postModel.findByIdAndDelete(postID)
        return deletedPost
    }
    
}
