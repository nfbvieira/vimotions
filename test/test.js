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
		notEqual(list.children[1].className.indexOf("vimotions-selected"), -1, "Next item should now be selected");
	});

test("Stays on last item", function () {
		expect(2);
		var list = document.getElementsByTagName("ul")[0];
		vimotions.bindTo(list);
		vimotions.invoke("j");
		vimotions.invoke("j");
		vimotions.invoke("j");

		notEqual(list.children[2].className.indexOf("vimotions-selected"), -1, "Next item should now be selected");

		vimotions.invoke("j");
		vimotions.invoke("j");

		notEqual(list.children[2].className.indexOf("vimotions-selected"), -1, "Next item should now be selected");
  });
