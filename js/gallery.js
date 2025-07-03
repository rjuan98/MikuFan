document.addEventListener('DOMContentLoaded', () => {
    // Filtros da galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal da galeria
    const modal = document.querySelector('.gallery-modal');
    const modalImg = modal.querySelector('img');
    const modalTitle = modal.querySelector('h3');
    const modalArtist = modal.querySelector('.artist');
    const modalDesc = modal.querySelector('.description');
    const closeBtn = modal.querySelector('.modal-close');
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const artist = item.querySelector('p').textContent;

            modalImg.src = img.src;
            modalTitle.textContent = title;
            modalArtist.textContent = artist;
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Navegação do modal
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModal();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModal();
    });

    function updateModal() {
        const item = galleryItems[currentIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const artist = item.querySelector('p').textContent;

        modalImg.src = img.src;
        modalTitle.textContent = title;
        modalArtist.textContent = artist;
    }

    // Botões de like
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            button.classList.toggle('active');
        });
    });
}); 