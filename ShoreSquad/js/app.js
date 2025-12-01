// ===============================
// ShoreSquad - Main Application
// ===============================

// Configuration
const CONFIG = {
    neaWeatherApi: 'https://api-open.data.gov.sg/v1/environment/4-day-weather-forecast',
    mapCenter: [1.3521, 103.8198], // Singapore default
    mapZoom: 12,
    eventsUpdateInterval: 60000, // 1 minute
};

// ===============================
// DOM Elements
// ===============================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const mapContainer = document.getElementById('map');
const eventsContainer = document.getElementById('events-container');
const crewList = document.getElementById('crew-list');
const getStartedBtn = document.getElementById('get-started-btn');
const exploreBtn = document.getElementById('explore-btn');
const geolocationBtn = document.getElementById('geolocation-btn');
const locationSearch = document.getElementById('location-search');
const weatherContainer = document.getElementById('weather-container');
const weatherLoader = document.getElementById('weather-loader');
const weatherError = document.getElementById('weather-error');

// ===============================
// State Management
// ===============================
const state = {
    map: null,
    userLocation: CONFIG.mapCenter,
    events: [],
    crew: [],
    weather: null,
    markers: [],
};

// ===============================
// Navigation Toggle (Mobile)
// ===============================
function initNavigation() {
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', 
            navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===============================
// Map Initialization (Leaflet.js)
// ===============================
function initMap() {
    try {
        // Initialize Leaflet map
        state.map = L.map('map').setView(state.userLocation, CONFIG.mapZoom);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
            accessibleLabel: 'OpenStreetMap base layer'
        }).addTo(state.map);

        // Add sample beaches to map
        addBeachMarkers();

        // Add controls
        L.control.zoom({ position: 'bottomright' }).addTo(state.map);

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Map initialization error:', error);
        mapContainer.innerHTML = '<p>Unable to load map. Please refresh the page.</p>';
    }
}

// ===============================
// Add Beach Markers to Map
// ===============================
function addBeachMarkers() {
    const beaches = [
        {
            name: 'East Coast Park',
            lat: 1.3020,
            lng: 103.9054,
            cleanup: '2025-12-15',
            volunteers: 12
        },
        {
            name: 'Sentosa Beach',
            lat: 1.2487,
            lng: 103.8303,
            cleanup: '2025-12-22',
            volunteers: 8
        },
        {
            name: 'Changi Beach',
            lat: 1.4019,
            lng: 103.9734,
            cleanup: '2025-12-29',
            volunteers: 15
        },
    ];

    beaches.forEach(beach => {
        const marker = L.circleMarker(
            [beach.lat, beach.lng],
            {
                radius: 10,
                fillColor: '#00D084',
                color: '#0077BE',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.7
            }
        ).addTo(state.map);

        const popupContent = `
            <div style="text-align: center; padding: 10px;">
                <strong>${beach.name}</strong><br>
                Cleanup: ${beach.cleanup}<br>
                Volunteers: ${beach.volunteers}
            </div>
        `;

        marker.bindPopup(popupContent);
        state.markers.push(marker);
    });
}

// ===============================
// Geolocation
// ===============================
function initGeolocation() {
    geolocationBtn?.addEventListener('click', () => {
        if ('geolocation' in navigator) {
            geolocationBtn.disabled = true;
            geolocationBtn.textContent = '📍 Locating...';

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    state.userLocation = [latitude, longitude];
                    
                    // Center map on user location
                    if (state.map) {
                        state.map.setView(state.userLocation, CONFIG.mapZoom);
                    }

                    // Add user marker
                    L.circleMarker(
                        state.userLocation,
                        {
                            radius: 8,
                            fillColor: '#F4A460',
                            color: '#FF6347',
                            weight: 3,
                            opacity: 1,
                            fillOpacity: 0.8
                        }
                    ).addTo(state.map).bindPopup('Your Location');

                    geolocationBtn.disabled = false;
                    geolocationBtn.textContent = '📍 Use My Location';
                    console.log('Location:', latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to access your location. Please check permissions.');
                    geolocationBtn.disabled = false;
                    geolocationBtn.textContent = '📍 Use My Location';
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });
}

// ===============================
// Weather Management (NEA API)
// ===============================
async function loadWeather() {
    try {
        weatherLoader.style.display = 'block';
        weatherError.style.display = 'none';
        weatherContainer.innerHTML = '';

        // Fetch 4-day forecast from NEA API
        const response = await fetch(CONFIG.neaWeatherApi);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        state.weather = data;

        // Process and render weather data
        renderWeather(data);
        weatherLoader.style.display = 'none';

        console.log('✅ Weather data loaded successfully');
        window.announceToScreenReader?.('Weather forecast loaded');
    } catch (error) {
        console.error('Weather loading error:', error);
        weatherLoader.style.display = 'none';
        weatherError.style.display = 'block';
        window.announceToScreenReader?.('Weather data failed to load');
    }
}

function renderWeather(data) {
    if (!data.items || data.items.length === 0) {
        weatherContainer.innerHTML = '<p>No weather data available</p>';
        return;
    }

    // Get the first forecast item which contains 4-day forecast
    const forecasts = data.items[0].forecast;
    
    // Group forecasts by day and get conditions
    const groupedByDay = {};
    
    forecasts.forEach(forecast => {
        const date = forecast.date;
        
        if (!groupedByDay[date]) {
            groupedByDay[date] = {
                date: date,
                forecasts: [],
                conditions: new Set(),
                rainProb: 0,
            };
        }
        
        groupedByDay[date].forecasts.push(forecast);
        groupedByDay[date].conditions.add(forecast.forecast);
        groupedByDay[date].rainProb = Math.max(groupedByDay[date].rainProb, forecast.relative_humidity);
    });

    // Get only first 4 days
    const days = Object.keys(groupedByDay).slice(0, 4);
    
    weatherContainer.innerHTML = days.map((dateKey, index) => {
        const dayData = groupedByDay[dateKey];
        const date = new Date(dateKey);
        const dayName = date.toLocaleDateString('en-SG', { weekday: 'short' });
        const formattedDate = date.toLocaleDateString('en-SG', { day: 'numeric', month: 'short' });
        
        // Get primary weather condition
        const conditions = Array.from(dayData.conditions);
        const primaryCondition = conditions[0] || 'Clear';
        const weatherIcon = getWeatherIcon(primaryCondition);
        
        // Calculate average humidity as proxy for rain probability
        const rainProbability = dayData.rainProb;
        
        return `
            <div class="weather-card" role="article" tabindex="0">
                <div class="weather-date">${formattedDate}</div>
                <div class="weather-day">${dayName}</div>
                <div class="weather-icon">${weatherIcon}</div>
                <div class="weather-condition">${primaryCondition}</div>
                <div class="weather-details">
                    <p style="margin: 0.5rem 0;">💧 Humidity: ${rainProbability}%</p>
                    <p style="margin: 0.5rem 0;">${conditions.length > 1 ? '⚠️ Mixed conditions' : '✓ Consistent weather'}</p>
                </div>
            </div>
        `;
    }).join('');

    // Add keyboard support
    document.querySelectorAll('.weather-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function getWeatherIcon(condition) {
    const condition_lower = condition.toLowerCase();
    
    if (condition_lower.includes('rain') || condition_lower.includes('thunderstorm')) {
        return '🌧️';
    } else if (condition_lower.includes('cloud')) {
        return '☁️';
    } else if (condition_lower.includes('clear') || condition_lower.includes('sunny')) {
        return '☀️';
    } else if (condition_lower.includes('wind')) {
        return '💨';
    } else if (condition_lower.includes('mist') || condition_lower.includes('fog')) {
        return '🌫️';
    } else {
        return '🌤️';
    }
}

// ===============================
// Events Management
// ===============================
function loadEvents() {
    state.events = [
        {
            id: 1,
            name: 'East Coast Cleanup Drive',
            date: '2025-12-15',
            time: '09:00 AM',
            location: 'East Coast Park',
            volunteers: 12,
            description: 'Join us for a morning beach cleanup session!'
        },
        {
            id: 2,
            name: 'Sentosa Island Eco-Action',
            date: '2025-12-22',
            time: '02:00 PM',
            location: 'Sentosa Beach',
            volunteers: 8,
            description: 'Afternoon beach cleanup and restoration effort.'
        },
        {
            id: 3,
            name: 'Changi Beach Squad Up',
            date: '2025-12-29',
            time: '08:00 AM',
            location: 'Changi Beach',
            volunteers: 15,
            description: 'Early morning cleanup before year-end celebration!'
        },
    ];

    renderEvents();
}

function renderEvents() {
    if (!eventsContainer) return;

    eventsContainer.innerHTML = state.events.map(event => `
        <div class="event-card" role="article" tabindex="0">
            <div class="event-date" aria-label="Event date">
                ${new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                })}
            </div>
            <div class="event-content">
                <h3>${event.name}</h3>
                <div class="event-location">
                    📍 ${event.location}
                </div>
                <p><strong>Time:</strong> ${event.time}</p>
                <p>${event.description}</p>
                <p style="margin-top: 1rem; font-weight: 600;">
                    👥 ${event.volunteers} volunteers registered
                </p>
                <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
                    Join Event
                </button>
            </div>
        </div>
    `).join('');

    // Add keyboard support for event cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.querySelector('.btn')?.click();
            }
        });
    });
}

// ===============================
// Crew Management
// ===============================
function loadCrew() {
    state.crew = [
        { id: 1, name: 'Alex', role: 'Leader', emoji: '👨‍💼' },
        { id: 2, name: 'Jordan', role: 'Co-Lead', emoji: '👩‍💼' },
        { id: 3, name: 'Sam', role: 'Member', emoji: '👨‍🎓' },
        { id: 4, name: 'Casey', role: 'Member', emoji: '👩‍🎓' },
        { id: 5, name: 'Morgan', role: 'Member', emoji: '🧑‍🤝‍🧑' },
    ];

    renderCrew();
}

function renderCrew() {
    if (!crewList) return;

    crewList.innerHTML = state.crew.map(member => `
        <div class="crew-member" role="listitem">
            <div class="crew-avatar">${member.emoji}</div>
            <div class="crew-name">${member.name}</div>
            <div class="crew-role">${member.role}</div>
        </div>
    `).join('');
}

// ===============================
// Button Event Listeners
// ===============================
function initButtons() {
    getStartedBtn?.addEventListener('click', () => {
        document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    exploreBtn?.addEventListener('click', () => {
        document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('invite-crew-btn')?.addEventListener('click', () => {
        alert('Invite feature coming soon! Share your crew code: SQUAD2025');
    });
}

// ===============================
// Location Search
// ===============================
function initLocationSearch() {
    locationSearch?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = locationSearch.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Integration with geocoding API can be added here
                alert(`Searching for beaches near: ${searchTerm}`);
                locationSearch.value = '';
            }
        }
    });
}

// ===============================
// Performance Optimization
// ===============================
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
}

// ===============================
// Analytics Tracking
// ===============================
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics integration
    console.log('Event tracked:', eventName, eventData);
}

// ===============================
// Accessibility Enhancements
// ===============================
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#map';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page updates to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.textContent = message;
        announcement.style.cssText = 'position: absolute; left: -10000px;';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    window.announceToScreenReader = announceToScreenReader;
}

// ===============================
// Initialization
// ===============================
function init() {
    console.log('🌊 ShoreSquad initializing...');

    // Initialize all features
    initNavigation();
    initAccessibility();
    initMap();
    initGeolocation();
    initButtons();
    initLocationSearch();
    lazyLoadImages();

    // Load data
    loadWeather();
    loadEvents();
    loadCrew();

    console.log('✅ ShoreSquad ready!');
    window.announceToScreenReader?.('ShoreSquad application loaded successfully');
}

// ===============================
// DOM Ready
// ===============================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state, CONFIG };
}