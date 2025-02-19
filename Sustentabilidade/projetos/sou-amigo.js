function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('open');
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('open');
}

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