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
            btnPink: '#fc0a7e',
            colors: {
                logoBg: '#5041FF'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
