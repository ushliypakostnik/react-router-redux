// Модуль экранныый помощник
const ScreenHelper = (() => {
  /* eslint-disable no-unused-vars */
  const NAME = 'BootstrapHelper';

  const XS = 480;
  const SM = 1000;
  const MD = 1100;
  const LG = 1600;

  function isMin() {
    return window.matchMedia(`(max-width: ${XS - 1}px)`).matches;
  }

  function isXS() {
    return window.matchMedia(`(max-width: ${SM - 1}px)`).matches;
  }

  function isSM() {
    return window.matchMedia(
      `(min-width: ${SM}px) and (max-width: ${MD - 1}px)`).matches;
  }

  function isMD() {
    return window.matchMedia(
      `(min-width: ${MD}px) and (max-width: ${LG - 1}px)`).matches;
  }

  function isLG() {
    return window.matchMedia(
      `(min-width: ${LG}px)`).matches;
  }

  function getScrollbarWidth() {
    const body = document.body;
    const bw1 = body.clientWidth;
    body.style.overflow = 'hidden';
    const bw2 = body.clientWidth;
    body.style.overflow = '';
    return bw2 - bw1;
  }

  function getOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return 'portrait';
    } else return 'landscape';
  }

  return {
    isMin,
    isXS,
    isSM,
    isMD,
    isLG,
    getScrollbarWidth,
    getOrientation
  };
})();

export default ScreenHelper;
