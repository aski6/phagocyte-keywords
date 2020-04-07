var regexp;

function genNewRegex() {
  let keywords = browser.storage.sync.get('phagocyte-keywords');
  regexp = `(${keywords.join('|')})`;
}

const tagList = [
  'article',
  'iframe'
];
const classList = [
  'article',
  'article-preview',
  'athing',
  'block__position',
  'card',
  'cn__listitem',
  'cover-spread__headline__wrapper',
  'fc-item',
  'gel-layout__item',
  'ie-11_Fil(n)',
  'linkBar',
  'multiTeaser-card',
  'oon-grid-item',
  'pancake-item-1',
  'pancake-item-2',
  'pancake-item-3',
  'pancake-item-4',
  'pb-feature',
  'pB-kurierat',
  'Post',
  'Post-item',
  'readmore__item',
  'upost',
  'vodl-lead-hero',
  'vodl-news-aside__item',
  'vodl-news-river__item',
  'vodl-newsslider__category',
  'vodl-newsslider__list-item',
  'widget-type-calltoaction'
];

function eat(collection) {
  [...collection].forEach(entry => {
    if (entry.outerHTML.toLowerCase().match(regexp)) {
      entry.style.display = 'none';
    }
  });
}

function eatEverything() {
  genNewRegex();
  tagList.forEach(entry => eat(document.getElementsByTagName(entry)));
  classList.forEach(entry => eat(document.getElementsByClassName(entry)));
}

browser.storage.sync.get('disabled').then((res) => {
  if (!res.disabled) {
    eatEverything();
  }
}).catch(() => eatEverything());
