var vimotions = (function () {
		"use strict";

		function addClass(element, className) {
			element.className += " " + className;
		}

		function removeClass(element, className) {
			element.className = element.className.replace(
				new RegExp("(?:^|\\s)" + className + "(?!\\S)"),
				''
			);
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
					currentItem = currentItem + count < listItems.length ?
							currentItem + count :
							listItems.length - 1;
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
				"G": function (item) {
					if (!isNaN(currentItem)) {
						removeClass(listItems[currentItem], "vimotions-selected");
					}
					currentItem = typeof item !== "undefined" && item <= listItems.length ?
							item - 1 :
							listItems.length - 1;
					addClass(listItems[currentItem], "vimotions-selected");
				}
			};

		function getCountFrom(stack) {
			var count = 0, exponent = 0, parsed;
			while (stack.length) {
				parsed = parseInt(stack.pop(), 10);
				if (isNaN(parsed)) {
					break;
				}
				count += parsed * Math.pow(10, exponent);
				exponent += 1;
			}
			return count || undefined;
		}

		function isAllowedCharacter(character) {
			var charCode = character.charCodeAt(0);
			return !isNaN(parseInt(character, 10)) ||
				(charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) ||
				(charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0));
		}

		function handler(evt) {
			var char = String.fromCharCode(evt.keyCode), count;
			char = evt.shiftKey ? char : char.toLowerCase();

			if (!isAllowedCharacter(char)) { // Avoid stack pollution
				return;
			}

			if (!motionHandlers[char]) {
				stack.push(char);
			} else {
				count = getCountFrom(stack);
				motionHandlers[char](count);
			}
		}

		return {
			bindTo: function (list) {
				listItems = list.children;
				currentItem = NaN;
				document.addEventListener("keydown", handler, false);
			},
			invoke: function (motion, param) {
				motionHandlers[motion](param);
			}
		};
	}());
