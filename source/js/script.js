function init_menu() {
  const $js_header_menu_toggle = $('.js_header_menu_toggle'),
    $main_nav = $('.main-nav');

  $js_header_menu_toggle.on('click', function () {
    $('.bar').toggleClass('animate');
    $main_nav.toggleClass('open');
    $('.header, body').toggleClass('modal-open');
    $(document).on('click', document_click_handler);
  });

  function document_click_handler(evt) {
    if (
      !$(evt.target).is('.main-nav') &&
      !$(evt.target).closest('.js_header_menu_toggle').length &&
      !$(evt.target).is('.js_header_menu_toggle')
    ) {
      $main_nav.removeClass('open');
      $('.bar').removeClass('animate');
      $('.header, body').removeClass('modal-open');
      $(document).off('click', document_click_handler);
    }
  }
}

function init_carousel() {
  $('.banner__slider').slick({
    fade: true,
    dots: true,
    infinite: true,
    appendDots: $('.banner__wrapper'),
    slidesToShow: 1,
    slidesToScroll: 1,
  });
}

function init_contact_form() {
  const $callback_form = $('.js_contact_form');

  $('input[name="phone"]').on('keydown', function (evt) {
    $(this).mask('+7 (000) 000-00-00');
  });

  $callback_form.each(function () {
    const $form = $(this);
    $form.validate({
      messages: {
        name: 'Введите ваше имя',
        phone: 'Введите ваш телефон',
        company: 'Введите название компании',
      },
    });
  });

  /*  for dev */
  $('.contact-form .js_contact_form').on('submit', function () {
    $('.contact-form .js_contact_form_success').addClass('open');
  });

  $('.js_contact_form_success .modal__btn').on('click', function (evt) {
    $('.contact-form .js_contact_form_success').removeClass('open');
  });

  $('.modal .js_contact_form').on('submit', function () {
    const $form = $(this),
      $modal = $form.closest('.modal');

    $modal.removeClass('open');

    $('#success').addClass('open');
  });
}

function init_modals() {
  const $modal_open = $('.js_modal_open'),
    $modal_close = $('.js_modal_close');

  $modal_open.on('click', function (evt) {
    evt.preventDefault();

    const $btn = $(this),
      $modal = $(`${$btn.attr('href')}`);

    if ($modal.data('side')) {
      $('#success .modal__window')
        .removeClass()
        .addClass(`modal__window modal__window--${$modal.data('side')}`);
    }

    $modal.addClass('open');
  });

  $modal_close.on('click', function (evt) {
    evt.preventDefault();

    const $btn = $(this),
      $modal = $btn.closest('.modal');

    $modal.removeClass('open');
  });

  $('.modal').on('click', function (evt) {
    if (!$(evt.target).closest('.modal__window').length && !$(evt.target).is('.modal__window')) {
      $(this).removeClass('open');
    }
  });
}

$(document).ready(function () {
  init_menu();
  init_carousel();
  init_contact_form();
  init_modals();

  $('.products').tabs();
});
