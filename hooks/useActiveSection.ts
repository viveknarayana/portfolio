import { useState, useEffect, useRef } from 'react';

const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Store all intersecting sections
    const visibleSections = new Set<string>();
    
    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;
      
      // Check if we're near the bottom of the page
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const isNearBottom = currentScrollY + windowHeight >= documentHeight - 100; // 100px tolerance
      
      // If we have visible sections, determine which one to make active based on scroll direction
      if (visibleSections.size > 0) {
        // Convert to array to access by index
        const sections = Array.from(visibleSections);
        
        // If we're near the bottom, prioritize the last section (contact)
        if (isNearBottom && sectionIds.includes('contact')) {
          setActiveSection('contact');
          return;
        }
        
        // When scrolling up, prefer the section that appears earlier in the sectionIds array
        // When scrolling down, prefer the section that appears later
        const sectionToActivate = isScrollingDown 
          ? sections.reduce((latest, current) => 
              sectionIds.indexOf(current) > sectionIds.indexOf(latest) ? current : latest
            )
          : sections.reduce((earliest, current) => 
              sectionIds.indexOf(current) < sectionIds.indexOf(earliest) ? current : earliest
            );
        
        setActiveSection(sectionToActivate);
      }
    };

    // Create the intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          
          if (entry.isIntersecting) {
            visibleSections.add(id);
            console.log(`Section ${id} is now visible`);
          } else {
            visibleSections.delete(id);
            console.log(`Section ${id} is no longer visible`);
          }
          
          // After updating visible sections, determine which one should be active
          handleScroll();
        });
      },
      { 
        threshold: 0.1, // Lower threshold to catch smaller sections
        rootMargin: "-10px 0px -50px 0px" 
      }
    );

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Observe each section
    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
        console.log(`Now observing section: ${sectionId}`);
      } else {
        console.warn(`Section with ID "${sectionId}" not found in the DOM`);
      }
    });

    // Initial call to set active section
    handleScroll();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;