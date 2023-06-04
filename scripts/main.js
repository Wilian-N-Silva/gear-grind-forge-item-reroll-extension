const GG_FORGE_URI = 'https://gear-grind.gw2efficiency.com/forge'
const GG_RARITY_CLASSES = {
  'common': 'rarity_1',
  'magic': 'rarity_2',
  'epic': 'rarity_3',
  'legendary': 'rarity_4',
}
const GG_ITEM_MODIFIERS = {
  'cube': {
    'id': 7,
    'name': 'Cube of fuck-this-item'
  },
  'cylinder': {
    'id': 15,
    'name': 'Cylinder of Luck'
  },
  'pyramid': {
    'id': 16,
    'name': 'Pyramid of Chaos'
  },
  'prism': {
    'id': 17,
    'name': 'Divine Prism'
  },
}

var isLoaded = false

const buildItemButtons = (ITEM) => { }

const initRerollOptions = () => {
  const FORGE_FORM = document.querySelector('.forge_form')
  if (!FORGE_FORM) return;

  isLoaded = true

  console.log('Gear Grind - Forge Item Reroll\nInitializing reroll buttons build');

  const ITEMS_SECTION = FORGE_FORM.querySelector('h3 + section')
  const ITEM_LIST = ITEMS_SECTION.querySelectorAll('label')

  ITEM_LIST.forEach((item) => buildItemButtons(item))
}

const handleNavLinkClick = (ev) => {
  const { href } = ev.target

  isLoaded = false

  if (href !== GG_FORGE_URI) return;

  const AJAX_LOADER = document.getElementById('ajax_loader')
  const AJAX_LOADER_DISPLAY = AJAX_LOADER.style.display

  let observer = new MutationObserver(function () {
    if (AJAX_LOADER_DISPLAY === 'none' && !isLoaded) {
      initRerollOptions()
    }
  });

  observer.observe(AJAX_LOADER, { attributes: true, childList: true });
}

const addListenerToNavLinks = () => {
  const navLinks = document.querySelectorAll('ul.navigation li>a.easy-ajax')
  navLinks.forEach((item) => item.addEventListener('click', handleNavLinkClick))
}

const init = (ev) => {
  const { URL } = ev.target
  addListenerToNavLinks()

  if (URL === GG_FORGE_URI) {
    initRerollOptions();
  }
}

addEventListener('load', init);