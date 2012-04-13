var vimotions = (function () {
		"use strict";

		function addClass(element, className) {
			element.className += " " + className;
		}

		function removeClass(element, className) {
			element.className = element.className.replace(new RegExp("(?:^|\\s)" + className + "(?!\\S)"), '');
		}

		var listItems,
			currentItem,
			motionHandlers = {
				"j": function () {
					if (!isNaN(currentItem)) {
						removeClass(listItems[currentItem], "vimotions-selected");
						currentItem = currentItem < listItems.length - 1 ? currentItem + 1 : currentItem;
					} else {
						currentItem = 0;
					}
					addClass(listItems[currentItem], "vimotions-selected");
				},
				"k": function () {
					if (isNaN(currentItem)) {
						return;
					}
					removeClass(listItems[currentItem], "vimotions-selected");
					currentItem = currentItem > 0 ? currentItem - 1 : currentItem;
					addClass(listItems[currentItem], "vimotions-selected");
				},
				"G": function () {
					var lastItemIndex = listItems.length - 1;
					if (!isNaN(currentItem)) {
						removeClass(listItems[currentItem], "vimotions-selected");
					}
					currentItem = lastItemIndex;
					addClass(listItems[currentItem], "vimotions-selected");
				}
			};

		function handler(evt) {
			if (evt.keyCode === 16) {
				return;
			}
			var char = String.fromCharCode(evt.keyCode);
			char = evt.shiftKey ? char : char.toLowerCase();
			motionHandlers[char] && motionHandlers[char]();
		}

		return {
			bindTo: function (list) {
				listItems = list.children;
				currentItem = NaN;
				document.addEventListener("keydown", handler, false);
			},
			invoke: function (motion) {
				motionHandlers[motion]();
			}
		};
	}());
