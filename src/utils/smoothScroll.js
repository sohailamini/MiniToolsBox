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

  // Otherwise scroll to the specific section
  smoothScrollTo(targetId, offset);
};
