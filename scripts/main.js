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

const rerollItem = () => { }

const buildRerollButton = (DATA) => {
  const BUTTON = document.createElement('button')
  const BUTTON_STYLE = 'border: none; background: transparent; color: white; margin-left: 8px; margin-right: 16px; cursor: pointer'

  BUTTON.setAttribute('type', 'button')
  BUTTON.setAttribute('data-item-id', DATA.itemID)
  BUTTON.addEventListener('click', rerollItem)
  BUTTON.setAttribute('data-next-reroll', DATA.nextReroll)
  BUTTON.innerText = DATA.label
  BUTTON.style = BUTTON_STYLE

  return BUTTON
}

const handleButtonData = (LABEL, ITEM_ID, NEXT_REROLL) => {
  const BTN_DATA = {
    'label': LABEL,
    'itemID': ITEM_ID,
    'nextReroll': NEXT_REROLL,
  }

  return BTN_DATA
}

const buildItemButtons = (ITEM) => {
  const ITEM_NAME_EL = ITEM.querySelector('span')
  const ITEM_ID = ITEM_NAME_EL.getAttribute('item_id')
  const ITEM_CLASSLIST = ITEM_NAME_EL.classList

  if (!ITEM_CLASSLIST.contains(GG_RARITY_CLASSES.legendary)) {
    const NEXT_REROLL = !ITEM_CLASSLIST.contains(GG_RARITY_CLASSES.common) && !ITEM_CLASSLIST.contains(GG_RARITY_CLASSES.legendary) ? 'CUBE' : 'CYLINDER'

    const BTN_REROLL_RARITY_DATA = handleButtonData('Reroll Rarity', ITEM_ID, NEXT_REROLL)

    const BTN_REROLL_RARITY = buildRerollButton(BTN_REROLL_RARITY_DATA)

    ITEM.appendChild(BTN_REROLL_RARITY)
  }

  const BTN_REROLL_STATS_DATA = handleButtonData('Reroll Stats', ITEM_ID, 'PYRAMID')
  const BTN_REROLL_STATS_VALUES_DATA = handleButtonData('Reroll Values', ITEM_ID, 'PRISM')

  const BTN_REROLL_STATS = buildRerollButton(BTN_REROLL_STATS_DATA)
  const BTN_REROLL_STATS_VALUES = buildRerollButton(BTN_REROLL_STATS_VALUES_DATA)

  ITEM.appendChild(BTN_REROLL_STATS)
  ITEM.appendChild(BTN_REROLL_STATS_VALUES)
}

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