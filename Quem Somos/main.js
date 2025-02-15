const beforeAfterWrap = document.querySelector(".before-after-wrap");
const afterImgWrap = beforeAfterWrap.querySelector(".img-wrap.is-after");
const dragger = beforeAfterWrap.querySelector(".dragger");

// Obtém a largura do contêiner
const parentWidth = beforeAfterWrap.offsetWidth;

let inactivityTimeout;    // Timer para detectar inatividade (em cliques/press)
let autoAnimTimeline;     // Timeline da animação automática

// Atualiza o clip-path da imagem "after" de acordo com a posição atual do dragger
function updateClipPath() {
  const currentX = gsap.getProperty(dragger, "x");
  const draggerCenter = (parentWidth / 2) + currentX;
  const progress = draggerCenter / parentWidth;
  const clipValue = progress * 100;
  gsap.set(afterImgWrap, { clipPath: `inset(0 ${100 - clipValue}% 0 0)` });
}

// Inicia a animação automática
function startAutoAnimation() {
  autoAnimTimeline = gsap.timeline({
    onUpdate: updateClipPath,
    onComplete: function() {
      // Ao concluir, corrige a posição do dragger (caso não esteja exatamente centralizado)
      gsap.to(dragger, { 
        x: 0, 
        duration: 0.2, 
        ease: "power1.out", 
        onUpdate: updateClipPath 
      });
      autoAnimTimeline = null;
      // Após a animação automática, reinicia o timer com 15 segundos de inatividade
      resetInactivityTimer(15000);
    }
  });
  
  // A timeline move o dragger para a direita, para a esquerda e volta para o centro
  autoAnimTimeline
    .to(dragger, { x: 100, duration: 0.5, ease: "power1.inOut" })
    .to(dragger, { x: -100, duration: 1, ease: "power1.inOut" })
    .to(dragger, { x: 0, duration: 0.5, ease: "power1.inOut" });
}

// Reinicia o timer de inatividade com o delay especificado (default: 10s)
function resetInactivityTimer(delay = 10000) {
  // Se a animação automática já estiver ocorrendo, não reinicia o timer.
  if (autoAnimTimeline) return;
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(startAutoAnimation, delay);
}

// Inicia o timer de inatividade ao carregar a página
resetInactivityTimer();

// Cria a instância do Draggable para o dragger
Draggable.create(dragger, {
  type: "x",
  // Define os limites: o valor de x varia de -(parentWidth/2) até +(parentWidth/2)
  bounds: { minX: -(parentWidth / 2), maxX: (parentWidth / 2) },
  inertia: true,
  
  // Ao pressionar (clicar/tocar) o dragger, cancela a animação automática e limpa o timer
  onPress: function() {
    if (autoAnimTimeline) {
      autoAnimTimeline.kill();
      autoAnimTimeline = null;
    }
    clearTimeout(inactivityTimeout);
  },
  
  // Durante o arraste, atualiza o clip-path e cancela qualquer animação automática
  onDrag: function() {
    if (autoAnimTimeline) {
      autoAnimTimeline.kill();
      autoAnimTimeline = null;
    }
    const draggerCenter = (parentWidth / 2) + this.x;
    const progress = draggerCenter / parentWidth;
    const clipValue = progress * 100;
    gsap.set(afterImgWrap, { clipPath: `inset(0 ${100 - clipValue}% 0 0)` });
  },
  
  // Ao soltar o dragger, reinicia o timer de inatividade com 15 segundos de delay.
  // *Não corrige a posição*, ou seja, o dragger permanece onde o usuário o deixou.
  onRelease: function() {
    resetInactivityTimer(15000);
  }
});








// função de animação para incluir reset em resize
function createAnimation() {
  const title = document.getElementById('dynamicTitle');
  const texts = ['Nossa História', 'A História da Equilibrios'];
  let index = 0;
  
  const handleResize = () => {
      // Reset animation on screen resize
      title.style.animation = 'none';
      void title.offsetWidth;
      animate();
  };

  const animate = async () => {
      title.textContent = texts[index];
      title.style.animation = `
          typing ${texts[index].length * 0.15}s steps(${texts[index].length}, end) forwards,
          cursor-blink ${1.2}s step-end infinite ${texts[index].length * 0.15}s
      `;
      
      await new Promise(res => setTimeout(res, texts[index].length * 150 + 30000));
      
      title.style.animation = `
          deleting ${texts[index].length * 0.1}s steps(${texts[index].length}, end) forwards,
          cursor-blink ${1.2}s step-end infinite
      `;
      
      await new Promise(res => setTimeout(res, texts[index].length * 100));
      
      index = (index + 1) % texts.length;
      animate();
  }

  // Adicione o listener de resize
  window.addEventListener('resize', handleResize);
  animate();
}

// Atualize o código do before-after para ser responsivo
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
      const newWidth = beforeAfterWrap.offsetWidth;
      gsap.set(dragger, { x: 0 });
      gsap.set(afterImgWrap, { clipPath: 'inset(0 50% 0 0)' });
      parentWidth = newWidth;
  }, 250);
});













function createAnimation() {
    const title = document.getElementById('dynamicTitle');
    const texts = ['Nossa História', 'A História da Equilibrios'];
    let index = 0;
    
    const animate = async () => {
      // Escrever texto
      title.textContent = texts[index];
      title.style.animation = `
        typing ${texts[index].length * 0.15}s steps(${texts[index].length}, end) forwards,
        cursor-blink ${1.2}s step-end infinite ${texts[index].length * 0.15}s
      `;
      
      await new Promise(res => setTimeout(res, texts[index].length * 150 + 30000));
      
      // Apagar texto
      title.style.animation = `
        deleting ${texts[index].length * 0.1}s steps(${texts[index].length}, end) forwards,
        cursor-blink ${1.2}s step-end infinite
      `;
      
      await new Promise(res => setTimeout(res, texts[index].length * 100));
      
      index = (index + 1) % texts.length;
      animate();
    }

    animate();
  }

  window.onload = createAnimation;
















  document.querySelectorAll('.accordion').forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    const body = accordion.querySelector('.accordion-body');
    
    header.addEventListener('click', () => {
        const isActive = accordion.classList.contains('active');
        
        // Fecha todos os accordions
        document.querySelectorAll('.accordion').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-body').classList.remove('active');
        });
        
        // Abre apenas o clicado se não estava ativo
        if (!isActive) {
            accordion.classList.add('active');
            body.classList.add('active');
        }
    });
});

function loadYouTubeIframe(element) {
  const videoId = element.getAttribute('data-video-id');
  const params = new URLSearchParams(element.getAttribute('data-params'));
  const title = element.getAttribute('data-title');
  
  // Garante autoplay=1 após o clique (mesmo se originalmente era 0)
  params.set('autoplay', '1');

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
  
  // Mantém as configurações originais específicas deste vídeo
  iframe.setAttribute('allow', 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('title', title);
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

  // Mantém o layout idêntico ao container original
  iframe.classList.add('youtube-iframe');
  
  element.parentNode.replaceChild(iframe, element);
}











// // Seleciona os elementos necessários
// const carouselFigure = document.querySelector('.carousel__figure');
// const items = document.querySelectorAll('.carousel__item');
// const prevBtn = document.querySelector('.carousel__nav.prev');
// const nextBtn = document.querySelector('.carousel__nav.next');

// const totalItems = items.length;
// const angleStep = 360 / totalItems; // 45° para 8 itens
// let currentIndex = 0;

// // Função para atualizar a rotação do container e definir o item ativo
// function updateCarousel() {
//   // Rotaciona o container de itens
//   carouselFigure.style.transform = `rotateY(${-currentIndex * angleStep}deg)`;
  
//   // Atualiza a classe "active" para o item em destaque
//   items.forEach((item, index) => {
//     if(index === currentIndex) {
//       item.classList.add('active');
//     } else {
//       item.classList.remove('active');
//     }
//   });
// }

// // Eventos dos botões
// prevBtn.addEventListener('click', () => {
//   currentIndex = (currentIndex - 1 + totalItems) % totalItems;
//   updateCarousel();
// });

// nextBtn.addEventListener('click', () => {
//   currentIndex = (currentIndex + 1) % totalItems;
//   updateCarousel();
// });








const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.dots-container');
        let currentIndex = 0;

        // Criar dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Eventos das setas
        document.querySelector('.prev').addEventListener('click', prevSlide);
        document.querySelector('.next').addEventListener('click', nextSlide);

        // Auto-play
        let autoPlay = setInterval(nextSlide, 8000);

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            dotsContainer.children[currentIndex].classList.add('active');
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentIndex].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
            resetAutoPlay();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
            resetAutoPlay();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
            resetAutoPlay();
        }

        function resetAutoPlay() {
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, 8000);
        }

        // Swipe para mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if(touchStartX - touchEndX > 50) nextSlide();
            if(touchStartX - touchEndX < -50) prevSlide();
        });















        function showSidebar(){
          const sidebar = document.querySelector('.sidebar')
          sidebar.classList.add('open');
        }
        function hideSidebar(){
          const sidebar = document.querySelector('.sidebar')
          sidebar.classList.remove('open');
        }