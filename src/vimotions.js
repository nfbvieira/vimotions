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
						removeClass(listItems[currentItem - 1], "vimotions-selected");
					}
					listItems[currentItem].className += " vimotions-selected";
					currentItem = currentItem + 1;
				},
				"k": function () {
					currentItem = currentItem ? currentItem - 1 : 0;
					if (currentItem === 0) {
						return;
					}
					removeClass(listItems[currentItem], "vimotions-selected");
					listItems[currentItem - 1].className += " vimotions-selected";
				}
			};

		function removeClass(element, className) {
			element.className = element.className.replace(new RegExp("(?:^|\\s)" + className + "(?!\\S)"), '');
		}

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
