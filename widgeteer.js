/*******************************************************************************
 * Plugin: widgeteer.js                                                        *
 *                                                                             *
 * Summary: Creates a panel of quick access widgets, when activated.           *
 *                                                                             *
 * Author: Al Zuniga                                                           *
 *                                                                             *
 * Purpose: Keeps headers, footers, and sides of pages free from clutter, by   *
 *          providing a panel to place these common items such as 'Tabs',      *
 *          social media icons, Google maps, Reviews, location information,    *
 *          etc...                                                             *
 *                                                                             *
 * Usage: Add <link rel="stylesheet" href="/path/to/widgeteer.css"> to the     *
 *        <head> of the HTML file.                                             *
 *                                                                             *
 *        Add <script type="text/javascript" src="/path/to/widgeteer.js">      *
 *        before the closing body tag of the HTML file.                        *
 *                                                                             *
 *        Add the following to your HTML file, just before the widgeteer.js    *
 *        <script> tag: <div id="widgeteer"><span class="fa"></span></div>     *
 *                                                                             *
 *        Add another <script type="text/javascript"></script> just after the  *
 *        widgeteer.js <script> tag.                                           *
 *                                                                             *
 *        Activate the widgeteer.js plufin as follows:                         *
 *        $('#widgeteer').widgeteer();                                         *
 *                                                                             *
 * Requirements: jQuery 2.1.0, FontAwesome 4.7.0                               *
 *                                                                             *
 * Revision History:                                                           *
 *     v0.0.01    06-26-2018    Al Zuniga    Initial code plugin: defaults,    *
 *                                           settings, initialization.         *
 *     v0.0.02    06-27-2018    Al Zuniga    Refactored code.                  *
 *                                           Added click functionality to      *
 *                                           widgeteer button.                 *
 *                                           Added overlay panel.              *
 *     v0.0.03    06-28-2019    Al Zuniga    Added Close Button.               *
 *                                           Added click functionality to      *
 *                                           close button.                     *
 *                                                                             *
 * Version: 0.0.03                                                             *
 ******************************************************************************/

(function ($) {

  $.fn.widgeteer = function (options, callback) {

    var plugin = $(this);
    plugin.settings = {};

    // Default Settings
    defaults = {

      // widget properties
      widgetAnimate: false,
      widgetBgColor: "#337ab7",
      widgetColor: "#FFFFFF",
      widgetIcon: "fa-bars",
      widgetShape: "square",

      // panel widgets
      panelWidgets: ['about', 'hours', 'map', 'phone', 'reviews', 'social'],

      // panel properties
      panelBgColor: "rgba(49, 49, 49, 0.8)",

      // event callbacks
      click: function () { }
    }


    plugin.init = function () {
      // Settings
      plugin.settings = $.extend(true, {}, defaults, options);

      // Initialize widget
      private_initialize_widgeteer(
        plugin.settings.widgetAnimate
        , {
          'background-color': plugin.settings.widgetBgColor,
          'color': plugin.settings.widgetColor,
        }
        , plugin.settings.widgetIcon
        , plugin.settings.widgetShape);

    };

    /****************************************
     *********   Private Methods   **********
     ****************************************/

    // widget
    var private_initialize_widgeteer = function (animation,
      properties,
      icon,
      shape) {
      /***** animation *****/
      if (animation) {
        switch (shape) {
          case "round":
            $(plugin).addClass('widgeteer-pulse-circle');
            break;

          case "square":
            $(plugin).addClass('widgeteer-pulse');
            break;

          default:
            break;
        }
      }

      /***** properties *****/
      $(plugin).css(properties);

      /***** icon *****/
      $(plugin).append('<span class="fa"></span>');
      $('span', plugin).addClass(icon);

      /***** shape *****/
      if (shape === "round") {
        $(plugin).css('border-radius', '50%');
      }
    }

    // Panel
    var private_create_panel = function (properties, animated) {
      if ($('#widget-panel').length) {
        $('#widget-panel').remove();
        $('body').removeAttr('class');
      } else {
        $('body').append('<div id="widget-panel"></div>');
        $('#widget-panel')
          .append('<div class="panel-container"></div>')
          .find('.panel-container')
          .append('<h1 id="title-line"></h1>')
          .append('<ul id="widgets" class="verticals-list"></ul>')
          .find('#title-line')
          .append('<img class="img-responsive" src="https://cdn.dealerspike.com/imglib/ds-admin/images/admin-ds-logo.png" />');
        private_add_widgets();
        $('body').attr('class', 'body-lock');
        $('#widget-panel').fadeIn(350);
      }
    }


    // Close button
    var private_create_close_btn = function () {
      $('#widget-panel').append('<div id="widget-close"></div>');
      $('#widget-close').append('<span class="fa fa-close"></span>');

      $('#widget-close').click(function () {

        $('#widget-close').fadeOut('slow');
        $('#widget-close').remove();
        $('#widget-panel').fadeOut(350);
        $('#widget-panel').remove();
        $('body').removeAttr('class');
        plugin.fadeIn('slow');
      });

    };

    // Widgets
    
    var private_add_widgets = function () {
      $.when($.ajax({url:"./widget.mst", dataType: 'text'}), $.ajax({url:"./widgets.json"}))
      .done(function(template, data){
        Mustache.parse(template[0]);
        var rendered = Mustache.render(template[0], {widgets: data[0].widgets});
        $('#widgets').html(rendered);
      })
      .fail(function(){
        console.log('There was an error.');
      });

    };


    /****************************************
     *********    Public Methods    *********
     ****************************************/

    plugin.click(function (e) {
      var body = document.getElementsByTagName('body')[0];
      var scrollBarWidth = body.offsetWidth - body.clientWidth;
      plugin.css('left', (plugin.position().left - scrollBarWidth) + 'px');
      console.log(plugin.position());
      plugin.fadeOut('slow');

      private_create_panel();
      private_create_close_btn();

    });


    plugin.init();

    return plugin.each(function () {

      // Callback
      if ($.isFunction(callback)) {
        callback(this);
      }
    });
  };
})(jQuery);
