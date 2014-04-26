# Facebook Friend Autocomplete

A JQuery plugin to add a facebook-like suggestion box under inputs with the currently logged in user's facebook friends.

## Installation

include the script after including JQuery along with the css file (or your own):  

    <script src="/facebook-friend-autocomplete.js"></script>
    <link rel="stylesheet" href="/facebook-friend-autocomplete.css">

Also, you're going to need the Facebook Javascript SDK, obviously. You can read all about that [here](https://developers.facebook.com/docs/reference/javascript/).

## Usage

First of all, make sure there is a user logged in. If so, initialize the plugin on your desired input:  

    FB.Event.subscribe('auth.authResponseChange', function(response) {
      if (response.status === 'connected') {
        $('#fb-input').facebookAutocomplete(function(friend) {

          ...

          });
      }
    });

or whatever other way you like, and you're good to go.

## Configuration

### onpick

The only required option is the `onpick` handler, which you can pass in as part of the configuration object or as a function as the only argument.  
The `onpick` function gets called when the user picks a friend.  
The only argument passed to the `onpick` function is an object with the selected friends attributes, for example:  

    {
      id: '100003993588361', // Facebook ID
      name: 'Assaf Gelber',  // Name
      picture: 'http://graph.facebook.com/100003993588361/picture/?width=32&height=32' // Profile Picture
    }

### showAvatars

A boolean value indicating whether to show friend's avatars in suggestions or not. (defaults to `true`)

### avatarSize

A number indicating the avatar's width and height in suggestions in pixels. (defaults to `32`)

### maxSuggestions

A number indicating the maximum number of suggestions to show at once. (defaults to `6`)

#### Example

    $('#fb-input').facebookAutocomplete({
      showAvatars: true,
      avatarSize: 50,
      maxSuggestions: 8,
      onpick: function (friend) {
        console.log("You picked: " + friend.name);
      }
    });

## Running the Demo

Logging in with Facebook can only work on one domain per app. I set up the app to run on `http://localhost:8000`, so inorder to view the demo, you'll have to serve the page locally on port 8000.  
To do that, open your terminal and cd into the directory and run: (requires python to be installed)  

    python -m SimpleHTTPServer

and navigate to `http://localhost:8000/demo.html` from your browser.  
Don't worry about logging in, no one is stealing your identity.

## Contributing

Feel completely free to fork this repository and send pull requests. Thanks!

---

## TODO

* Improve Github page
* Improve demo.html
* Tests
* Take requests from anyone