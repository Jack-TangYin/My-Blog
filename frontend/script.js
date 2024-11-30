// Blog Data
const blogs = [
    {
      id: 1,
      title: "Welcome to My Blog",
      excerpt: "This is the first post on my blog. Learn about my journey...",
      content: "Welcome to my blog! This is where I'll share my thoughts, stories, and experiences with the world.",
      category: "Personal",
    },
    {
      id: 2,
      title: "A Day in the Life",
      excerpt: "Ever wondered what a day in my life looks like? Here's a glimpse...",
      content: "From waking up early to working on exciting projects, a day in my life is never dull.",
      category: "Lifestyle",
    },
    {
      id: 3,
      title: "Tips for Staying Productive",
      excerpt: "Struggling with productivity? Here are my top tips...",
      content: "Productivity is all about focus and discipline. In this post, I'll share some techniques to stay on track.",
      category: "Productivity",
    },
  ];
  
  const comments = {}; // Store comments by blog ID
  
  // Load Blog Posts on Homepage
  function loadBlogPosts() {
    const blogList = document.getElementById("blog-list");
    if (!blogList) return;
  
    blogList.innerHTML = ""; // Clear existing posts
  
    blogs.forEach(blog => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("col-md-4");
  
      blogCard.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title fw-bold">${blog.title}</h5>
            <p class="card-text">${blog.excerpt}</p>
            <a href="blog.html?id=${blog.id}" class="btn btn-primary btn-sm rounded-pill">Read More</a>
          </div>
        </div>
      `;
      blogList.appendChild(blogCard);
    });
  }
  
  // Load Blog Details
  function loadBlogDetails() {
    const params = new URLSearchParams(window.location.search);
    const blogId = parseInt(params.get("id"), 10);
  
    const blog = blogs.find(b => b.id === blogId);
  
    if (blog) {
      const blogDetails = document.getElementById("blog-details");
      blogDetails.innerHTML = `
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
      `;
      displayComments(blogId);
    } else {
      document.body.innerHTML = `
        <h1 class="text-center text-danger">Blog Not Found</h1>
        <div class="text-center mt-4">
          <a href="index.html" class="btn btn-primary">Back to Homepage</a>
        </div>
      `;
    }
  }
  
  // Display Comments
  function displayComments(blogId) {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";
  
    const blogComments = comments[blogId] || [];
    if (blogComments.length === 0) {
      commentsList.innerHTML = `<li class="list-group-item text-muted">No comments yet. Be the first to comment!</li>`;
      return;
    }
  
    blogComments.forEach(comment => {
      const commentItem = document.createElement("li");
      commentItem.classList.add("list-group-item");
      commentItem.textContent = comment;
      commentsList.appendChild(commentItem);
    });
  }
  
  // Add Comment
  function addComment() {
    const params = new URLSearchParams(window.location.search);
    const blogId = parseInt(params.get("id"), 10);
  
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();
  
    if (!commentText) {
      alert("Please enter a comment!");
      return;
    }
  
    if (!comments[blogId]) comments[blogId] = [];
    comments[blogId].push(commentText);
  
    commentInput.value = ""; // Clear input
    displayComments(blogId);
  }
  
  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("blog-list")) loadBlogPosts();
    if (document.getElementById("blog-details")) loadBlogDetails();
  });
  

  // Dark Mode Toggle with Icon
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById("dark-mode-icon");
  
    // Toggle the dark-mode class
    body.classList.toggle("dark-mode");
  
    // Update the icon based on the mode
    if (body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("dark-mode", "enabled"); // Save preference
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("dark-mode", "disabled"); // Save preference
    }
  }
  
  // Apply Dark Mode Preference
  function applyDarkModePreference() {
    const body = document.body;
    const icon = document.getElementById("dark-mode-icon");
  
    const isDarkMode = localStorage.getItem("dark-mode") === "enabled";
    if (isDarkMode) {
      body.classList.add("dark-mode");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }
  
  // Initialize Dark Mode Toggle
  document.addEventListener("DOMContentLoaded", () => {
    applyDarkModePreference();
  
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", toggleDarkMode);
    }
  });