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




  const progressBar = document.querySelector('.timeline_progresso-barra');
const timelineSection = document.querySelector('.section-timeline');

if (timelineSection && progressBar) {
  window.addEventListener('scroll', function() {
      const sectionTop = timelineSection.offsetTop;
      const sectionHeight = timelineSection.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.pageYOffset;
      
      // Ajustes para mobile
      const mobileOffset = window.innerWidth <= 400 ? 0.15 : 0.3;
      const start = sectionTop - windowHeight * mobileOffset;
      const end = sectionTop + sectionHeight - windowHeight * (1 - mobileOffset);

      let progress = ((scrollPosition - start) / (end - start)) * 100;
      progress = Math.min(Math.max(progress, 0), 100);
      
      progressBar.style.height = `${progress}%`;
  });
}






function loadYouTubeIframe(element) {
  const videoId = element.getAttribute('data-video-id');
  const params = new URLSearchParams(element.getAttribute('data-params'));
  const title = element.getAttribute('data-title');
  
  // Garante autoplay=1 após o clique (mesmo se original era 0)
  params.set('autoplay', '1');

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
  
  // Mantém configurações originais específicas deste vídeo
  iframe.setAttribute('allow', 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('title', title);
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

  // Mantém o layout idêntico ao container original
  iframe.classList.add('youtube-iframe');
  
  element.parentNode.replaceChild(iframe, element);
}










document.addEventListener('DOMContentLoaded', () => {
    const comparacaoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const container = entry.target;
                
                // Animação da imagem
                const img = container.querySelector('img');
                img.style.transform = 'translateX(0)';
                img.style.opacity = '1';
  
                // Animação do texto
                const texto = container.querySelector('.texto-comparacao');
                texto.style.transform = 'translateX(0)';
                texto.style.opacity = '1';
  
                // Animação dos ícones
                const iconsContainer = container.querySelector('.onibus-icons, .manto-icons, .sabonete-icons');
                if(iconsContainer && !iconsContainer.dataset.animated) {
                    iconsContainer.dataset.animated = true;
                    const icons = Array.from(iconsContainer.children);
                    
                    icons.forEach((icon, index) => {
                        setTimeout(() => {
                            icon.style.transform = 'translateY(0)';
                            icon.style.opacity = '1';
                        }, index * 50);
                    });
                }
  
                // NOVA ANIMAÇÃO DA LISTA (ESQUERDA)
                const destaquesList = container.querySelector('.destaque-list');
                if(destaquesList && !destaquesList.dataset.animated) {
                    destaquesList.dataset.animated = true;
                    const items = destaquesList.querySelectorAll('p');
                    
                    items.forEach((item, index) => {
                        // Configuração INICIAL (fora da tela)
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(100%)';
                        
                        // Transition COM DELAY PROGRESSIVO (150ms por item)
                        item.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 150}ms`;

                        // Pequeno timeout para sincronizar
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 50);
                    });
                }
            }
        });
    }, { threshold: 0.2 });

  // Observar todas as seções de comparação
  document.querySelectorAll('.container-comparacao').forEach(section => {
      // Reset CSS inicial para animações
      const img = section.querySelector('img');
      const texto = section.querySelector('.texto-comparacao');
      
      img.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
      img.style.transform = 'translateX(-100%)';
      img.style.opacity = '0';
      
      texto.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
      texto.style.transform = 'translateX(100%)';
      texto.style.opacity = '0';

      // Configurar animação dos ícones
      const iconsContainer = section.querySelector('.onibus-icons, .manto-icons, .sabonete-icons');
      if(iconsContainer) {
          const icons = Array.from(iconsContainer.children);
          icons.forEach(icon => {
              icon.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
              icon.style.transform = 'translateY(20px)';
              icon.style.opacity = '0';
          });
      }

      comparacaoObserver.observe(section);
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Carrega a imagem se estiver usando lazy loading
                if (img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                }

                // Garante o efeito mesmo se a imagem estiver em cache
                const loadHandler = () => {
                    img.classList.add('loaded');
                    observer.unobserve(img);
                };

                if (img.complete) {
                    loadHandler();
                } else {
                    img.addEventListener('load', loadHandler);
                    img.addEventListener('error', () => observer.unobserve(img));
                }
            }
        });
    }, observerOptions);

    // Observa todas as imagens da timeline
    document.querySelectorAll('.timeline_image-wrapper img').forEach(img => {
        img.loading = 'lazy';  // Otimização extra
        imageObserver.observe(img);
    });
});

// Observer para containers de vídeo
const videoContainerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const thumbnail = container.querySelector('.youtube-thumbnail');
        const videoId = container.dataset.videoId;
  
        // 1. Carrega a miniatura
        if (thumbnail && thumbnail.dataset.src) {
          thumbnail.src = thumbnail.dataset.src;
          thumbnail.onload = () => container.classList.add('thumb-loaded');
        }
  
        // 2. Pré-conecta ao domínio do YouTube
        const preconnectLink = document.createElement('link');
        preconnectLink.rel = 'preconnect';
        preconnectLink.href = 'https://www.youtube-nocookie.com';
        document.head.appendChild(preconnectLink);
  
        // 3. Pré-carrega o iframe em segundo plano
        const preloadIframe = document.createElement('link');
        preloadIframe.rel = 'preload';
        preloadIframe.as = 'iframe';
        preloadIframe.href = `https://www.youtube-nocookie.com/embed/${videoId}`;
        document.head.appendChild(preloadIframe);
  
        // 4. Marca container como carregado
        container.classList.add('video-loaded');
        observer.unobserve(container);
      }
    });
  }, {
    rootMargin: '500px',
    threshold: 0.01
  });
  
  // Inicialização otimizada
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.video-container').forEach(container => {
      // Configuração inicial
      const thumbnail = container.querySelector('.youtube-thumbnail');
      
      // Move src para data-src
      if (thumbnail && !thumbnail.complete) {
        thumbnail.dataset.src = thumbnail.src;
        thumbnail.removeAttribute('src');
        thumbnail.classList.add('lazy-thumb');
      }
  
      videoContainerObserver.observe(container);
    });
  });