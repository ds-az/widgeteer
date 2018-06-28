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
 *                                                                             *
 * Version: 0.0.02
 ******************************************************************************/

(function( $ ){

  $.fn.widgeteer = function( options, callback ){

    var plugin = $( this );
    plugin.settings = {};

    // Default Settings
    defaults = {

      // widget properties
      widgetAnimate:{
        animate: true,
        className: "widgeteer-pulse"
      },
      widgetBgColor: "#FFD700",
      widgetColor:   "#FF5733",
      widgetIcon:    "fa-bars",

      // panel properties
      panelBgColor: "rgba(49, 49, 49, 0.8)",

      // event callbacks
      click: function(){}
    }


    plugin.init = function(){
      // Settings
      plugin.settings = $.extend( true, {}, defaults, options );

      // Initialize widget
      private_initialize_widget({
        'background-color': plugin.settings.widgetBgColor,
        'color': plugin.settings.widgetColor,
      }
      , plugin.settings.widgetIcon
      , plugin.settings.widgetAnimate );

    };

    /*-----// Private methods //-----*/
    var private_initialize_widget = function( properties, icon, animation ){

      $( plugin ).css( properties );
      $( 'span', plugin ).addClass( icon );

      if( animation.animate ){
          $( plugin ).addClass( animation.className );
      } else {
          $( plugin ).removeClass( animation.className );
      }
    };

    var private_initialize_panel = function(properties, animated){
      if($('#widget-panel').length){
        $('#widget-panel').remove();
        $('body').removeAttr('class');
      } else {
        $('body').append('<div id="widget-panel"></div>');
        $('body').attr('class','body-lock');
      }
    }

    /*-----// Public methods //-----*/
    plugin.click( function(){
      private_initialize_panel();
    } );

    plugin.init();

    return plugin.each( function(){

      // Callback
      if ( $.isFunction( callback ) ) {
        callback( this );
      }
    } );
  };
} )( jQuery );
