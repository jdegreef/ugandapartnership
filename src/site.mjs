// Site-wide settings. Edit these values to update the whole site.
export const site = {
  name: 'The Uganda Partnership Society',
  shortName: 'TUPS',
  url: 'https://ugandapartnership.com',
  tagline: 'Partnering to bring hope and change in Uganda',
  description:
    'The Uganda Partnership Society (TUPS) connects Canadian churches and donors with trusted Ugandan ministry partners in education, healthcare, and discipleship.',
  foundedYear: 2012,
  location: 'Victoria, British Columbia, Canada',

  // Contact form. Paste in a form endpoint (e.g. Formspree: https://formspree.io/f/xxxxxx).
  // If left empty, the form opens the visitor's email app addressed to `email` instead.
  formEndpoint: '',
  // Public contact email. Leave empty to hide it.
  email: '',

  // Optional online-giving link (e.g. CanadaHelps or a bank e-transfer page).
  // When set, a "Give" button appears in the header and on the Get Involved page.
  donateUrl: '',
  // Charitable registration number, if applicable. Shown in the footer when set.
  charityNumber: '',
};

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/partners/', label: 'Partners' },
  { href: '/impact/', label: 'Impact' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/get-involved/', label: 'Get Involved' },
];
