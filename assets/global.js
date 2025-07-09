/**
 * Global JavaScript for AI Theme Dev
 * Handles common functionality across the theme
 */

class ThemeGlobal {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.handleAccessibility();
  }

  setupEventListeners() {
    // Handle mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-mobile-menu-toggle]')) {
        this.toggleMobileMenu();
      }
    });

    // Handle cart drawer toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-toggle]')) {
        this.toggleCartDrawer();
      }
    });

    // Handle search toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-search-toggle]')) {
        this.toggleSearch();
      }
    });

    // Handle quantity selectors
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-quantity-plus]')) {
        this.updateQuantity(e.target, 1);
      }
      if (e.target.matches('[data-quantity-minus]')) {
        this.updateQuantity(e.target, -1);
      }
    });

    // Handle form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.matches('[data-cart-form]')) {
        this.handleCartForm(e);
      }
    });
  }

  initializeComponents() {
    // Initialize lazy loading
    this.initLazyLoading();
    
    // Initialize animations
    this.initAnimations();
    
    // Initialize product variants
    this.initProductVariants();
  }

  toggleMobileMenu() {
    const menu = document.querySelector('[data-mobile-menu]');
    const toggle = document.querySelector('[data-mobile-menu-toggle]');
    
    if (menu && toggle) {
      const isOpen = menu.classList.contains('is-open');
      menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', !isOpen);
      document.body.classList.toggle('menu-open');
    }
  }

  toggleCartDrawer() {
    const drawer = document.querySelector('[data-cart-drawer]');
    const overlay = document.querySelector('[data-cart-overlay]');
    
    if (drawer) {
      const isOpen = drawer.classList.contains('is-open');
      drawer.classList.toggle('is-open');
      if (overlay) overlay.classList.toggle('is-visible');
      document.body.classList.toggle('cart-open');
      
      // Focus management
      if (!isOpen) {
        const closeButton = drawer.querySelector('[data-cart-close]');
        if (closeButton) closeButton.focus();
      }
    }
  }

  toggleSearch() {
    const search = document.querySelector('[data-search-form]');
    const input = search?.querySelector('input[type="search"]');
    
    if (search) {
      search.classList.toggle('is-open');
      if (input && search.classList.contains('is-open')) {
        input.focus();
      }
    }
  }

  updateQuantity(button, change) {
    const input = button.parentElement.querySelector('input[type="number"]');
    if (input) {
      const currentValue = parseInt(input.value) || 0;
      const newValue = Math.max(0, currentValue + change);
      input.value = newValue;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  async handleCartForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('[type="submit"]');
    
    // Show loading state
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Adding...';
    }

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const item = await response.json();
        this.showCartNotification(item);
        this.updateCartCount();
        
        // Open cart drawer if enabled
        if (window.theme?.settings?.cart_type === 'drawer') {
          this.toggleCartDrawer();
        }
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Cart error:', error);
      this.showNotification('Error adding item to cart', 'error');
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || 'Add to Cart';
      }
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      const countElements = document.querySelectorAll('[data-cart-count]');
      
      countElements.forEach(element => {
        element.textContent = cart.item_count;
        element.classList.toggle('has-items', cart.item_count > 0);
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }

  showCartNotification(item) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification__content">
        <p>Added to cart: ${item.product_title}</p>
        <button type="button" data-cart-notification-close>×</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
    
    // Handle close button
    notification.querySelector('[data-cart-notification-close]').addEventListener('click', () => {
      notification.remove();
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  initAnimations() {
    if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      });

      document.querySelectorAll('[data-animate]').forEach(element => {
        animationObserver.observe(element);
      });
    }
  }

  initProductVariants() {
    document.querySelectorAll('[data-product-form]').forEach(form => {
      const variantSelects = form.querySelectorAll('select[name*="id"]');
      const variantRadios = form.querySelectorAll('input[type="radio"][name*="id"]');
      
      [...variantSelects, ...variantRadios].forEach(input => {
        input.addEventListener('change', () => {
          this.updateProductVariant(form);
        });
      });
    });
  }

  updateProductVariant(form) {
    const formData = new FormData(form);
    const variantId = formData.get('id');
    
    if (variantId) {
      // Update price
      const priceElement = form.querySelector('[data-product-price]');
      const compareAtPriceElement = form.querySelector('[data-product-compare-price]');
      
      // Update availability
      const availabilityElement = form.querySelector('[data-product-availability]');
      const submitButton = form.querySelector('[type="submit"]');
      
      // This would typically fetch variant data from a JSON endpoint
      // For now, we'll just update the form state
      form.dataset.variantId = variantId;
    }
  }

  handleAccessibility() {
    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open modals/drawers
        const openModal = document.querySelector('.modal.is-open, .drawer.is-open');
        if (openModal) {
          openModal.classList.remove('is-open');
          document.body.classList.remove('modal-open', 'cart-open', 'menu-open');
        }
      }
    });

    // Announce dynamic content changes to screen readers
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'visually-hidden';
    document.body.appendChild(this.announcer);
  }

  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.theme = new ThemeGlobal();
  });
} else {
  window.theme = new ThemeGlobal();
}

// Utility functions
window.themeUtils = {
  formatMoney: (cents, format = '${{amount}}') => {
    const value = (cents / 100).toFixed(2);
    return format.replace('{{amount}}', value);
  },
  
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
};
