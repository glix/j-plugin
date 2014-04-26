###
Facebook Friend Autocomplete JQuery Plugin v0.0
https://agelber.github.com/facebook-friend-autocomplete

Copyright 2014 Assaf Gelber
Released under the MIT license
###

do ($ = jQuery, window, document) ->

  pluginName = "facebookAutocomplete"
  defaults =
    showAvatars: true
    avatarSize: 32
    maxSuggestions: 6

  class FacebookAutocomplete
    constructor: (@element, options) ->
      if typeof options == 'function'
        onpick = options
        options = { onpick: onpick }

      @element = $(@element)
      @settings = $.extend({}, defaults, options)

      @init()

    init: ->
      @friends = @getFriendList()
      @list = @createSuggestionList()

      @element.on 'keyup.fbac', (e) =>
        switch e.which
          # DOWN ARROW
          when 40 then @changeSelection('down')
          # UP ARROW
          when 38 then @changeSelection('up')
          # ENTER
          when 13 then @submit()
          # EVERYTHING ELSE
          else @filter($(e.currentTarget).val())

      # Pick a friend by clicking on the suggestion
      @list.on 'click', '.fbac-suggestion', (e) =>
        @selected = $(e.currentTarget)
        @submit()

      # Changes the currently selected friend when hovering over a suggestion
      @list.on 'mouseover', '.fbac-suggestion', (e) =>
        @selected.removeClass('fbac-selected')
        @selected = $(e.currentTarget).addClass('fbac-selected')

    # Retrieves a list of the user's friends
    getFriendList: ->
      friends = []
      FB.api '/me/friends/?fields=name', (response) =>
        for friend, i in response.data
          friends.push({
            index: i
            id: friend.id
            name: friend.name
            picture: "http://graph.facebook.com/#{friend.id}/picture?width=#{@settings.avatarSize}&height=#{@settings.avatarSize}" if @settings.showAvatars
          })

      return friends

    # Creates a div to be used as the container for the suggestions
    createSuggestionList: ->
      $suggestionList = $('<div>').addClass('fbac-suggestion-list')
      # Set the suggestion box under the input element with the same width
      # (not including padding, margins and borders)
      $suggestionList.css({
        position: 'absolute'
        left: @element.position().left
        width: @element.innerWidth()
      })
      $suggestionList.insertAfter(@element)
      return $suggestionList

    # Takes a string and returns a list of friends whose names contain the string
    # Number of friends is configurable through the 'maxSuggestions' attribute
    getCurrentSuggestions: (value) ->
      value = value.toLowerCase()
      suggestions = []
      index = 0
      while suggestions.length < @settings.maxSuggestions and index < @friends.length
        suggestions.push(@friends[index]) if @friends[index].name.toLowerCase().indexOf(value) > -1
        index++

      return suggestions

    # Generates the HTML for a suggestion
    generateSuggestion: (suggestion) ->
      $suggestion = $('<div>').addClass('fbac-suggestion').data('index', suggestion.index)
      $name = $('<span>').addClass('fbac-suggestion-name').text(suggestion.name)
      if @settings.showAvatars
        $avatar = $('<img>').addClass('fbac-suggestion-avatar').attr({
          'src': suggestion.picture
          'width': @settings.avatarSize
          'height': @settings.avatarSize
          })
        $avatar.appendTo($suggestion)
      $name.appendTo($suggestion)

      return $suggestion

    # Updates the list of suggestions with suggestions for the given string
    filter: (value) ->
      @list.empty()
      if value != ''
        suggestions = @getCurrentSuggestions(value)
        @list.append(@generateSuggestion(suggestion)) for suggestion in suggestions
        # First suggestion in the list is selected by default
        @selected = @list.children('.fbac-suggestion:first').addClass('fbac-selected')

    # Changes the currently selected friend when scrolling throgh suggestions with the arrow keys
    changeSelection: (dir) ->
      $target = @selected[if dir == 'down' then 'next' else 'prev']('.fbac-suggestion')
      if $target.length > 0
        @selected.removeClass('fbac-selected')
        @selected = $target.addClass('fbac-selected')

    # Calls the the 'onpick' function passing in the selected friend and removes event handlers
    submit: ->
      selectedIndex = @selected.data('index')
      selectedFriend = @friends[selectedIndex]
      # Get the friends avatar if we didn't earlier
      if not @settings.showAvatars
        selectedFriend.picture = "http://graph.facebook.com/#{selectedFriend.id}/picture?width=#{@settings.avatarSize}&height=#{@settings.avatarSize}"
      @settings.onpick.call(@element, selectedFriend)
      @element.val("")
      @list.empty()

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new FacebookAutocomplete(@, options))