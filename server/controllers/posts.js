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
    console.log(body)
    const newPost = new PostMessage(body);

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}