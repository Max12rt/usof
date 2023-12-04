const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const Category = require('../models/categoryModel')
const Like = require('../models/likeModel')
const User = require('../models/userModel')
const Post_Category = require('../models/postCategModel')

const postController = {
    getAllPosts: async (request, res) => {
        try{
            const page = parseInt(request.query.page) || 1; // Ensure page is a number
            const limit = 4;
            const offset = (page - 1) * limit;

            await Post.findAndCountAll({
                limit: limit,
                offset: offset,
            }).then(result => {
                res.status(200).json(result)
            })
           
            /*await Post.findAndCountAll({
                limit: 4,
                offset: (require.query.page - 1) * 4,
            });.then(result => {
                result.status(200).json(result)
            })*/
        } catch (error) {handleErrors(error, result);}
    },
    getPostById: async (require, result) => {
        try{
            const post = await Post.findOne({
                where: {id: require.params.post_id},
                include: [{ model: Comment, where: { post_id: require.params.post_id } }]
            })
            if (!post) result.status(404).json({ message: "Post with this id does not exist" });
            else result.status(200).json({ post });
        } catch (error) {handleErrors(error, result);}
    },
    getCommentsByPostId: async (require, result) => {
        try {
            const comments = await Post.findOne({
                where: { id: require.params.post_id },
                include: [{ model: Comment, where: { post_id: require.params.post_id } }]
            });
            if (!comments) result.status(404).json({ message: "Something wrong" });
            else result.status(200).json(comments);
        } catch (error) {handleErrors(error, result);}
    },
    createCommentToPostById: async (require, result) => {
        try {
            const userId = require.user  == undefined?1:require.user.id
            const {content} = require.body
            const comment = await Comment.create({
                author: userId,
                publishDate: new Date(),
                content: content,
                post_id: require.params.post_id
            })
            if(!comment) return result.status(400).json({message: "Comment not created"})
            return result.status(200).json({message: "Comment created"})
        } catch (error) {handleErrors(error, result);}
    },
    getCategoriesByPostId: async (require, result) => {
        try {
            const categories = await Post.findAll({
                where: {id: require.params.post_id},
                include: [{
                    model: Category,
                    as: "categories"
                }]
            })
            if(!categories) return result.status(400).json("Something wrong")
            return result.status(200).json(categories)
        } catch (error) {handleErrors(error, result);}
    },
    getAllLikesByPostId: async (require, result) => {
        try {
            const likes = await Post.findAll({
                where: {id: require.params.post_id},
                include: [{
                    model: Like,
                    where: {post_id: require.params.post_id}
                }]
            })
            if(!likes) return result.status(400).json("Likes in this post does not exist")
            return result.status(200).json({likes})
        } catch (error) {handleErrors(error, result);}
    },
    createPost: async (request, result) => {
        try {
            const { title, content, categories } = request.body
            
            const userId = parseInt(request.query.page) || 1;
            console.log(userId)
            const post = await Post.create({
                title: title,
                content: content,
                author: userId,
                publishDate: new Date()
            })
            /*categories.map(async elem => {
                const category = await Category.findAll({where: { id: elem }})
                await PostCategory.create({post_id: post.id, category_id : category});
            })*/
            if(!post) return result.status(400).json({message: "Post not created"})
            return result.status(200).json({message: "Post created"})
        } catch(error) {handleErrors(error, result);}
    },
    createNewLikeByPostId: async (require, result) => {
        try {
            const { likeType } = require.body
            const check = await Like.findOne({
                where: {author: require.user.id, post_id: require.params.post_id}
            })
            if(check){
                if(check.type === 'dislike'){
                    if(likeType === 'dislike'){
                        return result.status(400).json({message: 'You can add only 1 like/dislike'})
                    } else if (likeType === 'like'){
                        const post = await Post.findOne({
                            where: {id: require.params.post_id}})
                        const user = await User.findOne({
                            where: {id: post.author}})
                        await post.update({rating: post.rating + 1})
                        await user.update({rating: user.rating + 1})
                        await check.destroy()
                        return result.status(200).json({message: 'Dislike deleted'})
                    }
                }
                else if(check.type === 'like'){
                    if(likeType === 'like'){
                        return result.status(400).json({message: 'You can add only 1 like/dislike'})
                    } else if (likeType === 'dislike'){
                        const post = await Post.findOne({
                            where: {id: require.params.post_id}})
                        const user = await User.findOne({
                            where: {id: post.author}})
                        await post.update({rating: post.rating - 1})
                        await user.update({rating: user.rating - 1})
                        await check.destroy()
                        return result.status(200).json({message: 'Like deleted'})
                    }
                }
            }
            const like = await Like.create({
                author: require.user.id,
                publishDate: new Date(),
                post_id: require.params.post_id,
                type: likeType
            })
            if(!like) return result.status(400).json({message: "Like not created"})
            if(likeType === 'dislike') {
                const post = await Post.findOne({
                    where: {id: require.params.post_id}})
                const user = await User.findOne({
                    where: {id: post.author}})
                await post.update({rating: post.rating - 1})
                await user.update({rating: user.rating - 1})
                return result.status(200).json({message: "Dislike created"})
            }
            if(likeType === 'like') {
                const post = await Post.findOne({
                    where: {id: require.params.post_id}})
                const user = await User.findOne({
                    where: {id: post.author}})
                await post.update({rating: post.rating + 1})
                await user.update({rating: user.rating + 1})
                return result.status(200).json({message: "Like created"})
            }
        } catch (error) {handleErrors(error, result);}
    },
    updatePostById: async (require, result) => {
        console.log(require.user)
        const userId = require.user  == undefined?1:require.user.id

        const { title, content} = require.body
        const post = await Post.findOne({
            where: {id: require.params.post_id}})
        if(post.author === userId){
            await post.update({
                title: title ? title : post.title,
                content: content ? content : post.content,})
        }
        if(post.author !== userId) return result.status(401).json({message: "Only the author can update the post"})
        if(!post) return result.status(400).json({message: "Post cant be update"})
        return result.status(200).json({message: "Post updated"})
    },
    deletePostById: async (require, result) => {
        const userId = require.user  == undefined?1:require.user.id
        try {
            const post = await Post.findOne({
                where: {id: require.params.post_id}})
            if(!post) return result.status(400).json({message: "Post with this id not found"})
            
            //todo user
            if(post.author === userId ){//|| require.user.role === "admin"){
                await Post.destroy({where: {id: require.params.post_id}})
                return result.status(200).json({message: "Post deleted"})
            } else
                return result.status(401).json({message: "Only the author or admin can delete the post"})
        } catch (error) {handleErrors(error, result);}
    },
    deleteLikeByPostId: async (require, result) => {
        try {
            const post = await Post.findOne({
                where: { id: require.params.post_id }});
            if (!post) return result.status(400).json({ message: "Post with this id not found" });
            const like = await Like.findOne({
                where: { post_id: require.params.post_id, author: require.user.id }});
            if (!like) return result.status(400).json({ message: "You did not like this post" });
            if (like.type === 'dislike')
                await post.update({ rating: post.rating + 1 });
            else if (like.type === 'like')
                await post.update({ rating: post.rating - 1 });
            await like.destroy();
            return result.status(200).json({ message: "Like deleted" });
        } catch (error) {
            handleErrors(error, result);
        }
    }
}

function handleErrors(error, result) {
    console.error(error);
    result.status(500).json({ message: error.message });
}

module.exports = postController
