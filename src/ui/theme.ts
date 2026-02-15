export const theme = {
  colors: {
    primary: '#7C3AED',
    primaryDark: '#6D28D9',
    secondary: '#A78BFA',
    
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    background: '#F3F4F6',
    surface: '#FFFFFF',
    
    text: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '800' as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
    },
    h3: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
    },
  },
};
