let savedTheme = null
try {
  savedTheme = localStorage.getItem('qby-theme')
} catch {
  savedTheme = null
}
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
document.documentElement.dataset.theme = initialTheme

const learningEntries = [
  {
    time: '现在',
    status: '学习中',
    tone: 'active',
    title: '计算机基础知识',
    description: '从基础概念开始建立知识框架，逐步理解计算机如何工作。',
    next: '下一步：补充第一条真实学习笔记'
  },
  {
    time: '近期',
    status: '探索中',
    tone: 'active',
    title: 'AI 软件使用',
    description: '了解常用 AI 工具，并尝试把它们运用到学习、整理和创作中。',
    next: '下一步：记录使用过的软件与心得'
  },
  {
    time: '大学阶段',
    status: '准备开始',
    tone: 'planned',
    title: '计算机相关专业课程',
    description: '进入安徽理工大学后，根据实际课程持续更新学习方向与阶段成果。',
    next: '下一步：开学后补充课程与目标'
  }
]

const projects = [
  {
    status: '持续完善',
    tone: 'active',
    number: '01',
    title: '个人主页',
    description: '用照片和文字介绍自己，并持续加入学习成长、作品与生活记录。',
    tags: ['网页设计', '内容整理', '响应式布局'],
    action: '正在访问',
    href: '#top'
  },
  {
    status: '计划中',
    tone: 'planned',
    number: '02',
    title: '第一个编程项目',
    description: '为大学阶段预留的第一个真实编程作品位置，完成后将展示过程与成果。',
    tags: ['等待内容', '可持续更新'],
    action: '等待开始',
    href: '#contact'
  },
  {
    status: '计划中',
    tone: 'planned',
    number: '03',
    title: 'AI 使用记录',
    description: '整理使用过的 AI 软件、实际用途、提示词案例和自己的学习心得。',
    tags: ['AI 工具', '学习记录'],
    action: '等待补充',
    href: '#contact'
  }
]

const skills = [
  { name: '计算机基础', stage: 2, state: '入门学习中' },
  { name: 'AI 软件', stage: 2, state: '入门学习中' },
  { name: '网页开发', stage: 1, state: '准备学习' },
  { name: '篮球与唱歌', stage: 3, state: '长期热爱' }
]

const learningMarkup = learningEntries.map((entry, index) => `
  <article class="timeline-item">
    <div class="timeline-meta">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <time>${entry.time}</time>
    </div>
    <div class="timeline-content">
      <p class="status-pill ${entry.tone}">${entry.status}</p>
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      <small>${entry.next}</small>
    </div>
  </article>
`).join('')

const projectMarkup = projects.map((project) => `
  <article class="project-card">
    <div class="project-topline">
      <span>${project.number}</span>
      <p class="status-pill ${project.tone}">${project.status}</p>
    </div>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    <a href="${project.href}">${project.action} <span>↗</span></a>
  </article>
`).join('')

const skillMarkup = skills.map((skill) => `
  <article class="skill-row">
    <div>
      <h3>${skill.name}</h3>
      <p>${skill.state}</p>
    </div>
    <div class="stage-dots" aria-label="${skill.name}当前阶段：${skill.state}">
      ${Array.from({ length: 4 }, (_, index) => `<i class="${index < skill.stage ? 'filled' : ''}"></i>`).join('')}
    </div>
  </article>
`).join('')

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#top">跳到主要内容</a>

  <header class="nav" data-nav>
    <a class="brand" href="#top" aria-label="返回首页">钱炳元<span>。</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="打开导航菜单">
      <span></span><span></span>
    </button>
    <nav id="site-nav" aria-label="主导航">
      <a href="#profile">首页</a>
      <a href="#learning">学习成长</a>
      <a href="#projects">项目作品</a>
      <a href="#interests">兴趣生活</a>
      <a class="nav-contact" href="#contact">联系我</a>
      <button class="theme-toggle" type="button" data-theme-toggle aria-label="切换深浅主题">
        <span aria-hidden="true">◐</span><b data-theme-label>深色</b>
      </button>
    </nav>
  </header>

  <main id="top">
    <section class="cover" aria-labelledby="cover-title">
      <img src="./public/images/social-cover-og.png" width="1200" height="630" alt="" aria-hidden="true" fetchpriority="high" decoding="async" />
      <div class="cover-copy">
        <p>个人主页</p>
        <h1 id="cover-title">钱炳元</h1>
        <a href="#profile">向下了解我 <span>↓</span></a>
      </div>
    </section>

    <section class="hero" id="profile" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow reveal">未来的计算机学习者</p>
        <h1 id="hero-title" class="reveal delay-1">我是<br><span>钱炳元</span></h1>
        <p class="intro reveal delay-2">安徽理工大学准大一学生，正在走进计算机世界。<br>学习基础知识，也探索 AI 软件的更多可能。</p>
        <div class="hero-actions reveal delay-3">
          <a class="button primary" href="#now">看看现在的我 <span>↘</span></a>
          <a class="text-link" href="#interests">计算机 · AI · 生活热爱</a>
        </div>
      </div>
      <div class="hero-visual reveal delay-2">
        <button class="photo-frame photo-button" type="button" data-image="./public/images/qianbingyuan-portrait.jpg" data-caption="钱炳元在徽州宏村" aria-label="放大查看钱炳元在徽州宏村的完整照片">
          <picture>
            <source srcset="./public/images/qianbingyuan-portrait.webp" type="image/webp" />
            <img src="./public/images/qianbingyuan-portrait.jpg" width="1280" height="1707" alt="钱炳元在徽州宏村的生活照" fetchpriority="high" decoding="async" />
          </picture>
          <span class="photo-hint">点击查看完整照片</span>
        </button>
        <p class="vertical">保持好奇 · 持续成长</p>
        <div class="focus-stamp"><b>学</b><span>学习<br>创造</span></div>
      </div>
      <div class="scroll">继续探索 <span>↓</span></div>
    </section>

    <section class="manifesto" id="about">
      <p class="section-index">01 / 关于我</p>
      <div>
        <p class="kicker">保持好奇，也保持热爱</p>
        <h2>从兴趣出发，<br>向未来<span>靠近</span>。</h2>
      </div>
      <div class="about-copy">
        <p>我是钱炳元，安徽理工大学准大一学生，即将学习计算机相关专业。我喜欢把好奇心变成行动，也愿意在学习和生活中不断认识新的自己。</p>
        <div class="traits">
          <span>计算机</span><span>AI 软件</span><span>篮球</span><span>唱歌</span>
        </div>
      </div>
    </section>

    <section class="now" id="now" aria-labelledby="now-title">
      <div class="now-heading">
        <p class="section-index light">02 / 现在</p>
        <div>
          <p class="kicker">正在发生</p>
          <h2 id="now-title">新阶段，<br>从<span>基础</span>开始。</h2>
        </div>
      </div>
      <div class="now-grid">
        <article class="now-card">
          <span>01 / 校园</span>
          <h3>安徽理工大学</h3>
          <p>即将开启大学生活，准备在计算机相关专业里找到自己的方向。</p>
        </article>
        <article class="now-card">
          <span>02 / 学习</span>
          <h3>计算机入门</h3>
          <p>目前正在学习计算机基础知识，希望一步步建立扎实的知识体系。</p>
        </article>
        <article class="now-card">
          <span>03 / AI 探索</span>
          <h3>AI 软件探索</h3>
          <p>近期目标是掌握常用 AI 软件，把它们真正运用到学习和创造中。</p>
        </article>
        <article class="now-card now-card-accent">
          <span>04 / 音乐与运动</span>
          <h3>篮球、唱歌与林俊杰</h3>
          <p>篮球和唱歌是生活里的能量来源。我也是林俊杰的忠实粉丝，欢迎有相同爱好的朋友来交流认识。</p>
        </article>
      </div>
    </section>

    <section class="growth" id="learning" aria-labelledby="learning-title">
      <div class="section-heading">
        <p class="section-index">03 / 学习成长</p>
        <div>
          <p class="kicker">持续记录，比进度更重要</p>
          <h2 id="learning-title">把每一步，<br>变成<span>成长轨迹</span>。</h2>
        </div>
        <p>这里将持续记录计算机与 AI 的学习过程。当前内容依据已有信息建立，之后可以随时替换为真实日志。</p>
      </div>
      <div class="timeline">${learningMarkup}</div>
    </section>

    <section class="projects" id="projects" aria-labelledby="projects-title">
      <div class="section-heading light-heading">
        <p class="section-index light">04 / 项目作品</p>
        <div>
          <p class="kicker">从第一个小作品开始</p>
          <h2 id="projects-title">把想法，<br>做成<span>看得见的成果</span>。</h2>
        </div>
        <p>没有虚构的经历：已经完成的真实展示，尚未开始的明确标为计划中。</p>
      </div>
      <div class="project-grid">${projectMarkup}</div>

      <div class="skill-map" id="skills">
        <div class="skill-intro">
          <p class="section-index light">技能成长地图</p>
          <h3>用阶段记录进步，<br>不用虚假的百分比。</h3>
          <p>四个圆点分别代表准备学习、入门学习、能够运用和持续提高。</p>
        </div>
        <div class="skill-list">${skillMarkup}</div>
      </div>
    </section>

    <section class="moments" id="moments">
      <div class="moment-photo">
        <picture>
          <source srcset="./public/images/qianbingyuan-mountain.webp" type="image/webp" />
          <img src="./public/images/qianbingyuan-mountain.jpg" width="1280" height="1707" alt="钱炳元登山时的生活照" loading="lazy" decoding="async" />
        </picture>
        <span class="photo-no">05</span>
      </div>
      <div class="moment-copy">
        <p class="section-index">05 / 片刻</p>
        <p class="big-quote">“向上走，<br>风景自然会来。”</p>
        <p>脚步丈量远方，镜头收藏当下。生活不是等待答案，而是在出发中写下答案。</p>
        <div class="coordinates">30.1° N&nbsp;&nbsp; 118.2° E<br><span>黄山 · 中国</span></div>
      </div>
    </section>

    <section class="interests" id="interests" aria-labelledby="interests-title">
      <div class="interests-intro">
        <p class="section-index">06 / 兴趣生活</p>
        <h2 id="interests-title">我喜欢的，<br>都在<span>生活里</span>。</h2>
        <p>一场晚霞、一次出发、一件亲手完成的小作品，都是我认真生活的方式。</p>
      </div>

      <article class="story story-life">
        <figure class="story-photo">
          <button class="photo-button" type="button" data-image="./public/images/life-sunset.jpg" data-caption="把日常过成值得收藏的片段" aria-label="放大查看晚霞照片">
            <picture>
              <source srcset="./public/images/life-sunset.webp" type="image/webp" />
              <img src="./public/images/life-sunset.jpg" width="1280" height="1707" alt="晚霞映在水面上的日常风景" loading="lazy" decoding="async" />
            </picture>
          </button>
          <figcaption>把日常过成值得收藏的片段</figcaption>
        </figure>
        <div class="story-copy">
          <span class="story-no">01 / 生活</span>
          <p class="story-label">热爱生活</p>
          <h3>留住平凡日子里的光。</h3>
          <p>我喜欢留意身边细小而真实的美好：天边的晚霞、水面的倒影，还有每一个值得认真感受的当下。</p>
        </div>
      </article>

      <article class="story story-travel">
        <div class="travel-heading">
          <div>
            <span class="story-no">02 / 旅行</span>
            <p class="story-label">喜欢旅游</p>
          </div>
          <h3>去看不同的风景，<br>也遇见不同的自己。</h3>
          <p>在山水、古村与城市之间不断出发。旅行让我打开视野，也让我把一路的风景变成成长的记忆。</p>
        </div>
        <div class="travel-gallery" aria-label="旅行照片画廊">
          <figure>
            <button class="photo-button" type="button" data-image="./public/images/travel-bridge.jpg" data-caption="古村水岸" aria-label="放大查看古村水岸照片">
              <picture>
                <source srcset="./public/images/travel-bridge.webp" type="image/webp" />
                <img src="./public/images/travel-bridge.jpg" width="1280" height="1707" alt="古村水岸与石拱桥的旅行风景" loading="lazy" decoding="async" />
              </picture>
            </button>
            <figcaption><span>01</span> 古村水岸</figcaption>
          </figure>
          <figure>
            <button class="photo-button" type="button" data-image="./public/images/travel-mountain.jpg" data-caption="山间云雾" aria-label="放大查看山间云雾照片">
              <picture>
                <source srcset="./public/images/travel-mountain.webp" type="image/webp" />
                <img src="./public/images/travel-mountain.jpg" width="1280" height="1707" alt="钱炳元在云雾山间旅行" loading="lazy" decoding="async" />
              </picture>
            </button>
            <figcaption><span>02</span> 山间云雾</figcaption>
          </figure>
          <figure>
            <button class="photo-button" type="button" data-image="./public/images/travel-city-lake.jpg" data-caption="城市湖畔" aria-label="放大查看城市湖畔照片">
              <picture>
                <source srcset="./public/images/travel-city-lake.webp" type="image/webp" />
                <img src="./public/images/travel-city-lake.jpg" width="1100" height="1672" alt="钱炳元在城市湖畔旅行" loading="lazy" decoding="async" />
              </picture>
            </button>
            <figcaption><span>03</span> 城市湖畔</figcaption>
          </figure>
        </div>
      </article>

      <article class="story story-maker">
        <div class="story-copy">
          <span class="story-no">03 / 动手创造</span>
          <p class="story-label">喜欢动手</p>
          <h3>把想法，<br>一点点做成现实。</h3>
          <p>从一颗颗拼豆到完整的作品，动手的过程让我专注，也让我享受创造带来的成就感。</p>
        </div>
        <figure class="story-photo">
          <button class="photo-button" type="button" data-image="./public/images/hands-on-beads.jpg" data-caption="专注过程，也享受完成的喜悦" aria-label="放大查看拼豆制作照片">
            <picture>
              <source srcset="./public/images/hands-on-beads.webp" type="image/webp" />
              <img src="./public/images/hands-on-beads.jpg" width="1280" height="1707" alt="亲手制作拼豆作品的过程" loading="lazy" decoding="async" />
            </picture>
          </button>
          <figcaption>专注过程，也享受完成的喜悦</figcaption>
        </figure>
      </article>
    </section>

    <section class="contact" id="contact">
      <div>
        <p class="section-index light">07 / 联系我</p>
        <h2>很高兴<br>认识你<span>。</span></h2>
      </div>
      <div class="contact-card">
        <p>如果你也喜欢计算机、AI、篮球、唱歌或林俊杰，欢迎来交流认识。手机号默认隐藏，仅在点击后显示。</p>
        <div class="contact-actions">
          <button class="contact-row" type="button" data-copy-douyin>
            <span>抖音 · 点击复制</span>
            <strong>@qby081024</strong>
            <i>复制</i>
          </button>
          <button class="contact-row" type="button" data-phone-reveal>
            <span>手机 · 点击后显示</span>
            <strong>仅在需要时查看</strong>
            <i>查看</i>
          </button>
        </div>
        <p class="contact-status" aria-live="polite"></p>
      </div>
    </section>
  </main>

  <footer>
    <a class="brand" href="#top">钱炳元<span>。</span></a>
    <p>© <span data-current-year></span> 钱炳元 · 保持好奇，持续成长</p>
    <a href="#top">回到顶部 ↑</a>
  </footer>

  <dialog class="image-viewer" aria-label="照片预览">
    <button class="viewer-close" type="button" aria-label="关闭照片预览">×</button>
    <button class="viewer-nav viewer-prev" type="button" aria-label="查看上一张照片">←</button>
    <figure>
      <img src="" alt="" />
      <figcaption></figcaption>
    </figure>
    <button class="viewer-nav viewer-next" type="button" aria-label="查看下一张照片">→</button>
    <p class="viewer-count" aria-live="polite"></p>
  </dialog>
`

const nav = document.querySelector('[data-nav]')
const menuToggle = document.querySelector('.menu-toggle')
const siteNav = document.querySelector('#site-nav')
const themeToggle = document.querySelector('[data-theme-toggle]')
const themeLabel = document.querySelector('[data-theme-label]')

const updateThemeControl = () => {
  const dark = document.documentElement.dataset.theme === 'dark'
  themeLabel.textContent = dark ? '浅色' : '深色'
  themeToggle.setAttribute('aria-label', dark ? '切换为浅色主题' : '切换为深色主题')
}

updateThemeControl()

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = nextTheme
  try {
    localStorage.setItem('qby-theme', nextTheme)
  } catch {
    // 隐私模式下仍然允许本次切换，只是不记住选择。
  }
  updateThemeControl()
})

const setMenu = (open) => {
  nav.classList.toggle('is-open', open)
  document.body.classList.toggle('menu-open', open)
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单')
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true')
})

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false)
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible')
  })
}, { threshold: 0.12 })

document.querySelectorAll('section:not(.hero):not(.cover)').forEach((el) => {
  el.classList.add('observe')
  observer.observe(el)
})

const contactStatus = document.querySelector('.contact-status')
const douyinButton = document.querySelector('[data-copy-douyin]')
const phoneButton = document.querySelector('[data-phone-reveal]')

douyinButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('qby081024')
    contactStatus.textContent = '抖音号已复制：qby081024'
  } catch {
    contactStatus.textContent = '抖音号：qby081024'
  }
})

phoneButton.addEventListener('click', () => {
  const phone = atob('MTg0NTUwNzA1NzA=')

  if (phoneButton.dataset.revealed === 'true') {
    window.location.href = `tel:${phone}`
    return
  }

  phoneButton.dataset.revealed = 'true'
  phoneButton.querySelector('span').textContent = '手机 · 再次点击拨打'
  phoneButton.querySelector('strong').textContent = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  phoneButton.querySelector('i').textContent = '拨打'
  contactStatus.textContent = '手机号已显示；再次点击可以拨打。'
})

const imageViewer = document.querySelector('.image-viewer')
const viewerImage = imageViewer.querySelector('img')
const viewerCaption = imageViewer.querySelector('figcaption')
const viewerClose = imageViewer.querySelector('.viewer-close')
const viewerPrev = imageViewer.querySelector('.viewer-prev')
const viewerNext = imageViewer.querySelector('.viewer-next')
const viewerCount = imageViewer.querySelector('.viewer-count')
const galleryItems = [...document.querySelectorAll('[data-image]')]
let activeImageIndex = 0

const showImage = (index) => {
  activeImageIndex = (index + galleryItems.length) % galleryItems.length
  const button = galleryItems[activeImageIndex]
  viewerImage.src = button.dataset.image
  viewerImage.alt = button.getAttribute('aria-label').replace('放大查看', '')
  viewerCaption.textContent = button.dataset.caption
  viewerCount.textContent = `${activeImageIndex + 1} / ${galleryItems.length}`
}

galleryItems.forEach((button, index) => {
  button.addEventListener('click', () => {
    showImage(index)
    imageViewer.showModal()
  })
})

viewerClose.addEventListener('click', () => imageViewer.close())
viewerPrev.addEventListener('click', () => showImage(activeImageIndex - 1))
viewerNext.addEventListener('click', () => showImage(activeImageIndex + 1))
imageViewer.addEventListener('click', (event) => {
  if (event.target === imageViewer) imageViewer.close()
})

document.addEventListener('keydown', (event) => {
  if (!imageViewer.open) return
  if (event.key === 'ArrowLeft') showImage(activeImageIndex - 1)
  if (event.key === 'ArrowRight') showImage(activeImageIndex + 1)
})

document.querySelector('[data-current-year]').textContent = new Date().getFullYear()
