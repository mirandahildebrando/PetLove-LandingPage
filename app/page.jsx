"use client";
// @ts-nocheck
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const navbarRef = useRef(null);

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // Navbar scrolled effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Counter animation for stats
  useEffect(() => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animating) {
          entry.target.dataset.animating = 'true';
          const target = parseInt(entry.target.dataset.target);
          let current = 0;
          const increment = target / 50;
          const duration = 1500;
          const stepTime = duration / 50;

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target;
              clearInterval(counter);
            } else {
              entry.target.textContent = Math.floor(current);
            }
          }, stepTime);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => {
      counterObserver.observe(el);
    });

    return () => {
      counterObserver.disconnect();
    };
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  // Gallery placeholder click handler
  useEffect(() => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const placeholder = this.querySelector('.gallery-placeholder');
        placeholder.style.transform = 'scale(1.05)';
        setTimeout(() => {
          placeholder.style.transform = '';
        }, 300);
      });
    });
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <div className="logo">Petlove</div>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home" onClick={closeMenu}>Início</a></li>
            <li><a href="#servicos" onClick={closeMenu}>Serviços</a></li>
            <li><a href="#galeria" onClick={closeMenu}>Galeria</a></li>
            <li><a href="#contato" onClick={closeMenu}>Contato</a></li>
          </ul>
          <button className="hamburger" id="hamburger" aria-label="Menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line">Banho e tosa</span>
              <span className="line">que seu pet merece</span>
            </h1>
            <div className="hero-badge">
              <span className="badge-text">Primeiro banho com 20% de desconto!</span>
            </div>
            <div className="hero-ctas">
              <a href="https://wa.me/5511976105169?text=Ol%C3%A1%21+Vi+seu+site+e+quero+agendar+um+banho+e+tosa+para+meu+pet." 
                 target="_blank" 
                 className="btn btn-primary">
                Agendar pelo WhatsApp
              </a>
              <a href="#galeria" className="btn btn-secondary">
                Veja Nossa Galeria
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number" data-target="1500">0</span>
                <span className="stat-label">Pets Atendidos</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-target="1395">0</span>
                <span className="stat-label">Seguidores no Instagram</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-target="100">0</span>
                <span className="stat-label">% Satisfação</span>
              </div>
            </div>
            <div className="hero-scroll">
              <div className="scroll-mouse">
                <div className="scroll-wheel"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services" id="servicos">
          <div className="container reveal">
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-subtitle">Cuidados completos para o seu pet</p>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🐾</div>
                <h3>Banho</h3>
                <p>Banho com produtos premium, respeitando o pH da pele e pelagem do seu pet.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">✂️</div>
                <h3>Tosa</h3>
                <p>Tosa higiênica, modelagem e cortes especiais com técnicas profissionais.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">💧</div>
                <h3>Hidratação</h3>
                <p>Tratamentos de hidratação profunda para pelagens ressecadas e sem brilho.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">👂</div>
                <h3>Limpeza de Ouvido</h3>
                <p>Limpeza e higiene dos ouvidos com produtos seguros e específicos.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">🦷</div>
                <h3>Escovação de Dente</h3>
                <p>Escovação dental para prevenção de tártaro e mau hálito no seu pet.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">✂️</div>
                <h3>Corte de Unha</h3>
                <p>Corte de unhas com segurança e precisão, evitando acidentes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section gallery" id="galeria">
          <div className="container reveal">
            <h2 className="section-title">Galeria de Fotos</h2>
            <div className="gallery-grid" id="galleryGrid">
              <div className="gallery-item" data-category="banho">
                <img src="/assets/fotos/bulldog.png" alt="Pet no banho 2" className="gallery-img" />
              </div>
              <div className="gallery-item" data-category="banho">
                <img src="/assets/fotos/dog2.jpg" alt="Pet no banho" className="gallery-img" />
              </div>
              <div className="gallery-item" data-category="tosa">
                <img src="/assets/fotos/dog3.png" alt="Pet na tosa" className="gallery-img" />
              </div>
              <div className="gallery-item" data-category="banho">
                <img src="/assets/fotos/dog7.png" alt="Pet no banho 3" className="gallery-img" />
              </div>
              <div className="gallery-item" data-category="tosa">
                <img src="/assets/fotos/gato.png" alt="Gato na tosa" className="gallery-img" />
              </div>
              <div className="gallery-item" data-category="banho">
                <img src="/assets/fotos/dog8.jpg" alt="Pet no banho 4" className="gallery-img" />
              </div>
            </div>
          </div>
        </section>

        <section className="section transporte" id="transporte">
          <div className="container reveal">
            <h2 className="section-title">Busca e Entrega Pet</h2>
            <p className="section-subtitle">Traslado confortável e seguro para seu pet</p>
            <div className="transporte-wrapper">
              <div className="transporte-image">
                <img src="/assets/fotos/carro.jpg" alt="Veículo de busca e entrega" className="transporte-img" style={{ width: '100%', maxWidth: '350px', height: 'auto', display: 'block', margin: '0 auto' }} />
              </div>
              <div className="transporte-text">
                <p>Oferecemos serviço de busca e entrega para maior comodidade. Buscamos seu pet em sua casa e o devolvemos após o atendimento, tudo combinado previamente via WhatsApp.</p>
                <p>Agende o transporte junto com o serviço de banho ou tosa diretamente pelo nosso WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

<section className="section testimonials">
          <div className="container">
            <h2 className="section-title">O Que Dizem Dos Nossos Pets</h2>
            <div className="testimonials-grid reveal">
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"A Letícia é incrível! Meu cachorro adora o banho dela e sempre sai super cheiroso e feliz. Recomendo a todos!"</p>
                <div className="testimonial-author">
                  <strong>Dona Maria</strong>
                  <span>Cliente desde 2023</span>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"O atendimento da petlove_ofanimals é impecável. Minha gatinha ficou super tranquila na tosa e limpeza de orelha. Voltaremos sempre!"</p>
                <div className="testimonial-author">
                  <strong>Sr. Carlos</strong>
                  <span>Cliente desde 2024</span>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"Meu cachorro é ansioso, mas a Letícia tem um jeito especial com os animais. Ele sempre sai relaxado e bem cuidado. Serviço 5 estrelas!"</p>
                <div className="testimonial-author">
                  <strong>Ana Paula</strong>
                  <span>Cliente desde 2022</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section trust" id="trust">
          <div className="container reveal">
            <h2 className="section-title">Por Que Nos Escolher?</h2>
            <p className="section-subtitle">Diferenciais que nos tornam a melhor escolha para o seu pet</p>
            <div className="trust-grid">
              <div className="trust-card">
                <div className="trust-icon">🏆</div>
                <h3>Anos de Experiência</h3>
                <p>Mais de 5 anos atendendo pets com dedicação e amor.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">💯</div>
                <h3>Satisfação Garantida</h3>
                <p>Se não ficar satisfeito, refazemos o serviço sem custo adicional.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">🌿</div>
                <h3>Produtos Premium</h3>
                <p>Usamos apenas produtos de alta qualidade, hipoalergênicos e seguros.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">❤️</div>
                <h3>Amor e Cuidado</h3>
                <p>Cada pet recebe tratamento individualizado com muito carinho.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="container reveal">
            <h2 className="section-title">Entre em Contato</h2>
            <p className="section-subtitle">Agendamentos realizados exclusivamente pelo WhatsApp para melhor atendimento</p>
            <div className="contact-wrapper" style={{ display: 'block', textAlign: 'center' }}>
              <div className="contact-simple" style={{ display: 'inline-block' }}>
                <p className="contact-message">PetLove: Mais de 1.500 pets cuidados com muito carinho.</p>
                <a href="https://wa.me/5511976105169?text=Ol%C3%A1%21+Vi+seu+site+e+quero+agendar+um+banho+e+tosa+para+meu+pet." 
                   className="btn btn-primary">
                  Agendar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>petlove_ofanimals</h3>
              <p>Serviços profissionais de banho, tosa e cuidados especiais para o seu pet, cuidando com amor e dedicação.</p>
            </div>
            <div className="footer-links">
              <h4>Links Rápidos</h4>
              <a href="#home">Início</a>
              <a href="#servicos">Serviços</a>
              <a href="#galeria">Galeria</a>
              <a href="#contato">Contato</a>
            </div>
            <div className="footer-social">
              <h4>Redes Sociais</h4>
              <div className="social-icons">
                <a href="https://instagram.com/petlove_ofanimals" target="_blank" aria-label="Instagram">
                  <img src="/assets/fotos/Instagram_logo_2016.svg.webp" alt="Instagram" 
                       style={{ width: '20px', height: '20px', marginRight: '6px', verticalAlign: 'middle' }} />
                  @petlove_ofanimals
                </a>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                <span>5.357 posts</span>
                <span>·</span>
                <span>1.395 seguidores</span>
                <span>·</span>
                <span>1.371 seguindo</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 petlove_ofanimals. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
