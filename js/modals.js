const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const myVideoBtn = document.querySelector('#my-video-btn');
const callbackFormBtn = document.querySelector('#callback-form-btn');
const projectFullStackBtn = document.querySelector('#personal-project-full-stack-btn');
const projectModalWeddingBtn = document.querySelector('#project-modal-wedding-btn');
const projectModalProTestBtn = document.querySelector('#project-modal-pro-test-btn');
const projectModalGoItBtn = document.querySelector('#project-modal-goit-btn');
const projectModalTeamProjectsBtn = document.querySelector('#project-modal-team-projects-btn');
const projectModalTestItBtn = document.querySelector('#project-modal-test-it-btn');

const projectModalTestIt = document.querySelector('#project-modal-test-it');
const projectModalTeamProjects = document.querySelector('#project-modal-team-projects');
const projectModalGoIt = document.querySelector('#project-modal-goit');
const projectModalProTest = document.querySelector('#project-modal-pro-test');
const projectModalWedding = document.querySelector('#project-modal-wedding');
const projectModal = document.querySelector('#project-modal');
const discussProjectModal = document.querySelector('#discuss-project-modal');
const myVideoModal = document.querySelector('#my-video-modal');
const mobileMenu = document.querySelector('#mobile-menu');

const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

const modalsWrappers = document.querySelectorAll('.modal-area-bgd');
const modalContainers = document.querySelectorAll('.modal-area-content');

const MODAL_ACTIVE_CLASS = 'modal-active';
const BODY_SCROLL_DISABLE_CLASS = 'body-scroll-disable';

//CALLBACK FORM
const userName = document.querySelector('#callback-form-input-name');
const userEmail = document.querySelector('#callback-form-input-email');
const userPhone = document.querySelector('#callback-form-input-phone');
userPhone.addEventListener('click', function() {
    if (!userPhone.value.trim()) {
        userPhone.value = '+380';
    }
});
userPhone.addEventListener('blur', function() {
    if (userPhone.value === '+380') {
        userPhone.value = ''
    }
});

addModalActiveTablet();

enableCloseModalOnBgdClick();
hideModalOnMobileMenuElementsClick();

const modals = [mobileMenu, myVideoModal, discussProjectModal, projectModal, projectModalWedding, projectModalProTest, projectModalGoIt, projectModalTeamProjects, projectModalTestIt];
const buttons = [mobileMenuBtn, myVideoBtn, callbackFormBtn, projectFullStackBtn, projectModalWeddingBtn, projectModalProTestBtn, projectModalGoItBtn, projectModalTeamProjectsBtn, projectModalTestItBtn];


buttons.forEach((btn, index) => {
    const projectModal = modals[index];

    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            if (index === 0) {
                console.log(document.body.clientWidth)
                const modalActiveTablet = document.querySelector(`.modal-active-tablet`);

                if (modalActiveTablet) {
                    modalActiveTablet.classList.remove('modal-active-tablet');  
                }
            }
            if (index === 2) {
                callbackForm(projectModal);
            }
            else {
            projectModal.classList.add(MODAL_ACTIVE_CLASS);

            document.body.classList.add(BODY_SCROLL_DISABLE_CLASS);
            }
        })
    }
});


modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', hideModal);
})

function enableCloseModalOnBgdClick() {
    if (modalContainers.length) {
        modalContainers.forEach( container => {
            container.addEventListener('click', event => event.stopPropagation());
        });
    }

    if (modalsWrappers.length) {
        modalsWrappers.forEach( container => {
            container.addEventListener('click', hideModal);
        });
    }
}


function hideModal() {
    const modalToClose = document.querySelector(`.${MODAL_ACTIVE_CLASS}`);

    if (modalToClose) {
        modalToClose.classList.remove(MODAL_ACTIVE_CLASS);
        document.body.classList.remove(BODY_SCROLL_DISABLE_CLASS);    
    }

    const video = document.querySelector('video');

    if (video)  {
        video.pause();
    }
}

function hideModalOnMobileMenuElementsClick() {
    const MOBILE_MENU_ITEM_CLOSE_DELAY = 150;
    const menuElements = document.querySelectorAll('.mobile-menu-item');

    if (menuElements.length) {
        menuElements.forEach( container => {
            container.addEventListener('click', () => setTimeout(hideModal, MOBILE_MENU_ITEM_CLOSE_DELAY));
        });
    }
}

function callbackForm(projectModal) {
    
    let error = false;
    
    if (!userName.value.trim()) {
        userName.classList.add('callback-form-input-error');
        error = true;
    } else {
        userName.classList.remove('callback-form-input-error');
    }
    if (!userEmail.value.trim() || !isEmailValid(userEmail.value)) {
        userEmail.classList.add('callback-form-input-error');
        error = true;
    } else {
        userEmail.classList.remove('callback-form-input-error');
    }
    if (!userPhone.value.trim() || !isPhoneValid(userPhone.value)) {
        userPhone.classList.add('callback-form-input-error');
        error = true;
    } else {
        userPhone.classList.remove('callback-form-input-error');
    }
    if (error) {
        return;
    }
    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';

    // EXIT
    projectModal.classList.add(MODAL_ACTIVE_CLASS);
    document.body.classList.add(BODY_SCROLL_DISABLE_CLASS);

    setTimeout(function() {
        projectModal.classList.remove(MODAL_ACTIVE_CLASS);
        document.body.classList.remove(BODY_SCROLL_DISABLE_CLASS);  
    }, 2000);
}

function isPhoneValid(phone = '') {
    const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

    return phone.match(regexp);
}

function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function addModalActiveTablet() {
    const documentBodyClientWidth = document.body.clientWidth;
    const isModalActiveTablet = document.querySelector(`.modal-active-tablet`);

    if (documentBodyClientWidth >= 1200 & !isModalActiveTablet) {
            mobileMenu.classList.add('modal-active-tablet');  
        
    }
}