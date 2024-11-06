/**
 * @file
 * Custom JavaScript for vertical tabs.
 * phpcs:ignoreFile
 */
(function ($, Drupal, once) {
  Drupal.behaviors.osuParagraphsVerticalTabs = {
    attach: function (context, settings) {
      once('osu-paragraphs-vertical-tabs', 'div.paragraph.tab-wrapper-paragraph', context).forEach((tabWrapperElement) => {

        const handleClick = (event) => {
          event.preventDefault();

          const $tabWrapper = $(tabWrapperElement);
          const $clickedTabLink = $(event.currentTarget);
          const targetSelector = $clickedTabLink.attr('href');
          const $targetContent = $(targetSelector);

          // Get the height of all the tabs.
          const $allTabHeight = $('.tab-wrapper-paragraph__tab')
            .toArray()
            .reduce((accumulator, tab) => Math.ceil($(tab).outerHeight(true)) + accumulator, 0);

          const $allActiveTabs = $tabWrapper.find('.tab-wrapper-paragraph__tab.active');
          const $allActiveTabLinks = $tabWrapper.find('.tab-wrapper-paragraph__tab-link--active');
          const $allActiveTabContents = $tabWrapper.find('.tab-wrapper-paragraph__tab-content--active');

          // Remove active classes and aria-hidden attributes
          $allActiveTabs.removeClass('active');
          $allActiveTabLinks.removeClass('tab-wrapper-paragraph__tab-link--active');
          $allActiveTabContents.removeClass('tab-wrapper-paragraph__tab-content--active').css('max-height', '').attr('aria-hidden', 'true');

          // Add active classes and remove aria-hidden attribute
          $clickedTabLink.parent().addClass('active');
          $clickedTabLink.addClass('tab-wrapper-paragraph__tab-link--active');
          $targetContent.addClass('tab-wrapper-paragraph__tab-content--active').removeAttr('aria-hidden');

          // Adjust heights
          $targetContent.css('max-height', $targetContent.prop('scrollHeight') + 'px');
          // Set the height of the osu-tabs container to the height of the controlledPanel if window width is greater than 769px
          if (window.innerWidth > 768) {
            const container = document.querySelector(
              '.tab-wrapper-paragraph__tabs',
            );
            const $targetTabContentHeight = $targetContent.prop('scrollHeight');
            // Check to ensure
            // that the new height is not smaller than the total tab height.
            if ($allTabHeight > $targetTabContentHeight) {
              container.style.height = $allTabHeight + 'px';
            } else {
              container.style.height = $targetTabContentHeight + 'px';
            }
          }

        };

        const $tabLinks = $(tabWrapperElement).find('a.tab-wrapper-paragraph__tab-link');
        $tabLinks.on('click', handleClick);
      });
    },
  };
})(jQuery, Drupal, once);
