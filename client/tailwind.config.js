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
                'background-primary:': '#23272a',
                'background-secondary:': '#1a1e21',
                'background-secondary-alt:': '#15181b',
                'background-tertiary:': '#111416',
                'channeltextarea-background:': '#1a1e21',
                'background-floating:': '#111416',
                'scrollbar-auto-thumb:': '#0000004a',
                'scrollbar-auto-track:': '#00000036',
                'text-input-border-hover:': '#040405',
                'text-input-border-disabled:': '#202225',
                'text-input-prefix:': '#dcddde'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
