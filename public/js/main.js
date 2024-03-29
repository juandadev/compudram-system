let dropdown = document.querySelector('.menu-container__dropdown'),
    dropdownMenu = document.querySelector('.menu-item__container'),
    modal = document.querySelector('.modal'),
    modalDelete = document.querySelector('.modal__delete'),
    modalCheckout = document.querySelector('.modal__checkout'),
    modalRenovate = document.querySelector('.modal__renovate'),
    cardTitle = document.querySelector('.card__content .title'),
    cardItem = document.querySelector('.card__item');

if (dropdown) {
    dropdown.addEventListener('click', function () {
        dropdownMenu.classList.toggle('hidden');
    });
}

function displayItem(title) {
    title.nextSibling.nextSibling.classList.toggle('hidden');
    title.children[0].classList.toggle('fa-chevron-down');
    title.children[0].classList.toggle('fa-chevron-up');
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var imgTag = document.querySelector('.form__button img');

        reader.onload = function (e) {
            imgTag.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function confirmDelete(event, id) {
    let modalPane = document.querySelector('.modal__delete .modal__pane__buttons input');

    modal.classList.toggle('hidden');

    if (modalDelete.classList.contains('hidden')) {
        modalDelete.classList.remove('hidden');
        modalCheckout.classList.add('hidden');
        modalRenovate.classList.add('hidden');
    } else {
        modalCheckout.classList.add('hidden');
        modalRenovate.classList.add('hidden');
    }

    modalPane.setAttribute('form', `delete${id}`);

    event.preventDefault();
}

function confirmCheckout(event, id, charge) {
    let modalPane = document.querySelector('.modal__checkout .modal__pane__buttons input');
    let chargeLabel = document.querySelector('.modal__checkout p');

    modal.classList.toggle('hidden');

    if (modalCheckout.classList.contains('hidden')) {
        modalCheckout.classList.remove('hidden');
        modalDelete.classList.add('hidden');
        modalRenovate.classList.add('hidden');
    } else {
        modalDelete.classList.add('hidden');
        modalRenovate.classList.add('hidden');
    }

    modalPane.setAttribute('form', `checkout${id}`);

    if (charge == 0) {
        chargeLabel.innerHTML = 'Cobrar';

        let chargeInput = document.createElement('INPUT');
        chargeInput.setAttribute('type', 'text');
        chargeInput.setAttribute('onkeyup', `updateCharge(this.value, ${id})`);

        document.querySelector('.modal__checkout .checkout__input').innerHTML = '';
        document.querySelector('.modal__checkout .checkout__input').appendChild(chargeInput);
    } else {
        document.querySelector('.modal__checkout .checkout__input').innerHTML = '';
        chargeLabel.innerHTML = '¿Cobrar $' + charge + '?'
    }

    event.preventDefault();
}

function confirmDeactivation(event, id) {
    let modalPane = document.querySelector('.modal__checkout .modal__pane__buttons input');

    modal.classList.toggle('hidden');

    if (modalCheckout.classList.contains('hidden')) {
        modalCheckout.classList.remove('hidden');
        modalRenovate.classList.add('hidden');
        modalDelete.classList.add('hidden');
    } else {
        modalRenovate.classList.add('hidden');
        modalDelete.classList.add('hidden');
    }

    modalPane.setAttribute('form', `checkout${id}`);

    event.preventDefault();
}

function confirmRenovate(event, id) {
    let modalPane = document.querySelector('.modal__renovate .modal__pane__buttons input');

    modal.classList.toggle('hidden');

    if (modalRenovate.classList.contains('hidden')) {
        modalRenovate.classList.remove('hidden');
        modalCheckout.classList.add('hidden');
        modalDelete.classList.add('hidden');
    } else {
        modalCheckout.classList.add('hidden');
        modalDelete.classList.add('hidden');
    }

    modalPane.setAttribute('form', `renovate${id}`);
    document.querySelector('.renovate__input input').dataset.id = id;

    event.preventDefault();
}

function updateCharge(charge, id) {
    let input = document.querySelector(`#input${id}`);

    input.value = charge;
}

function closeModal() {
    modal.classList.toggle('hidden');
}

function closeAlert(container) {
    container.classList.toggle('hidden');
}