function isSelected(item) {
	return item.className.indexOf('vimotions-selected') != -1;
}

module('General');

test('Binding motions to a list', function () {
		var list = document.getElementsByTagName('ul')[0];
		expect(0);
		vimotions.bindTo(list);
	});

module('"j" Motion');

test('Moves to first item when pressed the first time', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j');

		ok(isSelected(list.children[0]), 'First item should be selected');
	});

test('Moves down one item', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j');
		vimotions.invoke('j');

		ok(!isSelected(list.children[0]), 'Previous item should be unselected');
		ok(isSelected(list.children[1]), 'Current item should now be selected');
	});

test('Moves down [count] items', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j', 2);

		ok(!isSelected(list.children[0]), 'First element should be unselected');
		ok(isSelected(list.children[1]), 'Second item should be selected');
	});

test('Moves down to last item when [count] exceeds number of items', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j', 123);

		ok(!isSelected(list.children[0]), 'First element should be unselected');
		ok(!isSelected(list.children[1]), 'Second element should be unselected');
		ok(isSelected(list.children[2]), 'Last item should be selected');
	});

test('Stays on last item', function () {
		expect(2);
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j');
		vimotions.invoke('j');
		vimotions.invoke('j');

		ok(isSelected(list.children[2]), 'Last item should be the only selected');

		vimotions.invoke('j');
		vimotions.invoke('j');

		ok(isSelected(list.children[2]), 'Should maintain the last item selected');
  });

module('"k" Motion');

test('Moves up one item', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j');
		vimotions.invoke('j');
		vimotions.invoke('k');

		ok(isSelected(list.children[0]), 'First item should be selected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
	});

test('Stays on first item', function () {
		expect(2);
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j');
		vimotions.invoke('j');
		vimotions.invoke('k');

		ok(isSelected(list.children[0]), 'First item should be the only selected');

		vimotions.invoke('k');
		vimotions.invoke('k');

		ok(isSelected(list.children[0]), 'Should maintain the first item selected');
	});

test('Moves up [count] items', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j', 3);
		vimotions.invoke('k', 2);

		ok(isSelected(list.children[0]), 'First item should be selected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
		ok(!isSelected(list.children[2]), 'Third item should be unselected');
	});

test('Moves up to first item when [count] exceeds number of previous items', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j', 3);
		vimotions.invoke('k', 123);

		ok(isSelected(list.children[0]), 'First item should be selected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
		ok(!isSelected(list.children[2]), 'Last item should be unselected');
	});

test('Mixing up and down motions', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		expect(5);
		vimotions.invoke('k'); // Should do nothing, since no item was previously selected
		ok(!isSelected(list.children[0]), 'First item should not be selected');

		vimotions.invoke('j'); // Move down to first item
		ok(isSelected(list.children[0]), 'First item should be selected');

		vimotions.invoke('k'); // Move up (keeps first item selected)
		ok(isSelected(list.children[0]), 'First item should be selected');

		vimotions.invoke('j'); // Move down to second item
		ok(!isSelected(list.children[0]), 'First item should now be unselected');
		ok(isSelected(list.children[1]), 'Second item should be selected');
	});

module('"G" Motion');

test('Moves to last item when no item number is given', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j');
		vimotions.invoke('G');

		ok(!isSelected(list.children[0]), 'Previous item should be unselected');
		ok(isSelected(list.children[2]), 'Last item should be selected');
	});

test('Stays on last item', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('G');
		vimotions.invoke('G');
		vimotions.invoke('G');

		ok(!isSelected(list.children[0]), 'First item should be unselected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
		ok(isSelected(list.children[2]), 'Last item should be selected');
});

test('Moves to item passed as parameter', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('G', 2);

		ok(!isSelected(list.children[0]), 'First item should be unselected');
		ok(isSelected(list.children[1]), 'Second item should be selected');
		ok(!isSelected(list.children[2]), 'Third item should be unselected');
	});

test('Moves to last item if argument is bigger than total items', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('G', 123);

		ok(!isSelected(list.children[0]), 'First item should be unselected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
		ok(isSelected(list.children[2]), 'Last item should be selected');
	});

module('"gg" Motion');

test('Moves to first item when no item number is given', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('j', 3);
		vimotions.invoke('gg');

		ok(isSelected(list.children[0]), 'First item should be selected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
		ok(!isSelected(list.children[2]), 'Last item should be unselected');
	});

test('Moves to item passed as parameter', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('gg', 2);

		ok(!isSelected(list.children[0]), 'First item should be unselected');
		ok(isSelected(list.children[1]), 'Second item should be selected');
		ok(!isSelected(list.children[2]), 'Third item should be unselected');
	});

test('Moves to last item if argument is bigger than total items', function () {
		var list = document.getElementsByTagName('ul')[0];
		vimotions.bindTo(list);
		vimotions.invoke('gg', 123);

		ok(!isSelected(list.children[0]), 'First item should be unselected');
		ok(!isSelected(list.children[1]), 'Second item should be unselected');
		ok(isSelected(list.children[2]), 'Last item should be selected');
	});

module('Empty list', {
	setup: function() {
		var emptyList = document.getElementById('empty-list');
		vimotions.bindTo(emptyList);
	}
});

test('Doesn\'t throw when invoking on empty list', function() {
		expect(0);

		vimotions.invoke('j');
		vimotions.invoke('k');
		vimotions.invoke('gg');
		vimotions.invoke('G');
	});
