// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getImagesButton = document.querySelector('button');
const gallery = document.getElementById('gallery');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers with default values and limits
setupDateInputs(startInput, endInput);

// NASA APOD API settings
const NASA_API_KEY = '';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

// Array of fun space facts to show users
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

// Function to show a random space fact
function displayRandomSpaceFact() {
  // Pick a random fact from our array
  const randomIndex = Math.floor(Math.random() * SPACE_FACTS.length);
  const randomFact = SPACE_FACTS[randomIndex];
  
  // Find the space fact elements on the page
  const factContainer = document.getElementById('space-fact');
  const factText = document.getElementById('space-fact-text');
  
  // Update the fact text and show it
  if (factContainer && factText) {
    factText.textContent = randomFact;
    factContainer.style.display = 'block';
  }
}

// Display a random space fact when the page loads
displayRandomSpaceFact();

// Simple function to disable dark mode extensions
function setupTheme() {
  // Disable dark mode extensions by setting color scheme to light
  document.documentElement.style.colorScheme = 'light only';
}

// Call the setup function
setupTheme();

// Storage for preloaded images to make modals load faster
const imagePreloadCache = new Map();

// Function to preload an image in the background
function preloadImage(url, hdUrl) {
  // Use the high-resolution URL if available, otherwise use standard URL
  const imageUrl = hdUrl || url;
  
  // Don't preload if already cached
  if (imagePreloadCache.has(imageUrl)) {
    return imagePreloadCache.get(imageUrl);
  }
  
  // Create a promise that resolves when image is loaded
  const preloadPromise = new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Preloaded image: ${imageUrl}`);
      resolve(img);
    };
    
    img.onerror = () => {
      console.warn(`❌ Failed to preload image: ${imageUrl}`);
      reject(new Error(`Failed to preload ${imageUrl}`));
    };
    
    // Start loading the image
    img.src = imageUrl;
  });
  
  // Cache the promise
  imagePreloadCache.set(imageUrl, preloadPromise);
  return preloadPromise;
}

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
    
    // Hide loading container and show error placeholder
    const loadingContainer = document.getElementById('loading-container');
    const errorPlaceholder = document.getElementById('error-placeholder');
    
    if (loadingContainer) loadingContainer.style.display = 'none';
    if (errorPlaceholder) errorPlaceholder.style.display = 'block';
  }
}

// Function to show loading progress indicator
function showLoadingProgress() {
  // Hide all other gallery states
  const defaultPlaceholder = document.getElementById('default-placeholder');
  const errorPlaceholder = document.getElementById('error-placeholder');
  const noResultsPlaceholder = document.getElementById('no-results-placeholder');
  const loadingContainer = document.getElementById('loading-container');
  
  // Hide all placeholders
  if (defaultPlaceholder) defaultPlaceholder.style.display = 'none';
  if (errorPlaceholder) errorPlaceholder.style.display = 'none';
  if (noResultsPlaceholder) noResultsPlaceholder.style.display = 'none';
  
  // Show loading container
  if (loadingContainer) loadingContainer.style.display = 'flex';
  
  // Clear any existing image cards from gallery
  const gallery = document.getElementById('gallery');
  const imageCards = gallery.querySelectorAll('.image-card');
  imageCards.forEach(card => card.remove());
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
  
  // Hide loading container and show gallery content
  const loadingContainer = document.getElementById('loading-container');
  const gallery = document.getElementById('gallery');
  
  // If no images found, show the no results placeholder
  if (!images || images.length === 0) {
    if (loadingContainer) loadingContainer.style.display = 'none';
    const noResultsPlaceholder = document.getElementById('no-results-placeholder');
    if (noResultsPlaceholder) noResultsPlaceholder.style.display = 'block';
    return;
  }
  
  // Update progress for starting image processing
  updateLoadingProgress(2, 3, 'Building image gallery...');
  
  // Track loaded images for final progress
  let imagesLoaded = 0;
  const totalImages = images.length;
  
  // Create HTML for each image
  images.forEach((item, index) => {
    // Start preloading high-resolution images immediately for faster modal loading
    if (item.media_type === 'image') {
      // Preload both standard and HD versions in the background
      preloadImage(item.url, item.hdurl).catch(() => {
        // If HD fails, ensure standard version is cached
        preloadImage(item.url);
      });
    }
    
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
    
    // Add this image card to the gallery
    gallery.appendChild(imageCard);
    
    // Set up intersection observer for prioritized preloading of visible images
    if (item.media_type === 'image') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image card is visible, prioritize preloading its high-res version
            const imageUrl = item.hdurl || item.url;
            if (!imagePreloadCache.has(imageUrl)) {
              console.log(`🎯 Prioritizing preload for visible image: ${item.title}`);
              preloadImage(item.url, item.hdurl);
            }
            // Stop observing once we've triggered preloading
            observer.unobserve(entry.target);
          }
        });
      }, {
        // Start preloading when image is 50% visible
        threshold: 0.5,
        // Start preloading 100px before the image enters viewport
        rootMargin: '100px'
      });
      
      observer.observe(imageCard);
    }
    
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
  
  // Hide loading container after a delay
  setTimeout(() => {
    if (loadingContainer) loadingContainer.style.display = 'none';
  }, 1000);
}

// Function to show modal with image details
function showModal(item) {
  // Get the modal and its elements
  const modal = document.getElementById('imageModal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalExplanation = document.getElementById('modal-explanation');
  
  // Update modal content
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
  
  // Hide all media containers first
  const imageContainer = document.getElementById('modal-image-container');
  const youtubeContainer = document.getElementById('modal-video-youtube');
  const otherVideoContainer = document.getElementById('modal-video-other');
  
  imageContainer.style.display = 'none';
  youtubeContainer.style.display = 'none';
  otherVideoContainer.style.display = 'none';
  
  // Show appropriate media content
  if (item.media_type === 'image') {
    // Show image container
    imageContainer.style.display = 'flex';
    
    const modalImage = document.getElementById('modalImage');
    const modalImageLoading = document.getElementById('modalImageLoading');
    const modalProgressFill = document.getElementById('modalProgressFill');
    
    // Reset image state
    modalImage.style.display = 'none';
    modalImage.style.opacity = '1';
    modalImageLoading.style.display = 'flex';
    modalImageLoading.style.opacity = '1';
    modalProgressFill.style.width = '0%';
    
    // Determine which image URL to use (HD if available)
    const imageUrl = item.hdurl || item.url;
    
    // Check if image is already preloaded in our cache
    const preloadedPromise = imagePreloadCache.get(imageUrl);
    
    if (preloadedPromise) {
      // Image is preloaded! Show it immediately with fast animation
      console.log('🚀 Using preloaded image for instant loading');
      
      preloadedPromise.then((preloadedImg) => {
        // Fast progress animation for preloaded images
        let progress = 0;
        const fastProgress = setInterval(() => {
          progress += 25; // Much faster increments
          modalProgressFill.style.width = `${Math.min(progress, 100)}%`;
          if (progress >= 100) {
            clearInterval(fastProgress);
            
            // Show the image immediately
            setTimeout(() => {
              modalImage.src = imageUrl;
              modalImage.alt = item.title;
              
              modalImageLoading.style.opacity = '0';
              modalImage.style.display = 'block';
              modalImage.style.opacity = '1';
              
              setTimeout(() => {
                modalImageLoading.style.display = 'none';
              }, 300);
            }, 100);
          }
        }, 40); // Very fast animation
        
      }).catch(() => {
        // Fallback to normal loading if preloaded image failed
        loadImageWithProgress(modalImage, modalImageLoading, modalProgressFill, item);
      });
    } else {
      // Image not preloaded, load with progress animation
      loadImageWithProgress(modalImage, modalImageLoading, modalProgressFill, item);
    }
    
  } else if (item.media_type === 'video') {
    const youtubeId = getYouTubeVideoId(item.url);
    
    if (youtubeId) {
      // Show YouTube container
      youtubeContainer.style.display = 'block';
      const iframe = document.getElementById('modal-youtube-iframe');
      iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
      iframe.title = item.title;
    } else {
      // Show other video container
      otherVideoContainer.style.display = 'block';
      const videoLink = document.getElementById('modal-video-link');
      videoLink.href = item.url;
    }
  }
  
  // Set up modal close handlers
  const closeBtn = modal.querySelector('.close-modal');
  const modalContent = modal.querySelector('.modal-content');
  
  // Close modal when clicking the X button
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside the content
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
  
  modal.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
    
    const modalRect = modalContent.getBoundingClientRect();
    const touchRelativeY = startY - modalRect.top;
    const modalHeight = modalRect.height;
    startedFromTop = touchRelativeY <= modalHeight * 0.2;
    startedFromLeftEdge = startX <= 30;
  });
  
  modal.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const deltaY = startY - endY;
    const deltaX = endX - startX;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    if (startedFromTop && deltaY < -100 && absDeltaX < 50) {
      closeModal();
      return;
    }
    
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
      modal.style.display = 'none';
      document.removeEventListener('keydown', handleEscapeKey);
      
      // Reset modal content for next use
      const modalImage = document.getElementById('modalImage');
      const youtubeIframe = document.getElementById('modal-youtube-iframe');
      
      if (modalImage) {
        modalImage.src = '';
        modalImage.style.display = 'none';
      }
      
      if (youtubeIframe) {
        youtubeIframe.src = '';
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

// Helper function to load image with progress animation (fallback for non-preloaded images)
function loadImageWithProgress(modalImage, modalImageLoading, modalProgressFill, item) {
  // Set image source
  modalImage.src = item.hdurl || item.url;
  modalImage.alt = item.title;
  
  // Handle image loading with progress simulation
  let progress = 0;
  let progressInterval;
  let hasLoaded = false;
  let progressCompleted = false;
  
  // Simulate progress during image loading
  const startProgress = () => {
    progressInterval = setInterval(() => {
      if (progress < 100) {
        const increment = progress > 90 ? Math.random() * 2 + 1 : Math.random() * 8 + 3;
        progress += increment;
        progress = Math.min(progress, 100);
        modalProgressFill.style.width = `${progress}%`;
        
        if (progress >= 100 && !progressCompleted) {
          progressCompleted = true;
          clearInterval(progressInterval);
          
          if (hasLoaded || modalImage.complete) {
            setTimeout(completeLoading, 200);
          } else {
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
        modalImageLoading.style.display = 'none';
      }, 300);
    }, 100);
  };
  
  // Check if image is already cached in browser
  if (modalImage.complete && modalImage.naturalHeight !== 0) {
    const quickProgress = setInterval(() => {
      progress += 15;
      modalProgressFill.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) {
        clearInterval(quickProgress);
        setTimeout(completeLoading, 300);
      }
    }, 50);
  } else {
    modalImage.onload = () => {
      if (progressCompleted && !hasLoaded) {
        completeLoading();
      }
    };
    
    modalImage.onerror = () => {
      clearInterval(progressInterval);
      modalImageLoading.innerHTML = `
        <div class="modal-loading-content">
          <div class="modal-loading-icon">❌</div>
          <p>Failed to load high-resolution image</p>
          <p style="font-size: 0.8rem; color: #999;">Trying standard resolution...</p>
        </div>
      `;
      
      setTimeout(() => {
        modalImage.src = item.url;
      }, 1000);
    };
    
    startProgress();
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
