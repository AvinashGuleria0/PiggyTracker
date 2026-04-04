/**
 * Chart color palettes for light and dark themes
 */
export const CHART_COLORS = {
  light: ['#8B5CF6', '#F472B6', '#6366F1', '#06B6D4', '#10B981', '#F97316', '#EC4899'] as const,
  dark: ['#A78BFA', '#F472B6', '#818CF8', '#22D3EE', '#34D399', '#FB923C', '#F472B6'] as const,
} as const;

/**
 * Get chart colors based on theme
 * Usage: getChartColors('dark') → [...dark colors]
 */
export function getChartColors(theme: 'light' | 'dark') {
  return CHART_COLORS[theme];
}

/**
 * Transaction type colors for badges
 */
export const TRANSACTION_TYPE_COLORS = {
  income: {
    light: { bg: '#86EFAC', text: 'black' },
    dark: { bg: '#065F46', text: '#D1FAE5' },
  },
  expense: {
    light: { bg: '#FCA5A5', text: 'black' },
    dark: { bg: '#7F1D1D', text: '#FEE2E2' },
  },
} as const;

/**
 * Category badge colors
 */
export const CATEGORY_BADGE_COLORS = {
  light: { bg: '#E9D5FF', text: '#5B21B6' },
  dark: { bg: '#6B21A8', text: '#F3E8FF' },
} as const;
