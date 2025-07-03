// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getImagesButton = document.querySelector('button');
const gallery = document.getElementById('gallery');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// NASA APOD API endpoint (using DEMO_KEY for educational purposes)
const NASA_API_KEY = 'ypmEV10SffRbJn46Cy7ZUWLZLLVrXgQhnNUtr1Kd';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

// Array of random space facts
const SPACE_FACTS = [
  "A day on Venus is longer than its year! Venus rotates so slowly that one day lasts 243 Earth days, while one year lasts only 225 Earth days.",
  "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
  "The largest known star, UY Scuti, is so big that if it replaced our Sun, its surface would extend beyond Jupiter's orbit.",
  "There are more possible games of chess than there are atoms in the observable universe.",
  "Saturn's moon Titan has lakes and rivers made of liquid methane and ethane instead of water.",
  "A single day on Jupiter lasts only 9 hours and 56 minutes, making it the fastest-spinning planet in our solar system.",
  "The Milky Way galaxy is on a collision course with the Andromeda galaxy, but they won't collide for another 4.5 billion years.",
  "Footprints left by Apollo astronauts on the Moon will likely remain there for millions of years due to the lack of atmosphere.",
  "The coldest place in the universe that we know of is the Boomerang Nebula, where temperatures drop to -458°F (-272°C).",
  "If you could drive a car to space at highway speeds, it would take you about an hour to reach the edge of space (62 miles up).",
  "Mars has the largest volcano in the solar system - Olympus Mons is about 13.6 miles high, nearly three times taller than Mount Everest.",
  "The Sun makes up 99.86% of the mass of our entire solar system.",
  "One million Earths could fit inside the Sun, and the Sun is considered an average-sized star.",
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "The International Space Station orbits Earth at a speed of about 17,500 mph, completing one orbit every 90 minutes."
];

// Function to display a random space fact
function displayRandomSpaceFact() {
  const randomIndex = Math.floor(Math.random() * SPACE_FACTS.length);
  const randomFact = SPACE_FACTS[randomIndex];
  
  // Find or create the space fact container
  let factContainer = document.getElementById('space-fact');
  if (!factContainer) {
    // Create the space fact section if it doesn't exist
    const container = document.querySelector('.container');
    const filters = document.querySelector('.filters');
    
    factContainer = document.createElement('div');
    factContainer.id = 'space-fact';
    factContainer.className = 'space-fact';
    factContainer.innerHTML = `
      <h3>🌟 Did You Know?</h3>
      <p>${randomFact}</p>
    `;
    
    // Insert the fact container between filters and gallery
    container.insertBefore(factContainer, filters.nextSibling);
  } else {
    // Update existing fact
    factContainer.querySelector('p').textContent = randomFact;
  }
}

// Display a random space fact when the page loads
displayRandomSpaceFact();

// Disable dark theme extensions and set iOS status bar color
function setupThemeAndDisplay() {
  // Disable dark mode extensions by setting color scheme to light
  document.documentElement.style.colorScheme = 'light only';
  
  // Add meta tag for iOS status bar color
  const existingMeta = document.querySelector('meta[name="theme-color"]');
  if (existingMeta) {
    existingMeta.setAttribute('content', '#333333');
  } else {
    const metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    metaTheme.content = '#333333';
    document.head.appendChild(metaTheme);
  }
  
  // Add meta tag for iOS status bar style
  const existingStatusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (existingStatusMeta) {
    existingStatusMeta.setAttribute('content', 'default');
  } else {
    const metaStatus = document.createElement('meta');
    metaStatus.name = 'apple-mobile-web-app-status-bar-style';
    metaStatus.content = 'default';
    document.head.appendChild(metaStatus);
  }
  
  // Add viewport meta with viewport-fit for iOS notch handling
  const existingViewport = document.querySelector('meta[name="viewport"]');
  if (existingViewport) {
    const currentContent = existingViewport.getAttribute('content');
    if (!currentContent.includes('viewport-fit')) {
      existingViewport.setAttribute('content', currentContent + ', viewport-fit=cover');
    }
  }
  
  // Add CSS for iOS safe areas
  const style = document.createElement('style');
  style.textContent = `
    @supports (padding: max(0px)) {
      body {
        padding-top: max(20px, env(safe-area-inset-top));
        padding-left: max(20px, env(safe-area-inset-left));
        padding-right: max(20px, env(safe-area-inset-right));
        padding-bottom: max(20px, env(safe-area-inset-bottom));
        background: #333 !important;
      }
      
      body::before {
        top: max(10px, calc(env(safe-area-inset-top) + 10px));
        left: max(10px, calc(env(safe-area-inset-left) + 10px));
        right: max(10px, calc(env(safe-area-inset-right) + 10px));
        bottom: max(10px, calc(env(safe-area-inset-bottom) + 10px));
      }
    }
    
    /* iOS Safari date picker styling */
    input[type="date"] {
      -webkit-appearance: none !important;
      appearance: none !important;
      background: rgba(255, 255, 255, 0.08) !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      color: #e5e5e5 !important;
      border-radius: 8px !important;
      padding: 12px 16px !important;
      font-family: Helvetica, Arial, sans-serif !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      line-height: 1.4 !important;
      width: 100% !important;
      transition: all 0.2s ease !important;
      position: relative !important;
    }
    
    input[type="date"]:focus {
      background: rgba(255, 255, 255, 0.12) !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
      outline: none !important;
    }
    
    input[type="date"]::-webkit-datetime-edit {
      color: #e5e5e5 !important;
    }
    
    input[type="date"]::-webkit-datetime-edit-fields-wrapper {
      color: #e5e5e5 !important;
    }
    
    input[type="date"]::-webkit-datetime-edit-text {
      color: #e5e5e5 !important;
    }
    
    input[type="date"]::-webkit-datetime-edit-month-field {
      color: #e5e5e5 !important;
    }
    
    input[type="date"]::-webkit-datetime-edit-day-field {
      color: #e5e5e5 !important;
    }
    
    input[type="date"]::-webkit-datetime-edit-year-field {
      color: #e5e5e5 !important;
    }
    
    input[type="date"]::-webkit-calendar-picker-indicator {
      background: transparent !important;
      color: #e5e5e5 !important;
      opacity: 0.8 !important;
      cursor: pointer !important;
      filter: invert(1) !important;
    }
    
    input[type="date"]::-webkit-calendar-picker-indicator:hover {
      opacity: 1 !important;
    }
    
    /* Force light theme for date picker popup on iOS */
    input[type="date"]::-webkit-date-and-time-value {
      color: #e5e5e5 !important;
    }
    
    /* Dark theme scrollbars for all browsers */
    /* Firefox */
    * {
      scrollbar-width: thin !important;
      scrollbar-color: #555 #2a2a2a !important;
    }
    
    /* WebKit browsers (Chrome, Safari, Edge) */
    ::-webkit-scrollbar {
      width: 8px !important;
      height: 8px !important;
    }
    
    ::-webkit-scrollbar-track {
      background: #2a2a2a !important;
      border-radius: 4px !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #555 !important;
      border-radius: 4px !important;
      border: 1px solid #333 !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #666 !important;
    }
    
    ::-webkit-scrollbar-thumb:active {
      background: #777 !important;
    }
    
    /* Corner where scrollbars meet */
    ::-webkit-scrollbar-corner {
      background: #2a2a2a !important;
    }
    
    /* Modal specific scrollbars */
    .modal-content ::-webkit-scrollbar {
      width: 6px !important;
    }
    
    .modal-content ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3) !important;
      border: none !important;
    }
    
    .modal-content ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4) !important;
    }
    
    .modal-content ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  `;
  document.head.appendChild(style);
}

// Call the setup function
setupThemeAndDisplay();

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to fetch space images from NASA API
async function fetchSpaceImages(startDate, endDate) {
  try {
    // Show loading indicator with progress
    showLoadingProgress();

    // Display a random space fact
    displayRandomSpaceFact();

    // Build the API URL with our parameters
    const apiUrl = `${NASA_APOD_URL}?api_key=${NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`;
    
    // Fetch data from NASA API
    const response = await fetch(apiUrl);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    
    // Convert response to JSON
    const images = await response.json();
    
    // Display the images in our gallery with progress tracking
    await displayImagesWithProgress(images);
    console.log('Fetched space images:', images);
    
  } catch (error) {
    // Show error message if something goes wrong
    console.error('Error fetching space images:', error);
    gallery.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">❌</div>
        <p>Sorry, we couldn't load the space images. Please try again.</p>
      </div>
    `;
    
    // Remove loading progress styles if they exist
    const loadingStyles = document.getElementById('loadingProgressStyles');
    if (loadingStyles) {
      loadingStyles.remove();
    }
  }
}

// Function to show loading progress indicator
function showLoadingProgress() {
  gallery.innerHTML = `
    <div class="loading-container">
      <div class="loading-content">
        <div class="loading-icon">🚀</div>
        <h3>Loading Space Images...</h3>
        <div class="progress-bar">
          <div class="progress-fill" id="progressFill"></div>
        </div>
        <p class="progress-text" id="progressText">Preparing to fetch images...</p>
      </div>
    </div>
  `;
  
  // Add loading progress styles
  if (!document.getElementById('loadingProgressStyles')) {
    const style = document.createElement('style');
    style.id = 'loadingProgressStyles';
    style.textContent = `
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        padding: 40px 20px;
      }
      
      .loading-content {
        text-align: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 40px 30px;
        backdrop-filter: blur(10px);
        max-width: 400px;
        width: 100%;
      }
      
      .loading-icon {
        font-size: 3rem;
        margin-bottom: 20px;
        animation: rocket-pulse 2s ease-in-out infinite;
      }
      
      @keyframes rocket-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }
      
      .loading-content h3 {
        color: #e5e5e5;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0 0 20px 0;
      }
      
      .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin: 20px 0;
        position: relative;
      }
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #105bd8, #4a90e2);
        border-radius: 4px;
        width: 0%;
        transition: width 0.3s ease;
        position: relative;
      }
      
      .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: progress-shimmer 1.5s ease-in-out infinite;
      }
      
      @keyframes progress-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      .progress-text {
        color: #b0b0b0;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 0.9rem;
        margin: 0;
        font-weight: 400;
      }
    `;
    document.head.appendChild(style);
  }
}

// Function to update loading progress
function updateLoadingProgress(current, total, message) {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  if (progressFill && progressText) {
    const percentage = Math.round((current / total) * 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = message;
  }
}

// Function to display images with progress tracking
async function displayImagesWithProgress(images) {
  // Update progress for API fetch completion
  updateLoadingProgress(1, 3, 'Images fetched successfully! Preparing gallery...');
  
  // Clear the gallery
  gallery.innerHTML = '';
  
  // If no images found, show a message
  if (!images || images.length === 0) {
    gallery.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">🌌</div>
        <p>No images found for this date range.</p>
      </div>
    `;
    return;
  }
  
  // Update progress for starting image processing
  updateLoadingProgress(2, 3, 'Building image gallery...');
  
  // Don't create a temporary container, add cards directly to gallery
  // This ensures the existing CSS grid layout works properly
  
  // Track loaded images for final progress
  let imagesLoaded = 0;
  const totalImages = images.length;
  
  // Create HTML for each image
  images.forEach((item, index) => {
    // Create a container for each space image
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';
    imageCard.style.opacity = '0';
    imageCard.style.transform = 'translateY(20px)';
    
    // Build the HTML content for this image
    let imageHtml = '';
    
    // Check if this is an image or video
    if (item.media_type === 'image') {
      imageHtml = `<img src="${item.url}" alt="${item.title}" loading="lazy">`;
    } else if (item.media_type === 'video') {
      // Check if it's a YouTube video and embed it
      const youtubeId = getYouTubeVideoId(item.url);
      if (youtubeId) {
        imageHtml = `
          <div class="video-embed">
            <iframe 
              src="https://www.youtube.com/embed/${youtubeId}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              title="${item.title}">
            </iframe>
          </div>
        `;
      } else {
        // Fallback for non-YouTube videos
        imageHtml = `
          <div class="video-placeholder">
            <div class="video-icon">🎥</div>
            <p><strong>Video Content</strong></p>
            <a href="${item.url}" target="_blank" class="video-link">Watch Video</a>
          </div>
        `;
      }
    }
    
    // Set the complete HTML for this image card
    imageCard.innerHTML = `
      <div class="image-container">
        ${imageHtml}
      </div>
      <div class="card-info">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-date">${item.date}</p>
      </div>
    `;
    
    // Add click event to the entire card to show modal
    imageCard.addEventListener('click', () => {
      showModal(item);
    });
    
    // Add this image card directly to the gallery
    gallery.appendChild(imageCard);
    
    // Handle animation for different media types
    if (item.media_type === 'image') {
      const img = imageCard.querySelector('img');
      let hasAnimated = false;
      
      const animateCard = () => {
        if (!hasAnimated) {
          hasAnimated = true;
          setTimeout(() => {
            imageCard.style.transition = 'all 0.5s ease';
            imageCard.style.opacity = '1';
            imageCard.style.transform = 'translateY(0)';
          }, index * 100); // Stagger animation
        }
      };
      
      // Check if image is already loaded (cached)
      if (img.complete && img.naturalHeight !== 0) {
        animateCard();
      } else {
        // Set up load event for images that aren't cached
        img.onload = animateCard;
        img.onerror = animateCard; // Show card even if image fails to load
      }
    } else {
      // For videos, immediately show them (no loading required)
      setTimeout(() => {
        imageCard.style.transition = 'all 0.5s ease';
        imageCard.style.opacity = '1';
        imageCard.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
  
  // Update progress for final step
  updateLoadingProgress(3, 3, 'Gallery ready! Loading images...');
  
  // Remove loading progress styles after a delay
  setTimeout(() => {
    const loadingStyles = document.getElementById('loadingProgressStyles');
    if (loadingStyles) {
      loadingStyles.remove();
    }
  }, 1000);
}

// Function to display images in the gallery
function displayImages(images) {
  // Clear the gallery
  gallery.innerHTML = '';
  
  // If no images found, show a message
  if (!images || images.length === 0) {
    gallery.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">🌌</div>
        <p>No images found for this date range.</p>
      </div>
    `;
    return;
  }
  
  // Create HTML for each image
  images.forEach(item => {
    // Create a container for each space image
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';
    
    // Build the HTML content for this image
    let imageHtml = '';
    
    // Check if this is an image or video
    if (item.media_type === 'image') {
      imageHtml = `<img src="${item.url}" alt="${item.title}" loading="lazy">`;
    } else if (item.media_type === 'video') {
      // Check if it's a YouTube video and embed it
      const youtubeId = getYouTubeVideoId(item.url);
      if (youtubeId) {
        imageHtml = `
          <div class="video-embed">
            <iframe 
              src="https://www.youtube.com/embed/${youtubeId}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              title="${item.title}">
            </iframe>
          </div>
        `;
      } else {
        // Fallback for non-YouTube videos
        imageHtml = `
          <div class="video-placeholder">
            <div class="video-icon">🎥</div>
            <p><strong>Video Content</strong></p>
            <a href="${item.url}" target="_blank" class="video-link">Watch Video</a>
          </div>
        `;
      }
    }
    
    // Set the complete HTML for this image card
    imageCard.innerHTML = `
      <div class="image-container">
        ${imageHtml}
      </div>
      <div class="card-info">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-date">${item.date}</p>
      </div>
    `;
    
    // Add click event to the entire card to show modal
    imageCard.addEventListener('click', () => {
      showModal(item);
    });
    
    // Add this image card to our gallery
    gallery.appendChild(imageCard);
  });
}

// Function to show modal with image details
function showModal(item) {
  // Create modal HTML
  const modalHtml = `
    <div class="modal-overlay" id="imageModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${item.title}</h2>
          <span class="close-modal" title="Close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="modal-image">
            ${item.media_type === 'image' 
              ? `<div class="modal-image-container">
                   <div class="modal-image-loading" id="modalImageLoading">
                     <div class="modal-loading-content">
                       <div class="modal-loading-icon">🖼️</div>
                       <p>Loading high-resolution image...</p>
                       <div class="modal-progress-bar">
                         <div class="modal-progress-fill" id="modalProgressFill"></div>
                       </div>
                     </div>
                   </div>
                   <img src="${item.hdurl || item.url}" alt="${item.title}" loading="lazy" id="modalImage" style="display: none;">
                 </div>`
              : item.media_type === 'video' && getYouTubeVideoId(item.url)
              ? `<div class="video-container">
                   <iframe src="https://www.youtube.com/embed/${getYouTubeVideoId(item.url)}" 
                           frameborder="0" 
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                           allowfullscreen
                           title="${item.title}">
                   </iframe>
                 </div>`
              : `<div class="video-container">
                   <p><strong>Video Content</strong></p>
                   <a href="${item.url}" target="_blank" class="video-link">Watch Video</a>
                 </div>`
            }
          </div>
          <div class="modal-info">
            <p class="modal-date"><strong>Date:</strong> ${item.date}</p>
            <p class="modal-explanation">${item.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to the page
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Add modal image loading styles
  if (!document.getElementById('modalLoadingStyles')) {
    const style = document.createElement('style');
    style.id = 'modalLoadingStyles';
    style.textContent = `
      .modal-image-container {
        position: relative;
        width: 100%;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        overflow: hidden;
      }
      
      .modal-image-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        z-index: 2;
        transition: opacity 0.3s ease;
      }
      
      .modal-loading-content {
        text-align: center;
        padding: 20px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        backdrop-filter: blur(15px);
        max-width: 300px;
        width: 90%;
      }
      
      .modal-loading-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        animation: modal-image-pulse 1.5s ease-in-out infinite;
      }
      
      @keyframes modal-image-pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
      }
      
      .modal-loading-content p {
        color: #e5e5e5;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 1rem;
        font-weight: 500;
        margin: 0 0 15px 0;
      }
      
      .modal-progress-bar {
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
        position: relative;
      }
      
      .modal-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #105bd8, #4a90e2);
        border-radius: 3px;
        width: 0%;
        transition: width 0.2s ease;
        position: relative;
      }
      
      .modal-progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: modal-progress-shimmer 1.2s ease-in-out infinite;
      }
      
      @keyframes modal-progress-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      .modal-image-container img {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 8px;
        transition: opacity 0.5s ease;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Get modal elements
  const modal = document.getElementById('imageModal');
  const closeBtn = modal.querySelector('.close-modal');
  const modalContent = modal.querySelector('.modal-content');
  
  // Handle image loading for modal images
  const modalImage = document.getElementById('modalImage');
  const modalImageLoading = document.getElementById('modalImageLoading');
  const modalProgressFill = document.getElementById('modalProgressFill');
  
  if (modalImage && modalImageLoading && modalProgressFill) {
    let progress = 0;
    let progressInterval;
    let hasLoaded = false;
    let progressCompleted = false;
    
    // Simulate progress during image loading - complete independently
    const startProgress = () => {
      progressInterval = setInterval(() => {
        if (progress < 100) {
          // Slow down as we approach 100%
          const increment = progress > 90 ? Math.random() * 2 + 1 : Math.random() * 8 + 3;
          progress += increment;
          progress = Math.min(progress, 100);
          modalProgressFill.style.width = `${progress}%`;
          
          // Mark progress as completed when we reach 100%
          if (progress >= 100 && !progressCompleted) {
            progressCompleted = true;
            clearInterval(progressInterval);
            
            // If image is already loaded or we've waited enough, complete immediately
            if (hasLoaded || modalImage.complete) {
              setTimeout(completeLoading, 200);
            } else {
              // Wait a bit more for image, but not too long
              setTimeout(() => {
                if (!hasLoaded) {
                  completeLoading();
                }
              }, 1500);
            }
          }
        }
      }, 120);
    };
    
    // Function to complete loading animation
    const completeLoading = () => {
      if (hasLoaded) return;
      hasLoaded = true;
      
      clearInterval(progressInterval);
      modalProgressFill.style.width = '100%';
      
      setTimeout(() => {
        modalImageLoading.style.opacity = '0';
        modalImage.style.display = 'block';
        modalImage.style.opacity = '1';
        
        setTimeout(() => {
          if (modalImageLoading) {
            modalImageLoading.style.display = 'none';
          }
        }, 300);
      }, 100);
    };
    
    // Check if image is already loaded (cached)
    if (modalImage.complete && modalImage.naturalHeight !== 0) {
      // For cached images, simulate quick loading
      const quickProgress = setInterval(() => {
        progress += 15;
        modalProgressFill.style.width = `${Math.min(progress, 100)}%`;
        if (progress >= 100) {
          clearInterval(quickProgress);
          setTimeout(completeLoading, 300);
        }
      }, 50);
    } else {
      // Handle image load success - speed up completion if needed
      modalImage.onload = () => {
        if (progressCompleted && !hasLoaded) {
          completeLoading();
        }
      };
      
      // Handle image load error
      modalImage.onerror = () => {
        clearInterval(progressInterval);
        modalImageLoading.innerHTML = `
          <div class="modal-loading-content">
            <div class="modal-loading-icon">❌</div>
            <p>Failed to load high-resolution image</p>
            <p style="font-size: 0.8rem; color: #999;">Trying standard resolution...</p>
          </div>
        `;
        
        // Fallback to standard resolution
        setTimeout(() => {
          modalImage.src = item.url;
        }, 1000);
      };
      
      // Start progress simulation
      startProgress();
    }
  }
  
  // Close modal when clicking the X button
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside the content (on the overlay itself)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal when pressing Escape key
  document.addEventListener('keydown', handleEscapeKey);
  
  // Add touch support for swiping away modal on mobile
  let startY = 0;
  let startX = 0;
  let startedFromTop = false;
  let startedFromLeftEdge = false;
  
  // Track touch start position
  modal.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
    
    // Check if the touch started from the top 20% of the modal
    const modalRect = modalContent.getBoundingClientRect();
    const touchRelativeY = startY - modalRect.top;
    const modalHeight = modalRect.height;
    startedFromTop = touchRelativeY <= modalHeight * 0.2;
    
    // Check if the touch started from the left edge of the screen (within 30px)
    startedFromLeftEdge = startX <= 30;
  });
  
  // Handle touch end - check for swipe gesture
  modal.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const deltaY = startY - endY;
    const deltaX = endX - startX; // Positive for right swipe, negative for left
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Check for downward swipe from top (existing functionality)
    if (startedFromTop && deltaY < -100 && absDeltaX < 50) {
      closeModal();
      return;
    }
    
    // Check for right swipe from left edge
    // Must start from left edge, swipe right at least 100px, and be primarily horizontal
    if (startedFromLeftEdge && deltaX > 100 && absDeltaY < 50) {
      closeModal();
    }
  });
  
  // Show the modal with animation
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
      document.removeEventListener('keydown', handleEscapeKey);
      
      // Clean up modal loading styles if no other modals are open
      const remainingModals = document.querySelectorAll('.modal-overlay');
      if (remainingModals.length === 0) {
        const modalLoadingStyles = document.getElementById('modalLoadingStyles');
        if (modalLoadingStyles) {
          modalLoadingStyles.remove();
        }
      }
    }, 300);
  }
}

// Function to handle escape key press
function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

// Add click event listener to the "Get Space Images" button
getImagesButton.addEventListener('click', () => {
  // Get the selected dates from our input fields
  const startDate = startInput.value;
  const endDate = endInput.value;
  
  // Make sure both dates are selected
  if (!startDate || !endDate) {
    alert('Please select both start and end dates!');
    return;
  }
  
  // Make sure start date is not after end date
  if (new Date(startDate) > new Date(endDate)) {
    alert('Start date cannot be after end date!');
    return;
  }
  
  // Fetch and display the space images
  fetchSpaceImages(startDate, endDate);
});
