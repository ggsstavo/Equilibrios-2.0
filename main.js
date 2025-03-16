function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('open');
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('open');
  }

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











document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.querySelector('.loading-overlay');
  const firstImage = document.querySelector('.item-slider:first-child img');

  const hideOverlay = () => {
  overlay.classList.add('hidden');
  setTimeout(() => {
      overlay.remove();
      // Adiciona classe ao container quando o loading terminar
      document.querySelector('.container-slider').classList.add('loaded');
  }, 500);
};

  // Verificação direta do carregamento
  if(firstImage.complete) {
      hideOverlay();
  } else {
      firstImage.addEventListener('load', hideOverlay);
  }

  // Fallback de tempo seguro
  setTimeout(hideOverlay, 19000); // 19s = 18s animação + 1s margem
});







