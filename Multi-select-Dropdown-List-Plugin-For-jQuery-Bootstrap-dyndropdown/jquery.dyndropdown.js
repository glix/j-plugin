/*
 * Author: Ricardo Ribeiro <ribeiro.r@ua.pt>
 * This allows for a dropdown that has dynamic values, that can be updated anytime through a json structure
 */

(function($) {
    $.fn.dyndropdown = function(options) {
        var self = this;
        var menu_entries = {};
        var selected_options = {};

        var settings = $.extend({
            label: "Action",
            dropup: false,
            single_choice: true,
            left_centered_dropdown: false,
            size: null,
            button_dropdown: true,
            onSelectionChanged: null,
            alwaysOneOption: false
        }, options);

        // Validate that callbacks are functions
        if(settings.onSelectionChanged != null){
            if (typeof settings.onSelectionChanged !== 'function'){
                console.error('You must define the onSelectionChanged callback as a function.');
                return null;
            }
        }

        var api = {
            redraw: function() {
                var output = [];
                output.push('<div class="btn-group');
                if (settings.dropup) {
                    output.push(" dropup");
                }
                output.push('">');

                if (settings.button_dropdown) {
                    output.push("<a ");
                    if (settings.size != null)
                        output.push('style="width:' + settings.button_size + ';"');
                    output.push(' class="btn dropdown-toggle" data-toggle="dropdown" href="javascript: void(0)">');
                    output.push(settings.label);
                    output.push('&nbsp; <span class="caret"></span></a>');
                }

                output.push('<ul');
                if(settings.button_dropdown)
                    output.push(' id="dyndropdown_menu" role="menu"');

                output.push(' class="dyndropdown_options dropdown-menu');
                if (settings.left_centered_dropdown)
                    output.push(' pull-right');
                output.push(' dropdown-menu-f">');
                 
                output.push('</ul></div>');

                self.addClass('dyndropdown_container');
                
                self.html(output.join(''));
                if(!settings.button_dropdown){
                    if(settings.size != null)
                        $('.dropdown-menu',self).css('width', settings.size);
                    $('.dropdown-menu',self).show();
                }
            },
            setStructure: function(json) {
                $('.dyndropdown_options', self).html('');
                selected_options = {};
                
                var json = JSON.parse(json);
                menu_entries = json;
                var selected = '<i style="margin-top:2px;" class="dyndropdown-selected pull-right icon-ok"></i>';

                var options = [];

                if(settings.label != 'Action' && !settings.button_dropdown){
                    options.push('<li style="text-align: center; font-weight: bold;">'+settings.label+'</li>');
                }  

                for (element in json) {
                    if (json.hasOwnProperty(element)) {
                        options.push('<li id="dyndropdownop_' + element + '" class="');
                        if (this.size(json[element].values) > 0) {
                            options.push('dropdown-submenu');
                            if (settings.left_centered_dropdown)
                                options.push(' pull-left');
                        } else {
                            options.push('dyndropdown-selectable');



                        }
                        options.push('"><a tabindex="-1" href="javascript: void(0)">');
                        options.push(json[element].name);
                        if(this.size(json[element]) == 0 && settings.alwaysOneOption){
                            options.push(selected);
                            api.addSelection(element, element);
                        }
                        options.push('</a>');
                        options.push('<ul class="dropdown-menu dropdown-menu-f">');
                        var first = true;
                        for (subelement in json[element].values) {
                            console.log(json[element].values[subelement])
                            if (json[element].values.hasOwnProperty(subelement)) {
                                options.push('<li id="dyndropdownop_' + element + '___' + subelement + '" class="dyndropdown-selectable">');
                                options.push('<a tabindex="-1" href="javascript: void(0)">');
                                options.push(json[element].values[subelement]);
                                if(first && settings.alwaysOneOption){
                                    options.push(selected);
                                    first = false;
                                    api.addSelection(element, subelement);
                                }
                                options.push('</a></li>');
                            }
                        }

                        options.push('</ul>');
                        options.push('</li>');
                    }
                }


                
                $('.dyndropdown_options', self).html(options.join(''));

                if (settings.left_centered_dropdown)
                    $('.dropdown-submenu > a', self).addClass('dyndropdown_leftcaret');

                $('.dropdown-menu').on('click', function(e) {
                    if ($(this).hasClass('dropdown-menu-f')) {
                        e.stopPropagation();
                        $('a').blur();
                    }
                });

                $('.dyndropdown-selectable', self).click(function() {
                    var vid = $(this).attr('id').replace('dyndropdownop_', '');
                    var key;
                    var value;
                    if (vid.indexOf('___') == -1) {
                        key = vid;
                        value = vid;
                    } else {
                        var splitted = vid.split('___');
                        key = splitted[0];
                        value = splitted[1];
                    }
                    var selected_arrow = $(this).find('.dyndropdown-selected');

                    if (selected_arrow.length > 0) {
                        if(!(settings.alwaysOneOption 
                            && selected_options[key] != null
                            && selected_options[key].length <=1)
                            ){

                            selected_arrow.remove();
                        }
                        
                        api.removeSelection(key, value);

                    } else {


                        var success = api.addSelection(key, value);

                        if (!success) {
                            $(this).parent().find('.dyndropdown-selected').remove();
                            $('a', this).append(selected);
                        } else {
                            $('a', this).append(selected);
                        }
                    }
                });
            },
            size: function(obj) {
                var size = 0,
                    key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            },
            getSelection: function() {
                return selected_options;
            },
            addSelection: function(key, value) {
                var this_selection = selected_options[key];

                if (this_selection) {

                    if (this.containsValue(key, value) === -1) {
                        if (settings.single_choice) {
                            selected_options[key] = [value];

                            if(settings.onSelectionChanged != null)
                                settings.onSelectionChanged(selected_options);

                            return false;
                        } else {
                            this_selection.push(value);
                        }
                    }

                } else {
                    selected_options[key] = [value];
                }
                if(settings.onSelectionChanged != null)
                    settings.onSelectionChanged(selected_options);
                return true;
            },
            removeSelection: function(key, value) {
                var this_selection = selected_options[key];

                try {
                    if (this_selection.length <= 1) {
                        if(!settings.alwaysOneOption){
                            delete selected_options[key];
                        }
                    } else {
                        var index = this.containsValue(key, value);
                        if (index != -1) {
                            this_selection.splice(index, 1);
                        }
                    }
                } catch (err) {
                    console.err('Removing invalid selection.');
                }
                if(settings.onSelectionChanged != null)
                    settings.onSelectionChanged(selected_options);
            },
            containsValue: function(key, value) {
                var this_selection = selected_options[key];

                for (var i = 0; i < this_selection.length; i++) {
                    if (this_selection[i] === value) {
                        return i;
                    }
                }

                return -1;
            }
        };

        api.redraw();

        return api;
    };
}(jQuery));