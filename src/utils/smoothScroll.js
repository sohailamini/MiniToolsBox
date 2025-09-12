// Smooth scroll utility function
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Scroll to top function
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Handle navigation with smooth scroll
export const handleSmoothNavigation = (e, targetId, offset = 80) => {
  e.preventDefault();

  // If targetId is 'top' or empty, scroll to top
  if (!targetId || targetId === "top") {
    scrollToTop();
    return;
  }

  // Check if we're on the home page
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === "/";

  if (isHomePage) {
    // If on home page, scroll to the specific section
    smoothScrollTo(targetId, offset);
  } else {
    // If on other pages, navigate to home page first, then scroll to section
    if (targetId === "hero") {
      // Navigate to home page
      window.location.href = "/";
    } else {
      // Navigate to home page with hash for specific section
      window.location.href = `/#${targetId}`;
    }
  }
};

// Handle category navigation with smooth scroll
export const handleCategoryNavigation = (e, categoryName) => {
  e.preventDefault();

  // Check if we're on the home page
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === "/";

  if (isHomePage) {
    // If on home page, scroll to tools section
    smoothScrollTo("tools", 80);

    // Update URL hash with category
    window.history.pushState(
      null,
      null,
      `#tools&category=${encodeURIComponent(categoryName)}`
    );

    // After scrolling, highlight the specific category
    setTimeout(() => {
      highlightCategory(categoryName);
    }, 1000);
  } else {
    // If on other pages, navigate to home page with hash
    window.location.href = `/#tools&category=${encodeURIComponent(
      categoryName
    )}`;
  }
};

// Highlight specific category in tools section
export const highlightCategory = (categoryName) => {
  // Find the category section and add a highlight effect
  const categoryElement = document.querySelector(
    `[data-category="${categoryName}"]`
  );
  if (categoryElement) {
    categoryElement.scrollIntoView({ behavior: "smooth", block: "center" });

    // Add highlight effect
    categoryElement.classList.add("highlight-category");
    setTimeout(() => {
      categoryElement.classList.remove("highlight-category");
    }, 3000);
  }
};

// Handle navigation to home page with smooth scroll
export const navigateToHome = (e) => {
  e.preventDefault();
  const currentPath = window.location.pathname;

  if (currentPath === "/") {
    // If already on home page, scroll to top
    scrollToTop();
  } else {
    // Navigate to home page
    window.location.href = "/";
  }
};

// Handle tool navigation with smooth scroll
export const handleToolNavigation = (e, toolId) => {
  e.preventDefault();

  // Check if we're on the home page
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === "/";

  if (isHomePage) {
    // If on home page, scroll to tools section first, then navigate to tool
    smoothScrollTo("tools", 80);

    // After scrolling, navigate to the tool page
    setTimeout(() => {
      window.location.href = `/tool/${toolId}`;
    }, 800);
  } else {
    // If on other pages, navigate directly to tool page
    window.location.href = `/tool/${toolId}`;
  }
};

// Handle hash navigation on page load
export const handleHashNavigation = () => {
  const hash = window.location.hash;
  if (hash) {
    const elementId = hash.substring(1);
    setTimeout(() => {
      smoothScrollTo(elementId, 80);
    }, 100);
  }
};
