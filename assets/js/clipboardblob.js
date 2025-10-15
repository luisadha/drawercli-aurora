/*
Clipboard API

Copy an image or other blob content of a DOM selector in the data-copyblob attribute:

  <button
    data-copyblob="selector"
    data-done="copy sucessful"
  >copy</button>

Paste an image into a DOM selector:

  <button
    data-pasteblob="selector"
    data-done="paste sucessful"
  >paste</button>

Buttons will automatically initialize on page load.
Call init() to initialize again if necessary
*/


// configuration
const
  activeClass = { copy: 'copyblobactive', paste: 'pasteblobactive' },
  doneMessage = { copyblob: 'copied', pasteblob: 'pasted' },
  doneClass   = 'done';


// initialize
window && window.addEventListener('DOMContentLoaded', init);

export function init() {

  const body = document && document.body;

  // clipboard API available?
  if (!body || !navigator.clipboard) return;

  // text copy active
  if (navigator.clipboard.write) body.classList.add(activeClass.copy);

  // text paste active
  if (navigator.clipboard.read) body.classList.add(activeClass.paste);

  // copy/paste handler
  body.addEventListener('click', clipboardHandler);

}


// copy or paste clicked?
async function clipboardHandler(e) {

  // get clicked element
  const
    target  = e.target,
    type    = (undefined === target.dataset.pasteblob ? 'copyblob' : 'pasteblob'),
    content = target.dataset[type];

  if (undefined === content) return;

  // is CSS selector?
  let select;
  try {
    select = content && document.querySelector(content);
  }
  catch (error) {}

  // call copy or paste handler
  const handler = { copyblob, pasteblob };
  if (!await handler[type]( select )) return;

  // show success message
  if (!target.dataset.done) target.dataset.done = doneMessage[type];

  target.addEventListener('animationend', () => target.classList.remove(doneClass), { once: true });
  target.classList.add(doneClass);

}


// copy to clipboard
async function copyblob(select) {

  const url = select && (select.src || select.href);
  if (!url) return;

  try {

    const
      src = await fetch(url),
      blob = await src.blob();

    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);

    return true;

  }
  catch (error) {
    console.log('copy error', error);
  }

}


// paste handler
async function pasteblob(select) {

  let blob;

  try {

    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {

      for (const type of clipboardItem.types) {

        blob = await clipboardItem.getType(type);

        if (select && type.startsWith('image')) {

          const img = document.createElement('img');
          img.onload = () => {
            URL.revokeObjectURL(this.src);
          }
          img.src = URL.createObjectURL(blob);
          select.appendChild(img)

        }

      }

    }

    return blob;
  }
  catch (error) {
    console.log('paste error', error);
  }

}
