import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageUrl = document.getElementById('imageUrl').value;

        await backend.createPost(title, description, imageUrl);
        postForm.reset();
        await loadPosts();
    });

    async function loadPosts() {
        const posts = await backend.getPosts();
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <img src="${post.imageUrl}" alt="${post.title}">
                <div class="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.description}</p>
                    <p>Likes: ${post.likes}</p>
                    <button onclick="likePost(${post.id})">Like</button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    window.likePost = async (id) => {
        await backend.likePost(id);
        await loadPosts();
    };

    await loadPosts();
});