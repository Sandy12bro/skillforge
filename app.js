// ================= MESSAGE FUNCTION =================
function showMessage(text, color = "red") {
  const msg = document.getElementById("message");
  if (msg) {
    msg.style.color = color;
    msg.innerText = text;
  }
}

// ================= SIGNUP =================
async function signup() {
  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const goal = document.getElementById("goal").value;
  const phone = document.getElementById("phone").value;
  const weak_area = document.getElementById("weak_area").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Firebase Auth
    await auth.createUserWithEmailAndPassword(email, password);

    // Save in MongoDB via backend
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, year, goal, phone, weak_area, email
      })
    });

    showMessage("Signup Successful! Redirecting...", "green");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      showMessage("Email already registered.");
    } else if (err.code === "auth/invalid-email") {
      showMessage("Invalid email.");
    } else if (err.code === "auth/weak-password") {
      showMessage("Password must be at least 6 characters.");
    } else {
      showMessage("Signup failed.");
    }
  }
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);

    showMessage("Login Successful!", "green");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (err) {
    if (err.code === "auth/user-not-found") {
      showMessage("User not found.");
    } else if (err.code === "auth/wrong-password") {
      showMessage("Wrong password.");
    } else {
      showMessage("Login failed.");
    }
  }
}

// ================= GOOGLE LOGIN =================
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(() => {
      showMessage("Google Login Successful!", "green");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    })
    .catch(err => {
      showMessage("Google login failed.");
      console.error(err);
    });
}

// ================= FORGOT PASSWORD =================
function forgotPassword() {
  const email = document.getElementById("loginEmail").value;

  if (!email) {
    showMessage("Enter your email first.");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      showMessage("Password reset email sent!", "green");
    })
    .catch(err => {
      if (err.code === "auth/user-not-found") {
        showMessage("No user found.");
      } else {
        showMessage("Error sending email.");
      }
    });
}

// ================= LOGOUT =================
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// ================= PASSWORD TOGGLE =================
function togglePassword(id, icon) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// ================= TAB SWITCHING =================
function showTab(tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll('.tab, .horizontal-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  // Remove active class from all nav buttons
  const navButtons = document.querySelectorAll('.sidebar-nav button, .header-nav button');
  navButtons.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked button
  const activeButton = document.querySelector(`button[onclick="showTab('${tabName}')"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// ================= PROFILE UPDATE =================
async function updateProfile() {
  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const goal = document.getElementById("goal").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  try {
    // Update Firebase auth profile
    const user = auth.currentUser;
    if (user) {
      await user.updateProfile({
        displayName: name
      });
    }

    // Save additional data to backend
    await fetch("http://localhost:5000/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, year, goal, phone, email
      })
    });

    showMessage("Profile updated successfully!", "green");

  } catch (err) {
    showMessage("Failed to update profile.");
    console.error(err);
  }
}

// ================= IMAGE PREVIEW =================
function previewImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const profilePic = document.getElementById('profilePic');
    if (profilePic) {
      profilePic.src = e.target.result;
    }
  };
  
  if (file) {
    reader.readAsDataURL(file);
  }
}

// Initialize date field with current date
document.addEventListener('DOMContentLoaded', function() {
  const createdDateField = document.getElementById('created-at');
  if (createdDateField) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    createdDateField.value = formattedDate;
  }
});

// ================= DARK MODE =================
function toggleTheme() {
  const isCurrentlyDark = document.body.classList.contains("dark");
  
  // Toggle the dark class
  if (isCurrentlyDark) {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
  
  // Update theme icon
  const allThemeIcons = document.querySelectorAll(".universal-theme-toggle i, .theme-toggle i");
  const isNowDark = document.body.classList.contains("dark");
  
  allThemeIcons.forEach(icon => {
    if (isNowDark) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
  
  // Save theme preference
  localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
  
  // Force a repaint to ensure changes are visible
  document.body.style.display = 'none';
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = '';
  
  console.log('Theme toggled to:', isNowDark ? 'dark' : 'light');
}

// ... rest of the code remains the same ...
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("themeIcon");
  const allThemeIcons = document.querySelectorAll(".universal-theme-toggle i, .theme-toggle i");
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    allThemeIcons.forEach(icon => {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    });
  } else {
    document.body.classList.remove("dark");
    allThemeIcons.forEach(icon => {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    });
  }
}

// ================= UNIVERSAL THEME TOGGLE =================
function createUniversalThemeToggle() {
  // Check if theme toggle already exists
  if (document.querySelector('.universal-theme-toggle')) {
    return;
  }
  
  // Only create theme toggle on dashboard page, not on login/signup
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes('login.html') || currentPath.endsWith('/login');
  const isSignupPage = currentPath.includes('signup.html') || currentPath.endsWith('/signup');
  
  if (isLoginPage || isSignupPage) {
    return;
  }
  
  const themeToggle = document.createElement('div');
  themeToggle.className = 'universal-theme-toggle';
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
  themeToggle.setAttribute('type', 'button');
  
  // Add click event with proper prevention
  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  });
  
  document.body.appendChild(themeToggle);
}

// ================= INITIALIZATION =================
function initializeTheme() {
  // Create universal theme toggle if not exists
  createUniversalThemeToggle();
  
  // Load saved theme immediately
  loadSavedTheme();
  
  // Add event listeners to all theme toggles
  const allToggles = document.querySelectorAll('.theme-toggle, .universal-theme-toggle');
  allToggles.forEach(toggle => {
    if (!toggle.hasAttribute('data-initialized')) {
      toggle.setAttribute('data-initialized', 'true');
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    }
  });
  
  // Handle theme changes across pages
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      loadSavedTheme();
    }
  });
  
  // Apply theme to all elements
  applyThemeToAllElements();
}

// ================= APPLY THEME TO ALL ELEMENTS =================
function applyThemeToAllElements() {
  const isDark = document.body.classList.contains('dark');
  
  // Update all theme icons
  const allIcons = document.querySelectorAll('.universal-theme-toggle i, .theme-toggle i');
  allIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
  
  // Apply theme-specific styles
  if (isDark) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
}

// Load theme on page load
document.addEventListener("DOMContentLoaded", initializeTheme);

// Also initialize when DOM is ready (backup)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  // DOM already loaded
  initializeTheme();
}

// Handle page visibility changes
window.addEventListener('visibilitychange', () => {
  loadSavedTheme();
});

const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");

signUpBtn.addEventListener("click", () => {
  container.classList.add("active");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("active");
});