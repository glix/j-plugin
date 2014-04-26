/*
Facebook Friend Autocomplete JQuery Plugin v0.0
https://agelber.github.com/facebook-friend-autocomplete

Copyright 2014 Assaf Gelber
Released under the MIT license
 */
(function($, window, document) {
  var FacebookAutocomplete, defaults, pluginName;
  pluginName = "facebookAutocomplete";
  defaults = {
    showAvatars: true,
    avatarSize: 32,
    maxSuggestions: 6
  };
  FacebookAutocomplete = (function() {
    function FacebookAutocomplete(element, options) {
      var onpick;
      this.element = element;
      if (typeof options === 'function') {
        onpick = options;
        options = {
          onpick: onpick
        };
      }
      this.element = $(this.element);
      this.settings = $.extend({}, defaults, options);
      this.init();
    }

    FacebookAutocomplete.prototype.init = function() {
      this.friends = this.getFriendList();
      this.list = this.createSuggestionList();
      this.element.on('keyup.fbac', (function(_this) {
        return function(e) {
          switch (e.which) {
            case 40:
              return _this.changeSelection('down');
            case 38:
              return _this.changeSelection('up');
            case 13:
              return _this.submit();
            default:
              return _this.filter($(e.currentTarget).val());
          }
        };
      })(this));
      this.list.on('click', '.fbac-suggestion', (function(_this) {
        return function(e) {
          _this.selected = $(e.currentTarget);
          return _this.submit();
        };
      })(this));
      return this.list.on('mouseover', '.fbac-suggestion', (function(_this) {
        return function(e) {
          _this.selected.removeClass('fbac-selected');
          return _this.selected = $(e.currentTarget).addClass('fbac-selected');
        };
      })(this));
    };

    FacebookAutocomplete.prototype.getFriendList = function() {
      var friends;
      friends = [];
      FB.api('/me/friends/?fields=name', (function(_this) {
        return function(response) {
          var friend, i, _i, _len, _ref, _results;
          _ref = response.data;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            friend = _ref[i];
            _results.push(friends.push({
              index: i,
              id: friend.id,
              name: friend.name,
              picture: _this.settings.showAvatars ? "http://graph.facebook.com/" + friend.id + "/picture?width=" + _this.settings.avatarSize + "&height=" + _this.settings.avatarSize : void 0
            }));
          }
          return _results;
        };
      })(this));
      return friends;
    };

    FacebookAutocomplete.prototype.createSuggestionList = function() {
      var $suggestionList;
      $suggestionList = $('<div>').addClass('fbac-suggestion-list');
      $suggestionList.css({
        position: 'absolute',
        left: this.element.position().left,
        width: this.element.innerWidth()
      });
      $suggestionList.insertAfter(this.element);
      return $suggestionList;
    };

    FacebookAutocomplete.prototype.getCurrentSuggestions = function(value) {
      var index, suggestions;
      value = value.toLowerCase();
      suggestions = [];
      index = 0;
      while (suggestions.length < this.settings.maxSuggestions && index < this.friends.length) {
        if (this.friends[index].name.toLowerCase().indexOf(value) > -1) {
          suggestions.push(this.friends[index]);
        }
        index++;
      }
      return suggestions;
    };

    FacebookAutocomplete.prototype.generateSuggestion = function(suggestion) {
      var $avatar, $name, $suggestion;
      $suggestion = $('<div>').addClass('fbac-suggestion').data('index', suggestion.index);
      $name = $('<span>').addClass('fbac-suggestion-name').text(suggestion.name);
      if (this.settings.showAvatars) {
        $avatar = $('<img>').addClass('fbac-suggestion-avatar').attr({
          'src': suggestion.picture,
          'width': this.settings.avatarSize,
          'height': this.settings.avatarSize
        });
        $avatar.appendTo($suggestion);
      }
      $name.appendTo($suggestion);
      return $suggestion;
    };

    FacebookAutocomplete.prototype.filter = function(value) {
      var suggestion, suggestions, _i, _len;
      this.list.empty();
      if (value !== '') {
        suggestions = this.getCurrentSuggestions(value);
        for (_i = 0, _len = suggestions.length; _i < _len; _i++) {
          suggestion = suggestions[_i];
          this.list.append(this.generateSuggestion(suggestion));
        }
        return this.selected = this.list.children('.fbac-suggestion:first').addClass('fbac-selected');
      }
    };

    FacebookAutocomplete.prototype.changeSelection = function(dir) {
      var $target;
      $target = this.selected[dir === 'down' ? 'next' : 'prev']('.fbac-suggestion');
      if ($target.length > 0) {
        this.selected.removeClass('fbac-selected');
        return this.selected = $target.addClass('fbac-selected');
      }
    };

    FacebookAutocomplete.prototype.submit = function() {
      var selectedFriend, selectedIndex;
      selectedIndex = this.selected.data('index');
      selectedFriend = this.friends[selectedIndex];
      if (!this.settings.showAvatars) {
        selectedFriend.picture = "http://graph.facebook.com/" + selectedFriend.id + "/picture?width=" + this.settings.avatarSize + "&height=" + this.settings.avatarSize;
      }
      this.settings.onpick.call(this.element, selectedFriend);
      this.element.val("");
      return this.list.empty();
    };

    return FacebookAutocomplete;

  })();
  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new FacebookAutocomplete(this, options));
      }
    });
  };
})(jQuery, window, document);