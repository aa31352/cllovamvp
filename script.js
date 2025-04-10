// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Check saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}
updateThemeIcon();

// Mobile Menu Toggle - Enhanced version
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle mobile menu
    navLinks.classList.toggle('active');
    // Toggle hamburger icon
    hamburger.classList.toggle('active');
    
    // Animate nav items
    if (navLinks.classList.contains('active')) {
        navItems.forEach((item, index) => {
            item.style.animation = `navItemFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        });
    } else {
        navItems.forEach(item => {
            item.style.animation = '';
        });
    }
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navItems.forEach(item => {
            item.style.animation = '';
        });
    });
});

// Chatbot Interaction
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Sample AI responses
const aiResponses = [
    "Clova AI OS is designed to make your workflow seamless!",
    "You can control me with voice, text, or even gestures.",
    "I can help automate tasks, manage files, and even code!",
    "Would you like a demo of my capabilities?",
];

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        // Simulate AI response after a delay
        setTimeout(() => {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(randomResponse);
        }, 1000);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements on scroll (using Intersection Observer)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .hero-content, .chatbot-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
};

window.addEventListener('load', animateOnScroll);

// Waitlist Form Submission
const waitlistForm = document.querySelector('.waitlist-form');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We\'ll notify you when Alpha is ready.');
        waitlistForm.reset();
    });
}

// Scroll to #waitlist if URL hash is present
if (window.location.hash === '#waitlist') {
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Check if mobile view
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
        navLinks.style.display = 'none';
    } else {
        hamburger.style.display = 'none';
        navLinks.style.display = 'flex';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        hamburger.style.display = 'none';
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    } else {
        hamburger.style.display = 'block';
        if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    }
});


//-----
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    
    // Check for saved user preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline-block';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            darkIcon.style.display = 'inline-block';
            lightIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'inline-block';
            localStorage.setItem('theme', 'dark');
        }
    });
});

