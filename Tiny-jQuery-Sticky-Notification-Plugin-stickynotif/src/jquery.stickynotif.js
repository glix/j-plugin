// Sticky v1.0 by Daniel Raftery
// http://thrivingkings.com/sticky
//
// http://twitter.com/ThrivingKings
//
// jQuery-StickyNotif v0.0.1 forked from Sticky v1.0 by Glenn Dwiyatcita
// https://github.com/dwiyatci/jquery-stickynotif

(function ($) {

    // Using it without an object
    $.sticky = function (note, options, callback) { return $.fn.sticky(note, options, callback); };

    $.fn.sticky = function (note, options, callback) {
        var position = 'top-right'; // top-left, top-right, bottom-left, or bottom-right

        // Default settings
        var settings = {
            'speed'      : 'fast', // animations: fast, slow, or integer
            'duplicates' : true, // true or false
            'autoclose'  : 5000, // integer or false
            'stickyClass': 'default' // default, info, success, warning, error
        };

        // Passing in the object instead of specifying a note
        if (!note) { note = this.html(); }

        if (options) { $.extend(settings, options); }

        // Variables
        var display = true;
        var duplicate = 'no';
        var stickyClass = settings.stickyClass;

        // Somewhat of a unique ID
        var uniqID = Math.floor(Math.random() * 99999);

        // Handling duplicate notes and IDs
        $('.sticky-note').each(function () {
            if ($(this).html() == note && $(this).is(':visible')) {
                duplicate = 'yes';
                if (!settings.duplicates) { display = false; }
            }
            if ($(this).attr('id') == uniqID) { uniqID = Math.floor(Math.random() * 9999999); }
        });

        var body = $('body');
        // Make sure the sticky queue exists
        if (!body.find('.sticky-queue').html()) { body.append('<div class="sticky-queue ' + position + '"></div>'); }

        // Can it be displayed?
        if (display) {
            // Building and inserting sticky note
            $('.sticky-queue').prepend('<div class="sticky border-' + position + ' sticky-' + stickyClass + '" id="' + uniqID + '"></div>');
            var sticky = $('#' + uniqID);
            sticky.append('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA1klEQVQoz6WSOw6CQBCG90gWXsjKxph4HZAEsgUSHlsAAa6ilzDGgopxP5Ix2K7FJH/+x+wMjBERoxXH8d5aey2K4l6W5ZMCw6FtvV+Qpumlrut313UyDIOM47gWGA4Nz08QomkaadtW+r5fA9M0rQWGQ8OjYRNF0c53mxH8aLc8z8/OuYWXKDAcGh68ZAzzMwpdveFEtyzLDt6AScBwaHjwkjF++cem+6zGJEmOlDZCUx8ZU1XVS3eC9K8sGtAGcGi6M5nwYPCowR8n+HcEH8BfJxdy5B8L5i9vzgm5WAAAAABJRU5ErkJggg==" class="sticky-close" rel="' + uniqID + '" title="Close" />');
            sticky.append('<div class="sticky-note" rel="' + uniqID + '">' + note + '</div>');

            // Smoother animation
            //var height = $('#' + uniqID).height();
            //sticky.css('height', height);

            sticky.slideDown(settings.speed);
            display = true;
        }

        // Listeners
        $('.sticky').ready(function () {
            // If 'autoclose' is enabled, set a timer to close the sticky
            if (settings.autoclose) { $('#' + uniqID).delay(settings.autoclose).fadeOut(settings.speed); }
        });
        // Closing a sticky
        $('.sticky-close').click(function () { $('#' + $(this).attr('rel')).dequeue().fadeOut(settings.speed); });


        // Callback data
        var response = {
            'id'       : uniqID,
            'duplicate': duplicate,
            'displayed': display,
            'position' : position
        };

        // Callback function?
        if (callback) { callback(response); }
        else { return(response); }

    };
})(jQuery);
