window.onload = () => {
    document.getElementById("navSearchBarIcon").addEventListener('click', navSearchBarClicked);

    document.getElementById("hamburger").addEventListener('click', hamburgerClicked)

    document.getElementById("offerButton").addEventListener('click', toggleOfferDropdown)

    document.getElementById("leftCarouselScrollButton").addEventListener('click', carouselScroll)
    document.getElementById("rightCarouselScrollButton").addEventListener('click', carouselScroll)

    document.getElementById("galleryShowButton").addEventListener('click', unfoldGallery)

    let backDrop = document.getElementById("backDrop")
    let imgView = document.getElementById("imgView")
    document.querySelectorAll('.grid-macy-item').forEach(element => {
        element.addEventListener('click', () => {
            backDrop.classList.toggle('hidden')
            backDrop.classList.toggle('fixed')
            backDrop.classList.toggle('overlayBackdrop')
            imgView.classList.toggle('hidden')
            imgView.classList.toggle('fixed')
            imgView.classList.toggle('overlayPicture')
            document.querySelector("body").classList.toggle("stop-scrolling");
            imgView.src = element.firstElementChild.src
        })
    });

    backDrop.addEventListener('click', () => {
        backDrop.classList.toggle('hidden')
        backDrop.classList.toggle('fixed')
        imgView.classList.toggle('hidden')
        imgView.classList.toggle('fixed')
        backDrop.classList.toggle('overlayBackdrop')
        imgView.classList.toggle('overlayPicture')
        document.querySelector("body").classList.toggle("stop-scrolling");
    })

    //przy widoku na telefon ta funkcja umożliwia na zeskrolowanie do sekcji chowając jednocześnie nawigacje i odblokowując scrollowanie
    document.querySelectorAll('.navRedirectButton').forEach(element => {
        element.addEventListener('click', () => {
            hamburgerClicked()
            document.getElementById(element.getAttribute("href").substring(1).toString()).scrollIntoView();
        })
    });
    

    const offerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const sectionTitle = entry.target.querySelector('.sectionTitle');
          const offerTitle = entry.target.querySelector('.offerTitle');
          const offerText = entry.target.querySelector('.offerText');
          if (entry.isIntersecting) {
            sectionTitle.classList.add('wipeEnter-animate');
            offerTitle.classList.add('wipeEnter-animate-delay-1');
            offerText.classList.add('wipeEnter-animate-delay-2');
            return; 
          }

        });
      });
      offerObserver.observe(document.querySelector('.offerSectionText'));

      const aboutObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const sectionTitle = entry.target.querySelector('.sectionTitle');
            const aboutTitle = entry.target.querySelector('.aboutTitle');
            const aboutText = entry.target.querySelector('.aboutText');
            const aboutButton = entry.target.querySelector('.aboutButton');
          if (entry.isIntersecting) {
            sectionTitle.classList.add('wipeEnter-animate-right');
            aboutTitle.classList.add('wipeEnter-animate-delay-right-1');
            aboutText.classList.add('wipeEnter-animate-delay-right-2');
            aboutButton.classList.add('wipeEnter-animate-delay-right-3')
            return; 
          }
          
        });
      });
      aboutObserver.observe(document.querySelector('.aboutTextSection'));

      const galleyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const imgWhiteBlock = entry.target.querySelectorAll('.imgWhiteBlock');
            const macyImg = entry.target.querySelectorAll('.macy-img');
            let i = 0
          if (entry.isIntersecting) {
            //pętla do animacji zdjęć w galleri
            let loop = () => {
                setTimeout(() => {    
                    imgWhiteBlock[i].classList.add('takePicture')
                    macyImg[i].classList.remove('grayscale')
                    i++;  
                    if (i < imgWhiteBlock.length) {
                        loop();              
                    }
                  }, 200)
            }
            loop()
            
            return; 
          }
          
        });
      });
      galleyObserver.observe(document.querySelector('.macyGallery'));

      var macyInstance = Macy({
        // Opcje grid'u do galleri
        container: '.grid-macy',
        trueOrder: true,
        margin: 70,
        columns: 4,
        breakAt:{
            1500: 3,
            940: 2,
            520: 1,
            400: 1
        }
      });
}   


//funkcja umożliwiająca przewijanie karuzeli (slidera)
function carouselScroll(){

    if(this.id == 'leftCarouselScrollButton'){
        document.getElementById("slider").scrollLeft -= window.innerWidth/2 + 100
        return
    }
    document.getElementById("slider").scrollLeft += window.innerWidth/2+ 100
}

//funkcja jest odpowiedzialna za rozsuwanie wyszukiwarki wykorzystując do tego klasy css'a
function navSearchBarClicked(){
    var navSearchBar = document.getElementById("navSearchBar")
    var navSearchBarContainer = document.getElementById("navSearchBarContainer")
    navSearchBar.classList.toggle("animNavSearchBar");
    navSearchBarContainer.classList.toggle("navSearchBarContainer");
}

//funkcja rozwija nawigazję po kliknięciu w hamburgera (tylko przy rozmiarze ekranu max 1024)
function hamburgerClicked(){
    if(window.innerWidth < 1024){
        let nav = document.getElementById("nav");
        nav.classList.toggle("hamburgetOutOfView")
        nav.classList.toggle("hamburgetInView")
        if(!nav.classList.contains("hamburgetOutOfView")){
            document.querySelector("body").classList.add("stop-scrolling");
            return
        }
        document.querySelector("body").classList.remove("stop-scrolling");
    }
}

//ta funkcja odpowiedzialna jest za rozwijanie i zwijanie dropdown'u
function toggleOfferDropdown(){
    let offerButton = document.getElementById('offerButton');
    let offerElements = document.querySelectorAll(".offerDropdownElement")
    
    let i = 0
    //instrukcja warunkowa chowa lub pokazuje tekst dropdown'u w zależności od tego czy został zwinięty czy dopiero ma się rozwinąć
    if(offerElements[0].classList.contains('unfoldDropdown')){
        setTimeout(() => {    
            offerElements.forEach(element => {
                 element.style.display = 'none';
            });
        }, 500)
    }else{
        offerElements.forEach(element => {
            element.style.display = 'flex';
        });
    }

    //pętla do rozsuwania dropdownu po kolei lub chowania
    let loop = () => {
        setTimeout(() => {    
            offerElements[i].classList.toggle('unfoldDropdown')
            i++;  
            if (i < offerElements.length) {
                loop();              
            }
          }, 100)
    }
    loop()

}


function unfoldGallery(){
    this.parentNode.style.maxHeight = 'none'
    this.style.display = 'none'
    document.querySelectorAll('.elementToDisable').forEach((element) => {
        element.style.display = 'none'
    })
}

window.onresize = () => {
    /*ten if upewnia się że nawigacja na urządzenia desktop i tablet nie 
    ucieka do prawej po zmianie rozmiaru z telefonu kiedy nawigacja była ukryta*/
    if(window.innerWidth > 1024 && nav.classList.contains("hamburgetOutOfView")){
        nav.classList.remove("hamburgetOutOfView")
        nav.classList.add("hamburgetInView")
    }
    
    if(window.innerWidth <= 1024 && nav.classList.contains("hamburgetInView")){
        nav.classList.add("hamburgetOutOfView")
        nav.classList.remove("hamburgetInView")
    }

    if(window.innerWidth > 1024 && nav.classList.contains("hamburgetInView"))
        document.querySelector("body").classList.remove("stop-scrolling");
    if(window.innerWidth <= 1024 && nav.classList.contains("hamburgetInView"))
        document.querySelector("body").classList.add("stop-scrolling");

}