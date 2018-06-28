(function( $ ){

  $.fn.widgeteer = function( options, callback ){

    var plugin = $( this );
    plugin.settings = {};

    // Default Settings
    defaults = {

      // widget properties
      widgetAnimate: true,
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
    var private_initialize_widget = function( properties, icon, animated ){

      $( plugin ).css( properties );
      $( 'span', plugin ).addClass( icon );

      if( animated ){
          $( plugin ).addClass( 'widgeteer-pulse' );
      } else {
          $( plugin ).removeClass( 'widgeteer-pulse' );
      }
    };

    plugin.init();

    return plugin.each( function(){

      // Callback
      if ( $.isFunction( callback ) ) {
        callback( this );
      }
    } );
  };
} )( jQuery );
