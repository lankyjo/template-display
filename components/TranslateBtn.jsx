import React, { useEffect } from 'react';

const GTranslate = () => {
  useEffect(() => {
    if (window.gtranslateScriptLoaded) {
      return;
    }

    window.gtranslateSettings = {
      default_language: 'en',
      detect_browser_language: true,
      wrapper_selector: '.gtranslate_wrapper',
      flag_size: 24,
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/popup.js';
    script.defer = true;

    // Set a flag on the window when the script has finished loading
    // This is the key to preventing the script from being added multiple times
    script.onload = () => {
      window.gtranslateScriptLoaded = true;
    };

    document.body.appendChild(script);
    
  }, []); 

  // This div is the placeholder where the GTranslate widget will be rendered.
  return <div className="gtranslate_wrapper"></div>;
};

export default GTranslate;