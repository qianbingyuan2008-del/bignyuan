document.querySelector('#app').innerHTML = `
  <header class="nav">
    <a class="brand" href="#top" aria-label="返回首页">QBY<span>.</span></a>
    <nav aria-label="主导航">
      <a href="#about">关于我</a>
      <a href="#moments">生活片段</a>
      <a class="nav-contact" href="tel:18455070570">联系我</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow reveal">HELLO, NICE TO MEET YOU</p>
        <h1 id="hero-title" class="reveal delay-1">我是<br><span>钱炳元</span></h1>
        <p class="intro reveal delay-2">2008 年出生。认真生活，自在前行，<br>在每一次出发中认识更好的自己。</p>
        <div class="hero-actions reveal delay-3">
          <a class="button primary" href="#about">认识我 <span>↘</span></a>
          <a class="text-link" href="tel:18455070570">184 5507 0570</a>
        </div>
      </div>
      <div class="hero-visual reveal delay-2">
        <div class="photo-frame">
          <img src="./public/images/qianbingyuan-portrait.jpg" alt="钱炳元在徽州宏村的生活照" />
        </div>
        <p class="vertical">保持热爱 · 奔赴山海</p>
        <div class="year-stamp"><b>08</b><span>BORN IN<br>2008</span></div>
      </div>
      <div class="scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section class="manifesto" id="about">
      <p class="section-index">01 / ABOUT</p>
      <div>
        <p class="kicker">少年自有凌云志</p>
        <h2>世界很大，<br>我正在<span>路上</span>。</h2>
      </div>
      <div class="about-copy">
        <p>我是钱炳元，一个 2008 年出生、正在探索世界的年轻人。我喜欢把平凡日子过得有意思，也相信每一次经历都会成为成长的坐标。</p>
        <div class="traits">
          <span>真诚</span><span>行动</span><span>热爱</span><span>成长</span>
        </div>
      </div>
    </section>

    <section class="moments" id="moments">
      <div class="moment-photo">
        <img src="./public/images/qianbingyuan-mountain.jpg" alt="钱炳元登山时的生活照" loading="lazy" />
        <span class="photo-no">02</span>
      </div>
      <div class="moment-copy">
        <p class="section-index">02 / MOMENTS</p>
        <p class="big-quote">“向上走，<br>风景自然会来。”</p>
        <p>脚步丈量远方，镜头收藏当下。生活不是等待答案，而是在出发中写下答案。</p>
        <div class="coordinates">30.1° N&nbsp;&nbsp; 118.2° E<br><span>HUANGSHAN · CHINA</span></div>
      </div>
    </section>

    <section class="contact" id="contact">
      <div>
        <p class="section-index light">03 / CONTACT</p>
        <h2>很高兴<br>认识你<span>。</span></h2>
      </div>
      <div class="contact-card">
        <p>如果你想认识我，或有任何想说的话，欢迎随时联系。</p>
        <a href="tel:18455070570">
          <span>CALL ME</span>
          <strong>184 5507 0570</strong>
          <i>↗</i>
        </a>
      </div>
    </section>
  </main>

  <footer>
    <a class="brand" href="#top">QBY<span>.</span></a>
    <p>© 2026 钱炳元 · 保持热爱，奔赴山海</p>
    <a href="#top">回到顶部 ↑</a>
  </footer>
`

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible')
  })
}, { threshold: 0.12 })

document.querySelectorAll('section:not(.hero)').forEach((el) => {
  el.classList.add('observe')
  observer.observe(el)
})
