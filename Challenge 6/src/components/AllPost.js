import React, { useState, useEffect } from "react";
import "../styles/AllPost.css"
import Post from "./Post";
import CreatePost from "./CreatePost";
import { getPost, setPost } from "../services/PostService";

export default function AllPost() {

    const [isCreated, setIsCreated] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [allPost, setAllPost] = useState([]);

    useEffect(() => {        
        let mounted = true;
        getPost().then((data) => {
            if(mounted){
                setAllPost(data);
            }
        });
        return () => mounted = false;       
    }, [isCreated])

    const postTitle = event  => {
        setTitle(event.target.value);
    }

    const postContent = event => {
        setContent(event.target.value);
    }

    const savePost = event => {
        event.preventDefault();
        console.log(title);
        console.log(content);
        setPost(title, content).then(() => {
            setTitle("");
            setContent("");
            onCreate();
        })
    }

    const onCreate = () => {
        setIsCreated(!isCreated)
    }

    if (isCreated) {
        return(
            <div>
                <CreatePost postTitle={postTitle}
                            postContent={postContent}
                            savePost={savePost}/>
            </div>    
        )
    } else {
        return(
            <div className="wrapper-allpost">
                <h2>Todos las historias</h2>
                {allPost.map(post => (
                    <Post key={post.id}
                            title={post.title} 
                            content={post.content}/>
                ))}
                <button className="button-allpost" onClick={onCreate}>Agregar una historia</button>
            </div>    
        )
    }
}
