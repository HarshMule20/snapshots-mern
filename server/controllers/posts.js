import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try{
       const postMessages = await PostMessage.find();

    //    console.log("postmessages", postMessages);
       res.status(200).json(postMessages)
    }
    catch (error){
        console.log("err", error.message)
        res.status(400).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const body = req.body
    const newPost = new PostMessage(body);

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        const body = req.body
    
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('Bad request');
        const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...body, _id}, {new: true});
        res.json(updatePost)
        
    } catch (error) {
        console.log(error.message)
    }

}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('Bad request');
        await PostMessage.findByIdAndRemove(_id)

        console.log("this is delete")

        res.json({message: 'Post Deleted Successfully'});

    } catch (error) {
        console.log(error)
    }
    
}

export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('Bad request');

        const post = await PostMessage.findById(_id);
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1}, {new: true})
        res.json(updatedPost)
    } catch (error) {
        console.log(error)

    }
}