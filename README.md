# UI Skins Storybook

Generate Storybook ui-skins configuration from `*.ui_skins.themes.yml` files.

## Features

- Automatically generates Storybook theme configuration from YAML theme files
- Provides Vite plugin for seamless integration
- Supports theme targeting (html, body, or custom selectors)
- Hot reload support for theme file changes

## Installation

```bash
npm install @fredboulanger/ui-skins-storybook
```

## Usage

### Vite Plugin

Add the plugin to your Storybook configuration:

```typescript
// .storybook/main.ts
import { viteFinal } from '@storybook/html-vite'
import { vitePluginThemeGenerator } from '@fredboulanger/ui-skins-storybook/main'

export default {
  // ... other config
  viteFinal: async (config) => {
    return viteFinal(config, {
      plugins: [
        vitePluginThemeGenerator(),
        // ... other plugins
      ]
    })
  }
}
```

Or for JavaScript configuration:

```javascript
// .storybook/main.js
import { viteFinal } from '@storybook/html-vite'
import { vitePluginThemeGenerator } from '@fredboulanger/ui-skins-storybook/main'

export default {
  // ... other config
  viteFinal: async (config) => {
    return viteFinal(config, {
      plugins: [
        vitePluginThemeGenerator(),
        // ... other plugins
      ]
    })
  }
}
```

## Theme File Format

Create `*.ui_skins.themes.yml` files in your project:

```yaml
# Example: themes.ui_skins.themes.yml
cyberpunk:
  label: "Cyberpunk"
  label_context: "color"
  key: "data-theme"
  target: body

forest:
  label: "Forest"
  label_context: "color"
  key: "data-theme"
  target: html

garden:
  label: "Garden"
  label_context: "color"
  key: "data-theme"
  target: html
```

## Generated Output

The plugin generates a `.storybook/data-themes.ts` file with:

- Theme decorators for applying data-theme attributes
- Global types for Storybook toolbar
- Theme target mapping

## Integration with Storybook Preview

To use the generated themes in your Storybook, you need to integrate the `data-themes.ts` file into your `.storybook/preview.ts` configuration:

### 1. Import the Generated Theme Configuration

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/html'
import { themeDecorators, themeGlobalTypes } from './data-themes'

export const decorators = [
  ...themeDecorators, // Theme decorators
  // Your other decorators
]

export const globalTypes = {
  ...themeGlobalTypes, // Theme global types
  // Your other global types
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
```

### 2. What the Integration Provides

- **Theme Toolbar**: A paintbrush icon in the Storybook toolbar to switch between themes
- **Automatic Theme Application**: Themes are automatically applied to the correct target element (html, body, or custom selector)
- **Theme Cleanup**: Previous themes are properly removed before applying new ones
- **Global Theme State**: Theme selection persists across story navigation

### 3. Generated File Structure

The `data-themes.ts` file exports:

- `themeDecorators`: Array of decorators that apply theme attributes
- `themeGlobalTypes`: Global types configuration for the Storybook toolbar

### 4. Target Elements

Themes can be applied to different target elements:

- `body`: Applied to the `<body>` element
- `html`: Applied to the `<html>` element  
- Custom selector: Any valid CSS selector (e.g., `.theme-container`, `#app`)

### 5. Complete Example

Here's a complete example of a `.storybook/preview.ts` file:

```typescript
import type { Preview } from '@storybook/html'
import { themeDecorators, themeGlobalTypes } from './data-themes'

export const decorators = [
  ...themeDecorators,
  // Add other decorators as needed
]

export const globalTypes = {
  ...themeGlobalTypes,
  // Add other global types as needed
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Add other parameters as needed
  },
}

export default preview
```

## License

MIT
