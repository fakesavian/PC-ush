/**
 * Cypress Mobile QA Test Configurations
 * Comprehensive test suite for mobile responsiveness and navigation flows
 */

import {
  DEVICE_BREAKPOINTS,
  NAVIGATION_TEST_PATHS,
} from "@/polymet/data/mobile-utils";

// Viewport configurations for different devices
export const CYPRESS_VIEWPORTS = {
  iphone_se: {
    width: DEVICE_BREAKPOINTS.IPHONE_SE,
    height: 640,
    deviceScaleFactor: 2,
  },
  iphone_12_mini: {
    width: DEVICE_BREAKPOINTS.IPHONE_12_MINI,
    height: 844,
    deviceScaleFactor: 3,
  },
  pixel_5: {
    width: DEVICE_BREAKPOINTS.PIXEL_5,
    height: 851,
    deviceScaleFactor: 2.625,
  },
  galaxy_s22: {
    width: DEVICE_BREAKPOINTS.GALAXY_S22,
    height: 915,
    deviceScaleFactor: 3,
  },
} as const;

// Test scenarios for mobile QA
export const MOBILE_TEST_SCENARIOS = {
  // Layout and Overflow Tests
  LAYOUT_TESTS: [
    {
      name: "No horizontal overflow",
      test: () => {
        cy.get("body").should("not.have.css", "overflow-x", "scroll");
        cy.window().then((win) => {
          expect(win.document.body.scrollWidth).to.be.lte(win.innerWidth);
        });
      },
    },
    {
      name: "Safe area padding applied",
      test: () => {
        cy.get('[class*="pb-safe"]').should("exist");
        cy.get('[class*="pb-safe"]').should("have.css", "padding-bottom");
      },
    },
    {
      name: "Grid responsive behavior",
      test: () => {
        // Test badge grid responsiveness
        cy.get('[data-testid="badge-grid-container"]').should("exist");
        cy.get('[data-testid="badge-grid-container"]').should(
          "have.class",
          "grid"
        );
      },
    },
  ],

  // Touch Target Tests
  TOUCH_TARGET_TESTS: [
    {
      name: "All buttons meet 44px minimum",
      test: () => {
        cy.get("button").each(($button) => {
          cy.wrap($button).then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.height).to.be.at.least(44);
            expect(rect.width).to.be.at.least(44);
          });
        });
      },
    },
    {
      name: "Interactive elements have adequate spacing",
      test: () => {
        cy.get("button").should("not.overlap");
        cy.get("a").should("not.overlap");
      },
    },
  ],

  // Navigation Flow Tests
  NAVIGATION_TESTS: [
    {
      name: "Dashboard to Badges navigation",
      test: () => {
        cy.visit("/progress-dashboard");
        cy.get('[data-testid="progress-dashboard-page"]').should("be.visible");

        // Navigate to badges (assuming there's a badges link)
        cy.get('a[href="/badges"]').click();
        cy.url().should("include", "/badges");
        cy.get('[data-testid="badges-page"]').should("be.visible");
      },
    },
    {
      name: "Badges to Reflection Archive navigation",
      test: () => {
        cy.visit("/badges");
        cy.get('[data-testid="badges-page"]').should("be.visible");

        // Click on a badge that should link to reflection archive
        cy.get('[data-testid^="badge-card-"]').first().click();

        // This might open a modal or navigate - adjust based on actual behavior
        cy.get('a[href="/reflection-archive"]').click();
        cy.url().should("include", "/reflection-archive");
        cy.get('[data-testid="reflection-archive-page"]').should("be.visible");
      },
    },
    {
      name: "Back button functionality",
      test: () => {
        cy.visit("/reflection-archive");
        cy.get('[data-testid="reflection-archive-page"]').should("be.visible");

        // Test back button
        cy.get('a[href="/progress-dashboard"]').click();
        cy.url().should("include", "/progress-dashboard");
      },
    },
  ],

  // Performance Tests
  PERFORMANCE_TESTS: [
    {
      name: "Page load time under 3 seconds",
      test: () => {
        const startTime = Date.now();
        cy.visit("/badges");
        cy.get('[data-testid="badges-page"]')
          .should("be.visible")
          .then(() => {
            const loadTime = Date.now() - startTime;
            expect(loadTime).to.be.lessThan(3000);
          });
      },
    },
    {
      name: "Smooth scrolling performance",
      test: () => {
        cy.visit("/reflection-archive");
        cy.get('[data-testid="reflection-archive-page"]').should("be.visible");

        // Test scroll performance
        cy.scrollTo("bottom", { duration: 1000 });
        cy.scrollTo("top", { duration: 1000 });
      },
    },
  ],
} as const;

// Cypress command extensions for mobile testing
export const CYPRESS_MOBILE_COMMANDS = `
// Custom commands for mobile testing
Cypress.Commands.add('setMobileViewport', (device) => {
  const viewport = ${JSON.stringify(CYPRESS_VIEWPORTS)};
  const config = viewport[device];
  if (config) {
    cy.viewport(config.width, config.height);
  }
});

Cypress.Commands.add('checkTouchTargets', () => {
  cy.get('button, a, [role="button"]').each(($el) => {
    cy.wrap($el).then(($element) => {
      const rect = $element[0].getBoundingClientRect();
      expect(rect.height, 'Touch target height').to.be.at.least(44);
      expect(rect.width, 'Touch target width').to.be.at.least(44);
    });
  });
});

Cypress.Commands.add('checkNoOverflow', () => {
  cy.window().then((win) => {
    const body = win.document.body;
    expect(body.scrollWidth, 'No horizontal overflow').to.be.lte(win.innerWidth);
  });
});

Cypress.Commands.add('checkSafeAreas', () => {
  cy.get('[class*="pb-safe"], [class*="pt-safe"], [class*="pl-safe"], [class*="pr-safe"]')
    .should('exist')
    .and('be.visible');
});

// Dark mode testing
Cypress.Commands.add('toggleDarkMode', () => {
  cy.window().then((win) => {
    win.document.documentElement.classList.toggle('dark');
  });
});
`;

// Complete test suite generator
export const generateMobileTestSuite = (pageName: string, route: string) => `
describe('${pageName} - Mobile QA Tests', () => {
  const devices = Object.keys(${JSON.stringify(CYPRESS_VIEWPORTS)});
  
  devices.forEach((device) => {
    describe(\`\${device} viewport\`, () => {
      beforeEach(() => {
        cy.setMobileViewport(device);
        cy.visit('${route}');
      });

      it('should load without horizontal overflow', () => {
        cy.checkNoOverflow();
      });

      it('should have compliant touch targets', () => {
        cy.checkTouchTargets();
      });

      it('should respect safe areas', () => {
        cy.checkSafeAreas();
      });

      it('should be accessible in dark mode', () => {
        cy.toggleDarkMode();
        cy.get('[data-testid="${pageName.toLowerCase()}-page"]').should('be.visible');
        cy.checkTouchTargets();
      });

      it('should handle orientation changes', () => {
        cy.viewport(844, 390); // Landscape
        cy.get('[data-testid="${pageName.toLowerCase()}-page"]').should('be.visible');
        cy.checkNoOverflow();
      });
    });
  });

  describe('Navigation Flow', () => {
    it('should complete full navigation flow', () => {
      cy.setMobileViewport('iphone_se');
      
      // Start from dashboard
      cy.visit('/progress-dashboard');
      cy.get('[data-testid="progress-dashboard-page"]').should('be.visible');
      
      // Navigate to badges
      cy.get('a[href="/badges"]').click();
      cy.get('[data-testid="badges-page"]').should('be.visible');
      
      // Navigate to reflection archive
      cy.get('a[href="/reflection-archive"]').click();
      cy.get('[data-testid="reflection-archive-page"]').should('be.visible');
      
      // Navigate back
      cy.get('a[href="/progress-dashboard"]').click();
      cy.get('[data-testid="progress-dashboard-page"]').should('be.visible');
    });
  });
});
`;

// Screenshot comparison configuration
export const SCREENSHOT_CONFIG = {
  DEVICES: Object.keys(CYPRESS_VIEWPORTS),
  PAGES: [
    { name: "badges", route: "/badges" },
    { name: "reflection-archive", route: "/reflection-archive" },
    { name: "progress-dashboard", route: "/progress-dashboard" },
  ],

  OPTIONS: {
    threshold: 0.1,
    thresholdType: "percent",
    capture: "fullPage",
  },
} as const;

// Performance monitoring configuration
export const PERFORMANCE_CONFIG = {
  METRICS: [
    "first-contentful-paint",
    "largest-contentful-paint",
    "cumulative-layout-shift",
    "first-input-delay",
  ],

  THRESHOLDS: {
    "first-contentful-paint": 2000,
    "largest-contentful-paint": 3000,
    "cumulative-layout-shift": 0.1,
    "first-input-delay": 100,
  },
} as const;

export default {
  CYPRESS_VIEWPORTS,
  MOBILE_TEST_SCENARIOS,
  CYPRESS_MOBILE_COMMANDS,
  generateMobileTestSuite,
  SCREENSHOT_CONFIG,
  PERFORMANCE_CONFIG,
};
