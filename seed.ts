import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const img = (name: string) => path.resolve(dirname, 'public/img', name)

type TextRun = string | { text: string; italic?: boolean } | { text: string; href: string }

function textNode(text: string, italic = false) {
  return {
    type: 'text',
    version: 1,
    detail: 0,
    format: italic ? 2 : 0,
    mode: 'normal',
    style: '',
    text,
  }
}

function linkNode(text: string, href: string) {
  return {
    type: 'link',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    fields: {
      linkType: 'custom',
      url: href,
      newTab: false,
    },
    children: [textNode(text)],
  }
}

function paragraph(parts: TextRun[]) {
  return {
    type: 'paragraph',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    children: parts.map((p) => {
      if (typeof p === 'string') return textNode(p)
      if ('href' in p) return linkNode(p.text, p.href)
      return textNode(p.text, p.italic)
    }),
  }
}

function richText(paragraphs: ReturnType<typeof paragraph>[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: paragraphs,
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  const { totalDocs: existingUsers } = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers > 0) {
    payload.logger.info('Seed skipped: data already exists.')
    process.exit(0)
  }

  payload.logger.info('Seeding users...')
  await payload.create({
    collection: 'users',
    data: { email: 'admin@newcodertimes.test', password: 'ChangeMe123!' },
  })

  payload.logger.info('Seeding media...')
  const media = {
    terrarium: await payload.create({
      collection: 'media',
      filePath: img('main-terrarium.jpg'),
      data: { alt: 'Bitki serasının dekoratif görseli' },
    }),
    floorplan: await payload.create({
      collection: 'media',
      filePath: img('scratch_floorplan.jpg'),
      data: { alt: 'Akıllı ev sistemi planı' },
    }),
    hogwarts: await payload.create({
      collection: 'media',
      filePath: img('promo-hogwarts.svg'),
      data: { alt: '' },
    }),
    cssToggle: await payload.create({
      collection: 'media',
      filePath: img('css-toogle.gif'),
      data: { alt: 'CSS Grid özelliklerinin animasyonu' },
    }),
    menu: await payload.create({
      collection: 'media',
      filePath: img('promo-menu.jpg'),
      data: { alt: 'Toasty restoranının yeni menü görseli' },
    }),
    techCloud: await payload.create({
      collection: 'media',
      filePath: img('tech-cloud.gif'),
      data: { alt: 'Bulut bilişim teknolojisinin animasyonu' },
    }),
    flexbox: await payload.create({
      collection: 'media',
      filePath: img('flexbox-placeholder.jpg'),
      data: { alt: 'Flexbox düzeni örneği' },
    }),
    hotTopicTech: await payload.create({
      collection: 'media',
      filePath: img('hot-topic-placeholder.jpg'),
      data: { alt: 'Sonsuz kod konsepti görseli' },
    }),
    hotTopicComputing: await payload.create({
      collection: 'media',
      filePath: img('hot-topic-placeholder.jpg'),
      data: { alt: 'Düşük enerji işlemci teknolojisi görseli' },
    }),
  }

  payload.logger.info('Seeding articles...')
  await payload.create({
    collection: 'articles',
    data: {
      title: 'Abdullah Koyuncu: A Rising Fullstack Developer Making Waves in the Tech World',
      slot: 'headline',
      href: '#',
      body: richText([
        paragraph([
          'Meet ',
          { text: 'Abdullah Koyuncu', italic: true },
          ', a 30-year-old fullstack developer based in ',
          { text: 'Germany', italic: true },
          ', whose passion for technology and coding is propelling him to new heights in the software development industry. With a solid background in both ',
          { text: 'frontend', italic: true },
          ' and ',
          { text: 'backend', italic: true },
          ' technologies, Abdullah has become a sought-after expert, working on cutting-edge projects that blend seamless user experiences with robust backend solutions.',
        ]),
        paragraph([
          'After relocating to Germany, he immersed himself in the world of ',
          { text: 'web development', italic: true },
          ', quickly mastering multiple programming languages and frameworks. His deep understanding of how front-end design and back-end systems interact allows him to create ',
          { text: 'innovative web applications', italic: true },
          ' that deliver outstanding performance. Abdullah is not only dedicated to his personal projects but also actively mentors up-and-coming developers, sharing his knowledge at ',
          { text: 'local meetups', italic: true },
          ' and coding workshops.',
        ]),
        paragraph([
          'His journey from an aspiring developer to a key player in the tech scene is a true testament to his determination and love for the craft',
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'Sera projesi',
      slot: 'main-image',
      href: '#',
      ariaLabel: 'Ana görsел - Sera projesi',
      image: media.terrarium.id,
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'Can You Build Your Own Smart Home System From Scratch?',
      slot: 'feature-plan',
      href: '#',
      ariaLabel: 'Makale: Sıfırdan Akıllı Ev Sistemi Kurabilir misiniz?',
      image: media.floorplan.id,
      body: richText([
        paragraph([
          `Building a smart home system from scratch? Sounds like a perfect way to reinvent the wheel. But here we are, with someone who isn't satisfied with off-the-shelf smart home solutions. Instead, they decide to create their own home automation setup—one that will likely never scale beyond their living room. The system features a custom-built interface, where lights are dimmed with a simple voice command, but sometimes not without a few glitches. It includes an array of smart devices, some of which work as intended while others remain perpetually "disconnected." It's a hobby project with no real-world application, but a fantastic opportunity to dive into home automation protocols, APIs, and cloud services. You'll spend hours figuring out why your thermostat doesn't sync properly with your phone, and yet the thrill of seeing a set of curtains open with a tap or voice command makes it all worth it. At the end of the day, it's less about functionality and more about the joy of building something that only you can control—literally and figuratively.`,
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'The Perfect Stack',
      slot: 'food-topic',
      href: '#',
      ariaLabel: 'Makale: Mükemmel Stack',
      body: richText([
        paragraph([
          "Every developer loves a good stack. It's impossible to work without one, so here are 15 frameworks, all served with a side of React. Keep an eye out for the hidden gem — the framework logo changes based on the library you select.",
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: "Code in Action: A Developer's Journey",
      slot: 'publication-preview',
      href: '#',
      ariaLabel: 'Makale: Kod Eyleminde - Bir Geliştiricinin Yolculuğu',
      body: richText([
        paragraph([
          'A salute to the relentless world of software development, this is a developer-focused magazine! Highly recommended, because it took 50 hours of coding, debugging, and testing—proof that serious passion has gone into this. Whether you\'re a fullstack developer or just getting started, this issue dives deep into the tools, frameworks, and latest trends shaping the tech landscape today.',
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'Embrace modularity, not complexity',
      slot: 'design-topic',
      href: '#',
      ariaLabel: 'Makale: Modülerliği Kucakla, Karmaşıklığı Değil',
      body: richText([
        paragraph([
          'Dive into a comprehensive UI toolkit and various design patterns for building scalable apps in the ',
          { text: 'Design System', italic: true },
          ' library. Inspired by the ',
          { text: 'Component-Driven Development', italic: true },
          " methodology, this 10-component collection features a login page layout, a dynamic user profile dashboard, and what a developer on GitHub calls a 'button state experiment'. Each component comes with six (yes, six) customizable themes, including the ultra-popular dark mode.",
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'CSS Grid Features',
      slot: 'feature-toggle',
      href: '#',
      ariaLabel: 'Makale: CSS Grid Özellikleri',
      image: media.cssToggle.id,
      body: richText([
        paragraph([
          "CSS Grid just got even better with eight new layout properties that you can use to create even more complex designs with ease. Can you use these on your site and still maintain performance? Probably, if you're careful with your structure and media queries. But you ",
          { text: "won't", italic: true },
          " believe how much easier it is to manage responsive layouts now—especially with the new 'gap' feature for spacing!",
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'Mastering Flexbox with Quirky Layouts: Pizza Boxes to Retro Ads',
      slot: 'gallery',
      href: '#',
      ariaLabel: 'Galeri: Flexbox ile Tuhaf Mizanpajlar',
      image: media.flexbox.id,
      body: richText([
        paragraph([
          'Ready to dive into the world of Flexbox with a collection of quirky layouts? This set has a total of 30 pens... well, 31 if you count this one too. What can you expect here? Some hidden gems, in my humble opinion, include ',
          { text: 'a pizza box layout', href: '#' },
          ' and ',
          { text: 'retro advertisement grids', href: '#' },
          ". There are plenty of playful creations that shouldn't really exist in Flexbox, like ",
          { text: 'a row of balloons', href: '#' },
          ', ',
          { text: 'a floating shopping cart', href: '#' },
          ', and ',
          { text: 'Christmas tree arrangements', href: '#' },
          '. If you have a refined taste in layouts, you\'ll also find a couple of pens inspired by ',
          { text: 'old-school cinema posters', href: '#' },
          ' and ',
          { text: 'vintage album covers', href: '#' },
          ". For those rare moments when you're actually seeking a practical layout, well, you probably shouldn't be looking here. But, there are ",
          { text: 'some', italic: true },
          ' real-world gems, such as ',
          { text: 'the blog grid layout', href: '#' },
          ', ',
          { text: 'pricing tables', href: '#' },
          ', and ',
          { text: 'responsive contact forms', href: '#' },
          '.',
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'Infinite Code for Everyone!',
      slot: 'tech-feature-1',
      href: '#',
      ariaLabel: 'Teknoloji: Herkes için Sonsuz Kod!',
      image: media.hotTopicTech.id,
      body: richText([
        paragraph([
          "No developer is left behind. With this one function and an endless loop, there's infinite possibilities. By utilizing recursion and modular code, every problem can be solved with a simple solution that scales infinitely, much like the beauty of an elegant algorithm.",
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'Overwhelmed Developer Releases Chaos in API Design Ideas',
      slot: 'captcha',
      href: '#',
      ariaLabel: 'Haber: Stresli Geliştirici API Tasarımında Kaos Yaygınlaştırıyor',
      body: richText([
        paragraph([
          'From implementing complex nested callbacks to integrating outdated libraries, this is a whole new approach to how APIs should be structured. "I\'ve spent hours debugging asynchronous functions only to end up with a callback hell. There has to be a better way," says the developer, who has requested to remain anonymous.',
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'New Developer Bootcamp Offers Real-World Experience',
      slot: 'bootcamp-feature',
      href: '#',
      ariaLabel: 'Haber: Yeni Geliştirici Bootcamp Gerçek Dünya Deneyimi Sunuyor',
      body: richText([
        paragraph([
          "A revolutionary new developer bootcamp has launched, promising to teach students not just coding, but real-world software development practices. The program focuses on collaborative projects, from version control with Git to deployment with Docker, mimicking the entire software development lifecycle. It's not just about learning to code—it's about learning how to ship production-ready applications. Students will gain hands-on experience working with real clients, solving actual problems, and contributing to open-source projects. This bootcamp aims to turn beginners into full-stack developers, ready to tackle the modern tech world with confidence.",
        ]),
      ]),
    },
  })

  await payload.create({
    collection: 'articles',
    data: {
      title: 'New Low-Energy Processors',
      slot: 'tech-feature-2',
      href: '#',
      ariaLabel: 'Bilişim: Yeni Düşük Enerji İşlemciler',
      image: media.hotTopicComputing.id,
      body: richText([
        paragraph([
          'A new low-energy processor has been unveiled, offering high performance with significantly reduced power consumption. Designed for both mobile and desktop devices, it promises to enhance energy efficiency without sacrificing speed, making it an ideal solution for eco-conscious tech users.',
        ]),
      ]),
    },
  })

  payload.logger.info('Seeding promos global...')
  await payload.updateGlobal({
    slug: 'promos',
    data: {
      hogwartsBanner: {
        title: '50% Off Hogwarts Express tickets',
        badge: 'Limited time offer',
        href: '#',
        ariaLabel: 'Promosyon: Hogwarts Express biletlerinde %50 indirim',
        image: media.hogwarts.id,
      },
      techTrendsSocial: {
        subtitle: 'Tech Trends',
        href: '#',
        ariaLabel: 'Teknoloji Trendleri - Bulut Bilişim',
        image: media.techCloud.id,
        body: richText([
          paragraph([
            "It seems like cloud computing is here to stay for the long haul, so here's a friendly reminder to keep your systems optimized for scalability. Oh, and make sure your security protocols are top-notch!",
          ]),
        ]),
      },
      toastyMenu: {
        caption: 'See the new and improved menu for Toasty!',
        href: '#',
        ariaLabel: 'Toasty - Yeni ve geliştirilmiş menü',
        image: media.menu.id,
      },
    },
  })

  payload.logger.info('Seeding issue-info global...')
  await payload.updateGlobal({
    slug: 'issue-info',
    data: {
      siteTitle: 'Grid Newspaper - The New Coder Times',
      siteDescription: 'The New Coder Times - Teknoloji ve yazılım geliştirme haberleri',
      publicationName: 'The New Coder Times',
      issueNumber: 'Issue #45',
      issueDate: 'Sunday, 10 Sep, 2024',
      editionType: 'Weekly Edition',
    },
  })

  payload.logger.info('Seed complete.')
  payload.logger.info('Admin login: admin@newcodertimes.test / ChangeMe123!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
