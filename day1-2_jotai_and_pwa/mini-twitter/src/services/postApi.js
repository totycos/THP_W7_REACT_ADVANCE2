import { useState } from "react";

const postApi = () => {
    const [postResponse, setPostResponse] = useState(null);
    const [postError, setPostError] = useState(null);

    // GET POST
    const getPostsFetch = async (token) => {
        try {
            const response = await fetch('http://localhost:1337/api/posts?sort=createdAt:desc&populate=*', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Get post data failed. Please check your credentials and try again.');
            }

            const postData = await response.json();
            setPostResponse(postData)
        } catch (error) {
            setPostError(`Error during get posts: ${error.message}`);
        }
    }

    // CREATE POST
    const createPostFetch = async (token, text, USER_ID) => {
        try {
            const data = {
                data: {
                    text: text,
                    users_permissions_user: USER_ID,
                    user: USER_ID
                }
            };
            const response = await fetch(`http://localhost:1337/api/posts`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Create post failed. Please check your credentials and try again.');
            }

            const postData = await response.json();

            setPostResponse(postData)
        } catch (error) {
            setPostError(`Error during create post: ${error.message}`);
        }
    }

    // GET AUTHOR S POSTS
    const getAuthorPostsFetch = async (token, USER_ID) => {
        try {
            const response = await fetch(`http://localhost:1337/api/posts?sort=createdAt:desc&filters[user][id][$eq]=${USER_ID}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Get author s post data failed. Please check your credentials and try again.');
            }

            const postData = await response.json();
            setPostResponse(postData)
        } catch (error) {
            setPostError(`Error during getauthor s posts: ${error.message}`);
        }
    }

    // DELETE POST
    const deletePostFetch = async (token, POST_ID) => {
        try {
            const response = await fetch(`http://localhost:1337/api/posts/${POST_ID}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Delete post failed. Please check your credentials and try again.');
            }

            const postData = await response.json();
            setPostResponse(postData)
        } catch (error) {
            setPostError(`Error during delete post: ${error.message}`);
        }
    }

    // LIKE
    const likePostFetch = async (token, POST_ID, like, users_likes) => {
        try {
            const data = {
                data: {
                    like: like,
                    users_likes: users_likes
                }
            };
            console.log('data :', data)
            console.log('data dans fetch:', data)
            const response = await fetch(`http://localhost:1337/api/posts/${POST_ID}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Like failed. Please check your credentials and try again.');
            }

            const postData = await response.json();
            setPostResponse(postData)
        } catch (error) {
            setPostError(`Error during like post: ${error.message}`);
        }
    }


    return { postResponse, postError, getPostsFetch, createPostFetch, getAuthorPostsFetch, deletePostFetch, likePostFetch }
};

export default postApi