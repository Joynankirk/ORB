// Photo Grid Interactive Features
// Photo Grid Functionality
document.addEventListener('DOMContentLoaded', () => {
  initializePhotoGrid();
});

function initializePhotoGrid() {
  const photoItems = document.querySelectorAll('.photo-item');
  
  photoItems.forEach((item, index) => {
    // Add click interaction
    item.addEventListener('click', () => handlePhotoClick(item, index));
    
    // Add keyboard support
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View photo ${index + 1}`);
    
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePhotoClick(item, index);
      }
    });
    
    // Add hover effects
    item.addEventListener('mouseenter', () => handlePhotoHover(item, true));
    item.addEventListener('mouseleave', () => handlePhotoHover(item, false));
    
    // Lazy load effect
    if (index > 4) {
      item.style.animationDelay = `${0.1 * index}s`;
    }
  });
  document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for contacting us! We will get back to you soon.');
  this.reset();
});
  // Initialize intersection observer for photo grid
  observePhotoGrid();
}

function handlePhotoClick(item, index) {
  // Remove active class from all items
  document.querySelectorAll('.photo-item').forEach(photo => {
    photo.classList.remove('active');
  });
  
  // Add active class to clicked item
  item.classList.add('active');
  
  // Create photo modal/lightbox effect
  showPhotoModal(item, index);
  
  // Track analytics
  trackEvent('photo_clicked', { 
    index: index,
    hasTag: item.querySelector('.photo-tag') !== null 
  });
}

function handlePhotoHover(item, isHovering) {
  const tag = item.querySelector('.photo-tag');
  
  if (tag) {
    if (isHovering) {
      tag.style.transform = 'translateY(-2px) scale(1.05)';
      tag.style.boxShadow = '0 8px 25px rgba(168, 85, 247, 0.4)';
    } else {
      tag.style.transform = 'translateY(0) scale(1)';
      tag.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    }
  }
}

function showPhotoModal(item, index) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'photo-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" aria-label="Close">&times;</button>
        <div class="modal-photo">
          <div class="modal-image" style="background: ${getItemBackground(item)}">
            ${item.querySelector('.photo-tag') ? 
              `<div class="modal-tag">${item.querySelector('.photo-tag').textContent}</div>` : ''}
          </div>
          <div class="modal-info">
            <h3>Photo ${index + 1}</h3>
            <p>Interactive photo from OrbitStack gallery</p>
            <div class="modal-actions">
              <button class="modal-btn primary">Use in Project</button>
              <button class="modal-btn secondary">Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal styles dynamically
  if (!document.querySelector('#photoModalStyles')) {
    const styles = document.createElement('style');
    styles.id = 'photoModalStyles';
    styles.textContent = `
      .photo-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: modalFadeIn 0.3s ease;
      }
      
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
      }
      
      .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: rgba(17, 24, 39, 0.95);
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
        animation: modalSlideUp 0.3s ease;
      }
      
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
      }
      
      .modal-close:hover {
        background: rgba(168, 85, 247, 0.8);
      }
      
      .modal-photo {
        display: flex;
        min-height: 400px;
      }
      
      .modal-image {
        flex: 1;
        min-height: 400px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-tag {
        background: rgba(168, 85, 247, 0.9);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
      }
      
      .modal-info {
        padding: 2rem;
        color: white;
        min-width: 300px;
      }
      
      .modal-info h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      
      .modal-info p {
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 2rem;
      }
      
      .modal-actions {
        display: flex;
        gap: 1rem;
        flex-direction: column;
      }
      
      .modal-btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .modal-btn.primary {
        background: linear-gradient(135deg, #a855f7, #3b82f6);
        border: none;
        color: white;
      }
      
      .modal-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
      }
      
      .modal-btn.secondary {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
      }
      
      .modal-btn.secondary:hover {
        border-color: rgba(168, 85, 247, 0.5);
        background: rgba(168, 85, 247, 0.1);
      }
      
      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes modalSlideUp {
        from { 
          opacity: 0;
          transform: translateY(50px) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @media (max-width: 768px) {
        .modal-photo {
          flex-direction: column;
        }
        
        .modal-image {
          min-height: 250px;
        }
        
        .modal-info {
          min-width: auto;
        }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Close modal functionality
  const closeModal = () => {
    modal.style.animation = 'modalFadeIn 0.3s ease reverse';
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
      item.classList.remove('active');
    }, 300);
  };
  
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  
  // Keyboard escape
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  // Modal button actions
  modal.querySelector('.modal-btn.primary').addEventListener('click', () => {
    showNotification('Added to project! 🎨');
    closeModal();
  });
  
  modal.querySelector('.modal-btn.secondary').addEventListener('click', () => {
    showNotification('Download started! 📥');
    closeModal();
  });
}

function getItemBackground(item) {
  const computedStyle = window.getComputedStyle(item.querySelector('.photo-image'));
  return computedStyle.background || computedStyle.backgroundImage || 
         'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

function observePhotoGrid() {
  const photoGridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 0.1}s`;
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  document.querySelectorAll('.photo-item').forEach(item => {
    photoGridObserver.observe(item);
  });
}

// Photo Grid Masonry Effect
function adjustPhotoLayout() {
  const grid = document.querySelector('.photo-grid');
  if (!grid) return;
  
  const items = grid.querySelectorAll('.photo-item');
  const gridWidth = grid.offsetWidth;
  const columnWidth = gridWidth / 4; // 4 columns
  
  // Responsive column adjustment
  let columns = 4;
  if (gridWidth < 1024) columns = 3;
  if (gridWidth < 768) columns = 2;
  if (gridWidth < 480) columns = 1;
  
  // Apply dynamic sizing based on content
  items.forEach((item, index) => {
    const hasLongContent = item.querySelector('.photo-tag')?.textContent.length > 10;
    if (hasLongContent && columns > 2) {
      item.style.gridColumn = 'span 2';
    }
  });
}

// Initialize layout adjustments
window.addEventListener('resize', debounce(adjustPhotoLayout, 250));
window.addEventListener('load', adjustPhotoLayout);

// Photo Grid Touch Support for Mobile
function addTouchSupport() {
  let touchStartY = 0;
  let touchEndY = 0;
  
  document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    item.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      
      // Swipe up to open modal
      if (swipeDistance > 50) {
        const index = Array.from(item.parentNode.children).indexOf(item);
        handlePhotoClick(item, index);
      }
    }, { passive: true });
  });
}

// Initialize touch support on mobile devices
if ('ontouchstart' in window) {
  addTouchSupport();
}

// Performance optimization for photo grid
function optimizePhotoGrid() {
  const photoItems = document.querySelectorAll('.photo-item');
  
  // Use passive event listeners for better scroll performance
  photoItems.forEach(item => {
    item.addEventListener('scroll', () => {
      // Throttled scroll effects
    }, { passive: true });
  });
  
  // Intersection Observer for performance
  const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { 
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '100px'
  });
  
  photoItems.forEach(item => performanceObserver.observe(item));
}

// Initialize all photo grid features
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    optimizePhotoGrid();
    adjustPhotoLayout();
  }, 100);
});
