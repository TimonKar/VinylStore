$(document).ready(function () {
    let $carouselItems = $('.carousel-item');
    let currentIndex = 0;

    // Function to go to next slide
    function showNextSlide() {
        $carouselItems.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % $carouselItems.length;
        $carouselItems.eq(currentIndex).addClass('active');
    }

    // Function to go to previous slide
    function showPrevSlide() {
        $carouselItems.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex - 1 + $carouselItems.length) % $carouselItems.length;
        $carouselItems.eq(currentIndex).addClass('active');
    }

    // Next button click
    $('.carousel-control-next').click(function () {
        showNextSlide();
    });

    // Prev button click
    $('.carousel-control-prev').click(function () {
        showPrevSlide();
    });
});



$(document).ready(function () {
    // Album information
    const albums = {
        morningGlory: {
            genre: 'Rock, Pop',
            style: 'Britpop',
            year: '1995',
            tracklist: [
                "Hello - 3:21",
                "Roll With It - 3:59",
                "Wonderwall - 4:18",
                "Don't Look Back In Anger - 4:48",
                "Hey Now! - 5:41",
                "Untitled - 0:44",
                "Some Might Say - 5:29",
                "Cast No Shadow - 4:51",
                "She's Electric - 3:40",
                "Morning Glory - 5:03",
                "Untitled - 0:39",
                "Champagne Supernova - 7:27"
            ]
        },
        dexterGordon: {
            genre: 'Jazz',
            style: 'Hard Bop',
            year: '2019',
            label: 'Blue Note',
            country: 'Worldwide',
            format: 'Vinyl, LP, Album, Reissue, Stereo, 180g, Gatefold',
            released: '28 Jun 2019',
            tracklist: [
                "A1 Hanky Panky – 6:27",
                "A2 I'm A Fool To Want You – 6:38",
                "A3 Devilette – 7:02",
                "B1 Clubhouse – 7:29",
                "B2 Jodi – 5:35",
                "B3 Lady Iris B – 5:39"
            ]
        }
    };

    // Handle click on each carousel item
    $('.carousel-item').click(function () {
        const albumKey = $(this).data('album');
        const album = albums[albumKey];

        if (album) {
            let tracklistHtml = '<ul class="tracklist">';
            album.tracklist.forEach(track => {
                tracklistHtml += `<li><i class="fas fa-music"></i> ${track}</li>`;
            });
            tracklistHtml += '</ul>';

            // Display SweetAlert with album details
            Swal.fire({
                title: albumKey === 'morningGlory' ? "(What's The Story) Morning Glory?" : 'Clubhouse',
                html: `
                    <strong>Genre:</strong> ${album.genre}<br>
                    <strong>Style:</strong> ${album.style}<br>
                    <strong>Released:</strong> ${album.year}<br>
                    <hr>
                    <strong>Tracklist:</strong><br>
                    ${tracklistHtml}
                `,
                imageUrl: $(this).find('img').attr('src'),
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Album cover'
            });
        }
    });
});
