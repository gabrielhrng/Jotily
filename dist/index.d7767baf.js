(function() {
    return function e1(t, n, o) {
        function i(a, c) {
            if (!n[a]) {
                if (!t[a]) {
                    var d = "function" == typeof require && undefined;
                    if (!c && d) return d(a, !0);
                    if (r) return r(a, !0);
                    var s = new Error("Cannot find module '" + a + "'");
                    throw s.code = "MODULE_NOT_FOUND", s;
                }
                var l = n[a] = {
                    exports: {}
                };
                t[a][0].call(l.exports, function(e) {
                    return i(t[a][1][e] || e);
                }, l, l.exports, e1, t, n, o);
            }
            return n[a].exports;
        }
        for(var r = "function" == typeof require && undefined, a1 = 0; a1 < o.length; a1++)i(o[a1]);
        return i;
    };
})()({
    1: [
        function(e2, t1, n1) {
            var o1 = e2("dragula");
            !function() {
                this.jKanban = function() {
                    var e3 = this, t2 = {
                        enabled: !1
                    }, n2 = {
                        enabled: !1
                    };
                    this._disallowedItemProperties = [
                        "id",
                        "title",
                        "click",
                        "context",
                        "drag",
                        "dragend",
                        "drop",
                        "order"
                    ], this.element = "", this.container = "", this.boardContainer = [], this.handlers = [], this.dragula = o1, this.drake = "", this.drakeBoard = "", this.itemAddOptions = n2, this.itemHandleOptions = t2;
                    var i1 = {
                        element: "",
                        gutter: "15px",
                        widthBoard: "250px",
                        responsive: "700",
                        responsivePercentage: !1,
                        boards: [],
                        dragBoards: !0,
                        dragItems: !0,
                        itemAddOptions: n2,
                        itemHandleOptions: t2,
                        dragEl: function(e, t) {},
                        dragendEl: function(e) {},
                        dropEl: function(e, t, n, o) {},
                        dragBoard: function(e, t) {},
                        dragendBoard: function(e) {},
                        dropBoard: function(e, t, n, o) {},
                        click: function(e) {},
                        context: function(e, t) {},
                        buttonClick: function(e, t) {},
                        propagationHandlers: []
                    };
                    function r1(t3, n) {
                        t3.addEventListener("click", function(t) {
                            e3.options.propagationHandlers.includes("click") || t.preventDefault(), e3.options.click(this), "function" == typeof this.clickfn && this.clickfn(this);
                        });
                    }
                    function a(t4, n) {
                        t4.addEventListener ? t4.addEventListener("contextmenu", function(t) {
                            e3.options.propagationHandlers.includes("context") || t.preventDefault(), e3.options.context(this, t), "function" == typeof this.contextfn && this.contextfn(this, t);
                        }, !1) : t4.attachEvent("oncontextmenu", function() {
                            e3.options.context(this), "function" == typeof this.contextfn && this.contextfn(this), e3.options.propagationHandlers.includes("context") || (window.event.returnValue = !1);
                        });
                    }
                    function c1(t5, n) {
                        t5.addEventListener("click", function(t) {
                            t.preventDefault(), e3.options.buttonClick(this, n);
                        });
                    }
                    function d1(t) {
                        var n = [];
                        return e3.options.boards.map(function(e) {
                            if (e.id === t) return n.push(e);
                        }), n[0];
                    }
                    function s(t, n) {
                        for(var o in n)e3._disallowedItemProperties.indexOf(o) > -1 || t.setAttribute("data-" + o, n[o]);
                    }
                    function l(t) {
                        var n3 = "title" in t ? t.title : "";
                        if (e3.options.itemHandleOptions.enabled) {
                            if (void 0 !== (e3.options.itemHandleOptions.customHandler || void 0)) return n3 = "<div> " + e3.options.itemHandleOptions.customHandler.replace(/%([^%]+)%/g, function(e, n) {
                                return void 0 !== t[n] ? t[n] : "";
                            }) + " </div>";
                            var o = e3.options.itemHandleOptions.customCssHandler, i = e3.options.itemHandleOptions.customCssIconHandler, r = e3.options.itemHandleOptions.customItemLayout;
                            void 0 === (o || void 0) && (o = "drag_handler"), void 0 === (i || void 0) && (i = o + "_icon"), void 0 === (r || void 0) && (r = ""), n3 = "<div class='item_handle " + o + "'><i class='item_handle " + i + "'></i></div><div>" + n3 + "</div>";
                        }
                        return n3;
                    }
                    arguments[0] && "object" == typeof arguments[0] && (this.options = function(e, t) {
                        var n;
                        for(n in t)t.hasOwnProperty(n) && (e[n] = t[n]);
                        return e;
                    }(i1, arguments[0])), this.__getCanMove = function(t) {
                        return e3.options.itemHandleOptions.enabled ? e3.options.itemHandleOptions.handleClass ? t.classList.contains(e3.options.itemHandleOptions.handleClass) : t.classList.contains("item_handle") : !!e3.options.dragItems;
                    }, this.init = function() {
                        !function() {
                            e3.element = document.querySelector(e3.options.element);
                            var t6 = document.createElement("div");
                            t6.classList.add("kanban-container"), e3.container = t6, document.querySelector(e3.options.element).dataset.hasOwnProperty("board") ? (url = document.querySelector(e3.options.element).dataset.board, window.fetch(url, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(function(t7) {
                                t7.json().then(function(t) {
                                    e3.options.boards = t, e3.addBoards(e3.options.boards, !0);
                                });
                            }).catch(function(e) {
                                console.log("Error: ", e);
                            })) : e3.addBoards(e3.options.boards, !0);
                            e3.element.appendChild(e3.container);
                        }(), window.innerWidth > e3.options.responsive && (e3.drakeBoard = e3.dragula([
                            e3.container
                        ], {
                            moves: function(t, n, o, i) {
                                return !!e3.options.dragBoards && (o.classList.contains("kanban-board-header") || o.classList.contains("kanban-title-board"));
                            },
                            accepts: function(e, t, n, o) {
                                return t.classList.contains("kanban-container");
                            },
                            revertOnSpill: !0,
                            direction: "horizontal"
                        }).on("drag", function(t, n) {
                            t.classList.add("is-moving"), e3.options.dragBoard(t, n), "function" == typeof t.dragfn && t.dragfn(t, n);
                        }).on("dragend", function(t8) {
                            !function() {
                                for(var t = 1, n = 0; n < e3.container.childNodes.length; n++)e3.container.childNodes[n].dataset.order = t++;
                            }(), t8.classList.remove("is-moving"), e3.options.dragendBoard(t8), "function" == typeof t8.dragendfn && t8.dragendfn(t8);
                        }).on("drop", function(t, n, o, i) {
                            t.classList.remove("is-moving"), e3.options.dropBoard(t, n, o, i), "function" == typeof t.dropfn && t.dropfn(t, n, o, i);
                        }), e3.drake = e3.dragula(e3.boardContainer, {
                            moves: function(t, n, o, i) {
                                return e3.__getCanMove(o);
                            },
                            revertOnSpill: !0
                        }).on("cancel", function(t, n, o) {
                            e3.enableAllBoards();
                        }).on("drag", function(t9, n) {
                            var o = t9.getAttribute("class");
                            if ("" !== o && o.indexOf("not-draggable") > -1) e3.drake.cancel(!0);
                            else {
                                t9.classList.add("is-moving"), e3.options.dragEl(t9, n);
                                var i = d1(n.parentNode.dataset.id);
                                void 0 !== i.dragTo && e3.options.boards.map(function(t) {
                                    -1 === i.dragTo.indexOf(t.id) && t.id !== n.parentNode.dataset.id && e3.findBoard(t.id).classList.add("disabled-board");
                                }), null !== t9 && "function" == typeof t9.dragfn && t9.dragfn(t9, n);
                            }
                        }).on("dragend", function(t) {
                            e3.options.dragendEl(t), null !== t && "function" == typeof t.dragendfn && t.dragendfn(t);
                        }).on("drop", function(t, n, o, i) {
                            e3.enableAllBoards();
                            var r = d1(o.parentNode.dataset.id);
                            (void 0 !== r.dragTo && -1 === r.dragTo.indexOf(n.parentNode.dataset.id) && n.parentNode.dataset.id !== o.parentNode.dataset.id && e3.drake.cancel(!0), null !== t) && (!1 === e3.options.dropEl(t, n, o, i) && e3.drake.cancel(!0), t.classList.remove("is-moving"), "function" == typeof t.dropfn && t.dropfn(t, n, o, i));
                        }));
                    }, this.enableAllBoards = function() {
                        var e = document.querySelectorAll(".kanban-board");
                        if (e.length > 0 && void 0 !== e) for(var t = 0; t < e.length; t++)e[t].classList.remove("disabled-board");
                    }, this.addElement = function(t, n, o) {
                        void 0 === o && (o = -1);
                        var i = e3.element.querySelector('[data-id="' + t + '"] .kanban-drag'), c = i.childNodes[o], d = document.createElement("div");
                        return d.classList.add("kanban-item"), void 0 !== n.id && "" !== n.id && d.setAttribute("data-eid", n.id), n.class && Array.isArray(n.class) && n.class.forEach(function(e) {
                            d.classList.add(e);
                        }), d.innerHTML = l(n), d.clickfn = n.click, d.contextfn = n.context, d.dragfn = n.drag, d.dragendfn = n.dragend, d.dropfn = n.drop, s(d, n), r1(d), a(d), e3.options.itemHandleOptions.enabled && (d.style.cursor = "default"), i.insertBefore(d, c), e3;
                    }, this.addForm = function(t, n) {
                        var o = e3.element.querySelector('[data-id="' + t + '"] .kanban-drag'), i = n.getAttribute("class");
                        return n.setAttribute("class", i + " not-draggable"), o.appendChild(n), e3;
                    }, this.addBoards = function(t, n) {
                        if (e3.options.responsivePercentage) {
                            if (e3.container.style.width = "100%", e3.options.gutter = "1%", window.innerWidth > e3.options.responsive) var o = (100 - 2 * t.length) / t.length;
                            else o = 100 - 2 * t.length;
                        } else o = e3.options.widthBoard;
                        var i = e3.options.itemAddOptions.enabled, d = e3.options.itemAddOptions.content, u = e3.options.itemAddOptions.class, f = e3.options.itemAddOptions.footer;
                        for(var p in t){
                            var v = t[p];
                            n || e3.options.boards.push(v), e3.options.responsivePercentage || ("" === e3.container.style.width ? e3.container.style.width = parseInt(o) + 2 * parseInt(e3.options.gutter) + "px" : e3.container.style.width = parseInt(e3.container.style.width) + parseInt(o) + 2 * parseInt(e3.options.gutter) + "px");
                            var m = document.createElement("div");
                            m.dataset.id = v.id, m.dataset.order = e3.container.childNodes.length + 1, m.classList.add("kanban-board"), e3.options.responsivePercentage ? m.style.width = o + "%" : m.style.width = o, m.style.marginLeft = e3.options.gutter, m.style.marginRight = e3.options.gutter;
                            var h = document.createElement("header");
                            if ("" !== v.class && void 0 !== v.class) var g = v.class.split(",");
                            else g = [];
                            h.classList.add("kanban-board-header"), g.map(function(e) {
                                e = e.replace(/^[ ]+/g, ""), h.classList.add(e);
                            }), h.innerHTML = '<div class="kanban-title-board">' + v.title + "</div>";
                            var y = document.createElement("main");
                            if (y.classList.add("kanban-drag"), "" !== v.bodyClass && void 0 !== v.bodyClass) var b = v.bodyClass.split(",");
                            else b = [];
                            for(var w in b.map(function(e) {
                                y.classList.add(e);
                            }), e3.boardContainer.push(y), v.item){
                                var E = v.item[w], T = document.createElement("div");
                                T.classList.add("kanban-item"), E.id && (T.dataset.eid = E.id), E.class && Array.isArray(E.class) && E.class.forEach(function(e) {
                                    T.classList.add(e);
                                }), T.innerHTML = l(E), T.clickfn = E.click, T.contextfn = E.context, T.dragfn = E.drag, T.dragendfn = E.dragend, T.dropfn = E.drop, s(T, E), r1(T), a(T), e3.options.itemHandleOptions.enabled && (T.style.cursor = "default"), y.appendChild(T);
                            }
                            var x = document.createElement("footer");
                            if (i) {
                                var C = document.createElement("BUTTON"), O = document.createTextNode(d || "+");
                                C.setAttribute("class", u || "kanban-title-button btn btn-default btn-xs"), C.appendChild(O), f ? x.appendChild(C) : h.appendChild(C), c1(C, v.id);
                            }
                            m.appendChild(h), m.appendChild(y), m.appendChild(x), e3.container.appendChild(m);
                        }
                        return e3;
                    }, this.findBoard = function(t) {
                        return e3.element.querySelector('[data-id="' + t + '"]');
                    }, this.getParentBoardID = function(t) {
                        return "string" == typeof t && (t = e3.element.querySelector('[data-eid="' + t + '"]')), null === t ? null : t.parentNode.parentNode.dataset.id;
                    }, this.moveElement = function(e, t, n) {
                        if (e !== this.getParentBoardID(t)) return this.removeElement(t), this.addElement(e, n);
                    }, this.replaceElement = function(t, n) {
                        var o = t;
                        return "string" == typeof o && (o = e3.element.querySelector('[data-eid="' + t + '"]')), o.innerHTML = l(n), o.clickfn = n.click, o.contextfn = n.context, o.dragfn = n.drag, o.dragendfn = n.dragend, o.dropfn = n.drop, s(o, n), r1(o), a(o), e3;
                    }, this.findElement = function(t) {
                        return e3.element.querySelector('[data-eid="' + t + '"]');
                    }, this.getBoardElements = function(t) {
                        return e3.element.querySelector('[data-id="' + t + '"] .kanban-drag').childNodes;
                    }, this.removeElement = function(t) {
                        return "string" == typeof t && (t = e3.element.querySelector('[data-eid="' + t + '"]')), null !== t && ("function" == typeof t.remove ? t.remove() : t.parentNode.removeChild(t)), e3;
                    }, this.removeBoard = function(t) {
                        var n = null;
                        "string" == typeof t && (n = e3.element.querySelector('[data-id="' + t + '"]')), null !== n && ("function" == typeof n.remove ? n.remove() : n.parentNode.removeChild(n));
                        for(var o = 0; o < e3.options.boards.length; o++)if (e3.options.boards[o].id === t) {
                            e3.options.boards.splice(o, 1);
                            break;
                        }
                        return e3;
                    }, this.onButtonClick = function(e) {}, this.init();
                };
            }();
        },
        {
            dragula: 9
        }
    ],
    2: [
        function(e4, t10, n) {
            t10.exports = function(e, t) {
                return Array.prototype.slice.call(e, t);
            };
        },
        {}
    ],
    3: [
        function(e5, t11, n4) {
            "use strict";
            var o = e5("ticky");
            t11.exports = function(e, t, n) {
                e && o(function() {
                    e.apply(n || null, t || []);
                });
            };
        },
        {
            ticky: 11
        }
    ],
    4: [
        function(e6, t12, n5) {
            "use strict";
            var o2 = e6("atoa"), i2 = e6("./debounce");
            t12.exports = function(e, t13) {
                var n6 = t13 || {}, r2 = {};
                return void 0 === e && (e = {}), e.on = function(t, n) {
                    return r2[t] ? r2[t].push(n) : r2[t] = [
                        n
                    ], e;
                }, e.once = function(t, n) {
                    return n._once = !0, e.on(t, n), e;
                }, e.off = function(t, n) {
                    var o = arguments.length;
                    if (1 === o) delete r2[t];
                    else if (0 === o) r2 = {};
                    else {
                        var i = r2[t];
                        if (!i) return e;
                        i.splice(i.indexOf(n), 1);
                    }
                    return e;
                }, e.emit = function() {
                    var t = o2(arguments);
                    return e.emitterSnapshot(t.shift()).apply(this, t);
                }, e.emitterSnapshot = function(t) {
                    var a = (r2[t] || []).slice(0);
                    return function() {
                        var r = o2(arguments), c = this || e;
                        if ("error" === t && !1 !== n6.throws && !a.length) throw 1 === r.length ? r[0] : r;
                        return a.forEach(function(o) {
                            n6.async ? i2(o, r, c) : o.apply(c, r), o._once && e.off(t, o);
                        }), e;
                    };
                }, e;
            };
        },
        {
            "./debounce": 3,
            atoa: 2
        }
    ],
    5: [
        function(e7, t14, n7) {
            (function(n8) {
                (function() {
                    var o3 = e7("custom-event"), i3 = e7("./eventmap"), r = n8.document, a2 = function(e, t, n, o) {
                        return e.addEventListener(t, n, o);
                    }, c = function(e, t, n, o) {
                        return e.removeEventListener(t, n, o);
                    }, d = [];
                    function s(e8, t15, n9) {
                        var o4 = function(e, t, n) {
                            var o, i;
                            for(o = 0; o < d.length; o++)if ((i = d[o]).element === e && i.type === t && i.fn === n) return o;
                        }(e8, t15, n9);
                        if (o4) {
                            var i4 = d[o4].wrapper;
                            return d.splice(o4, 1), i4;
                        }
                    }
                    n8.addEventListener || (a2 = function(e9, t16, o5) {
                        return e9.attachEvent("on" + t16, function(e10, t17, o6) {
                            var i5 = s(e10, t17, o6) || function(e, t18, o) {
                                return function(t) {
                                    var i = t || n8.event;
                                    i.target = i.target || i.srcElement, i.preventDefault = i.preventDefault || function() {
                                        i.returnValue = !1;
                                    }, i.stopPropagation = i.stopPropagation || function() {
                                        i.cancelBubble = !0;
                                    }, i.which = i.which || i.keyCode, o.call(e, i);
                                };
                            }(e10, 0, o6);
                            return d.push({
                                wrapper: i5,
                                element: e10,
                                type: t17,
                                fn: o6
                            }), i5;
                        }(e9, t16, o5));
                    }, c = function(e, t, n) {
                        var o = s(e, t, n);
                        if (o) return e.detachEvent("on" + t, o);
                    }), t14.exports = {
                        add: a2,
                        remove: c,
                        fabricate: function(e11, t, n) {
                            var a = -1 === i3.indexOf(t) ? new o3(t, {
                                detail: n
                            }) : function() {
                                var e;
                                r.createEvent ? (e = r.createEvent("Event")).initEvent(t, !0, !0) : r.createEventObject && (e = r.createEventObject());
                                return e;
                            }();
                            e11.dispatchEvent ? e11.dispatchEvent(a) : e11.fireEvent("on" + t, a);
                        }
                    };
                }).call(this);
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        },
        {
            "./eventmap": 6,
            "custom-event": 7
        }
    ],
    6: [
        function(e12, t, n10) {
            (function(e) {
                (function() {
                    var n = [], o = "", i = /^on/;
                    for(o in e)i.test(o) && n.push(o.slice(2));
                    t.exports = n;
                }).call(this);
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        },
        {}
    ],
    7: [
        function(e13, t19, n11) {
            (function(e14) {
                (function() {
                    var n12 = e14.CustomEvent;
                    t19.exports = function() {
                        try {
                            var e = new n12("cat", {
                                detail: {
                                    foo: "bar"
                                }
                            });
                            return "cat" === e.type && "bar" === e.detail.foo;
                        } catch (e) {}
                        return !1;
                    }() ? n12 : "undefined" != typeof document && "function" == typeof document.createEvent ? function(e, t) {
                        var n = document.createEvent("CustomEvent");
                        return t ? n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) : n.initCustomEvent(e, !1, !1, void 0), n;
                    } : function(e, t) {
                        var n = document.createEventObject();
                        return n.type = e, t ? (n.bubbles = Boolean(t.bubbles), n.cancelable = Boolean(t.cancelable), n.detail = t.detail) : (n.bubbles = !1, n.cancelable = !1, n.detail = void 0), n;
                    };
                }).call(this);
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        },
        {}
    ],
    8: [
        function(e15, t20, n13) {
            "use strict";
            var o = {}, i = "(?:^|\\s)", r = "(?:\\s|$)";
            function a(e) {
                var t = o[e];
                return t ? t.lastIndex = 0 : o[e] = t = new RegExp(i + e + r, "g"), t;
            }
            t20.exports = {
                add: function(e, t) {
                    var n = e.className;
                    n.length ? a(t).test(n) || (e.className += " " + t) : e.className = t;
                },
                rm: function(e, t) {
                    e.className = e.className.replace(a(t), " ").trim();
                }
            };
        },
        {}
    ],
    9: [
        function(e16, t21, n14) {
            (function(n15) {
                (function() {
                    var o7 = e16("contra/emitter"), i6 = e16("crossvent"), r3 = e16("./classes"), a3 = document, c2 = a3.documentElement;
                    function d2(e, t, o, r) {
                        n15.navigator.pointerEnabled ? i6[t](e, {
                            mouseup: "pointerup",
                            mousedown: "pointerdown",
                            mousemove: "pointermove"
                        }[o], r) : n15.navigator.msPointerEnabled ? i6[t](e, {
                            mouseup: "MSPointerUp",
                            mousedown: "MSPointerDown",
                            mousemove: "MSPointerMove"
                        }[o], r) : (i6[t](e, {
                            mouseup: "touchend",
                            mousedown: "touchstart",
                            mousemove: "touchmove"
                        }[o], r), i6[t](e, o, r));
                    }
                    function s1(e) {
                        if (void 0 !== e.touches) return e.touches.length;
                        if (void 0 !== e.which && 0 !== e.which) return e.which;
                        if (void 0 !== e.buttons) return e.buttons;
                        var t = e.button;
                        return void 0 !== t ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : void 0;
                    }
                    function l1(e, t) {
                        return void 0 !== n15[t] ? n15[t] : c2.clientHeight ? c2[e] : a3.body[e];
                    }
                    function u1(e, t, n) {
                        var o, i = (e = e || {}).className || "";
                        return e.className += " gu-hide", o = a3.elementFromPoint(t, n), e.className = i, o;
                    }
                    function f1() {
                        return !1;
                    }
                    function p1() {
                        return !0;
                    }
                    function v1(e) {
                        return e.width || e.right - e.left;
                    }
                    function m(e) {
                        return e.height || e.bottom - e.top;
                    }
                    function h(e) {
                        return e.parentNode === a3 ? null : e.parentNode;
                    }
                    function g(e17) {
                        return "INPUT" === e17.tagName || "TEXTAREA" === e17.tagName || "SELECT" === e17.tagName || function e(t) {
                            if (!t) return !1;
                            if ("false" === t.contentEditable) return !1;
                            if ("true" === t.contentEditable) return !0;
                            return e(h(t));
                        }(e17);
                    }
                    function y(e) {
                        return e.nextElementSibling || function() {
                            var t = e;
                            do t = t.nextSibling;
                            while (t && 1 !== t.nodeType)
                            return t;
                        }();
                    }
                    function b(e18, t) {
                        var n = function(e) {
                            return e.targetTouches && e.targetTouches.length ? e.targetTouches[0] : e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e;
                        }(t), o = {
                            pageX: "clientX",
                            pageY: "clientY"
                        };
                        return e18 in o && !(e18 in n) && o[e18] in n && (e18 = o[e18]), n[e18];
                    }
                    t21.exports = function(e19, t22) {
                        var n16, w, E, T, x, C, O, k, S, L, B;
                        1 === arguments.length && !1 === Array.isArray(e19) && (t22 = e19, e19 = []);
                        var N, I = null, A = t22 || {};
                        void 0 === A.moves && (A.moves = p1), void 0 === A.accepts && (A.accepts = p1), void 0 === A.invalid && (A.invalid = function() {
                            return !1;
                        }), void 0 === A.containers && (A.containers = e19 || []), void 0 === A.isContainer && (A.isContainer = f1), void 0 === A.copy && (A.copy = !1), void 0 === A.copySortSource && (A.copySortSource = !1), void 0 === A.revertOnSpill && (A.revertOnSpill = !1), void 0 === A.removeOnSpill && (A.removeOnSpill = !1), void 0 === A.direction && (A.direction = "vertical"), void 0 === A.ignoreInputTextSelection && (A.ignoreInputTextSelection = !0), void 0 === A.mirrorContainer && (A.mirrorContainer = a3.body);
                        var _ = o7({
                            containers: A.containers,
                            start: function(e) {
                                var t = j(e);
                                t && F(t);
                            },
                            end: R,
                            cancel: W,
                            remove: V,
                            destroy: function() {
                                P(!0), K({});
                            },
                            canMove: function(e) {
                                return !!j(e);
                            },
                            dragging: !1
                        });
                        return !0 === A.removeOnSpill && _.on("over", function(e) {
                            r3.rm(e, "gu-hide");
                        }).on("out", function(e) {
                            _.dragging && r3.add(e, "gu-hide");
                        }), P(), _;
                        function H(e) {
                            return -1 !== _.containers.indexOf(e) || A.isContainer(e);
                        }
                        function P(e) {
                            var t = e ? "remove" : "add";
                            d2(c2, t, "mousedown", X), d2(c2, t, "mouseup", K);
                        }
                        function q(e) {
                            d2(c2, e ? "remove" : "add", "mousemove", Y);
                        }
                        function M(e) {
                            var t = e ? "remove" : "add";
                            i6[t](c2, "selectstart", D), i6[t](c2, "click", D);
                        }
                        function D(e) {
                            N && e.preventDefault();
                        }
                        function X(e) {
                            if (C = e.clientX, O = e.clientY, 1 === s1(e) && !e.metaKey && !e.ctrlKey) {
                                var t = e.target, n = j(t);
                                n && (N = n, q(), "mousedown" === e.type && (g(t) ? t.focus() : e.preventDefault()));
                            }
                        }
                        function Y(e20) {
                            if (N) if (0 !== s1(e20)) {
                                if (!(void 0 !== e20.clientX && Math.abs(e20.clientX - C) <= (A.slideFactorX || 0) && void 0 !== e20.clientY && Math.abs(e20.clientY - O) <= (A.slideFactorY || 0))) {
                                    if (A.ignoreInputTextSelection) {
                                        var t = b("clientX", e20) || 0, o = b("clientY", e20) || 0;
                                        if (g(a3.elementFromPoint(t, o))) return;
                                    }
                                    var i = N;
                                    q(!0), M(), R(), F(i);
                                    var u, f = {
                                        left: (u = E.getBoundingClientRect()).left + l1("scrollLeft", "pageXOffset"),
                                        top: u.top + l1("scrollTop", "pageYOffset")
                                    };
                                    T = b("pageX", e20) - f.left, x = b("pageY", e20) - f.top, r3.add(L || E, "gu-transit"), function() {
                                        if (!n16) {
                                            var e = E.getBoundingClientRect();
                                            (n16 = E.cloneNode(!0)).style.width = v1(e) + "px", n16.style.height = m(e) + "px", r3.rm(n16, "gu-transit"), r3.add(n16, "gu-mirror"), A.mirrorContainer.appendChild(n16), d2(c2, "add", "mousemove", Q), r3.add(A.mirrorContainer, "gu-unselectable"), _.emit("cloned", n16, E, "mirror");
                                        }
                                    }(), Q(e20);
                                }
                            } else K({});
                        }
                        function j(e) {
                            if (!(_.dragging && n16 || H(e))) {
                                for(var t = e; h(e) && !1 === H(h(e));){
                                    if (A.invalid(e, t)) return;
                                    if (!(e = h(e))) return;
                                }
                                var o = h(e);
                                if (o && !A.invalid(e, t) && A.moves(e, o, t, y(e))) return {
                                    item: e,
                                    source: o
                                };
                            }
                        }
                        function F(e) {
                            var t, n;
                            t = e.item, n = e.source, ("boolean" == typeof A.copy ? A.copy : A.copy(t, n)) && (L = e.item.cloneNode(!0), _.emit("cloned", L, e.item, "copy")), w = e.source, E = e.item, k = S = y(e.item), _.dragging = !0, _.emit("drag", E, w);
                        }
                        function R() {
                            if (_.dragging) {
                                var e = L || E;
                                z(e, h(e));
                            }
                        }
                        function U() {
                            N = !1, q(!0), M(!0);
                        }
                        function K(e) {
                            if (U(), _.dragging) {
                                var t = L || E, o = b("clientX", e) || 0, i = b("clientY", e) || 0, r = J(u1(n16, o, i), o, i);
                                r && (L && A.copySortSource || !L || r !== w) ? z(t, r) : A.removeOnSpill ? V() : W();
                            }
                        }
                        function z(e, t) {
                            var n = h(e);
                            L && A.copySortSource && t === w && n.removeChild(E), $(t) ? _.emit("cancel", e, w, w) : _.emit("drop", e, t, w, S), G();
                        }
                        function V() {
                            if (_.dragging) {
                                var e = L || E, t = h(e);
                                t && t.removeChild(e), _.emit(L ? "cancel" : "remove", e, t, w), G();
                            }
                        }
                        function W(e) {
                            if (_.dragging) {
                                var t = arguments.length > 0 ? e : A.revertOnSpill, n = L || E, o = h(n), i = $(o);
                                !1 === i && t && (L ? o && o.removeChild(L) : w.insertBefore(n, k)), i || t ? _.emit("cancel", n, w, w) : _.emit("drop", n, o, w, S), G();
                            }
                        }
                        function G() {
                            var e = L || E;
                            U(), n16 && (r3.rm(A.mirrorContainer, "gu-unselectable"), d2(c2, "remove", "mousemove", Q), h(n16).removeChild(n16), n16 = null), e && r3.rm(e, "gu-transit"), B && clearTimeout(B), _.dragging = !1, I && _.emit("out", e, I, w), _.emit("dragend", e), w = E = L = k = S = B = I = null;
                        }
                        function $(e, t) {
                            var o;
                            return o = void 0 !== t ? t : n16 ? S : y(L || E), e === w && o === k;
                        }
                        function J(e, t, n) {
                            for(var o = e; o && !i7();)o = h(o);
                            return o;
                            function i7() {
                                if (!1 === H(o)) return !1;
                                var i = Z(o, e), r = ee(o, i, t, n);
                                return !!$(o, r) || A.accepts(E, o, w, r);
                            }
                        }
                        function Q(e21) {
                            if (n16) {
                                e21.preventDefault();
                                var t = b("clientX", e21) || 0, o = b("clientY", e21) || 0, i = t - T, r = o - x;
                                n16.style.left = i + "px", n16.style.top = r + "px";
                                var a = L || E, c = u1(n16, t, o), d = J(c, t, o), s = null !== d && d !== I;
                                (s || null === d) && (I && v("out"), I = d, s && v("over"));
                                var l = h(a);
                                if (d !== w || !L || A.copySortSource) {
                                    var f, p = Z(d, c);
                                    if (null !== p) f = ee(d, p, t, o);
                                    else {
                                        if (!0 !== A.revertOnSpill || L) return void (L && l && l.removeChild(a));
                                        f = k, d = w;
                                    }
                                    (null === f && s || f !== a && f !== y(a)) && (S = f, d.insertBefore(a, f), _.emit("shadow", a, d, w));
                                } else l && l.removeChild(a);
                            }
                            function v(e) {
                                _.emit(e, a, I, w);
                            }
                        }
                        function Z(e, t) {
                            for(var n = t; n !== e && h(n) !== e;)n = h(n);
                            return n === c2 ? null : n;
                        }
                        function ee(e22, t23, n, o) {
                            var i8, r = "horizontal" === A.direction;
                            return t23 !== e22 ? (i8 = t23.getBoundingClientRect(), a4(r ? n > i8.left + v1(i8) / 2 : o > i8.top + m(i8) / 2)) : function() {
                                var t, i, a, c = e22.children.length;
                                for(t = 0; t < c; t++){
                                    if (i = e22.children[t], a = i.getBoundingClientRect(), r && a.left + a.width / 2 > n) return i;
                                    if (!r && a.top + a.height / 2 > o) return i;
                                }
                                return null;
                            }();
                            function a4(e) {
                                return e ? y(t23) : t23;
                            }
                        }
                    };
                }).call(this);
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        },
        {
            "./classes": 8,
            "contra/emitter": 4,
            crossvent: 5
        }
    ],
    10: [
        function(e23, t24, n17) {
            var o, i, r = t24.exports = {};
            function a() {
                throw new Error("setTimeout has not been defined");
            }
            function c() {
                throw new Error("clearTimeout has not been defined");
            }
            function d(e) {
                if (o === setTimeout) return setTimeout(e, 0);
                if ((o === a || !o) && setTimeout) return o = setTimeout, setTimeout(e, 0);
                try {
                    return o(e, 0);
                } catch (t) {
                    try {
                        return o.call(null, e, 0);
                    } catch (t) {
                        return o.call(this, e, 0);
                    }
                }
            }
            !function() {
                try {
                    o = "function" == typeof setTimeout ? setTimeout : a;
                } catch (e) {
                    o = a;
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : c;
                } catch (e24) {
                    i = c;
                }
            }();
            var s, l = [], u = !1, f = -1;
            function p() {
                u && s && (u = !1, s.length ? l = s.concat(l) : f = -1, l.length && v());
            }
            function v() {
                if (!u) {
                    var e25 = d(p);
                    u = !0;
                    for(var t = l.length; t;){
                        for(s = l, l = []; ++f < t;)s && s[f].run();
                        f = -1, t = l.length;
                    }
                    s = null, u = !1, function(e) {
                        if (i === clearTimeout) return clearTimeout(e);
                        if ((i === c || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
                        try {
                            i(e);
                        } catch (t) {
                            try {
                                return i.call(null, e);
                            } catch (t) {
                                return i.call(this, e);
                            }
                        }
                    }(e25);
                }
            }
            function m(e, t) {
                this.fun = e, this.array = t;
            }
            function h() {}
            r.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for(var n = 1; n < arguments.length; n++)t[n - 1] = arguments[n];
                l.push(new m(e, t)), 1 !== l.length || u || d(v);
            }, m.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = h, r.addListener = h, r.once = h, r.off = h, r.removeListener = h, r.removeAllListeners = h, r.emit = h, r.prependListener = h, r.prependOnceListener = h, r.listeners = function(e) {
                return [];
            }, r.binding = function(e) {
                throw new Error("process.binding is not supported");
            }, r.cwd = function() {
                return "/";
            }, r.chdir = function(e) {
                throw new Error("process.chdir is not supported");
            }, r.umask = function() {
                return 0;
            };
        },
        {}
    ],
    11: [
        function(e27, t25, n18) {
            (function(e28) {
                (function() {
                    var n;
                    n = "function" == typeof e28 ? function(t) {
                        e28(t);
                    } : function(e) {
                        setTimeout(e, 0);
                    }, t25.exports = n;
                }).call(this);
            }).call(this, e27("timers").setImmediate);
        },
        {
            timers: 12
        }
    ],
    12: [
        function(e29, t26, n) {
            (function(t27, o8) {
                (function() {
                    var i = e29("process/browser.js").nextTick, r = Function.prototype.apply, a = Array.prototype.slice, c = {}, d = 0;
                    function s(e, t) {
                        this._id = e, this._clearFn = t;
                    }
                    n.setTimeout = function() {
                        return new s(r.call(setTimeout, window, arguments), clearTimeout);
                    }, n.setInterval = function() {
                        return new s(r.call(setInterval, window, arguments), clearInterval);
                    }, n.clearTimeout = n.clearInterval = function(e) {
                        e.close();
                    }, s.prototype.unref = s.prototype.ref = function() {}, s.prototype.close = function() {
                        this._clearFn.call(window, this._id);
                    }, n.enroll = function(e, t) {
                        clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
                    }, n.unenroll = function(e) {
                        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
                    }, n._unrefActive = n.active = function(e) {
                        clearTimeout(e._idleTimeoutId);
                        var t = e._idleTimeout;
                        t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                            e._onTimeout && e._onTimeout();
                        }, t));
                    }, n.setImmediate = "function" == typeof t27 ? t27 : function(e) {
                        var t = d++, o = !(arguments.length < 2) && a.call(arguments, 1);
                        return c[t] = !0, i(function() {
                            c[t] && (o ? e.apply(null, o) : e.call(null), n.clearImmediate(t));
                        }), t;
                    }, n.clearImmediate = "function" == typeof o8 ? o8 : function(e) {
                        delete c[e];
                    };
                }).call(this);
            }).call(this, e29("timers").setImmediate, e29("timers").clearImmediate);
        },
        {
            "process/browser.js": 10,
            timers: 12
        }
    ]
}, {}, [
    1
]);

//# sourceMappingURL=index.d7767baf.js.map
