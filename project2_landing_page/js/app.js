document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');
    const scrollOffset = -60;

    //Generate and fill in the navigation menu
    sections.forEach((section, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = section.querySelector('h2').textContent;
        link.href = `#${section.id}`;
        link.dataset.index = index;
        listItem.appendChild(link);
        navbar.appendChild(listItem);
    });

// Function to add or remove the "active" class for the selected section and navigation link
    function actSections(index) {
        sections.forEach((section, i) => {
            const link = navbar.querySelector(`a[data-index="${i}"]`);
            if (i === index) {
                link.classList.add('active');
                section.classList.add('active');
            } else {
                link.classList.remove('active');
                section.classList.remove('active');
            }
        });
    }
    // Handle the event when the user clicks a link in the navigation bar
    navbar.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const index = parseInt(event.target.dataset.index);
            const y = sections[index].getBoundingClientRect().top + window.scrollY + scrollOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });

    // Function to handle the scroll event
    function onScroll() {
        const scrollY = window.scrollY;
        let activeIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
            const distance = Math.abs(section.getBoundingClientRect().top - scrollOffset);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        });

        actSections(activeIndex);
    }

    
    var debounceTime;
    //Add handling for scroll event
    window.addEventListener('scroll', function () {
        if (debounceTime) {
            clearTimeout(debounceTime);
        }
        debounceTime = setTimeout(onScroll, 100);
    });

    actSections(0);
});
