import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageUrl = document.getElementById('imageUrl').value;

        try {
            const newPost = await backend.createPost(title, description, imageUrl);
            addPostToUI(newPost);
            postForm.reset();
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    });

    function addPostToUI(post) {
        const postElement = createPostElement(post);
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
    }

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.title}">
            <div class="post-content">
                <h2>${post.title}</h2>
                <p>${post.description}</p>
                <div class="meta">
                    <span>Posted on: ${new Date(Number(post.createdAt) / 1000000).toLocaleString()}</span>
                    <span>Likes: ${post.likes}</span>
                </div>
                <button onclick="likePost(${post.id})">Like</button>
            </div>
        `;
        return postElement;
    }

    async function loadPosts() {
        try {
            const posts = await backend.getPosts();
            postsContainer.innerHTML = '';
            posts.sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).forEach(post => {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error loading posts:', error);
            postsContainer.innerHTML = '<p>Failed to load posts. Please refresh the page.</p>';
        }
    }

    window.likePost = async (id) => {
        try {
            await backend.likePost(id);
            const posts = await backend.getPosts();
            const updatedPost = posts.find(p => p.id === id);
            if (updatedPost) {
                const postElement = document.querySelector(`.post:has(button[onclick="likePost(${id})"])`);
                if (postElement) {
                    postElement.querySelector('.meta').innerHTML = `
                        <span>Posted on: ${new Date(Number(updatedPost.createdAt) / 1000000).toLocaleString()}</span>
                        <span>Likes: ${updatedPost.likes}</span>
                    `;
                }
            }
        } catch (error) {
            console.error('Error liking post:', error);
            alert('Failed to like post. Please try again.');
        }
    };

    await loadPosts();
});