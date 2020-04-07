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

//TODO try and re-use this to add keywords without reloading a page.
function genNewRegex() {
  return browser.storage.sync.get('phagocyteKeywords').then((res) => {
      returnkeywords = res.phagocyteKeywords;
      let regexp = `(${keywords.join('|')})`;
      console.log("Generated regex, returning.");
      return regexp;
    });
  });
}

function eat(collection, regexp) {
  [...collection].forEach(entry => {
    if (entry.outerHTML.toLowerCase().match(regexp)) {
      entry.style.display = 'none';
    }
  });
}

function eatEverything() {
  genNewRegex().then((regexp) => {
    console.log(regexp);
    tagList.forEach(entry => eat(document.getElementsByTagName(entry), regexp));
    classList.forEach(entry => eat(document.getElementsByClassName(entry), regexp));
  });
}

browser.storage.sync.get('disabled').then((res) => {
  if (!res.disabled) {
    eatEverything();
  }
}).catch(() => eatEverything());
