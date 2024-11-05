/**
 * @file
 * Custom JavaScript for vertical tabs.
 */
(function ($, Drupal, once) {
  Drupal.behaviors.osu_paragraphs_vertical_tabs = {
    attach: function (context, settings) {
      once('osu_paragraphs_vertical_tabs', 'div.paragraph.tab-wrapper-paragraph', context).forEach((element) => {
        const tabLink = $(element).find('a.tab-wrapper-paragraph__tab-link');

        tabLink.on('click', function (e) {
          e.preventDefault();
          // Get all active elements and remove the active classes.
          const allActiveTabs = $(element).find('.tab-wrapper-paragraph__tab.active');
          const allActiveTabLinks = $(element).find('.tab-wrapper-paragraph__tab-link--active');
          const allActiveTabContent = $(element).find('.tab-wrapper-paragraph__tab-content--active');
          const clickedLInk = $(this);
          const target = $(this).attr('href');
          const parentTabs = $(this).closest('.tab-wrapper-paragraph__tabs');
          $(target).css('max-height', '0');
          $(parentTabs).css('height', '0');
          allActiveTabs.removeClass('active');
          allActiveTabLinks.removeClass('tab-wrapper-paragraph__tab-link--active');
          allActiveTabContent.removeClass('tab-wrapper-paragraph__tab-content--active');
          allActiveTabContent.attr('aria-hidden', 'true');

          // Set them to active.
          $(clickedLInk).parent().addClass('active');
          $(clickedLInk).addClass('tab-wrapper-paragraph__tab-link--active');
          $(target).addClass('tab-wrapper-paragraph__tab-content--active');
          $(target).removeAttr('aria-hidden');
          const tabContentHeight = $(target).prop('scrollHeight');
          const parentTabHeight = $(parentTabs).prop('scrollHeight');
          $(target).css('max-height', tabContentHeight + 'px');
          $(parentTabs).css('height', parentTabHeight + 'px');
        });
      });
    },
  };
})(jQuery, Drupal, once);
