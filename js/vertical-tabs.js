/**
 * @file
 * Custom JavaScript for vertical tabs.
 */
(function ($, Drupal, once) {
  Drupal.behaviors.osu_paragraphs_vertical_tabs = {
    attach: function (context, settings) {
      once('osu_paragraphs_vertical_tabs', 'div.paragraph.tab-wrapper-paragraph', context).forEach(
        (element) => {
          const tabLink = $(element).find('a.tab-wrapper-paragraph__tab-link');
          tabLink.css('outline', '1px solid red');

          tabLink.on('click', function (e) {
            e.preventDefault();
            let target = $(this).attr('href');
            console.log(target);
          })
        });
    },
  };
})(jQuery, Drupal, once);

// (function ($) {
//   $(document).ready(function () {
//     $('.vertical-tabs .tabs a').on('click', function (e) {
//       e.preventDefault();
//       let target = $(this).attr('href');
//
//       $('.vertical-tabs .tabs .tabs__item').removeClass('active');
//       $('.vertical-tabs .tabs .tabs__item .tabs__link').removeClass('tabs__link--active');
//       $(this).parent().addClass('active');
//       $(this).addClass('tabs__link--active');
//       $('.vertical-tabs .tabs-content .tabs-content__items').hide();
//       $(target).show();
//     });
//
//     // Initialize the first tab as active.
//     $('.vertical-tabs .tabs li:first-child a').click();
//   });
// })(jQuery, Drupal, once);
