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
			stack = [],
			motionHandlers = {
				"j": function (count) {
					count = typeof count !== "undefined" ? count : 1;
					if (!isNaN(currentItem)) {
						removeClass(listItems[currentItem], "vimotions-selected");
					} else {
						currentItem = -1;
					}
					currentItem = currentItem + count < listItems.length ? currentItem + count : listItems.length - 1;
					addClass(listItems[currentItem], "vimotions-selected");
				},
				"k": function (count) {
					count = typeof count !== "undefined" ? count : 1;
					if (isNaN(currentItem)) {
						return;
					}
					removeClass(listItems[currentItem], "vimotions-selected");
					currentItem = currentItem - count >= 0 ? currentItem - count : 0;
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

		function getCountFrom(stack) {
			var count = 0;
			for (var i = 0; i < stack.length; i++) {
				var parsed = parseInt(stack.pop(), 10);
				if (isNaN(parsed)) {
					break;
				}
				count += parsed * Math.pow(10, i);
			}
			return count || 1;
		}

		function handler(evt) {
			var char = String.fromCharCode(evt.keyCode);
			char = evt.shiftKey ? char : char.toLowerCase();

			if (!motionHandlers[char]) {
				stack.push(char);
			} else {
				var count = getCountFrom(stack);
				motionHandlers[char](count);
			}
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
