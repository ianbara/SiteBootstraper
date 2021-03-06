﻿(function (c) { c(window.jQuery, window, document) })(function (c, l, w, x) {
    c.widget("selectBox.selectBoxIt", {
        VERSION: "3.8.1", options: {
            showEffect: "none", showEffectOptions: {}, showEffectSpeed: "medium", hideEffect: "none", hideEffectOptions: {}, hideEffectSpeed: "medium", showFirstOption: !0, defaultText: "", defaultIcon: "", downArrowIcon: "", theme: "default", keydownOpen: !0, isMobile: function () { return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(navigator.userAgent || navigator.vendor || l.opera) }, "native": !1,
            aggressiveChange: !1, selectWhenHidden: !0, viewport: c(l), similarSearch: !1, copyAttributes: ["title", "rel"], copyClasses: "button", nativeMousedown: !1, customShowHideEvent: !1, autoWidth: !0, html: !0, populate: "", dynamicPositioning: !0, hideCurrent: !1
        }, getThemes: function () {
            var a = c(this.element).attr("data-theme") || "c"; return {
                bootstrap: { focus: "active", hover: "", enabled: "enabled", disabled: "disabled", arrow: "caret", button: "btn", list: "dropdown-menu", container: "bootstrap", open: "open" }, jqueryui: {
                    focus: "ui-state-focus", hover: "ui-state-hover",
                    enabled: "ui-state-enabled", disabled: "ui-state-disabled", arrow: "ui-icon ui-icon-triangle-1-s", button: "ui-widget ui-state-default", list: "ui-widget ui-widget-content", container: "jqueryui", open: "selectboxit-open"
                }, jquerymobile: {
                    focus: "ui-btn-down-" + a, hover: "ui-btn-hover-" + a, enabled: "ui-enabled", disabled: "ui-disabled", arrow: "ui-icon ui-icon-arrow-d ui-icon-shadow", button: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" + a, list: "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-" +
                    a, container: "jquerymobile", open: "selectboxit-open"
                }, "default": { focus: "selectboxit-focus", hover: "selectboxit-hover", enabled: "selectboxit-enabled", disabled: "selectboxit-disabled", arrow: "selectboxit-default-arrow", button: "selectboxit-btn", list: "selectboxit-list", container: "selectboxit-container", open: "selectboxit-open" }
            }
        }, isDeferred: function (a) { return c.isPlainObject(a) && a.promise && a.done }, _create: function (a) {
            var b = this.options.populate, e = this.options.theme; if (this.element.is("select")) return this.widgetProto =
            c.Widget.prototype, this.originalElem = this.element[0], this.selectBox = this.element, this.options.populate && this.add && !a && this.add(b), this.selectItems = this.element.find("option"), this.firstSelectItem = this.selectItems.slice(0, 1), this.documentHeight = c(w).height(), this.theme = c.isPlainObject(e) ? c.extend({}, this.getThemes()["default"], e) : this.getThemes()[e] ? this.getThemes()[e] : this.getThemes()["default"], this.currentFocus = 0, this.blur = !0, this.textArray = [], this.currentIndex = 0, this.currentText = "", this.flipped =
            !1, a || (this.selectBoxStyles = this.selectBox.attr("style")), this._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(this.theme)._eventHandlers(), this.originalElem.disabled && this.disable && this.disable(), this._ariaAccessibility && this._ariaAccessibility(), this.isMobile = this.options.isMobile(), this._mobile && this._mobile(), this.options["native"] && this._applyNativeSelect(), this.triggerEvent("create"), this
        }, _createDropdownButton: function () {
            var a = this.originalElemId =
            this.originalElem.id || "", b = this.originalElemValue = this.originalElem.value || "", e = this.originalElemName = this.originalElem.name || "", d = this.options.copyClasses, g = this.selectBox.attr("class") || ""; this.dropdownText = c("<span/>", { id: a && a + "SelectBoxItText", "class": "selectboxit-text", unselectable: "on", text: this.firstSelectItem.text() }).attr("data-val", b); this.dropdownImageContainer = c("<span/>", { "class": "selectboxit-option-icon-container" }); this.dropdownImage = c("<i/>", {
                id: a && a + "SelectBoxItDefaultIcon", "class": "selectboxit-default-icon",
                unselectable: "on"
            }); this.dropdown = c("<span/>", { id: a && a + "SelectBoxIt", "class": "selectboxit " + ("button" === d ? g : "") + " " + (this.selectBox.prop("disabled") ? this.theme.disabled : this.theme.enabled), name: e, tabindex: this.selectBox.attr("tabindex") || "0", unselectable: "on" }).append(this.dropdownImageContainer.append(this.dropdownImage)).append(this.dropdownText); this.dropdownContainer = c("<span/>", { id: a && a + "SelectBoxItContainer", "class": "selectboxit-container " + this.theme.container + " " + ("container" === d ? g : "") }).append(this.dropdown);
            return this
        }, _createUnorderedList: function () {
            var a = this, b, e, d, g, f, m, t, q = "", k = a.originalElemId || "", k = c("<ul/>", { id: k && k + "SelectBoxItOptions", "class": "selectboxit-options", tabindex: -1 }), u, v, r, n, h, p; a.options.showFirstOption || (a.selectItems.first().attr("disabled", "disabled"), a.selectItems = a.selectBox.find("option").slice(1)); a.selectItems.each(function (k) {
                h = c(this); d = e = ""; b = h.prop("disabled"); g = h.attr("data-icon") || ""; m = (f = h.attr("data-iconurl") || "") ? "selectboxit-option-icon-url" : ""; t = f ? "style=\"background-image:url('" +
                f + "');\"" : ""; u = h.attr("data-selectedtext"); n = (v = h.attr("data-text")) ? v : h.text(); p = h.parent(); p.is("optgroup") && (e = "selectboxit-optgroup-option", 0 === h.index() && (d = '<span class="selectboxit-optgroup-header ' + p.first().attr("class") + '"data-disabled="true">' + p.first().attr("label") + "</span>")); h.attr("value", this.value); q += d + '<li data-id="' + k + '" data-val="' + this.value + '" data-disabled="' + b + '" class="' + e + " selectboxit-option " + (c(this).attr("class") || "") + '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon ' +
                g + " " + (m || a.theme.container) + '"' + t + "></i></span>" + (a.options.html ? n : a.htmlEscape(n)) + "</a></li>"; r = h.attr("data-search"); a.textArray[k] = b ? "" : r ? r : n; this.selected && (a._setText(a.dropdownText, u || n), a.currentFocus = k)
            }); if (a.options.defaultText || a.selectBox.attr("data-text")) { var l = a.options.defaultText || a.selectBox.attr("data-text"); a._setText(a.dropdownText, l); a.options.defaultText = l } k.append(q); a.list = k; a.dropdownContainer.append(a.list); a.listItems = a.list.children("li"); a.listAnchors = a.list.find("a");
            a.listItems.first().addClass("selectboxit-option-first"); a.listItems.last().addClass("selectboxit-option-last"); a.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(a.theme.disabled); a.dropdownImage.addClass(a.selectBox.attr("data-icon") || a.options.defaultIcon || a.listItems.eq(a.currentFocus).find("i").attr("class")); a.dropdownImage.attr("style", a.listItems.eq(a.currentFocus).find("i").attr("style")); return a
        }, _replaceSelectBox: function () {
            var a = this.originalElem.id || "", b = this.selectBox.attr("data-size"),
            b = this.listSize = b === x ? "auto" : "0" === b ? "auto" : +b, e; this.selectBox.css("display", "none").after(this.dropdownContainer); this.dropdownContainer.appendTo("body").addClass("selectboxit-rendering"); this.dropdown.height(); this.downArrow = c("<i/>", { id: a && a + "SelectBoxItArrow", "class": "selectboxit-arrow", unselectable: "on" }); this.downArrowContainer = c("<span/>", { id: a && a + "SelectBoxItArrowContainer", "class": "selectboxit-arrow-container", unselectable: "on" }).append(this.downArrow); this.dropdown.append(this.downArrowContainer);
            this.listItems.removeClass("selectboxit-selected").eq(this.currentFocus).addClass("selectboxit-selected"); a = this.downArrowContainer.outerWidth(!0); e = this.dropdownImage.outerWidth(!0); this.options.autoWidth && (this.dropdown.css({ width: "auto" }).css({ width: this.list.outerWidth(!0) + a + e }), this.list.css({ "min-width": this.dropdown.width() })); this.dropdownText.css({ "max-width": this.dropdownContainer.outerWidth(!0) - (a + e) }); this.selectBox.after(this.dropdownContainer); this.dropdownContainer.removeClass("selectboxit-rendering");
            "number" === c.type(b) && (this.maxHeight = this.listAnchors.outerHeight(!0) * b); return this
        }, _scrollToView: function (a) { var b = this.listItems.eq(this.currentFocus), c = this.list.scrollTop(), d = b.height(), b = b.position().top, g = Math.abs(b), f = this.list.height(); "search" === a ? f - b < d ? this.list.scrollTop(c + (b - (f - d))) : -1 > b && this.list.scrollTop(b - d) : "up" === a ? -1 > b && this.list.scrollTop(c - g) : "down" === a && f - b < d && this.list.scrollTop(c + (g - f + d)); return this }, _callbackSupport: function (a) {
            c.isFunction(a) && a.call(this, this.dropdown);
            return this
        }, _setText: function (a, b) { this.options.html ? a.html(b) : a.text(b); return this }, open: function (a) {
            var b = this, c = b.options.showEffect, d = b.options.showEffectSpeed, g = b.options.showEffectOptions, f = b.options["native"], m = b.isMobile; if (!b.listItems.length || b.dropdown.hasClass(b.theme.disabled)) return b; if (!f && !m && !this.list.is(":visible")) {
                b.triggerEvent("open"); b._dynamicPositioning && b.options.dynamicPositioning && b._dynamicPositioning(); if ("none" === c) b.list.show(); else if ("show" === c || "slideDown" ===
                c || "fadeIn" === c) b.list[c](d); else b.list.show(c, g, d); b.list.promise().done(function () { b._scrollToView("search"); b.triggerEvent("opened") })
            } b._callbackSupport(a); return b
        }, close: function (a) {
            var b = this, c = b.options.hideEffect, d = b.options.hideEffectSpeed, g = b.options.hideEffectOptions, f = b.isMobile; if (!b.options["native"] && !f && b.list.is(":visible")) { b.triggerEvent("close"); if ("none" === c) b.list.hide(); else if ("hide" === c || "slideUp" === c || "fadeOut" === c) b.list[c](d); else b.list.hide(c, g, d); b.list.promise().done(function () { b.triggerEvent("closed") }) } b._callbackSupport(a);
            return b
        }, toggle: function () { var a = this.list.is(":visible"); a ? this.close() : a || this.open() }, _keyMappings: { 38: "up", 40: "down", 13: "enter", 8: "backspace", 9: "tab", 32: "space", 27: "esc" }, _keydownMethods: function () {
            var a = this, b = a.list.is(":visible") || !a.options.keydownOpen; return {
                down: function () { a.moveDown && b && a.moveDown() }, up: function () { a.moveUp && b && a.moveUp() }, enter: function () { var b = a.listItems.eq(a.currentFocus); a._update(b); "true" !== b.attr("data-preventclose") && a.close(); a.triggerEvent("enter") }, tab: function () {
                    a.triggerEvent("tab-blur");
                    a.close()
                }, backspace: function () { a.triggerEvent("backspace") }, esc: function () { a.close() }
            }
        }, _eventHandlers: function () {
            var a = this, b = a.options.nativeMousedown, e = a.options.customShowHideEvent, d, g, f = a.focusClass, m = a.hoverClass, l = a.openClass; this.dropdown.on({
                "click.selectBoxIt": function () { a.dropdown.trigger("focus", !0); a.originalElem.disabled || (a.triggerEvent("click"), b || e || a.toggle()) }, "mousedown.selectBoxIt": function () { c(this).data("mdown", !0); a.triggerEvent("mousedown"); b && !e && a.toggle() }, "mouseup.selectBoxIt": function () { a.triggerEvent("mouseup") },
                "blur.selectBoxIt": function () { a.blur && (a.triggerEvent("blur"), a.close(), c(this).removeClass(f)) }, "focus.selectBoxIt": function (b, d) { var e = c(this).data("mdown"); c(this).removeData("mdown"); e || d || setTimeout(function () { a.triggerEvent("tab-focus") }, 0); d || (c(this).hasClass(a.theme.disabled) || c(this).addClass(f), a.triggerEvent("focus")) }, "keydown.selectBoxIt": function (b) {
                    var c = a._keyMappings[b.keyCode], d = a._keydownMethods()[c]; d && (d(), !a.options.keydownOpen || "up" !== c && "down" !== c || a.open()); d && "tab" !== c &&
                    b.preventDefault()
                }, "keypress.selectBoxIt": function (b) { var c = a._keyMappings[b.charCode || b.keyCode], d = String.fromCharCode(b.charCode || b.keyCode); a.search && (!c || c && "space" === c) && a.search(d, !0, !0); "space" === c && b.preventDefault() }, "mouseenter.selectBoxIt": function () { a.triggerEvent("mouseenter") }, "mouseleave.selectBoxIt": function () { a.triggerEvent("mouseleave") }
            }); a.list.on({
                "mouseover.selectBoxIt": function () { a.blur = !1 }, "mouseout.selectBoxIt": function () { a.blur = !0 }, "focusin.selectBoxIt": function () {
                    a.dropdown.trigger("focus",
                    !0)
                }
            }); a.list.on({
                "mousedown.selectBoxIt": function () { a._update(c(this)); a.triggerEvent("option-click"); "false" === c(this).attr("data-disabled") && "true" !== c(this).attr("data-preventclose") && a.close(); setTimeout(function () { a.dropdown.trigger("focus", !0) }, 0) }, "focusin.selectBoxIt": function () {
                    a.listItems.not(c(this)).removeAttr("data-active"); c(this).attr("data-active", ""); var b = a.list.is(":hidden"); (a.options.searchWhenHidden && b || a.options.aggressiveChange || b && a.options.selectWhenHidden) && a._update(c(this));
                    c(this).addClass(f)
                }, "mouseup.selectBoxIt": function () { b && !e && (a._update(c(this)), a.triggerEvent("option-mouseup"), "false" === c(this).attr("data-disabled") && "true" !== c(this).attr("data-preventclose") && a.close()) }, "mouseenter.selectBoxIt": function () { "false" === c(this).attr("data-disabled") && (a.listItems.removeAttr("data-active"), c(this).addClass(f).attr("data-active", ""), a.listItems.not(c(this)).removeClass(f), c(this).addClass(f), a.currentFocus = +c(this).attr("data-id")) }, "mouseleave.selectBoxIt": function () {
                    "false" ===
                    c(this).attr("data-disabled") && (a.listItems.not(c(this)).removeClass(f).removeAttr("data-active"), c(this).addClass(f), a.currentFocus = +c(this).attr("data-id"))
                }, "blur.selectBoxIt": function () { c(this).removeClass(f) }
            }, ".selectboxit-option"); a.list.on({ "click.selectBoxIt": function (a) { a.preventDefault() } }, "a"); a.selectBox.on({
                "change.selectBoxIt, internal-change.selectBoxIt": function (b, c) {
                    var e, f; c || (e = a.list.find('li[data-val="' + a.originalElem.value + '"]'), e.length && (a.listItems.eq(a.currentFocus).removeClass(a.focusClass),
                    a.currentFocus = +e.attr("data-id"))); e = a.listItems.eq(a.currentFocus); f = e.attr("data-selectedtext"); g = (d = e.attr("data-text")) ? d : e.find("a").text(); a._setText(a.dropdownText, f || g); a.dropdownText.attr("data-val", a.originalElem.value); e.find("i").attr("class") && (a.dropdownImage.attr("class", e.find("i").attr("class")).addClass("selectboxit-default-icon"), a.dropdownImage.attr("style", e.find("i").attr("style"))); a.triggerEvent("changed")
                }, "disable.selectBoxIt": function () { a.dropdown.addClass(a.theme.disabled) },
                "enable.selectBoxIt": function () { a.dropdown.removeClass(a.theme.disabled) }, "open.selectBoxIt": function () {
                    var b = a.list.find("li[data-val='" + a.dropdownText.attr("data-val") + "']"); b.length || (b = a.listItems.not("[data-disabled=true]").first()); a.currentFocus = +b.attr("data-id"); b = a.listItems.eq(a.currentFocus); a.dropdown.addClass(l).removeClass(m).addClass(f); a.listItems.removeClass(a.selectedClass).removeAttr("data-active").not(b).removeClass(f); b.addClass(a.selectedClass).addClass(f); a.options.hideCurrent &&
                    (a.listItems.show(), b.hide())
                }, "close.selectBoxIt": function () { a.dropdown.removeClass(l) }, "blur.selectBoxIt": function () { a.dropdown.removeClass(f) }, "mouseenter.selectBoxIt": function () { c(this).hasClass(a.theme.disabled) || a.dropdown.addClass(m) }, "mouseleave.selectBoxIt": function () { a.dropdown.removeClass(m) }, destroy: function (a) { a.preventDefault(); a.stopPropagation() }
            }); return a
        }, _update: function (a) {
            var b, c = this.options.defaultText || this.selectBox.attr("data-text"), d = this.listItems.eq(this.currentFocus);
            "false" === a.attr("data-disabled") && (this.listItems.eq(this.currentFocus).attr("data-selectedtext"), (b = d.attr("data-text")) || d.text(), (c && this.options.html ? this.dropdownText.html() === c : this.dropdownText.text() === c) && this.selectBox.val() === a.attr("data-val") ? this.triggerEvent("change") : (this.selectBox.val(a.attr("data-val")), this.currentFocus = +a.attr("data-id"), this.originalElem.value !== this.dropdownText.attr("data-val") && this.triggerEvent("change")))
        }, _addClasses: function (a) {
            this.focusClass = a.focus;
            this.hoverClass = a.hover; var b = a.button, c = a.list, d = a.arrow, g = a.container; this.openClass = a.open; this.selectedClass = "selectboxit-selected"; this.downArrow.addClass(this.selectBox.attr("data-downarrow") || this.options.downArrowIcon || d); this.dropdownContainer.addClass(g); this.dropdown.addClass(b); this.list.addClass(c); return this
        }, refresh: function (a, b) { this._destroySelectBoxIt()._create(!0); b || this.triggerEvent("refresh"); this._callbackSupport(a); return this }, htmlEscape: function (a) {
            return String(a).replace(/&/g,
            "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }, triggerEvent: function (a) { this.selectBox.trigger(a, { selectbox: this.selectBox, selectboxOption: this.selectItems.eq(this.options.showFirstOption ? this.currentFocus : 0 <= this.currentFocus - 1 ? this.currentFocus : 0), dropdown: this.dropdown, dropdownOption: this.listItems.eq(this.currentFocus) }); return this }, _copyAttributes: function () { this._addSelectBoxAttributes && this._addSelectBoxAttributes(); return this }, _realOuterWidth: function (a) {
            if (a.is(":visible")) return a.outerWidth(!0);
            a = a.clone(); var b; a.css({ visibility: "hidden", display: "block", position: "absolute" }).appendTo("body"); b = a.outerWidth(!0); a.remove(); return b
        }
    })
});