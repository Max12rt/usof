import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/posts'); // Assuming your API endpoint is at /api/posts
        setPosts(res.data.rows);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
      <div className="home">
        <div className="posts">
          {posts.forEach((post) => (
              <div className="post" key={post.id}>
                <div className="post-img">
                  <img src={`../upload/${post.img}`} alt="post cover" />
                </div>
                <div className="content">
                  <Link className="link" to={`/posts/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{getText(post.desc)}</p>
                  <Link className="link" to={`/posts/${post.id}`}>
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Home;
