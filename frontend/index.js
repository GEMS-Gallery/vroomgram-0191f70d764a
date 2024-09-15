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
            await backend.createPost(title, description, imageUrl);
            postForm.reset();
            await loadPosts();  // Reload posts after creating a new one
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    });

    async function loadPosts() {
        try {
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
        } catch (error) {
            console.error('Error loading posts:', error);
            postsContainer.innerHTML = '<p>Failed to load posts. Please refresh the page.</p>';
        }
    }

    window.likePost = async (id) => {
        try {
            await backend.likePost(id);
            await loadPosts();
        } catch (error) {
            console.error('Error liking post:', error);
            alert('Failed to like post. Please try again.');
        }
    };

    await loadPosts();
});