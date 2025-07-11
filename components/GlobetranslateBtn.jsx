import React, { useEffect } from 'react';

// It's good practice to make the settings configurable via props
// Here we define default values based on the script you provided.
const defaultSettings = {
  default_language: 'en',
  detect_browser_language: true,
  languages: ['en', 'bn', 'fr', 'es', 'ja'],
  globe_color: '#66aaff',
  wrapper_selector: '.gtranslate_wrapper',
  flag_size: 24,
  globe_size: 40,
};

const GTranslateGlobe = ({ settings = defaultSettings }) => {
  useEffect(() => {
    // 1. Check if the Globe script has already been added to the page.
    // We use a unique flag to avoid conflicts if you use other GTranslate widgets.
    if (window.gtranslateGlobeScriptLoaded) {
      return;
    }

    // 2. Set up GTranslate settings on the window object.
    // This MUST be done before the script is loaded.
    window.gtranslateSettings = settings;

    // 3. Create the script element.
    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/globe.js'; // The correct URL for the Globe widget
    script.defer = true;

    // 4. Set the global flag once the script is successfully loaded.
    // This prevents the script from being added multiple times by React's StrictMode.
    script.onload = () => {
      window.gtranslateGlobeScriptLoaded = true;
    };

    // 5. Append the script to the document body.
    document.body.appendChild(script);

    // For a "load-once" global script like this, we don't need a cleanup function
    // as we want the translation functionality to persist across the entire app.

  }, [settings]); // Re-run effect if settings object changes.

  // This div is the placeholder where the GTranslate widget will be rendered.
  // The `wrapper_selector` in the settings points to this.
  return <div className="gtranslate_wrapper"></div>;
};

export default GTranslateGlobe;