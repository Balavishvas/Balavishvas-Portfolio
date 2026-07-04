document.addEventListener('DOMContentLoaded', () => {
  // --- Live Time Clock ---
  const timeElement = document.getElementById('current-time');
  
  function updateTime() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(new Date());
      const hours = parts.find(p => p.type === 'hour').value;
      const minutes = parts.find(p => p.type === 'minute').value;
      const seconds = parts.find(p => p.type === 'second').value;
      
      if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds} IST`;
      }
    } catch (e) {
      // Fallback if Intl is not fully supported
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      if (timeElement) {
        timeElement.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      }
    }
  }
  
  updateTime();
  setInterval(updateTime, 1000);

  // --- Copy Email to Clipboard Widget ---
  const emailWidget = document.getElementById('floating-email');
  const emailText = document.getElementById('floating-email-text');
  const myEmail = 'balavishvas2006@gmail.com';
  let copyTimeout = null;

  if (emailWidget) {
    emailWidget.addEventListener('click', () => {
      navigator.clipboard.writeText(myEmail).then(() => {
        if (emailText) {
          emailText.textContent = 'COPIED!';
          emailWidget.style.backgroundColor = '#fed17a';
          emailText.style.color = '#121214';
          
          if (copyTimeout) clearTimeout(copyTimeout);
          
          copyTimeout = setTimeout(() => {
            emailText.textContent = 'COPY EMAIL';
            emailWidget.style.backgroundColor = '';
            emailText.style.color = '';
          }, 2000);
        }
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    });
  }

  // --- Contact Service Options Toggles ---
  const optionCards = document.querySelectorAll('.option-card');
  
  optionCards.forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    // Initial state check
    if (checkbox && checkbox.checked) {
      card.classList.add('selected');
    }
    
    card.addEventListener('click', (e) => {
      // Prevent double trigger if clicking directly on input
      if (e.target.tagName === 'INPUT') return;
      
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        if (checkbox.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      }
    });
    
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    }
  });

  // --- Contact Form Submission Handler ---
  const projectForm = document.getElementById('project-form');
  const submitButton = document.getElementById('submit-button');

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;
      
      // Collect selected project needs
      const selectedNeeds = [];
      document.querySelectorAll('input[name="project_need"]:checked').forEach(chk => {
        selectedNeeds.push(chk.value);
      });

      if (selectedNeeds.length === 0) {
        alert('Please select at least one project need (Website or Automation).');
        return;
      }

      // Simulate API call and success message
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending Inquiry...';
        
        setTimeout(() => {
          submitButton.textContent = 'Message Sent Successfully!';
          submitButton.style.backgroundColor = '#4caf50';
          submitButton.style.color = '#ffffff';
          
          alert(`Thank you ${name}! Your inquiry for: [${selectedNeeds.join(', ')}] has been registered. Balavishvas will get back to you at ${email}.`);
          
          // Reset form
          projectForm.reset();
          optionCards.forEach(c => c.classList.remove('selected'));
          
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Inquiry';
            submitButton.style.backgroundColor = '';
            submitButton.style.color = '';
          }, 3000);
        }, 1500);
      }
    });
  }

  // --- Project Filter Tabs Logic ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Trigger once on load

  // --- Active Nav Highlight on Scroll ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
});
