module("General");

test("Binding motions to a list", function () {
		var list = document.getElementsByTagName("ul")[0];
		expect(0);
		vimotions.bindTo(list);
	});

module("'j' Motion");

test("Moves to first item when pressed the first time", function () {
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");

		notEqual(list.firstElementChild.className.indexOf("vimotions-selected"), -1, "First element should contain class of vimotions-selected");
	});

test("Moves down one item", function () {
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");
		vimotions.invoke("j");

		equal(list.children[0].className.indexOf("vimotions-selected"), -1, "Previous element should be unselected");
		notEqual(list.children[1].className.indexOf("vimotions-selected"), -1, "Current item should now be selected");
	});

test("Stays on last item", function () {
		expect(2);
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");
		vimotions.invoke("j");
		vimotions.invoke("j");

		notEqual(list.children[2].className.indexOf("vimotions-selected"), -1, "Last item should be the only selected");

		vimotions.invoke("j");
		vimotions.invoke("j");

		notEqual(list.children[2].className.indexOf("vimotions-selected"), -1, "Should maintain the last item selected");
  });

module("'k' Motion");

test("Moves up one item", function () {
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");
		vimotions.invoke("j");
		//list.children[1].className += " vimotions-selected"; // Select 2nd list item
		vimotions.invoke("k");

		notEqual(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should be selected");
		equal(list.children[1].className.indexOf("vimotions-selected"), -1, "Second item should be unselected");
	});

test("Stays on first item", function () {
		expect(2);
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");
		vimotions.invoke("j");
		vimotions.invoke("k");

		notEqual(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should be the only selected");

		vimotions.invoke("k");
		vimotions.invoke("k");

		notEqual(list.children[0].className.indexOf("vimotions-selected"), -1, "Should maintain the first item selected");
	});

test("Mixing up and down motions", function () {
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		expect(5);
		vimotions.invoke("k"); // Should do nothing, since no item was previously selected
		equal(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should not be selected");

		vimotions.invoke("j"); // Move down to first item
		notEqual(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should be selected");

		vimotions.invoke("k"); // Move up (keeps first item selected)
		notEqual(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should be selected");

		vimotions.invoke("j"); // Move down to second item
		equal(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should now be unselected");
		notEqual(list.children[1].className.indexOf("vimotions-selected"), -1, "Second item should be selected");
	});

module("'G' Motion");

test("Moves to last item", function () {
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");
		vimotions.invoke("G");

		equal(list.children[0].className.indexOf("vimotions-selected"), -1, "Previous item should be unselected");
		notEqual(list.children[list.children.length - 1].className.indexOf("vimotions-selected"), -1, "Last item should be selected");
	});

test("Stays on last item", function () {
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("G");
		vimotions.invoke("G");
		vimotions.invoke("G");

		equal(list.children[0].className.indexOf("vimotions-selected"), -1, "First item should be unselected");
		equal(list.children[1].className.indexOf("vimotions-selected"), -1, "Second item should be unselected");
		notEqual(list.children[list.children.length - 1].className.indexOf("vimotions-selected"), -1, "Last item should be selected");
});
