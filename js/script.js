// ========== Pop-up ==========
const botaoContato = document.querySelector(".btn-contato");
const popup = document.querySelector(".popup");
if (botaoContato && popup) {
  botaoContato.addEventListener("click", function () {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  });
}

// ========== Botão de Voltar ao Topo ==========
const btnTopo = document.querySelector(".btn-topo");
window.addEventListener("scroll", function () {
  btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
});
btnTopo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== CARROSSEL DE DEPOIMENTOS ==========
document.addEventListener("DOMContentLoaded", function () {
  // 1. Pegar todos os depoimento-card que já existem
  const cards = document.querySelectorAll(".depoimento-card");
  if (cards.length === 0) return;

  //========== BOTÕES PARA FRENTE E TRÁS ==========
  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      let novo = (indiceAtual - 1 + slides.length) % slides.length;
      mostrarSlide(novo);
      resetarIntervalo();
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      proximoSlide();
      resetarIntervalo();
    });
  }

  // 2. Criar a estrutura do carrossel
  const sectionDepo = document.querySelector(".depoimentos");
  const container = document.createElement("div");
  container.className = "carrossel-container";
  const slidesWrapper = document.createElement("div");
  slidesWrapper.className = "carrossel-slides";

  // 3. Mover cada card para dentro do slidesWrapper e adicionar classe 'depoimento-card' (já tem) e 'slide' (opcional)
  cards.forEach((card, idx) => {
    card.classList.add("slide");
    if (idx === 0) card.classList.add("ativo"); // primeiro visível
    slidesWrapper.appendChild(card);
  });
  container.appendChild(slidesWrapper);

  // 4. Inserir o container na seção, depois do parágrafo
  const paragrafo = sectionDepo.querySelector(".hero-text");
  sectionDepo.insertBefore(container, paragrafo.nextSibling);

  // 5. Criar indicadores (bolinhas)
  const indicadoresDiv = document.createElement("div");
  indicadoresDiv.className = "indicadores";
  cards.forEach((_, idx) => {
    const bolinha = document.createElement("span");
    bolinha.className = "dot";
    if (idx === 0) bolinha.classList.add("ativo");
    bolinha.dataset.index = idx;
    bolinha.addEventListener("click", () => irParaSlide(idx));
    indicadoresDiv.appendChild(bolinha);
  });
  container.appendChild(indicadoresDiv);

  // 6. Variáveis de controle
  let slides = document.querySelectorAll(".depoimento-card"); // os mesmos cards, agora dentro do carrossel
  let dots = document.querySelectorAll(".dot");
  let indiceAtual = 0;
  let intervaloId = null;
  const tempoTroca = 4000; // 4 segundos (mude aqui se quiser)

  // 7. Função que mostra um slide específico
  function mostrarSlide(index) {
    slides.forEach((slide) => slide.classList.remove("ativo"));
    dots.forEach((dot) => dot.classList.remove("ativo"));
    slides[index].classList.add("ativo");
    dots[index].classList.add("ativo");
    indiceAtual = index;
  }

  // 8. Avançar para o próximo
  function proximoSlide() {
    let novo = (indiceAtual + 1) % slides.length;
    mostrarSlide(novo);
  }

  // 9. Ir para um slide específico (usado pelas bolinhas)
  function irParaSlide(index) {
    if (index === indiceAtual) return;
    mostrarSlide(index);
    resetarIntervalo();
  }

  // 10. Controle do intervalo automático
  function iniciarIntervalo() {
    if (intervaloId === null) {
      intervaloId = setInterval(proximoSlide, tempoTroca);
    }
  }
  function pararIntervalo() {
    if (intervaloId !== null) {
      clearInterval(intervaloId);
      intervaloId = null;
    }
  }
  function resetarIntervalo() {
    pararIntervalo();
    iniciarIntervalo();
  }

  // 11. PAUSA AO PASSAR O MOUSE (o que você queria!)
  container.addEventListener("mouseenter", pararIntervalo);
  container.addEventListener("mouseleave", iniciarIntervalo);

  // 12. Ligar o carrossel
  iniciarIntervalo();
});

// ========== MENU MOBILE ==========
const menuBtn = document.querySelector(".menu-mobile-btn");
const navMenu = document.querySelector(".nav");
const body = document.body;

function toggleMenu() {
  const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", !isExpanded);
}

function closeMenuOnLinkClick() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

function closeMenuOnResize() {
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });
}

if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
  closeMenuOnLinkClick();
  closeMenuOnResize();
}
