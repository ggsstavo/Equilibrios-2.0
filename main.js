function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.add('open');
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function() {
  // Fecha a sidebar ao clicar em links internos
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach(link => {
      link.addEventListener('click', hideSidebar);
  });

  // Fecha a sidebar ao clicar fora ou no menu button
  document.addEventListener('click', function(event) {
      const sidebar = document.querySelector('.sidebar');
      const menuButton = document.querySelector('.menu-buttom');

      if (sidebar.classList.contains('open') && 
          !sidebar.contains(event.target) &&
          !event.target.closest('.menu-buttom')) {
          hideSidebar();
      }
  });
});

  // PRECISA FAZER COM QUE QUANDO CLICAR NO #CLIENTES A SIDEBAR SE FECHA INDO PARA O LADO E NAO NAO SENDO MAIS EXIBIDA

  document.addEventListener("DOMContentLoaded", function () {
    const numbers = document.querySelectorAll(".number");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          animateCount(entry.target.querySelector(".count"));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    numbers.forEach((number) => {
      observer.observe(number);
    });

    function animateCount(element) {
      const target = parseFloat(element.getAttribute("data-target"));
      const duration = 3000;
      const fps = 60;
      const totalFrames = (duration / 1000) * fps;
      const increment = target / totalFrames;

      let current = 0;

      function updateCount() {
        current += increment;

        if (current >= target) {
          current = target;
        } else {
          requestAnimationFrame(updateCount);
        }

        element.textContent = formatNumber(current, target);
      }

      updateCount();
    }

    function formatNumber(number, target) {
      // Formata o número final para o formato desejado
      if (target === 3) {
        return Math.floor(number);
      }

      if (target === 2500) {
        if (number < 1000) {
          return "+" + Math.floor(number);
        } else {
          return "+" + (number / 1000).toFixed(1) + " mil";
        }
      }

      return "+" + Math.floor(number);
    }
  });




  // Seleciona os radio buttons e o contêiner de imagens
  const imageBanner = document.querySelector('.image-banner');
const images = Array.from(document.querySelectorAll('.image-banner img'));
const totalImages = images.length;
let currentIndex = 0;
let autoSlideInterval;

// Configurações responsivas
const getSettings = () => ({
  isMobile: window.innerWidth <= 768,
  gap: parseInt(getComputedStyle(imageBanner).gap) || 0,
  clonesQty: window.innerWidth <= 768 ? 1 : 3
});

// Configuração inicial
let settings = getSettings();
let imageWidth = images[0].clientWidth + settings.gap;

// Clonagem responsiva
const setupClones = () => {
  // Remove clones existentes
  const existingClones = imageBanner.querySelectorAll('.clone');
  existingClones.forEach(clone => clone.remove());

  // Cria novos clones
  const firstClones = images.slice(0, settings.clonesQty)
      .map(img => { const c = img.cloneNode(); c.classList.add('clone'); return c; });
  const lastClones = images.slice(-settings.clonesQty)
      .map(img => { const c = img.cloneNode(); c.classList.add('clone'); return c; });

  lastClones.reverse().forEach(clone => imageBanner.insertBefore(clone, imageBanner.firstChild));
  firstClones.forEach(clone => imageBanner.appendChild(clone));
};

setupClones();
imageBanner.style.transform = `translateX(${-settings.clonesQty * imageWidth}px)`;

// Função para mostrar a próxima imagem
function showNextImage() {
  currentIndex++;
  imageBanner.style.transition = 'transform 0.5s ease-in-out';
  imageBanner.style.transform = `translateX(${-(currentIndex + settings.clonesQty) * imageWidth}px)`;

  if (currentIndex >= totalImages) {
      currentIndex = 0;
      setTimeout(() => {
          imageBanner.style.transition = 'none';
          imageBanner.style.transform = `translateX(${-settings.clonesQty * imageWidth}px)`;
      }, 500);
  }
  updateNavigation();
}

// Atualizar navegação
function updateNavigation() {
  const sectionSize = settings.isMobile ? 1 : Math.ceil(totalImages / document.querySelectorAll('.navigation input').length);
  const sectionIndex = Math.floor(currentIndex / sectionSize);
  
  document.querySelectorAll('.navigation input').forEach((input, i) => {
      input.checked = i === sectionIndex;
  });
}

// Eventos de navegação
document.querySelectorAll('.navigation input').forEach((input, index) => {
  input.addEventListener('change', () => {
      const sectionSize = settings.isMobile ? 1 : Math.ceil(totalImages / document.querySelectorAll('.navigation input').length);
      currentIndex = index * sectionSize;
      
      imageBanner.style.transition = `transform 0.5s ease-in-out`;
      imageBanner.style.transform = `translateX(${-(currentIndex + settings.clonesQty) * imageWidth}px)`;
      
      clearInterval(autoSlideInterval);
      setTimeout(() => {
          autoSlideInterval = setInterval(showNextImage, 4500);
      }, 8000);
  });
});

/// Modifique o evento touchstart
imageBanner.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  clearInterval(autoSlideInterval);
}, { passive: true }); // Adicione esta opção

// Modifique o evento touchend
imageBanner.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > 50) {
      if (diff > 0) showNextImage();
      else if (currentIndex > 0) currentIndex -= 2;
  }
  autoSlideInterval = setInterval(showNextImage, 4500);
}, { passive: true }); // Adicione esta opção

// Modifique o evento resize
window.addEventListener('resize', () => {
  settings = getSettings();
  imageWidth = images[0].clientWidth + settings.gap;
  setupClones();
  imageBanner.style.transform = `translateX(${-settings.clonesQty * imageWidth}px)`;
  currentIndex = 0;
  updateNavigation();
}, { passive: true }); // Adicione esta opção












// Controle das setas
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function showPreviousImage() {
  currentIndex--;
  if (currentIndex < 0) {
      currentIndex = totalImages - 1;
      imageBanner.style.transition = 'none';
      imageBanner.style.transform = `translateX(${-(totalImages + settings.clonesQty) * imageWidth}px)`;
      setTimeout(() => {
          imageBanner.style.transition = 'transform 0.5s ease-in-out';
          currentIndex = totalImages - 1;
          imageBanner.style.transform = `translateX(${-(currentIndex + settings.clonesQty) * imageWidth}px)`;
      }, 10);
  } else {
      imageBanner.style.transition = 'transform 0.5s ease-in-out';
      imageBanner.style.transform = `translateX(${-(currentIndex + settings.clonesQty) * imageWidth}px)`;
  }
  updateNavigation();
}

prevButton.addEventListener('click', () => {
  clearInterval(autoSlideInterval);
  showPreviousImage();
  autoSlideInterval = setInterval(showNextImage, 4500);
});

nextButton.addEventListener('click', () => {
  clearInterval(autoSlideInterval);
  showNextImage();
  autoSlideInterval = setInterval(showNextImage, 4500);
});

// Atualize a função de redimensionamento
window.addEventListener('resize', () => {
  settings = getSettings();
  imageWidth = images[0].clientWidth + settings.gap;
  setupClones();
  imageBanner.style.transform = `translateX(${-settings.clonesQty * imageWidth}px)`;
  currentIndex = 0;
  updateNavigation();
  
  // Força o reposicionamento das setas
  if (settings.isMobile) {
      document.querySelector('.catalog').style.padding = '0 20px';
  } else {
      document.querySelector('.catalog').style.padding = '0';
  }
});











document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector('.loading-overlay');
  const carrossel = document.querySelector('.carrossel');
  const container = document.querySelector('.container-slider');
  
  // Abortar se elementos críticos não existirem
  if (!overlay || !carrossel || !container) return;

  const images = carrossel.querySelectorAll('img');
  let loadedImages = 0;
  let hasErrors = false;

  const hideOverlay = () => {
      overlay.classList.add('hidden');
      setTimeout(() => {
          overlay.remove();
          container.classList.add('loaded');
      }, 500);
  };

  // Caso sem imagens
  if (images.length === 0) {
      hideOverlay();
      return;
  }

  // Verificador de estado de carregamento
  const checkLoadingState = () => {
      // Esconder se pelo menos uma imagem carregou
      if (loadedImages > 0) hideOverlay();
      
      // Esconder após 2s se todas falharem
      if (loadedImages === 0 && hasErrors) {
          setTimeout(hideOverlay, 2000);
      }
  };

  // Gerenciador de eventos para imagens
  const handleImageLoad = (success = true) => {
      loadedImages += success ? 1 : 0;
      hasErrors = hasErrors || !success;
      checkLoadingState();
  };

  // Monitorar todas as imagens
  images.forEach(img => {
      if (img.complete) {
          handleImageLoad(img.naturalHeight > 0);
      } else {
          img.addEventListener('load', () => handleImageLoad(true));
          img.addEventListener('error', () => handleImageLoad(false));
      }
  });

  // Fallback otimizado
  let timeout = setTimeout(() => {
      if (loadedImages === 0) hideOverlay();
  }, 19000);

  // Cancelar timeout se necessário
  overlay.addEventListener('transitionend', () => clearTimeout(timeout));
});







const menuLinks = document.querySelectorAll('.nav-list a[href^="#"], .sidebar a[href^="#"]');
let isAnimating = false;
let lastClick = 0;

function smoothScrollTo(targetPosition, duration = 1200) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  isAnimating = true;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      isAnimating = false;
    }
  }

  requestAnimationFrame(animation);
}

function handleScroll(event) {
  event.preventDefault();
  if (isAnimating || Date.now() - lastClick < 1000) return;
  lastClick = Date.now();

  const targetUrl = new URL(event.target.href);
  const currentUrl = new URL(window.location.href);

  // Cross-page navigation
  if (targetUrl.pathname !== currentUrl.pathname) {
    window.location.href = targetUrl.href;
    return;
  }

  const hash = targetUrl.hash;
  const target = document.querySelector(hash);
  
  if (target) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 90;
    const targetPosition = target.offsetTop - headerHeight;
    
    smoothScrollTo(targetPosition);
    history.pushState(null, null, hash);
  }
}

function handleHashScroll() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 90;
      const targetPosition = target.offsetTop - headerHeight;
      
      smoothScrollTo(targetPosition, 800); // Animação mais rápida
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', handleHashScroll);
window.addEventListener('popstate', handleHashScroll);
menuLinks.forEach(link => link.addEventListener('click', handleScroll));

// Observer apenas para as imagens dos containers específicos
const recordesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Garante que o src só seja carregado uma vez
      if (!img.src && img.dataset.src) {
        img.src = img.dataset.src;
      }

      // Adiciona a classe quando a imagem estiver carregada
      img.onload = () => img.classList.add('loaded');
      
      // Otimização: Para de observar após o primeiro trigger
      recordesObserver.unobserve(img);
    }
  });
}, { 
  rootMargin: '200px', // Carrega 200px antes de entrar na tela
  threshold: 0.1 
});

// Seleciona apenas as imagens dentro dos containers desejados
document.querySelectorAll(`
  .main-image img,
  .small-images img,
  .mobile-recorde img
`).forEach(img => {
  // Mantém o lazy loading nativo como fallback
  img.loading = 'lazy';
  
  // Move o src para data-src (exceto se já estiver carregado)
  if (!img.complete) {
    img.dataset.src = img.src;
    img.removeAttribute('src');
  }
  
  // Inicia a observação
  recordesObserver.observe(img);
});