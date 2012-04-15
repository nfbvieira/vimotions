# vimotions

**vimotions** aims to provide an easy way to assign Vi/Vim motions to
list-like DOM elements.

## Usage

```html
<ul id="myList">
    <li>An item</li>
    ...
</ul>
<script type="text/javascript" src="path/to/vimotions.js"></script>
<script type="text/javascript">
    var list = document.getElementById("myList");
    vimotions.bindTo(list);
</script>
```

## Contributing

If you spot a bug or want to see some new feature, please 
[create a new issue](https://github.com/nunovieira/vimotions/issues/new).

## Copyright

Copyright (c) 2012 Nuno Vieira. Licensed under the
[MIT License](http://www.opensource.org/licenses/MIT).