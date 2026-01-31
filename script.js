document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 1. Get the target ID (e.g., 'about-page')
        const targetId = this.getAttribute('data-target');
        
        // 2. Hide all pages and show the target page
        document.querySelectorAll('.content-view').forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none';
        });
        
        const activePage = document.getElementById(targetId);
        activePage.classList.add('active');
        activePage.style.display = 'block';

        // 3. Update the Right Table of Contents
        updateRightTOC(activePage);
    });
});

function updateRightTOC(pageElement) {
    const tocList = document.getElementById('section-toc');
    tocList.innerHTML = ''; // Clear existing list

    // Find all <h1> and <h2> inside the active page
    const headings = pageElement.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        // Ensure the heading has an ID so we can link to it
        if (!heading.id) {
            heading.id = heading.textContent.replace(/\s+/g, '-').toLowerCase();
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
}

// Initialize the first page (About Me) on load
window.onload = () => {
    const defaultPage = document.getElementById('about-page');
    defaultPage.classList.add('active');
    defaultPage.style.display = 'block';
    updateRightTOC(defaultPage);
};