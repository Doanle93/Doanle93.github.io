document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle Submenu Toggling
    const projectToggle = document.querySelector('.submenu-toggle');
    projectToggle.addEventListener('click', (e) => {
        e.preventDefault();
        projectToggle.parentElement.classList.toggle('open');
    });

    // 2. Handle Navigation & Content Swapping
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            // Hide all content views
            document.querySelectorAll('.content-view').forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });
            
            // Show target content view
            const activePage = document.getElementById(targetId);
            if (activePage) {
                activePage.style.display = 'block';
                activePage.classList.add('active');
                
                // Update the Right Table of Contents
                updateRightTOC(activePage);
            }
        });
    });

    // Function to build the Right Sidebar TOC
    function updateRightTOC(pageElement) {
        const tocList = document.getElementById('section-toc');
        tocList.innerHTML = ''; 

        const headings = pageElement.querySelectorAll('h1, h2');
        
        headings.forEach(heading => {
            if (!heading.id) {
                heading.id = heading.textContent.replace(/\s+/g, '-').toLowerCase();
            }

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            
            // Indent h2 elements
            if (heading.tagName.toLowerCase() === 'h2') {
                li.style.paddingLeft = "15px";
                li.style.fontSize = "0.9em";
            }

            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    // Initialize first view
    const initialPage = document.getElementById('about-page');
    initialPage.style.display = 'block';
    updateRightTOC(initialPage);
});