/**
 * Mobile-specific utilities and constants for the Polymet app
 * Includes device breakpoints, safe area utilities, and mobile optimization helpers
 */

// Device breakpoints for testing
export const DEVICE_BREAKPOINTS = {
  IPHONE_SE: 360,
  IPHONE_12_MINI: 390,
  PIXEL_5: 414,
  GALAXY_S22: 414,
} as const;

// Touch target minimum sizes (iOS HIG & Material Design)
export const TOUCH_TARGETS = {
  MIN_HEIGHT: 44,
  MIN_WIDTH: 44,
  RECOMMENDED_HEIGHT: 48,
  RECOMMENDED_WIDTH: 48,
} as const;

// Safe area inset CSS custom properties
export const SAFE_AREA_CSS = `
  /* Safe Area Insets */
  .pb-safe {
    padding-bottom: max(env(safe-area-inset-bottom), 1.25rem);
  }

  .pt-safe {
    padding-top: env(safe-area-inset-top, 0);
  }

  .pl-safe {
    padding-left: env(safe-area-inset-left, 0);
  }

  .pr-safe {
    padding-right: env(safe-area-inset-right, 0);
  }

  /* Mobile Grid Patterns */
  .mobile-grid-responsive {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .mobile-grid-responsive {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .mobile-grid-responsive {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .mobile-grid-responsive {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  /* Card Constraints */
  .mobile-card-constraint {
    aspect-ratio: 4/5;
    min-height: 128px;
    max-height: 160px;
    overflow: hidden;
  }

  /* Touch Target Compliance */
  .touch-compliant {
    min-height: 44px;
    min-width: 44px;
  }
`;

// Mobile optimization utilities
export const MobileUtils = {
  // Check if device is mobile based on screen width
  isMobileWidth: (width: number): boolean => {
    return width <= DEVICE_BREAKPOINTS.GALAXY_S22;
  },

  // Get responsive grid classes based on content type
  getResponsiveGridClasses: (
    contentType: "badges" | "cards" | "list"
  ): string => {
    switch (contentType) {
      case "badges":
        return "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";
      case "cards":
        return "grid grid-cols-1 sm:grid-cols-2 gap-4";
      case "list":
        return "space-y-3";
      default:
        return "grid grid-cols-1 gap-4";
    }
  },

  // Get safe area padding classes
  getSafeAreaClasses: (
    position: "top" | "bottom" | "all" = "bottom"
  ): string => {
    switch (position) {
      case "top":
        return "pt-safe";
      case "bottom":
        return "pb-safe";
      case "all":
        return "pt-safe pb-safe pl-safe pr-safe";
      default:
        return "pb-safe";
    }
  },

  // Generate test IDs for QA
  generateTestId: (component: string, id?: string): string => {
    return id ? `${component}-${id}` : component;
  },

  // Check touch target compliance
  isTouchCompliant: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.height >= TOUCH_TARGETS.MIN_HEIGHT &&
      rect.width >= TOUCH_TARGETS.MIN_WIDTH
    );
  },
};

// Device-specific test configurations
export const DEVICE_TEST_CONFIG = {
  [DEVICE_BREAKPOINTS.IPHONE_SE]: {
    name: "iPhone SE",
    width: 360,
    height: 640,
    pixelRatio: 2,
    userAgent: "iPhone SE",
  },
  [DEVICE_BREAKPOINTS.IPHONE_12_MINI]: {
    name: "iPhone 12 Mini",
    width: 390,
    height: 844,
    pixelRatio: 3,
    userAgent: "iPhone 12 Mini",
  },
  [DEVICE_BREAKPOINTS.PIXEL_5]: {
    name: "Pixel 5",
    width: 414,
    height: 851,
    pixelRatio: 2.625,
    userAgent: "Pixel 5",
  },
  [DEVICE_BREAKPOINTS.GALAXY_S22]: {
    name: "Galaxy S22",
    width: 414,
    height: 915,
    pixelRatio: 3,
    userAgent: "Galaxy S22",
  },
} as const;

// Navigation flow test paths
export const NAVIGATION_TEST_PATHS = {
  DASHBOARD_TO_BADGES: ["/progress-dashboard", "/badges"],
  BADGES_TO_REFLECTION: ["/badges", "/reflection-archive"],
  FULL_FLOW: ["/progress-dashboard", "/badges", "/reflection-archive"],
} as const;

// QA checklist items
export const QA_CHECKLIST = {
  LAYOUT: [
    "No horizontal overflow on any screen width",
    "Safe area insets respected on all devices",
    "Grid layouts responsive across breakpoints",
    "Text scaling appropriate for screen size",
  ],

  TOUCH_TARGETS: [
    "All interactive elements ≥44px touch target",
    "Buttons have adequate spacing",
    "Touch targets don't overlap",
    "Focus states visible and accessible",
  ],

  NAVIGATION: [
    "Back buttons work correctly",
    "Deep links resolve properly",
    "Route transitions smooth",
    "No broken navigation paths",
  ],

  PERFORMANCE: [
    "Page load times <3s on 3G",
    "Smooth scrolling and animations",
    "No layout shifts during load",
    "Images optimized for mobile",
  ],
} as const;

export default MobileUtils;
