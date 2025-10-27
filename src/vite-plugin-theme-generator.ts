import type { Plugin } from 'vite'
import { generateThemes, ThemeGeneratorOptions } from './dataThemesGenerator.js'
import { logger } from './logger.js'

export interface ViteThemeGeneratorOptions {
  /**
   * Whether to generate themes on build start
   * @default true
   */
  generateOnStart?: boolean
  
  /**
   * Whether to watch theme files for changes
   * @default true
   */
  watch?: boolean
  
  /**
   * Namespaces to search for theme files
   */
  namespaces?: Record<string, string>
}

/**
 * Vite plugin for automatic theme generation from *.ui_skins.themes.yml files
 */
export default function vitePluginThemeGenerator(options: ViteThemeGeneratorOptions = {}): Plugin {
  const {
    generateOnStart = true,
    watch = true,
    namespaces
  } = options

  let hasGenerated = false

  return {
    name: 'vite-plugin-theme-generator',
    
    async buildStart() {
      if (generateOnStart && !hasGenerated) {
        try {
          await generateThemes({ namespaces })
          hasGenerated = true
        } catch (error) {
          logger.warn('Failed to generate themes on build start:', error)
        }
      }
    },

    async load(id: string) {
      // Generate themes when loading any component.yml file
      if (id.endsWith('component.yml') && !hasGenerated) {
        try {
          await generateThemes({ namespaces })
          hasGenerated = true
        } catch (error) {
          logger.warn('Failed to generate themes:', error)
        }
      }
    },

    async handleHotUpdate({ file }) {
      // Regenerate themes when theme files change
      if (watch && file.endsWith('.ui_skins.themes.yml')) {
        try {
          await generateThemes({ namespaces })
          logger.info('🎨 Themes regenerated due to file change:', file)
        } catch (error) {
          logger.warn('Failed to regenerate themes:', error)
        }
      }
    }
  }
}
