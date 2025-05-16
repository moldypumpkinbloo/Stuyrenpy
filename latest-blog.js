function getLatestBlogPost() {
    if (!BLOG_POSTS || BLOG_POSTS.length === 0) return null;
    
    // Sort posts by date (most recent first)
    const sortedPosts = [...BLOG_POSTS].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    return sortedPosts[0];
}

function updateLatestBlogPreview() {
    const previewWindow = document.querySelector('.blog-preview-window');
    if (!previewWindow) return;

    const latestPost = getLatestBlogPost();
    if (!latestPost) {
        previewWindow.innerHTML = `
            <div class="error-state">
                <p>No blog posts available.</p>
                <p>Please check back later!</p>
            </div>
        `;
        return;
    }

    const previewContent = `
        <div class="blog-card">
            <div class="blog-content">
                <div class="blog-thumbnail">
                    <a href="blog.html#${latestPost.id}">
                        <div class="blog-cover-wrapper">
                            <img src="${latestPost.coverImage}" alt="${latestPost.title} cover" class="blog-cover">
                        </div>
                    </a>
                </div>
                <div class="blog-header">
                    <h3>${latestPost.title}</h3>
                    <div class="blog-meta">
                        <span class="blog-date">${formatDate(latestPost.date)}</span>
                        <span class="blog-author">by ${latestPost.author}</span>
                    </div>
                </div>
                <p class="blog-excerpt">${latestPost.excerpt}</p>
                <div class="blog-tags">
                    ${latestPost.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="preview-actions">
                    <a href="blog.html#${latestPost.id}" class="read-more-button">Read More</a>
                    <a href="blog.html" class="view-all-button">View All Posts</a>
                </div>
            </div>
        </div>
    `;

    previewWindow.innerHTML = previewContent;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

document.addEventListener('DOMContentLoaded', updateLatestBlogPreview); 