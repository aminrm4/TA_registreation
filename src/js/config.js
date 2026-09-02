/**
 * ============================================================================
 * SECTION CONFIGURATION
 * ============================================================================
 * This is the ONLY file you should need to edit to manage the content of
 * the site: which form-cards exist, which doctor/category each belongs to,
 * their screenshots, and their Google Form links. Nothing in index.html or
 * main.js needs to change when you edit this file.
 *
 * This file has two arrays: `categories` (the filter tabs, e.g. per-doctor)
 * and `pagesData` (the actual cards). Both can have ANY number of entries —
 * there is no limit and no hardcoded count anywhere in the code.
 * ============================================================================
 */

/**
 * ----------------------------------------------------------------------------
 * CATEGORIES (filter tabs)
 * ----------------------------------------------------------------------------
 * Each category becomes one filter button above the cards grid (e.g.
 * "همه", "دکتر صنعتی", "دکتر سخایی", ...). The number of categories is NOT
 * fixed — add or remove as many as you want, the filter bar and the
 * filtering logic in main.js both adapt automatically.
 *
 * Fields:
 *   id    - a short unique code, used internally to match cards to this
 *           category (see the `category` field on each card below).
 *           Use only letters/numbers/hyphens, no spaces.
 *   label - the text shown on the filter button. This can be in Persian
 *           or English — whatever you want displayed.
 *
 * ➕ TO ADD A NEW CATEGORY (e.g. a new doctor):
 *     1. Add a new line here:  { id: 'dr-newname', label: 'دکتر جدید' },
 *     2. Use 'dr-newname' as the `category` value on any card below.
 *
 * ➖ TO REMOVE A CATEGORY:
 *     1. Delete its line from this array.
 *     2. Update any card below that was using that category's `id` —
 *        change it to a different existing category id.
 *
 * Do NOT remove the { id: 'all', ... } line — it's the "show everything"
 * tab and main.js expects it to always exist as the first entry.
 */
export const categories = [
  { id: 'all', label: 'همه' },
  { id: 'dr-sanati', label: 'دکتر صنعتی' }, // TODO: keep or rename
  { id: 'dr-abdoli', label: 'دکتر عبدلی' }, // TODO: keep or rename
  // TODO: add more doctors/categories here, following the same pattern:
  // { id: 'dr-example', label: 'دکتر مثال' },
];

/**
 * ----------------------------------------------------------------------------
 * PAGES / FORM CARDS
 * ----------------------------------------------------------------------------
 * Each object below renders one index-card in the "Sections" grid. The
 * number of cards is NOT fixed — add or remove as many as you want, the
 * grid, the empty-state message, and the filter bar all adapt automatically.
 *
 * Fields:
 *   fileNo       - display label, e.g. "01". Purely cosmetic (card-catalog
 *                  styling). TODO: keep these sequential as you add/remove cards.
 *   title        - card heading.
 *   description  - one or two sentence summary shown on the card.
 *   category     - MUST match one of the `id` values in `categories` above.
 *                  This is what makes the filter buttons work.
 *   status       - short badge text, e.g. "Open" or "Closed".
 *   image        - path to a real screenshot for this section, relative to
 *                  index.html (e.g. "src/assets/images/dr-sanati-form.png").
 *
 *                  IMAGE SIZE NOTE: whatever size/shape image you upload
 *                  later, it will always be displayed cropped to a
 *                  consistent 4:3 box (this is handled automatically in
 *                  main.js / index.html via CSS "object-cover" — you don't
 *                  need to resize anything yourself). For the LEAST
 *                  cropping and the sharpest result, upload images close
 *                  to a 4:3 ratio — e.g. 1200×900px or 800×600px — rather
 *                  than a very tall or very wide screenshot.
 *
 *                  If the file is missing or fails to load, a generated
 *                  placeholder graphic is shown automatically instead —
 *                  you will never see a broken-image icon.
 *   formUrl      - the Google Form this card links to.
 *                  TODO: Replace the placeholder below with the real Google Form URL.
 *                  Example: https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform
 *
 * ➕ TO ADD A NEW FORM/PAGE:
 *     1. Copy one of the objects below (from the opening { to closing },).
 *     2. Paste it into the array, before the closing ] bracket.
 *     3. Edit its fileNo, title, description, category, image, and formUrl.
 *     That's it — no other file needs to change.
 *
 * ➖ TO REMOVE A FORM/PAGE:
 *     Delete its whole { ... } object from the array below (including the
 *     trailing comma). That's it.
 */
export const pagesData = [
  {
    fileNo: '01',
    title: 'ساختمان های داده',
    description: 'برای ثبت‌نام در تیم کمک‌آموزشی درس ساختمان‌های داده با استاد علی جاویدانی، فرم رو پر کن تا بتونی توی روند کمک‌آموزشی این درس همراه ما باشی.',
    category: 'dr-sanati', // TODO: assign the correct doctor/category
    status: 'فعال',
    // Real screenshot in place — see src/assets/images/membership.png
    image: 'src/assets/images/membership.png',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSfOm0zEniQ_IbBopwjT4v8GYFM8mlYijbearA8PYcaRXu6XTA/viewform?usp=preview',
  },
  {
    fileNo: '02',
    title: 'ثبت‌نام عضویت',
    description: 'ثبت‌نام عضویت',
    category: 'dr-abdoli', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/.png', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform', // TODO: replace with real Google Form URL
  },
  {
    fileNo: '03',
    title: 'ثبت‌نام عضویت',
    description: 'ثبت‌نام عضویت',
    category: 'dr-sanati', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/.png', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform', // TODO: replace with real Google Form URL
  },
  {
    fileNo: '04',
    title: 'ثبت‌نام عضویت',
    description: 'ثبت‌نام عضویت',
    category: 'dr-abdoli', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/.png', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform', // TODO: replace with real Google Form URL
  },
  {
    fileNo: '05',
    title: 'ثبت‌نام عضویت',
    description: 'ثبت‌نام عضویت',
    category: 'dr-sanati', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/.png', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/EXAMPLE_FORM_ID/viewform', // TODO: replace with real Google Form URL
  },

  // TODO: Add more form cards by copying one of the objects above — there
  // is no limit and no fixed count to respect.
];
