function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('open');
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('open');
  }




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
  // Configuração do Observer para as seções de comparação
  const comparacaoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if(entry.isIntersecting) {
              const container = entry.target;
              
              // Animação da imagem (entrada pela esquerda)
              const img = container.querySelector('img');
              img.style.transform = 'translateX(0)';
              img.style.opacity = '1';

              // Animação do texto (entrada pela direita)
              const texto = container.querySelector('.texto-comparacao');
              texto.style.transform = 'translateX(0)';
              texto.style.opacity = '1';

              // Animação dos ícones com delay
              const iconsContainer = container.querySelector('.onibus-icons, .manto-icons, .sabonete-icons');
              if(iconsContainer && !iconsContainer.dataset.animated) {
                  iconsContainer.dataset.animated = true;
                  const icons = Array.from(iconsContainer.children);
                  
                  icons.forEach((icon, index) => {
                      setTimeout(() => {
                          icon.style.transform = 'translateY(0)';
                          icon.style.opacity = '1';
                      }, index * 50); // Delay de 50ms entre cada ícone
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