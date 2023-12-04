import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';


const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`/api/posts/${postId}/comments`, { content });
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    function compareByDate(a, b) {
        if (a.publishDate > b.publishDate) {
          return -1; // a повинен бути перед b
        } else if (a.publishDate < b.publishDate) {
          return 1; // b повинен бути перед a
        } else {
          return 0; // a і b рівні
        }
      }

      function DataFormat(dateIn)
      {
        let date = dateIn.replace(/[TZ]/g, ' ');
        console.log(date)
        let res = date.replace(/-/g, '.');
        return res;
      }

    useEffect(() => {
        fetch(`/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {setPost(data.post); setComments(data.post.Comments.sort(compareByDate)); })
            .catch((error) => console.error('Error fetching category details:', error));
    }, [postId]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {                
                const responseUser = await axios.get('/api/users');
                setUsers(responseUser.data.rows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    

    return (
        <div>
           
                <div >
                    <p><h3>{post.title}</h3></p>
                    <p>{post.content}</p>
                    <p>{post.publishDate}</p>
                    <p><Link to={`/posts/${postId}/edit`}>Edit</Link></p>
                    <br></br>
                </div>
                <div>
                    <h2>Create Comment</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea value={content} onChange={e => setContent(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div>
            <h2>Comments</h2>
                {comments.map(comment => (
                <div key={comment.id}>
                    
                    <p>{users.find(x => x.id === comment.author)?.full_name || "Unknown"} ({DataFormat(comment.publishDate)} ) :
                    {comment.content}</p>
                </div>
            ))}
        </div>
        </div>
        
    );
};

export default PostDetail;
