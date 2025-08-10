export class StyleManager {
  private static globalStyleAdded = false;

  static addGlobalStyles() {
    if (this.globalStyleAdded) return;

    const globalStyleElement = document.createElement('style');
    globalStyleElement.textContent = `
      /* Nuclear option - hide everything in Google Places except dropdown */
      gmp-place-autocomplete {
        --gmp-place-autocomplete-input-icon-display: none !important;
        overflow: hidden !important;
      }
      
      gmp-place-autocomplete *:not(.pac-container):not(.pac-item):not(.pac-item *) {
        clip: rect(1px, 1px, 1px, 1px) !important;
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        background: none !important;
        background-image: none !important;
      }
      
      gmp-place-autocomplete::part(input),
      gmp-place-autocomplete::part(input-container),
      gmp-place-autocomplete input,
      gmp-place-autocomplete [role="button"],
      gmp-place-autocomplete button,
      gmp-place-autocomplete .gm-style-iw,
      gmp-place-autocomplete [class*="icon"],
      gmp-place-autocomplete [class*="button"],
      gmp-place-autocomplete svg,
      gmp-place-autocomplete img,
      gmp-place-autocomplete::before,
      gmp-place-autocomplete::after,
      gmp-place-autocomplete *::before,
      gmp-place-autocomplete *::after {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        background: none !important;
        background-image: none !important;
        content: none !important;
      }
      
      /* Force dropdown styling with maximum specificity */
      html body .pac-container,
      html body div.pac-container {
        background-color: white !important;
        border: 1px solid rgb(209, 213, 219) !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        z-index: 9999 !important;
      }
      
      html body .pac-container .pac-item,
      html body div.pac-container div.pac-item {
        background-color: white !important;
        color: rgb(17, 24, 39) !important;
        border-bottom: 1px solid rgb(243, 244, 246) !important;
        padding: 8px 12px !important;
        font-size: 14px !important;
      }
      
      html body .pac-container .pac-item:hover,
      html body .pac-container .pac-item-selected,
      html body div.pac-container div.pac-item:hover,
      html body div.pac-container div.pac-item.pac-item-selected {
        background-color: rgb(243, 244, 246) !important;
        color: rgb(17, 24, 39) !important;
      }
      
      html body .pac-container .pac-item .pac-item-query,
      html body div.pac-container div.pac-item span.pac-item-query {
        color: rgb(17, 24, 39) !important;
        font-weight: 500 !important;
      }
      
      html body .pac-container .pac-item .pac-matched,
      html body div.pac-container div.pac-item span.pac-matched {
        color: rgb(59, 130, 246) !important;
        font-weight: bold !important;
      }
    `;
    document.head.appendChild(globalStyleElement);
    this.globalStyleAdded = true;
  }

  static hideGooglePlacesElement(element: HTMLElement) {
    element.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      z-index: -999;
    `;
  }

  static hideGoogleInput(googleInput: HTMLInputElement) {
    googleInput.style.cssText = `
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
    `;
  }

  static getCustomInputStyles() {
    return `
      width: 100%;
      padding: 12px 16px;
      background-color: rgb(243, 244, 246);
      border: 0;
      border-radius: 8px;
      color: rgb(17, 24, 39) !important;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
      caret-color: rgb(17, 24, 39);
      -webkit-text-fill-color: rgb(17, 24, 39) !important;
    `;
  }

  static forceTextColor(input: HTMLInputElement) {
    input.style.setProperty('color', 'rgb(17, 24, 39)', 'important');
    input.style.setProperty('-webkit-text-fill-color', 'rgb(17, 24, 39)', 'important');
    input.style.setProperty('text-fill-color', 'rgb(17, 24, 39)', 'important');
  }

  static applyFocusStyle(input: HTMLInputElement) {
    input.style.outline = '2px solid rgba(59, 130, 246, 0.2)';
  }

  static removeFocusStyle(input: HTMLInputElement) {
    input.style.outline = 'none';
  }
}