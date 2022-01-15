module.exports = {
    mode: 'jit',
    purge: ['./src/pages/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            btnPink: '"#fc0a7e"',
            colors: {
                'text-normal': 'var(--text-normal)',
                primary: '#18dcff',
                '-background-primary': 'var(--background-primary)',
                '-background-secondary': 'var(--background-secondary)',
                '-background-secondary-alt': 'var(--background-secondary-alt)',
                '-background-tertiary': 'var(--background-tertiary)',
                '-channeltextarea-background': 'var(--channeltextarea-background)',
                '-background-floating': 'var(--background-floating)',
                '-scrollbar-auto-thumb': 'var(--scrollbar-auto-thumb)',
                '-scrollbar-auto-track': 'var(--scrollbar-auto-track)',
                '-background-modifier-accent': 'var(--background-modifier-accent)',
                '-background-message-hover': 'var(--background-message-hover)',
                '-text-input-bg': 'var(--text-input-bg)',
                '-text-input-border': 'var(--text-input-border)',
                '-text-input-border-hover': 'var(--text-input-border-hover)',
                '-text-input-border-disabled': 'var(--text-input-border-disabled)',
                '-text-input-prefix': 'var(--text-input-prefix)',
                '-primary': 'var(--primary)',
                '-header-primary': 'var(--header-primary)',
                '-header-secondary': 'var(--header-secondary)',
                '-text-normal': 'var(--text-normal)',
                '-text-muted': 'var(--text-muted)'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
