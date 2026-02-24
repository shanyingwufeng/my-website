<script setup lang="ts"></script>

<template>
  <div class="page">
    <header class="header">
      <div class="container nav">
        <div class="logo">Nest <span>& Co</span> Interiors</div>
        <nav class="links">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>

    <main class="container">
      <section class="hero">
        <div>
          <h1>Simple, warm home renovations in New Zealand.</h1>
          <p>
            We help homeowners refresh kitchens, bathrooms, and living spaces with natural tones,
            quality finishes, and transparent pricing.
          </p>
          <div class="actions">
            <a class="btn primary" href="#contact">Get a Free Quote</a>
            <a class="btn light" href="#projects">View Our Work</a>
          </div>
        </div>
        <div class="hero-card">
          <img
            src="https://images.unsplash.com/photo-1616594039964-3d5d8f7f2d3d?auto=format&fit=crop&w=1200&q=80"
            alt="Warm renovated living room"
          />
        </div>
      </section>

      <section id="services" class="section">
        <h2>What we renovate</h2>
        <p class="muted">Comfortable spaces, timeless style, and a smooth process from start to finish.</p>
        <div class="grid">
          <article class="card">
            <h3>Kitchen Renovation</h3>
            <p>Layout optimisation, cabinetry, benchtops, lighting, and appliance integration.</p>
          </article>
          <article class="card">
            <h3>Bathroom Makeovers</h3>
            <p>Waterproofing, tiling, vanities, fixtures, and modern space-saving designs.</p>
          </article>
          <article class="card">
            <h3>Full Interior Refresh</h3>
            <p>Painting, flooring, custom storage, and styling for a complete new feel.</p>
          </article>
        </div>
      </section>

      <section id="projects" class="section">
        <h2>Why homeowners choose us</h2>
        <div class="stats">
          <div class="stat"><strong>280+</strong><span>Homes Renovated</span></div>
          <div class="stat"><strong>4.9/5</strong><span>Average Rating</span></div>
          <div class="stat"><strong>12 yrs</strong><span>NZ Experience</span></div>
        </div>
      </section>

      <section id="contact" class="cta">
        <h2>Ready to transform your home?</h2>
        <p>Email us at <strong>hello@nestcointeriors.co.nz</strong> or call <strong>0800 637 826</strong>.</p>
        <a class="btn primary" href="mailto:hello@nestcointeriors.co.nz">Contact Us</a>
      </section>
    </main>

    <footer class="footer">© 2026 Nest & Co Interiors · Auckland, New Zealand</footer>
  </div>
</template>

<style scoped>
:global(:root) {
  --bg: #f8f3ec;
  --card: #fffdf9;
  --text: #2f2a24;
  --muted: #7a6d61;
  --brand: #a66a3f;
  --brand-soft: #f2e5d8;
  --line: #eadfce;
}

.page {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(248, 243, 236, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--line);
}

.nav {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 20px;
}

.logo span {
  color: var(--brand);
}

.links a {
  margin-left: 18px;
  color: var(--muted);
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
  align-items: center;
  padding: 56px 0 26px;
}

.hero h1 {
  font-size: clamp(30px, 5vw, 46px);
  line-height: 1.15;
}

.hero p {
  margin: 14px 0 22px;
  color: var(--muted);
}

.hero-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 8px 24px rgba(64, 39, 18, 0.07);
}

.hero-card img {
  display: block;
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 12px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  text-decoration: none;
  border-radius: 10px;
  padding: 11px 18px;
  font-weight: 600;
}

.btn.primary {
  background: var(--brand);
  color: #fff;
}

.btn.light {
  background: var(--brand-soft);
  color: #7a4b2a;
}

.section {
  padding: 22px 0;
}

.section h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.muted {
  color: var(--muted);
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.card,
.stat,
.cta {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.card {
  padding: 18px;
}

.card h3 {
  margin-bottom: 6px;
}

.card p {
  color: var(--muted);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat {
  padding: 16px;
  text-align: center;
}

.stat strong {
  display: block;
  color: var(--brand);
  font-size: 28px;
}

.stat span {
  color: var(--muted);
  font-size: 13px;
}

.cta {
  margin: 26px 0 40px;
  text-align: center;
  padding: 24px;
}

.cta p {
  color: var(--muted);
  margin: 8px 0 16px;
}

.footer {
  text-align: center;
  color: var(--muted);
  font-size: 13px;
  padding: 0 0 30px;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .grid,
  .stats {
    grid-template-columns: 1fr;
  }

  .links {
    display: none;
  }

  .hero-card img {
    height: 240px;
  }
}
</style>
