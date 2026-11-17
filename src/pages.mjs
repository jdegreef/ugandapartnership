import { site } from './site.mjs';
import { esc, md, icon, img } from './lib.mjs';
import { partners } from './content/partners.mjs';
import { stories } from './content/stories.mjs';
import { board, ugandaLeaders } from './content/team.mjs';
import { gallery, galleryFilters } from './content/gallery.mjs';

const storyBySlug = Object.fromEntries(stories.map((s) => [s.slug, s]));

// ---------- shared sections ----------

const pageHero = ({ eyebrow, title, lead, image, alt = '', compact = false }) => `
<section class="page-hero${compact ? ' page-hero-compact' : ''}">
  <div class="page-hero-media">${img(image, alt, { eager: true })}</div>
  <div class="container page-hero-content">
    ${eyebrow ? `<p class="eyebrow eyebrow-light">${esc(eyebrow)}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;

const verse = (text, ref, { tone = 'sand' } = {}) => `
<section class="verse-band verse-${tone}">
  <div class="container narrow">
    ${icon('quote', 'icon verse-icon')}
    <blockquote>
      <p>${esc(text)}</p>
      <footer>${esc(ref)}</footer>
    </blockquote>
  </div>
</section>`;

const ctaBand = (title = 'Partner with us and extend hope in Uganda', text = 'Whether through giving, prayer, or going, every contribution creates lasting change in communities that need it most.') => `
<section class="cta-band">
  <div class="container cta-inner">
    <div>
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn-light" href="/get-involved/">Ways to get involved ${icon('arrow')}</a>
      <a class="btn btn-outline-light" href="/contact/">Contact us</a>
    </div>
  </div>
</section>`;

const storyCard = (s, { headingLevel = 3 } = {}) => `
<article class="story-card" data-category="${s.category.toLowerCase()}">
  <a href="/impact/${s.slug}/" class="story-card-link">
    <div class="story-card-media">${img(s.image, '')}<span class="tag">${esc(s.category)}</span></div>
    <div class="story-card-body">
      <h${headingLevel}>${esc(s.title)}</h${headingLevel}>
      <p>${esc(s.excerpt)}</p>
      <span class="text-link">Read the story ${icon('arrow')}</span>
    </div>
  </a>
</article>`;

const partnerCard = (p) => `
<article class="partner-card">
  <a href="/partners/${p.slug}/" class="partner-card-link">
    <div class="partner-card-media">${img(p.image, '')}</div>
    <div class="partner-card-body">
      <ul class="chips" aria-label="Focus areas">${p.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.summary)}</p>
      <span class="text-link">Learn more ${icon('arrow')}</span>
    </div>
  </a>
</article>`;

const person = (m) => `
<li class="person">
  <div class="person-photo">${img(m.image, m.name)}</div>
  <h3>${esc(m.name)}</h3>
  <p>${esc(m.role)}</p>
  ${m.story ? `<a class="text-link small" href="/impact/${m.story}/">Read ${esc(m.name.split(' ')[0])}’s story ${icon('arrow')}</a>` : ''}
</li>`;

// Figures below are taken directly from the partner reports quoted in the stories.
const stats = [
  { value: String(partners.length), label: 'Ugandan ministry partners' },
  { value: '60+', label: 'children kept in school through fee support' },
  { value: '2,000+', label: 'patients treated at medical & dental camps' },
  { value: String(new Date().getFullYear() - site.foundedYear) + '+', label: 'years of faithful partnership' },
];
const statRow = (cls = '') => `
<ul class="stats ${cls}">
  ${stats.map((s) => `<li><span class="stat-value" data-count>${s.value}</span><span class="stat-label">${esc(s.label)}</span></li>`).join('')}
</ul>`;

// ---------- pages ----------

function home() {
  const featured = storyBySlug['prison-ministry'];
  const homeStories = ['karamoja-children', 'medical-ministry', 'junior'].map((s) => storyBySlug[s]);
  const body = `
<section class="hero">
  <div class="hero-media">${img('/assets/images/heroes/home.webp', 'Smiling children gathered outside a wooden church building in Uganda', { eager: true })}</div>
  <div class="container hero-content">
    <p class="eyebrow eyebrow-light">Canada &nbsp;·&nbsp; Uganda &nbsp;·&nbsp; Since ${site.foundedYear}</p>
    <h1>Partnering to bring <em>hope</em> and change in Uganda</h1>
    <p class="lead">We connect Canadian churches and donors with trusted Ugandan ministry partners — keeping children in school, bringing healthcare to forgotten places, and equipping local leaders with God’s Word.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="/get-involved/">Get involved ${icon('arrow')}</a>
      <a class="btn btn-ghost-light" href="/impact/">See our impact</a>
    </div>
  </div>
</section>

<section class="stats-section" aria-label="Our impact at a glance">
  <div class="container">${statRow('stats-overlap')}</div>
</section>

<section class="section">
  <div class="container split">
    <div class="split-media framed">
      ${img('/assets/images/about-story.webp', 'Members of a visiting TUPS team with Ugandan partners in a village')}
    </div>
    <div class="split-body">
      <p class="eyebrow">Who we are</p>
      <h2>A bridge of friendship between Canada and Uganda</h2>
      <p>The Uganda Partnership Society is a Christian humanitarian organization based in Victoria, BC. It began in ${site.foundedYear}, when Ugandan pastor Dan Muwanguzi sat down next to James DeGreef at a round table at church and shared his vision for Christian Model Ministries.</p>
      <p>Today we stand behind local leaders who know their communities best. They lead; we come alongside with funding, prayer, friendship, and visiting teams.</p>
      <ul class="pillars">
        <li>${icon('school')}<div><strong>Education</strong><span>School fees, supplies and sponsorship for vulnerable children.</span></div></li>
        <li>${icon('medical')}<div><strong>Healthcare</strong><span>Medical and dental camps in villages and prisons.</span></div></li>
        <li>${icon('book')}<div><strong>Discipleship</strong><span>Bible training, books and conferences for pastors.</span></div></li>
      </ul>
      <a class="text-link" href="/about/">Our story ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="feature">
  <div class="feature-media">${img(featured.image, 'Christian Model Ministries team members with a prison officer during a prison ministry visit')}</div>
  <div class="container">
    <div class="feature-card">
      <p class="eyebrow">Featured story</p>
      <h2>${esc(featured.title)}</h2>
      <p>${esc(featured.excerpt)}</p>
      <p class="feature-stat"><strong>${featured.stat.value}</strong> ${esc(featured.stat.label)}</p>
      <a class="btn btn-primary" href="/impact/${featured.slug}/">Read the story ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section-sand">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Ministry partners</p>
        <h2>Trusted local organizations, led by Ugandans</h2>
      </div>
      <a class="text-link" href="/partners/">All ${partners.length} partners ${icon('arrow')}</a>
    </div>
    <div class="card-grid card-grid-3">
      ${partners.slice(0, 3).map(partnerCard).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Stories of change</p>
        <h2>Real people. Real transformation.</h2>
      </div>
      <a class="text-link" href="/impact/">All stories ${icon('arrow')}</a>
    </div>
    <div class="card-grid card-grid-3">${homeStories.map((s) => storyCard(s)).join('')}</div>
  </div>
</section>

${verse('Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.', 'James 1:27', { tone: 'dark' })}

<section class="section">
  <div class="container">
    <div class="section-head center">
      <div>
        <p class="eyebrow">Join us</p>
        <h2>Three ways to make a difference</h2>
      </div>
    </div>
    <div class="ways">
      <a class="way" href="/get-involved/#give">${icon('heart')}<h3>Give</h3><p>Fund school fees, medical camps and Bibles through partners we know personally.</p><span class="text-link">How to give ${icon('arrow')}</span></a>
      <a class="way" href="/get-involved/#pray">${icon('pray')}<h3>Pray</h3><p>Stand with Ugandan pastors, students and families through regular prayer.</p><span class="text-link">Prayer points ${icon('arrow')}</span></a>
      <a class="way" href="/get-involved/#go">${icon('plane')}<h3>Go</h3><p>Join a visiting team and see the work — and the friendships — first-hand.</p><span class="text-link">Mission trips ${icon('arrow')}</span></a>
    </div>
  </div>
</section>`;
  return { path: '/', title: site.name, body, bodyClass: 'home' };
}

function about() {
  const timeline = [
    { year: '2006', title: 'A vision in Victoria', text: 'While visiting friends in Victoria, BC, Pastor Dan Muwanguzi senses God calling him to start Christian Model Ministries.' },
    { year: '2010', title: 'CMM takes shape', text: 'Dan begins registering CMM as an NGO in Uganda. Richard Byamugisha and Rachel Kalembe join with a shared vision.' },
    { year: '2012', title: 'TUPS is born', text: 'On a fundraising trip, Dan sits beside James DeGreef at The Table Church. Their friendship grows into The Uganda Partnership Society.' },
    { year: '2013', title: 'The first mission team', text: 'A two-week visit to Butaleja, Kagoma, Karamoja, Mukono, Wakiso and Kampala — including a dental mission that treats 322 people.' },
    { year: '2017–18', title: 'Healthcare grows', text: 'Dental outreaches with Mulago Hospital’s dentists, and a Western Uganda medical outreach that treats 986 patients.' },
    { year: 'Today', title: 'A growing family of partners', text: `${partners.length} ministry partners serving through education, healthcare, prison ministry and leadership training.` },
  ];
  const body = `
${pageHero({ eyebrow: 'About us', title: 'Rooted in faith. Driven by partnership.', lead: 'We strengthen lives through faith-based action, empowering Ugandan communities to rise with dignity and hope.', image: '/assets/images/heroes/about.webp', alt: 'The TUPS team with Ugandan partners at the equator monument' })}

<section class="section">
  <div class="container mv-grid">
    <div class="mv-card">
      <p class="eyebrow">Our mission</p>
      <p class="mv-text">To advance God’s Kingdom by serving Ugandan communities through Christ-driven initiatives that transform lives, alleviate poverty, expand educational opportunities, improve healthcare, and cultivate lasting hope.</p>
    </div>
    <div class="mv-card mv-card-accent">
      <p class="eyebrow">Our vision</p>
      <p class="mv-text">Thriving communities transformed by Christ, empowered to live with dignity, hope, and opportunity for generations to come.</p>
    </div>
  </div>
</section>

<section class="section section-sand">
  <div class="container split split-top">
    <div class="split-body">
      <p class="eyebrow">How it started</p>
      <h2>A friendship that became a partnership</h2>
      <p>TUPS was founded with churches in Victoria, BC, as a response to God’s call to serve vulnerable children and families in Uganda. From the beginning, our approach has been simple: Ugandans lead, and we come alongside.</p>
      <blockquote class="pull">
        <p>We knew God was calling us to something greater than ourselves. Uganda captured our hearts, and through our partners there, we’ve learned that true development happens when communities lead their own transformation.</p>
        <footer>— The TUPS team</footer>
      </blockquote>
      <a class="text-link" href="/impact/pastor-dan/">Read Pastor Dan’s full account ${icon('arrow')}</a>
    </div>
    <ol class="timeline">
      ${timeline.map((t) => `<li><span class="timeline-year">${t.year}</span><div><h3>${t.title}</h3><p>${t.text}</p></div></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">In Canada</p>
        <h2>Board of directors</h2>
        <p class="section-lead">Volunteers who bring experience in ministry, international development and organizational leadership.</p>
      </div>
    </div>
    <ul class="people">${board.map(person).join('')}</ul>
  </div>
</section>

<section class="section section-sand">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">In Uganda</p>
        <h2>Leadership partners</h2>
        <p class="section-lead">A network of leaders committed to values-driven leadership and sustainable change across Uganda.</p>
      </div>
    </div>
    <ul class="people">${ugandaLeaders.map(person).join('')}</ul>
  </div>
</section>

${verse('Serve one another humbly in love.', 'Galatians 5:13')}
<section class="section section-tight">
  <div class="container narrow center">
    <p class="big-text">Our Christian faith compels us to action. We believe love expressed through service has the power to transform lives and communities. Every partnership, every project, and every relationship we build is grounded in this calling.</p>
  </div>
</section>

${ctaBand()}`;
  return { path: '/about/', title: 'About', description: 'The story, mission, board and Ugandan leadership partners of The Uganda Partnership Society.', image: '/assets/images/heroes/about.webp', body };
}

function impact() {
  const cats = ['All', 'Education', 'Healthcare', 'Faith', 'Community'];
  const body = `
${pageHero({ eyebrow: 'Our impact', title: 'Impact you can see. Hope you can measure.', lead: 'Through faith, partnership, and transparency, we continue to deliver measurable change in some of Uganda’s most vulnerable communities.', image: '/assets/images/heroes/impact.webp', alt: 'A crowd gathered under tents at a medical outreach' })}

<section class="stats-section" aria-label="Impact at a glance">
  <div class="container">${statRow('stats-overlap')}</div>
</section>

<section class="section">
  <div class="container split">
    <div class="split-body">
      <p class="eyebrow">Transforming communities</p>
      <h2>Every number is a person</h2>
      <p>From education to healthcare, TUPS-supported programs bring hope and dignity to thousands across Uganda. Through faithful stewardship and your support, we witness God’s love in action as communities flourish and people discover their God-given potential.</p>
      <ul class="facts">
        <li><strong>322</strong> people treated in three days at our first dental mission in Butaleja (2013)</li>
        <li><strong>190+</strong> inmates completed in-depth Bible teaching and each received a Bible</li>
        <li><strong>300</strong> children fed in a single Karamoja outreach</li>
        <li><strong>5 nations</strong> represented at one pastors’ training — Uganda, Kenya, Rwanda, South Sudan and DR Congo</li>
      </ul>
    </div>
    <div class="split-media framed">${img('/assets/images/transforming-communities.webp', 'A volunteer treating a patient at a medical outreach')}</div>
  </div>
</section>

<section class="section section-sand" id="stories">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Stories of change</p>
        <h2>Real stories from the communities we serve</h2>
      </div>
    </div>
    <div class="filters" role="group" aria-label="Filter stories" data-filter-group="stories">
      ${cats.map((c, i) => `<button type="button" class="chip-btn" aria-pressed="${i === 0}" data-filter="${c.toLowerCase()}">${c}</button>`).join('')}
    </div>
    <div class="card-grid card-grid-3" data-filter-target="stories">${stories.map((s) => storyCard(s)).join('')}</div>
  </div>
</section>

${verse('Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.', 'Matthew 5:16', { tone: 'dark' })}
${ctaBand('Help write the next story', 'There are more children in Gulu and Karamoja waiting for a chance at school. Your partnership can change that.')}`;
  return { path: '/impact/', title: 'Impact', description: 'Stories and numbers from TUPS-supported education, healthcare, prison ministry and leadership programs in Uganda.', image: '/assets/images/heroes/impact.webp', body };
}

function storyPage(s) {
  const others = stories.filter((o) => o.slug !== s.slug && o.category === s.category).concat(stories.filter((o) => o.category !== s.category)).slice(0, 3);
  const body = `
<article class="story">
  <header class="story-header">
    <div class="container story-header-grid">
      <div>
        <a class="back-link" href="/impact/#stories">${icon('chevronL')} All stories</a>
        <p class="eyebrow">${esc(s.category)}</p>
        <h1>${esc(s.title)}</h1>
        <p class="story-person">${esc(s.person)}</p>
        ${s.stat ? `<p class="story-stat"><strong>${s.stat.value}</strong> ${esc(s.stat.label)}</p>` : ''}
      </div>
      <div class="story-cover">${img(s.image, '', { eager: true })}</div>
    </div>
  </header>
  <div class="container narrow prose">
    ${md(s.body)}
  </div>
</article>

<section class="section section-sand">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Keep reading</p><h2>More stories of change</h2></div>
      <a class="text-link" href="/impact/#stories">All stories ${icon('arrow')}</a>
    </div>
    <div class="card-grid card-grid-3">${others.map((o) => storyCard(o)).join('')}</div>
  </div>
</section>
${ctaBand()}`;
  return { path: `/impact/${s.slug}/`, title: s.title, description: s.excerpt, image: s.image, body };
}

function partnersPage() {
  const body = `
${pageHero({ eyebrow: 'Our partners', title: 'Strong partnerships, stronger communities.', lead: 'Together with local ministries and organizations, we create pathways to opportunity through sustainable, faith-rooted initiatives.', image: '/assets/images/heroes/partners.webp', alt: 'Pastors holding books received at a leadership training' })}

<section class="section">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">${partners.length} ministry partners</p>
        <h2>Local leaders we know and trust</h2>
        <p class="section-lead">We partner with Ugandan-led organizations that are rooted in their communities. Each one is visited by our team and reports on how support is used.</p>
      </div>
    </div>
    <div class="card-grid card-grid-3">${partners.map(partnerCard).join('')}</div>
  </div>
</section>

${verse('If you pour yourself out for the hungry and satisfy the desire of the afflicted, then shall your light rise in the darkness and your gloom be as the noonday.', 'Isaiah 58:10', { tone: 'dark' })}
${ctaBand('Is your church looking for a partner in Uganda?', 'We’d love to introduce your congregation to one of our ministry partners.')}`;
  return { path: '/partners/', title: 'Partners', description: 'Meet the Ugandan ministry partners TUPS supports: schools, orphan care, Bible training, healthcare and vocational programs.', image: '/assets/images/heroes/partners.webp', body };
}

function partnerPage(p) {
  const related = (p.stories || []).map((s) => storyBySlug[s]).filter(Boolean);
  const others = partners.filter((o) => o.slug !== p.slug).slice(0, 3);
  const body = `
<article class="story">
  <header class="story-header">
    <div class="container story-header-grid">
      <div>
        <a class="back-link" href="/partners/">${icon('chevronL')} All partners</a>
        <p class="eyebrow">Ministry partner</p>
        <h1>${esc(p.name)}</h1>
        <ul class="chips">${p.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <p class="lead-dark">${esc(p.summary)}</p>
      </div>
      <div class="story-cover">${img(p.image, `${p.name}`, { eager: true })}</div>
    </div>
  </header>
  <div class="container narrow prose">
    ${p.body.map((para) => `<p>${esc(para)}</p>`).join('\n')}
    ${p.quote ? `<blockquote class="pull"><p>${esc(p.quote)}</p></blockquote>` : ''}
  </div>
</article>
${related.length ? `
<section class="section section-sand">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Impact</p><h2>Related stories</h2></div></div>
    <div class="card-grid card-grid-3">${related.map((s) => storyCard(s)).join('')}</div>
  </div>
</section>` : ''}
<section class="section">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Explore</p><h2>Other partners</h2></div><a class="text-link" href="/partners/">All partners ${icon('arrow')}</a></div>
    <div class="card-grid card-grid-3">${others.map(partnerCard).join('')}</div>
  </div>
</section>
${ctaBand(`Support ${p.short || p.name}`, 'Get in touch to learn how your gift or your church can come alongside this ministry.')}`;
  return { path: `/partners/${p.slug}/`, title: p.name, description: p.summary, image: p.image, body };
}

function galleryPage() {
  const body = `
${pageHero({ eyebrow: 'Gallery', title: 'Stories of hope, captured in every frame.', lead: 'Moments from our programs, partners and visiting teams across Uganda.', image: '/assets/images/heroes/gallery.webp', alt: 'A TUPS volunteer walking with children through a village in Butaleja' })}

<section class="section">
  <div class="container">
    <div class="filters" role="group" aria-label="Filter photos" data-filter-group="gallery">
      ${galleryFilters.map((f, i) => `<button type="button" class="chip-btn" aria-pressed="${i === 0}" data-filter="${f.id}">${f.label}</button>`).join('')}
    </div>
    <ul class="gallery" data-filter-target="gallery" data-lightbox>
      ${gallery.map((g, i) => `<li data-category="${g.tags.join(' ')}"><button type="button" class="gallery-item" data-index="${i}" aria-label="View photo: ${esc(g.alt)}">${img(g.src, g.alt)}</button></li>`).join('')}
    </ul>
  </div>
</section>

<dialog class="lightbox" data-lightbox-dialog aria-label="Photo viewer">
  <button type="button" class="lightbox-close" data-lb-close aria-label="Close">${icon('close')}</button>
  <button type="button" class="lightbox-nav prev" data-lb-prev aria-label="Previous photo">${icon('chevronL')}</button>
  <figure><img alt="" data-lb-img><figcaption data-lb-caption></figcaption></figure>
  <button type="button" class="lightbox-nav next" data-lb-next aria-label="Next photo">${icon('chevronR')}</button>
</dialog>

<section class="testimonial">
  <div class="container split">
    <div class="split-media framed">${img('/assets/images/transform-lives.webp', 'Rachel Kalembe speaking at a community gathering')}</div>
    <div class="split-body">
      <p class="eyebrow">Transforming lives through education</p>
      <blockquote class="pull pull-large">
        <p>Thanks to TUPS, children have been taught the Word of God and enrolled in school, youth have been equipped, and elders encouraged in the Lord Jesus Christ — bringing transformation to communities, even in the furthest regions of Uganda such as Karamoja.</p>
        <footer>— Rachel Kalembe, Christian Model Ministries</footer>
      </blockquote>
    </div>
  </div>
</section>
${ctaBand()}`;
  return { path: '/gallery/', title: 'Gallery', description: 'Photos from TUPS-supported education, healthcare, faith and community programs in Uganda.', image: '/assets/images/heroes/gallery.webp', body };
}

function getInvolved() {
  const prayer = [
    'For the pastors trained through C-TBS and conferences — that they would teach God’s Word faithfully.',
    'For the children in Kampala, Gulu and Karamoja whose school fees are covered — for health, focus and hope.',
    'For inmates who have come to faith in prison, and for a Hope Centre to welcome them home on release.',
    'For students at Salaama Blind School and children at the Elizabeth Centre and Shalom Orphanage.',
    'For our Ugandan leaders — Dan, Richard, Rachel, Alfonso and others — for strength and wisdom.',
    'For wisdom as the TUPS board stewards every gift with care and transparency.',
  ];
  const giveAction = site.donateUrl
    ? `<a class="btn btn-primary" href="${esc(site.donateUrl)}" rel="noopener">${icon('heart')} Give online</a>`
    : `<a class="btn btn-primary" href="/contact/?topic=giving">${icon('heart')} Ask us how to give</a>`;
  const body = `
${pageHero({ eyebrow: 'Get involved', title: 'Your partnership can transform lives.', lead: 'Give, pray, go, or bring your church alongside a Ugandan ministry. Every contribution creates lasting impact.', image: '/assets/images/heroes/medical-camp.webp', alt: 'A volunteer and Ugandan health worker caring for a patient' })}

<nav class="jump-nav" aria-label="On this page">
  <div class="container">
    <a href="#give">${icon('heart')} Give</a><a href="#pray">${icon('pray')} Pray</a><a href="#go">${icon('plane')} Go</a><a href="#church">${icon('hands')} Partner as a church</a>
  </div>
</nav>

<section class="section" id="give">
  <div class="container split">
    <div class="split-body">
      <p class="eyebrow">Give</p>
      <h2>Fund work you can see</h2>
      <p>Your gift goes to Ugandan partners we know personally and visit regularly. They report back on how funds are used, and we share those stories with you.</p>
      <ul class="give-list">
        <li>${icon('school')}<div><strong>School fees</strong><span>Keep a child in Kampala, Gulu or Karamoja in school for a full year.</span></div></li>
        <li>${icon('medical')}<div><strong>Medical & dental camps</strong><span>Bring care to villages and prisons where there is none.</span></div></li>
        <li>${icon('book')}<div><strong>Bibles & books</strong><span>Equip a pastor with Scripture and teaching resources to share.</span></div></li>
        <li>${icon('hands')}<div><strong>Where needed most</strong><span>Let our partners direct your gift to their most urgent needs.</span></div></li>
      </ul>
      ${giveAction}
    </div>
    <div class="split-media framed">${img('/assets/images/stories/karamoja-children.webp', 'Children walking together in Karamoja')}</div>
  </div>
</section>

<section class="section section-sand" id="pray">
  <div class="container split split-top">
    <div class="split-body">
      <p class="eyebrow">Pray</p>
      <h2>Stand with our partners in prayer</h2>
      <p>Prayer is the foundation of everything we do. Here are a few ways you can pray today.</p>
      <a class="btn btn-outline" href="/contact/?topic=prayer">Join our prayer list</a>
    </div>
    <ol class="prayer-list">${prayer.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>
  </div>
</section>

<section class="section" id="go">
  <div class="container split">
    <div class="split-media framed">${img('/assets/images/heroes/home.webp', 'Children gathered outside a church in Uganda')}</div>
    <div class="split-body">
      <p class="eyebrow">Go</p>
      <h2>Join a visiting team</h2>
      <p>Since our first two-week mission in 2013, Canadian teams have joined Ugandan partners for medical and dental camps, children’s ministry, pastors’ training and community visits.</p>
      <p>Trips are built around listening and serving alongside local leaders. Medical, dental and teaching skills are especially welcome — but a willing heart is the main requirement.</p>
      <a class="btn btn-outline" href="/contact/?topic=trip">Ask about upcoming trips</a>
    </div>
  </div>
</section>

<section class="section section-sand" id="church">
  <div class="container split">
    <div class="split-body">
      <p class="eyebrow">Partner as a church</p>
      <h2>Bring your congregation alongside a Ugandan ministry</h2>
      <p>TUPS began with churches in Victoria, BC. We can connect your church with one of our ${partners.length} partners, share regular updates and stories, and help plan a visit.</p>
      <a class="btn btn-outline" href="/contact/?topic=partnership">Start a conversation</a>
    </div>
    <div class="split-media framed">${img('/assets/images/how-started.webp', 'Children in matching shirts at a church outreach')}</div>
  </div>
</section>

${verse('Let each of you look not only to his own interests, but also to the interests of others.', 'Philippians 2:4', { tone: 'dark' })}`;
  return { path: '/get-involved/', title: 'Get Involved', description: 'Give, pray, join a mission team, or partner as a church with The Uganda Partnership Society.', body };
}

function contact() {
  const action = site.formEndpoint || '';
  const body = `
${pageHero({ eyebrow: 'Contact', title: 'We’d love to hear from you.', lead: 'Whether you’re ready to partner, give, pray, or simply learn more, our team is here to connect with you.', image: '/assets/images/heroes/contact.webp', alt: 'Ugandan church leaders gathered together', compact: true })}

<section class="section">
  <div class="container contact-grid">
    <form class="contact-form" method="POST" ${action ? `action="${esc(action)}"` : ''} data-contact-form data-email="${esc(site.email)}" novalidate>
      <h2>Send us a message</h2>
      <div class="field-row">
        <div class="field">
          <label for="name">Name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>
      </div>
      <div class="field">
        <label for="topic">What’s this about?</label>
        <select id="topic" name="topic">
          <option value="general">General inquiry</option>
          <option value="giving">Giving</option>
          <option value="prayer">Prayer updates</option>
          <option value="trip">Mission trips</option>
          <option value="partnership">Church or ministry partnership</option>
        </select>
      </div>
      <div class="field">
        <label for="message">Message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </div>
      <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn-primary" type="submit">Send message ${icon('arrow')}</button>
      <p class="form-status" role="status" aria-live="polite" data-form-status></p>
    </form>
    <aside class="contact-aside">
      <div class="aside-card">
        <h2>How we can help</h2>
        <ul class="aside-list">
          <li>${icon('heart')}<span>Questions about giving or where funds go</span></li>
          <li>${icon('pray')}<span>Joining our prayer and update list</span></li>
          <li>${icon('plane')}<span>Upcoming mission trips</span></li>
          <li>${icon('hands')}<span>Church and ministry partnerships</span></li>
        </ul>
        ${site.email ? `<p>${icon('mail')} <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>` : ''}
        <p class="muted">${icon('pin')} ${esc(site.location)}</p>
      </div>
      <blockquote class="pull">
        <p>Let each of you look not only to his own interests, but also to the interests of others.</p>
        <footer>— Philippians 2:4</footer>
      </blockquote>
    </aside>
  </div>
</section>`;
  return { path: '/contact/', title: 'Contact', description: 'Get in touch with The Uganda Partnership Society about giving, prayer, mission trips or partnership.', body };
}

function notFound() {
  const body = `
<section class="section not-found">
  <div class="container narrow center">
    <p class="eyebrow">Page not found</p>
    <h1>We couldn’t find that page.</h1>
    <p class="big-text">It may have moved when we refreshed the site.</p>
    <div class="hero-actions center">
      <a class="btn btn-primary" href="/">Go home</a>
      <a class="btn btn-outline" href="/impact/">Read our stories</a>
    </div>
  </div>
</section>`;
  return { path: '/404.html', title: 'Page not found', body, file: '404.html' };
}

export function allPages() {
  return [
    home(),
    about(),
    impact(),
    ...stories.map(storyPage),
    partnersPage(),
    ...partners.map(partnerPage),
    galleryPage(),
    getInvolved(),
    contact(),
    notFound(),
  ];
}
