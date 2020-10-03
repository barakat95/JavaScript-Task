// Slider Variables
let images = Array.from(document.getElementsByClassName('img-item'));
let lightboxContainer = document.getElementById('lightboxContainer');
let lightboxItem = document.getElementById('lightboxItem');
let closeBtn = document.getElementById('close');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let currentIndex;


// Table Variables
let siteName = document.getElementById('siteName');
let siteURL = document.getElementById('siteURL');
let tableBody = document.getElementById('tableBody');
let addSiteBtn = document.getElementById('addSite');
let emptyTable = document.getElementById('emptyTable');
let searchInput = document.getElementById('searchInput')
let siteList;


function openLightBox(eventInfo) {
    let imgSrc = eventInfo.target.src;
    lightboxContainer.style.display = 'flex';
    console.log(imgSrc);
    lightboxItem.style.backgroundImage = `url(${imgSrc})`;
    currentIndex = images.indexOf(eventInfo.target);
    console.log(currentIndex);
}
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', openLightBox);
}

function closeLightBox(eventInfo) {
    lightboxContainer.style.display = "none";
}
closeBtn.addEventListener('click', closeLightBox);

function setSrc() {
    let imgSrc = images[currentIndex].src;
    lightboxItem.style.backgroundImage = `url(${imgSrc})`;
    console.log(currentIndex);
}

function nextSlide() {
    currentIndex++;
    if (currentIndex == images.length) {
        currentIndex = 0;
    }
    setSrc();
    console.log(currentIndex);
}
nextBtn.addEventListener('click', nextSlide);

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    setSrc();
}
prevBtn.addEventListener('click', prevSlide);

document.addEventListener("keydown", function (eventInfo) {
    if (eventInfo.keyCode == 39) {
        nextSlide();
    } else if (eventInfo.keyCode == 37) {
        prevSlide();
    } else if (eventInfo.keyCode == 27) {
        closeLightBox();
    }
})


if (localStorage.getItem('sitesKey') == null) {
    siteList = [];
} else {
    siteList = JSON.parse(localStorage.getItem('sitesKey'));
    displaySites(siteList);
}


function addSite() {
    let site = {
        name: siteName.value,
        url: siteURL.value
    }
    siteList.push(site);
    localStorage.setItem('sitesKey', JSON.stringify(siteList));
    if (siteList.length != 0) {
        emptyTable.classList.replace('d-block', 'd-none');
    }
    displaySites(siteList);
    clearForm();
}
addSiteBtn.addEventListener('click', addSite);

function displaySites(anyArray) {
    let cartoona = '';
    for (let i = 0; i < anyArray.length; i++) {
        cartoona += ` <tr>
                        <td>${i+1}</td>
                        <td>${anyArray[i].name}</td>
                        <td>${anyArray[i].url}</td>
                        <td><a href="https://${anyArray[i].url}" target="_blank"><button class="btn btn-info">Visit</button></a></td>
                        <td><button class="btn btn-warning">Update</button></td>
                        <td><button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button></td>
                    </tr>`
    }
    if (siteList.length == 0) {
        emptyTable.classList.replace('d-none', 'd-block');
    }
    tableBody.innerHTML = cartoona;
}

function clearForm() {
    siteName.value = '';
    siteURL.value = '';
}

function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('sitesKey', JSON.stringify(siteList));
    if (siteList.length == 0) {
        emptyTable.classList.replace('d-none', 'd-block');
    } else {
        emptyTable.classList.replace('d-block', 'd-none');
    }
    displaySites(siteList);
}

function searchSite() {
    let serachTerm = searchInput.value;
    let searchedSite = [];
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(serachTerm.toLowerCase()) == true) {
            searchedSite.push(siteList[i]);
        }
    }
    if (siteList.length == 0) {
        emptyTable.classList.replace('d-none', 'd-block');
    } else {
        emptyTable.classList.replace('d-block', 'd-none');
    }
    displaySites(searchedSite);
}
searchInput.addEventListener('keyup', searchSite);

addSiteBtn.disabled = true;

function validateSiteURL() {
    let regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    if (regex.test(siteURL.value) == true && siteName.value != '') {
        addSiteBtn.disabled = false;
        siteURL.classList.add('is-valid');
        siteURL.classList.remove('is-invalid');
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
    } else if (regex.test(siteURL.value) == true && siteName.value == '') {
        addSiteBtn.disabled = true;
        siteName.classList.add('is-invalid');
        siteName.classList.remove('is-valid');
        siteURL.classList.add('is-valid');
        siteURL.classList.remove('is-invalid');
    } else if (regex.test(siteURL.value) == false && siteName.value != '') {
        addSiteBtn.disabled = true;
        siteURL.classList.add('is-invalid');
        siteURL.classList.remove('is-valid');
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
    } else {
        siteURL.classList.add('is-invalid');
        siteName.classList.add('is-invalid');
    }
}
siteURL.addEventListener('keyup', validateSiteURL);
siteName.addEventListener('keyup', validateSiteURL);

var typed = new Typed('.element', {
    strings: ['Front-End Developer', 'UI Developer', 'Angular Developer'],
    smartBackspace: true, // Default value
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
});