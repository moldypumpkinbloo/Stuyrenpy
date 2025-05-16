function getLatestRelease() {
  if (!RELEASES || RELEASES.length === 0) return null;
  
  // Sort releases by date (most recent first)
  const sortedReleases = [...RELEASES].sort((a, b) => {
    return new Date(b.releaseDate) - new Date(a.releaseDate);
  });
  
  return sortedReleases[0];
}

function formatReleaseDate(dateStr) {
  const [year, month] = dateStr.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long'
  });
}

function updateLatestReleasePreview() {
  const previewWindow = document.querySelector('.preview-window');
  if (!previewWindow) return;

  const latestRelease = getLatestRelease();
  if (!latestRelease) {
    previewWindow.innerHTML = `
      <div class="error-state">
        <p>No releases available.</p>
        <p>Please check back later!</p>
      </div>
    `;
    return;
  }

  const previewContent = `
    <article class="release-card">
      <div class="release-content">
        <div class="game-thumbnail">
          <a href="${latestRelease.playLink}" target="_blank">
            <img src="${latestRelease.coverImage}" alt="${latestRelease.title} game cover" class="game-cover">
          </a>
        </div>
        <h3>${latestRelease.title}</h3>
        <div class="release-info">
          <p class="release-date">${formatReleaseDate(latestRelease.releaseDate)}</p>
          <p class="release-status">${latestRelease.status}</p>
        </div>
        <p class="release-description">${latestRelease.description}</p>
        <div class="game-features">
          <ul>
            ${latestRelease.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="release-tags">
          ${latestRelease.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="preview-actions">
          <a href="${latestRelease.playLink}" target="_blank" class="play-button">Play Now</a>
          <a href="releases.html" class="view-all-button">View All Releases</a>
        </div>
      </div>
    </article>
  `;

  previewWindow.innerHTML = previewContent;
}

document.addEventListener('DOMContentLoaded', updateLatestReleasePreview); 