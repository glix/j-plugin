# What is this

Jquery-dyndropdown is a jquery plugin for bootstrap that allows for a redefinable multiple selection button dropdown, with update api.

The plugin allows the definition of its content using a generic JSON structure, as the one seen below.

# Requirements

- jQuery
- Bootstrap

# Example of zero configuration

```
$(function(){
            // We initialize the plugin, and update it, always using JSON with the following format
            var json_code = JSON.stringify({
                option_a: {name: 'Option 1'},
                option_b : {
                    name: 'Option 2',
                    values: {
                        response_a: 'a',
                        response_b: 'b'
                    }
                },
                option_c : {
                    name: 'Option 3',
                    values: {
                        response_a: 'c',
                        response_b: 'd',
                        response_c: 'e'
                    }
                }
            });
            options = {}

            var simple = $('#simple_usage').dyndropdown({options});

            simple.setStructure(json_code);
});
```

# Options

Property | Values Possible | Decription
---------|-----------------|-----------
label | String, default: "Action" | Label that will appear on the button (or on the menu top in case we are using the plugin without button dropdown. |
dropup | boolean, default: false | Indicates if the dropdown should dropup. |
| single_choice | boolean, default: true | Indicates if multiple selection should be allowed |
| left_centered_dropdown | boolean, default: false | Indicates if the dropdown should open to the left, instead of the right. |
|size | String, default: null | Indicates the width of the button eg. '100px'. Can also be a percentage, eg. '100%'. |
| button_dropdown | boolean, default: true | Indicates if we have a button dropdown, or instead just the dropdown as a menu. |
| alwaysOneOption | boolean default: false | Indicates if we should always have one option selected of every kind. |
| onSelectionChanged | function, default: null | Callback that is executed when there's a change on the menu selections. Receives as input an object with all the selections. E.g. function(selection){ } |

# API for returned object

Method | Description |
-------|-------------|
setStruture(json) | Defines a new structure for the dropdown using a JSON object |
getSelection() | Returns the selected options on a JSON manner javascript object|
