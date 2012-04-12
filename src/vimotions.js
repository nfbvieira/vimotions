var vimotions = (function () {
		"use strict";

		var listItems,
			currentItem,
			motionHandlers = {
				"j": function () {
					if (currentItem === listItems.length) {
						return;
					}
					if (currentItem > 0) {
						listItems[currentItem - 1].className = listItems[currentItem - 1].className.replace(/(?:^|\s)vimotions-selected(?!\S)/, '');
					}
					listItems[currentItem].className += " vimotions-selected";
					currentItem = currentItem + 1;
				}
			};

		function handler(evt) {
			if (evt.keyCode === 16) {
				return;
			}
			var char = String.fromCharCode(evt.keyCode);
			char = evt.shiftKey ? char : char.toLowerCase();
			console.log(char);
		}

		return {
			bindTo: function (list) {
				listItems = list.children;
				currentItem = 0;
				document.addEventListener("keydown", handler, false);
			},
			invoke: function (motion) {
				motionHandlers[motion]();
			}
		};
	}());
