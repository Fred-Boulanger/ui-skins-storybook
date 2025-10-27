/**
 * Main entry point for ui-skins-storybook integration
 * This file provides the necessary exports for Storybook configuration
 */

import { generateThemes, generateThemesConfig } from './dataThemesGenerator.js'
import vitePluginThemeGenerator from './vite-plugin-theme-generator.js'

// Export the plugin for use in Storybook configuration
export { vitePluginThemeGenerator }

// Export utility functions
export { generateThemes, generateThemesConfig }
