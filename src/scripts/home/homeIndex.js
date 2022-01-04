import backgroundColors from './backgroundColors';
import uiState from './uiState';
import { startBgShift } from './backgroundShifter';
import { resizeUpdate } from './resize';
import { scrollPoll } from './scroll';

const siteWrapper = document.querySelector('.site-wrapper');
const mainContainer = document.querySelector('.main-container');
const mobileNav = document.querySelector('.mnav-area');
const contentViews = document.querySelectorAll('.content-view');

(() => {
  if (window.getComputedStyle(mobileNav).display !== 'block') {
    uiState.mobile = false;
  }
  const shiftBg = viewInd =>
    startBgShift(backgroundColors, mainContainer, uiState, viewInd);
  setInterval(() => scrollPoll(mobileNav, siteWrapper, shiftBg, uiState), 800);
  const triggerResize = () => resizeUpdate(contentViews, mobileNav, uiState);
  window.addEventListener('resize', triggerResize);
  setTimeout(() => {
    uiState.contentHeight = contentViews[0].clientHeight;
    triggerResize();
  }, 500);
  mainContainer.style.transition = 'background 1.2s';
  //loadParticles('../media/particles/homeParticles.json');
})();
