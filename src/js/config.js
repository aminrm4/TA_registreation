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
  { id: 'dr-sanati', label: 'دکتر صنعتی' },
  { id: 'dr-abdoli', label: 'دکتر عبدلی' },
  { id: 'dr-bashiri', label: 'دکتر بشیری' },
  { id: 'dr-mohammadi', label: 'دکتر محمدی' },
  { id: 'dr-dezfolian', label: 'دکتر دزفولیان' },
  { id: 'dr-davari', label: 'دکتر داوری' },
  { id: 'dr-mughith', label: 'دکتر مغیث' },
  { id: 'dr-mansourizadeh', label: 'دکتر منصوری زاده' },
  { id: 'dr-javidani', label: 'دکتر جاویدانی' },
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
    description: 'برای ثبت‌نام در تیم دستیاران آموزشی درس ساختمان‌های داده با تدریس  دکتر علی جاویدانی، لطفاً فرم زیر را تکمیل نمایید تا در روند دستیاری این درس همراه ما باشید.',  
      category: 'dr-javidani', // TODO: assign the correct doctor/category
    status: 'فعال',
    // Real screenshot in place — see src/assets/images/membership.png
    image: 'src/assets/images/javidani.png',
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSfOm0zEniQ_IbBopwjT4v8GYFM8mlYijbearA8PYcaRXu6XTA/viewform?usp=preview',
  },
  {
    fileNo: '02',
    title: 'امنیت شبکه',
    description: 'در صورت علاقه‌مندی به مباحث امنیت شبکه، می‌توانید در تیم دستیاران آموزشی درس امنیت شبکه با تدریس  دکتر مغیث عضو شوید. لطفاً برای ثبت‌نام فرم زیر را تکمیل نمایید.',     
    category: 'dr-mughith', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/mughith.png', // TODO: replace with real screenshot
    formUrl: 'https://forms.gle/vmfMWGbbEEcFU4gH8', // TODO: replace with real Google Form URL
  },
  {
    fileNo: '03',
    title: 'مبانی برنامه نویسی',
    description: 'علاقه‌مندان به انتقال تجربه برنامه‌نویسی به دانشجویان ورودی جدید می‌توانند به تیم دستیاران آموزشی این درس با تدریس دکتر بشیری بپیوندند. خواهشمند است برای ثبت‌نام فرم زیر را تکمیل نمایید.',
        category: 'dr-bashiri', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/bashiri.png', // TODO: replace with real screenshot
    formUrl: 'https://forms.gle/DUaZfAXZm8SS7ug76', // TODO: replace with real Google Form URL
  },
  {
    fileNo: '04',
    title: 'داده کاوی ',
    description: 'از داوطلبان همکاری با دکتر منصوری‌زاده در قالب دستیار آموزشی درس داده‌کاوی، خواهشمند است جهت ثبت‌نام، فرم مربوطه را تکمیل نمایند.',      
      category: 'dr-mansourizadeh', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/mansourizadeh.png', // TODO: replace with real screenshot
    formUrl: 'https://forms.gle/ywyAbuGpbr3qjw76A', // TODO: replace with real Google Form URL
  },
  {
    fileNo: '05',
    title: 'مدار های منطقی ',
    description: 'دستیار آموزشی درس مدارهای منطقی با تدریس دکتر عبدلی از بین داوطلبان علاقه‌مند انتخاب خواهد شد. لطفاً برای ثبت‌نام، فرم مربوطه را تکمیل نمایید.',  
      category: 'dr-abdoli', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/abdoli.png', // TODO: replace with real screenshot
    formUrl: 'https://forms.gle/WtpTSbejQLj34sLn7', // TODO: replace with real Google Form URL
  },

    {
    fileNo: '06',
    title: 'طراحی پایگاه داده',
    description: 'به‌منظور تکمیل تیم دستیاران آموزشی درس پایگاه داده، از علاقه‌مندان به همکاری با دکتر صنعتی دعوت می‌شود جهت ثبت‌نام، فرم مربوطه را تکمیل نمایند.',
        category: 'dr-sanati', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/sanati.png', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdFuBnUlv01sabEduwRidTdhh2GMDUVvhK3AT4Amg_DECHbtQ/viewform', // TODO: replace with real Google Form URL
  },


    {
    fileNo: '07',
    title: 'شبکه',
    description: 'به‌منظور تکمیل تیم دستیاران آموزشی درس شبکه، از علاقه‌مندان به همکاری با دکتر محمدی دعوت می‌شود جهت ثبت‌نام، فرم مربوطه را تکمیل نمایند.',
        category: 'dr-mohammadi', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/mohammadi.png', // TODO: replace with real screenshot
    formUrl: 'https://forms.gle/H3KYJyXpWRWBQ1Qk8', // TODO: replace with real Google Form URL
  },
    {
    fileNo: '08',
    title: 'هوش مصنوعی',
    description: 'از داوطلبان علاقه‌مند به همکاری با دکتر دزفولیان در قالب دستیار آموزشی درس هوش مصنوعی دعوت به‌عمل می‌آید جهت ثبت‌نام، فرم مربوطه را تکمیل نمایند.',    category: 'dr-dezfolian', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/dezfolian.jpg', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScwJYqr067ELsfTSrxnD1w52eNsr8nruR7e3sGJjYDiBevJ8g/viewform?usp=publish-editor', // TODO: replace with real Google Form URL
  },

      {
    fileNo: '09',
    title: 'ریاضیات گسسته',
    description: 'برای علاقه‌مندانی که حل اثبات‌ها و استقرای ریاضی را نه دشوار بلکه همچون حل یک معما می‌دانند، تیم دستیاران آموزشی درس ریاضیات گسسته با تدریس دکتر داوری فرصت همکاری فراهم کرده است. خواهشمند است جهت ثبت‌نام، فرم مربوطه را تکمیل نمایید.',    category: 'dr-davari', // TODO: assign the correct doctor/category
    status: 'فعال',
    image: 'src/assets/images/davari.png', // TODO: replace with real screenshot
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfvUk1dviSEHNFoafAJz2ENhfbZSWpgXFR4uVnjLlZ1Qh45gA/viewform', // TODO: replace with real Google Form URL
  },

  // TODO: Add more form cards by copying one of the objects above — there
  // is no limit and no fixed count to respect.
];