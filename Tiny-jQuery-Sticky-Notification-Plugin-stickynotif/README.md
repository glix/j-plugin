# jquery-stickynotif
In spite of the fact I'm amazed with Sticky (http://thrivingkings.com/sticky) because its simplicity compared to the other plugins of some sort, I wasn't quite satisfied with its notification styles which doesn't support for representing different types of messages (info, success, warning, and error). So, I decided to fork and leverage its capability. Still, **almost all the credits go to the original creator**: [Daniel Raftery](https://github.com/ThrivingKings)! \o/

## Demo
I find it really useful (or rather clean &amp; cute) for consistently displaying the client-side error or popping general messages up. See the live demo [here](http://tiny.cc/jquery-stickynotif-demo).

## Basic Usage
The basic functionality stays the same as [Sticky](http://thrivingkings.com/sticky), except that you can now pass the `stickyClass` option to style the sticky note:

```javascript
$.sticky('Welcome my son, welcome to the machine.', { stickyClass: 'info' });
```

## Options
* **`speed`**: The speed of the animations: `'fast'`, `'slow'`, or integer. Default to `'fast'`.
* **`duplicates`**: If `false`, the duplicates are not allowed. Default to `true`.
* **`autoclose`**: The time before the note is auto-closed in milliseconds. Set it to `false` to manually close the note. Default to `5000`.
* **`stickyClass`**: The string indicates the styling class of the note. The value can be either `'default'`, `'info'`, `'success'`, `'warning'`, or `'error'`. Default to `'default'`.

## Copyright and License
The library is Copyright (c) 2014 Dwiyatci Inc., and distributed under the MIT License.
