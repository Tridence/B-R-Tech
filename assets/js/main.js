/**
* Template Name: B&R Technologies - v3.7.0
* Template URL: https://bootstrapmade.com/presento-bootstrap-corporate-template/
* Author: B&R Technologies
* License: https://bootstrapmade.com/license/
*/


// Temporary code for the form ()
// Will add a secure credentials for the smtp server


function sendEmail(){
  Email.send({
    Host : "smtp.gmail.com",
    Username : "barakaralph@gmail.com",
    Password : "D9B931F72C03EADDA32480E5A37F0EDB39B5",
    To : 'barakaralph@gmail.com',
    From : document.getElementById("email").value,
    Subject : "This is the subject",
    Body : "Name:" + document.getElementById("name").value
    + "<br> Email: " + document.getElementById("email").value
    + "<br> Phone no: " + document.getElementById("phone").value
    + "<br> Message: " + document.getElementById("message").value
  }).then(
    message => alert("Message sent successfully")
  );
}

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });
  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 30; // Number of snowflakes you want

    function createSnowflake() {
        // 1. Create the snowflake element
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Use a simple text symbol or Unicode character for the snowflake
        // Common Unicode: ❄ (U+2744), ❅ (U+2745), ❆ (U+2746)
        snowflake.innerHTML = '❅'; 

        // 2. Set random properties
        
        // Random horizontal position (0% to 100% of width)
        const startX = Math.random() * 100;
        // Start above the screen
        const startY = - (Math.random() * 20); 
        
        // Random size (0.5 to 1.5 times the base size in CSS)
        const size = Math.random() * 1 + 0.5; 
        
        // Random speed (5s to 15s)
        const duration = Math.random() * 10 + 5; 
        
        // Random delay so they don't all start at once
        const delay = Math.random() * 5; 
        
        // Set styles
        snowflake.style.left = `${startX}vw`;
        snowflake.style.top = `${startY}vh`;
        snowflake.style.fontSize = `${size}em`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        // 3. Add animation keyframes (we define the keyframes in JS)
        // This is a simplified way to apply random motion. 
        // A better, dedicated animation is defined below.
        
        // 4. Append to container
        snowContainer.appendChild(snowflake);

        // 5. Restart the animation when it finishes
        snowflake.addEventListener('animationiteration', function() {
            // Reposition snowflake at the top with a new random X position
            this.style.left = `${Math.random() * 100}vw`;
            this.style.top = `-5vh`; // Start slightly above the viewport
        });
    }

    // 6. Define the CSS animation keyframes
    // The animation will make it fall and subtly move sideways (wind effect)
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
        @keyframes snowfall {
            0% { 
                transform: translate3d(0, 0, 0) rotate(0deg); 
                opacity: 0.9;
            }
            50% { 
                /* Subtle sideways swing */
                transform: translate3d(${Math.random() > 0.5 ? '20px' : '-20px'}, 50vh, 0) rotate(180deg);
                opacity: 0.7;
            }
            100% { 
                transform: translate3d(0, 100vh, 0) rotate(360deg); 
                opacity: 0.5;
            }
        }
        .snowflake {
            animation-name: snowfall;
            animation-timing-function: linear; /* Constant speed */
            animation-iteration-count: infinite; /* Loop forever */
        }
    `;
    document.head.appendChild(styleSheet);


    // 7. Create all the snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }
});