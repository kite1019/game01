
/*games對象*/
function Games() {
    var a = this;

    this.isRun = !1,
    this.dollSerial = -1,
    this.hit = !1,
    this.clip = document.getElementById("machine-clip"),/*鉤子*/
    this.$clip = $(this.clip),

    this.getDoll = function(b) {

        var c = $(".doll-box").find("[data-index=" + b + "]");
        window.xuanze  = b ;
        
        if (a.dollSerial = b, c.length) {
            var d = $(c).eq(0).clone().addClass("doll-rise");
            $(c).addClass("v-hidden"),
            $("#machine-clip").append(d)
        } else this.$clip && this.$clip.removeClass("catch")

    },

    this.doOffDoll = function(b, c) {
        var d = $("#machine-clip").find(".doll-item");
        this.$clip && this.$clip.removeClass("catch"),
        move(d[0]).y(b).duration(c).ease("linear").end(),
        a.mcFloorOpen(),
        a.packetFly(b / 2, c)
    },

    this.offDoll = function(b, c) {

        var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 800,
        e = $("#machine-clip").find(".doll-item");
        e.length ? setTimeout(function() {
            var c = window.record;
            c.dolls && c.dolls[parseInt(a.dollSerial, 10)].hit ? a.hit = !0 : (a.doOffDoll(b, d), a.hit = !1)
        }.bind(this), c * (.5 + .3 * Math.random())) : a.packetFly(b / 2, d, 600, !0)
    },
    this.mcFloorOpen = function() {
        var a = $("#machine i.machine-bg_floor"),
        b = $("#machine i.machine-bg_bot");
        a.addClass("open"),
        b.addClass("open")
    },
    this.mcFloorClose = function(a) {
        setTimeout(function() {
            var a = $("#machine i.machine-bg_floor"),
            b = $("#machine i.machine-bg_bot");
            a.removeClass("open"),
            b.removeClass("open")
        },
        a)
    },
    this.packetFly = function(b, c) {
        var d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 300,
        e = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        f = $(".atm");

        setTimeout(function() {
            move(f[0]).set("opacity", 1).y( - b / 2 - 75).scale(.6).rotate(30).then().set("opacity", 0).rotate( - 30).delay("0.2s").duration(d).pop().end(),
            this.mcFloorClose(d),
            setTimeout(function() {
                $("#coupons").addClass("open"),
                $("#coupons .packet-dialog").addClass("open"),
                // $(".mask").addClass("open"),
                a.onOpenRecord(e)
            },
            d + 30)    // 600

        }.bind(this), c)

    },


    this.machineTips = function(a) {


        if (a) {
            switch (  $(".machine-tips-box").removeClass("cpm-hide") , $(".machine-tips-box .machine-tips").addClass("machine-tips__" + a) , a  ) {
                case "error":
                    var b = ["夾不中"];
                    $(".machine-tips-box .machine-tips .machine-tips_txt").html(b[Math.floor(Math.random() * b.length)]);
                    break;
                case "success":
                    // $(".machine-tips-box .machine-tips .machine-tips_txt").html("恭喜！");
                    // $("#coupons .dialog-txt .title").text("恭喜！");

            }
            if (a == 'error') {
                // $(".machine-tips-box .machine-tips .machine-tips_txt").html("夾不中，再來一次");
                $("#again").show();
                $("#coupons .dialog-txt .title").html("哦哦～沒夾到！<br>可能姿勢不對哦！");
            }
            setTimeout(function() {
                $(".machine-tips-box").addClass("cpm-hide"),
                $(".machine-tips-box .machine-tips").removeClass("machine-tips__" + a)
            },
            100) // 1500
        }
    }
}





function ClampDoll() {  /*鉤子*/

    games.isRun = !1,
    this.clip = document.getElementById("machine-clip"),
    this.$clip = $(this.clip),
    this.setTime = {
        falling: 500,
        rising: 2e3
    },
    this.setTime.clipCatchStart = 100,
    this.setTime.fallingToRising = this.setTime.falling,
    this.setTime.risingEnd = this.setTime.falling + this.setTime.rising,
    this.getHeight = function() {
        var a = document.getElementById("machine").offsetHeight,
        b = document.getElementById("machine-clip").offsetHeight,
        c = document.getElementById("doll-list").offsetHeight,
        d = a - b - c + 24;
        return console.log(d),
        d
    },
    this.screen_h = $(document).height(),


    this.falling = function() { /*鉤子開始下落*/
        this.running = !0;
        var a = "translateY(" + this.getHeight() + "px)";
        move(this.clip).set("transform", a).duration(this.setTime.falling).ease("linear").end()
    },


    this.rising = function() {  /*鉤子觸碰到*/
        var a = "translateY(0)";
        move(this.clip).set("transform", a).duration(this.setTime.rising).ease("linear").end()
    },

    this.clipStarting = function() {
        /*鉤子開始下落*/

        setTimeout(function() {
            this.$clip.addClass("catch")
        }.bind(this), this.setTime.clipCatchStart)

    },
    this.catchDoll = function(a) {
        var b = 1;
        return setTimeout(function() {
            var a = -1,
            b = this.$clip.offset().left + this.$clip.width() / 2;
            $("#doll-list .doll-item").map(function(c, d) {
                var e = Math.abs($(d).offset().left + $(d).width() / 2 - b);
                e <= .6 * $(d).width() / 2 && (a = $(d).attr("data-index"))
            }),
            games.getDoll.call(this, a)
        }.bind(this), this.setTime.fallingToRising),
        b
    },
    this.clipRising = function() {

        setTimeout(function() {
            this.rising(),
            games.offDoll.call(this, this.screen_h, this.setTime.rising)
        }.bind(this), this.setTime.fallingToRising)

    },
    this.clipEnd = function(a) {
        var b;

        var isjiazhong = $("#isjiazhong").attr('zhi');
        setTimeout(function() {

            this.$clip && (b = this.$clip.find(".doll-item")), !b.length && games.machineTips("error"),games.hit && b.length && setTimeout(

                function() {

                        !! b.length && this.$clip.removeClass("catch");
                        var a = (window.record.dolls[parseInt(games.dollSerial, 10)].reward / 100).toFixed(2);
                        $(".doll-bean-add").html("<span>+</span><span>" + a + "</span>"),
                        move($(".doll-item.doll-rise")[0]).y( - 20).scale(.3).rotate(720).duration("1s").end(function() {
                            move($(".doll-item.doll-rise")[0]).ease("snap").x( - (b.offset().left - $(".doll-bean .doll-bean-plus").offset().left)).y( - (b.offset().top - $(".doll-bean .doll-bean-plus").offset().top + 22)).scale(.3).set("opacity", 0).delay("0.5s").end()
                        }), games.machineTips("success"),

                        setTimeout(function() {

                            $(".doll-bean-add").removeClass("cpm-hide"),
                            setTimeout(function() {
                                $("#coupons").addClass("open"),
                                $("#coupons .packet-dialog").addClass("open"),
                                games.onOpenRecord()
                            },
                            200)
                        },
                        2e3)

            }.bind(this), 300)
        }.bind(this), this.setTime.risingEnd)
    },

    this.init = function(a) {
        this.XGame = a,
        this.falling(),
        this.clipStarting(),
        this.catchDoll(),
        this.clipRising(),
        this.clipEnd()
    }
}

function initDollItems(a) {
    // var b = {
    //     dolls: a.concat(a)
    // };
    // $("#doll-list,#doll-list__small").html(""),
    // $("#doll-items-tmpl").tmpl(b).appendTo("#doll-list"),
    // $("#small-doll-items-tmpl").tmpl(b).appendTo("#doll-list__small")
} !
function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    }: b(a)
} ("undefined" != typeof window ? window: this,
function(a, b) {
    function c(a) {
        var b = "length" in a && a.length,
        c = _.type(a);
        return "function" !== c && !_.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
    }
    function d(a, b, c) {
        if (_.isFunction(b)) return _.grep(a,
        function(a, d) {
            return !! b.call(a, d, a) !== c
        });
        if (b.nodeType) return _.grep(a,
        function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (ha.test(b)) return _.filter(b, a, c);
            b = _.filter(b, a)
        }
        return _.grep(a,
        function(a) {
            return U.call(b, a) >= 0 !== c
        })
    }
    function e(a, b) {
        for (; (a = a[b]) && 1 !== a.nodeType;);
        return a
    }
    function f(a) {
        var b = oa[a] = {};
        return _.each(a.match(na) || [],
        function(a, c) {
            b[c] = !0
        }),
        b
    }
    function g() {
        Z.removeEventListener("DOMContentLoaded", g, !1),
        a.removeEventListener("load", g, !1),
        _.ready()
    }
    function h() {
        Object.defineProperty(this.cache = {},
        0, {
            get: function() {
                return {}
            }
        }),
        this.expando = _.expando + h.uid++
    }
    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(ua, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = "true" === c || "false" !== c && ("null" === c ? null: +c + "" === c ? +c: ta.test(c) ? _.parseJSON(c) : c)
            } catch(e) {}
            sa.set(a, b, c)
        } else c = void 0;
        return c
    }
    function j() {
        return ! 0
    }
    function k() {
        return ! 1
    }
    function l() {
        try {
            return Z.activeElement
        } catch(a) {}
    }
    function m(a, b) {
        return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b: b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type,
        a
    }
    function o(a) {
        var b = Ka.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"),
        a
    }
    function p(a, b) {
        for (var c = 0,
        d = a.length; d > c; c++) ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"))
    }
    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (ra.hasData(a) && (f = ra.access(a), g = ra.set(b, f), j = f.events)) {
                delete g.handle,
                g.events = {};
                for (e in j) for (c = 0, d = j[e].length; d > c; c++) _.event.add(b, e, j[e][c])
            }
            sa.hasData(a) && (h = sa.access(a), i = _.extend({},
            h), sa.set(b, i))
        }
    }
    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
    }
    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && ya.test(a.type) ? b.checked = a.checked: ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
    function t(b, c) {
        var d, e = _(c.createElement(b)).appendTo(c.body),
        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display: _.css(e[0], "display");
        return e.detach(),
        f
    }
    function u(a) {
        var b = Z,
        c = Oa[a];
        return c || (c = t(a, b), "none" !== c && c || (Na = (Na || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Na[0].contentDocument, b.write(), b.close(), c = t(a, b), Na.detach()), Oa[a] = c),
        c
    }
    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a),
        c && (g = c.getPropertyValue(b) || c[b]),
        c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Qa.test(g) && Pa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)),
        void 0 !== g ? g + "": g
    }
    function w(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get: (this.get = b).apply(this, arguments)
            }
        }
    }
    function x(a, b) {
        if (b in a) return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--;) if (b = Xa[e] + c, b in a) return b;
        return d
    }
    function y(a, b, c) {
        var d = Ta.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border": "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += _.css(a, c + wa[f], !0, e)),
        d ? ("content" === c && (g -= _.css(a, "padding" + wa[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + wa[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wa[f], !0, e), "padding" !== c && (g += _.css(a, "border" + wa[f] + "Width", !0, e)));
        return g
    }
    function A(a, b, c) {
        var d = !0,
        e = "width" === b ? a.offsetWidth: a.offsetHeight,
        f = Ra(a),
        g = "border-box" === _.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Qa.test(e)) return e;
            d = g && (Y.boxSizingReliable() || e === a.style[b]),
            e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border": "content"), d, f) + "px"
    }
    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g],
        d.style && (f[g] = ra.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : (e = xa(d), "none" === c && e || ra.set(d, "olddisplay", e ? c: _.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g],
        d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "": "none"));
        return a
    }
    function C(a, b, c, d, e) {
        return new C.prototype.init(a, b, c, d, e)
    }
    function D() {
        return setTimeout(function() {
            Ya = void 0
        }),
        Ya = _.now()
    }
    function E(a, b) {
        var c, d = 0,
        e = {
            height: a
        };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = wa[d],
        e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a),
        e
    }
    function F(a, b, c) {
        for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
    }
    function G(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
        m = {},
        n = a.style,
        o = a.nodeType && xa(a),
        p = ra.get(a, "fxshow");
        c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--,
                _.queue(a, "fx").length || h.empty.fire()
            })
        })),
        1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = _.css(a, "display"), k = "none" === j ? ra.get(a, "olddisplay") || u(a.nodeName) : j, "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")),
        c.overflow && (n.overflow = "hidden", l.always(function() {
            n.overflow = c.overflow[0],
            n.overflowX = c.overflow[1],
            n.overflowY = c.overflow[2]
        }));
        for (d in b) if (e = b[d], $a.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (o ? "hide": "show")) {
                if ("show" !== e || !p || void 0 === p[d]) continue;
                o = !0
            }
            m[d] = p && p[d] || _.style(a, d)
        } else j = void 0;
        if (_.isEmptyObject(m))"inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden" in p && (o = p.hidden) : p = ra.access(a, "fxshow", {}),
            f && (p.hidden = !o),
            o ? _(a).show() : l.done(function() {
                _(a).hide()
            }),
            l.done(function() {
                var b;
                ra.remove(a, "fxshow");
                for (b in m) _.style(a, b, m[b])
            });
            for (d in m) g = F(o ? p[d] : 0, d, l),
            d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }
    function H(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = _.cssHooks[d], g && "expand" in g) {
            f = g.expand(f),
            delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }
    function I(a, b, c) {
        var d, e, f = 0,
        g = bb.length,
        h = _.Deferred().always(function() {
            delete i.elem
        }),
        i = function() {
            if (e) return ! 1;
            for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]),
            1 > f && i ? c: (h.resolveWith(a, [j]), !1)
        },
        j = h.promise({
            elem: a,
            props: _.extend({},
            b),
            opts: _.extend(!0, {
                specialEasing: {}
            },
            c),
            originalProperties: b,
            originalOptions: c,
            startTime: Ya || D(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d),
                d
            },
            stop: function(b) {
                var c = 0,
                d = b ? j.tweens.length: 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                this
            }
        }),
        k = j.props;
        for (H(k, j.opts.specialEasing); g > f; f++) if (d = bb[f].call(j, a, k, j.opts)) return d;
        return _.map(k, F, j),
        _.isFunction(j.opts.start) && j.opts.start.call(a, j),
        _.fx.timer(_.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function J(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
            f = b.toLowerCase().match(na) || [];
            if (_.isFunction(c)) for (; d = f[e++];)"+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0,
            _.each(a[h] || [],
            function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }),
            i
        }
        var f = {},
        g = a === tb;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }
    function L(a, b) {
        var c, d, e = _.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a: d || (d = {}))[c] = b[c]);
        return d && _.extend(!0, a, d),
        a
    }
    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents,
        i = a.dataTypes;
        "*" === i[0];) i.shift(),
        void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break
        }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }
    function N(a, b, c, d) {
        var e, f, g, h, i, j = {},
        k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a["throws"]) b = g(b);
            else try {
                b = g(b)
            } catch(l) {
                return {
                    state: "parsererror",
                    error: g ? l: "No conversion from " + i + " to " + f
                }
            }
        }
        return {
            state: "success",
            data: b
        }
    }
    function O(a, b, c, d) {
        var e;
        if (_.isArray(b)) _.each(b,
        function(b, e) {
            c || yb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b: "") + "]", e, c, d)
        });
        else if (c || "object" !== _.type(b)) d(a, b);
        else for (e in b) O(a + "[" + e + "]", b[e], c, d)
    }
    function P(a) {
        return _.isWindow(a) ? a: 9 === a.nodeType && a.defaultView
    }
    var Q = [],
    R = Q.slice,
    S = Q.concat,
    T = Q.push,
    U = Q.indexOf,
    V = {},
    W = V.toString,
    X = V.hasOwnProperty,
    Y = {},
    Z = a.document,
    $ = "2.1.4",
    _ = function(a, b) {
        return new _.fn.init(a, b)
    },
    aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    ba = /^-ms-/,
    ca = /-([\da-z])/gi,
    da = function(a, b) {
        return b.toUpperCase()
    };
    _.fn = _.prototype = {
        jquery: $,
        constructor: _,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
        },
        pushStack: function(a) {
            var b = _.merge(this.constructor(), a);
            return b.prevObject = this,
            b.context = this.context,
            b
        },
        each: function(a, b) {
            return _.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(_.map(this,
            function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(a) {
            var b = this.length,
            c = +a + (0 > a ? b: 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    },
    _.extend = _.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {},
        h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (a = arguments[h])) for (b in a) c = g[b],
        d = a[b],
        g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c: []) : f = c && _.isPlainObject(c) ? c: {},
        g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    },
    _.extend({
        expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === _.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return ! _.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" === _.type(a) && !a.nodeType && !_.isWindow(a) && !(a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf"))
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return ! 1;
            return ! 0
        },
        type: function(a) {
            return null == a ? a + "": "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object": typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = _.trim(a),
            a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(ba, "ms-").replace(ca, da)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var e, f = 0,
            g = a.length,
            h = c(a);
            if (d) {
                if (h) for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                else for (f in a) if (e = b.apply(a[f], d), e === !1) break
            } else if (h) for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
            else for (f in a) if (e = b.call(a[f], f, a[f]), e === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "": (a + "").replace(aa, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)),
            d
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : U.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length,
            d = 0,
            e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e,
            a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f),
            d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f = 0,
            g = a.length,
            h = c(a),
            i = [];
            if (h) for (; g > f; f++) e = b(a[f], f, d),
            null != e && i.push(e);
            else for (f in a) e = b(a[f], f, d),
            null != e && i.push(e);
            return S.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (c = a[b], b = a, a = c),
            _.isFunction(a) ? (d = R.call(arguments, 2), e = function() {
                return a.apply(b || this, d.concat(R.call(arguments)))
            },
            e.guid = a.guid = a.guid || _.guid++, e) : void 0
        },
        now: Date.now,
        support: Y
    }),
    _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase()
    });
    var ea = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b: O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a))) if (g = e[1]) {
                    if (9 === h) {
                        if (f = b.getElementById(g), !f || !f.parentNode) return c;
                        if (f.id === g) return c.push(f),
                        c
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f),
                    c
                } else {
                    if (e[2]) return $.apply(c, b.getElementsByTagName(a)),
                    c;
                    if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)),
                    c
                }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                        o = ta.test(a) && k(b.parentNode) || b,
                        p = j.join(",")
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)),
                        c
                    } catch(q) {} finally {
                        l || b.removeAttribute("id")
                    }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d)
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()],
                a[c + " "] = d
            }
            var b = [];
            return a
        }
        function d(a) {
            return a[N] = !0,
            a
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !! a(b)
            } catch(c) {
                return ! 1
            } finally {
                b.parentNode && b.parentNode.removeChild(b),
                b = null
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
        }
        function g(a, b) {
            var c = b && a,
            d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c) for (; c = c.nextSibling;) if (c === b) return - 1;
            return a ? 1 : -1
        }
        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function j(a) {
            return d(function(b) {
                return b = +b,
                d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        function l() {}
        function m(a) {
            for (var b = 0,
            c = a.length,
            d = ""; c > b; b++) d += a[b].value;
            return d
        }
        function n(a, b, c) {
            var d = b.dir,
            e = c && "parentNode" === d,
            f = Q++;
            return b.first ?
            function(b, c, f) {
                for (; b = b[d];) if (1 === b.nodeType || e) return a(b, c, f)
            }: function(b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d];) if ((1 === b.nodeType || e) && a(b, c, g)) return ! 0
                } else for (; b = b[d];) if (1 === b.nodeType || e) {
                    if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return ! 0
                }
            }
        }
        function o(a) {
            return a.length > 1 ?
            function(b, c, d) {
                for (var e = a.length; e--;) if (!a[e](b, c, d)) return ! 1;
                return ! 0
            }: a[0]
        }
        function p(a, c, d) {
            for (var e = 0,
            f = c.length; f > e; e++) b(a, c[e], d);
            return d
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }
        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)),
            f && !f[N] && (f = r(f, g)),
            d(function(d, g, h, i) {
                var j, k, l, m = [],
                n = [],
                o = g.length,
                r = d || p(b || "*", h.nodeType ? [h] : h, []),
                s = !a || !d && b ? r: q(r, m, a, h, i),
                t = c ? f || (d ? a: o || e) ? [] : g: s;
                if (c && c(s, t, h, i), e) for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t),
                f ? f(null, g, t, i) : $.apply(g, t)
            })
        }
        function s(a) {
            for (var b, c, d, e = a.length,
            f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b
            },
            g, !0), j = n(function(a) {
                return aa(b, a) > -1
            },
            g, !0), k = [function(a, c, d) {
                var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null,
                e
            }]; e > h; h++) if (c = w.relative[a[h].type]) k = [n(o(k), c)];
            else {
                if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                    for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                    return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                        value: " " === a[h - 2].type ? "*": ""
                    })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                }
                k.push(c)
            }
            return o(k)
        }
        function t(a, c) {
            var e = c.length > 0,
            f = a.length > 0,
            g = function(d, g, h, i, j) {
                var k, l, m, n = 0,
                o = "0",
                p = d && [],
                r = [],
                s = C,
                t = d || f && w.find.TAG("*", j),
                u = P += null == s ? 1 : Math.random() || .1,
                v = t.length;
                for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0; m = a[l++];) if (m(k, g, h)) {
                            i.push(k);
                            break
                        }
                        j && (P = u)
                    }
                    e && ((k = !m && k) && n--, d && p.push(k))
                }
                if (n += o, e && o !== n) {
                    for (l = 0; m = c[l++];) m(p, r, g, h);
                    if (d) {
                        if (n > 0) for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                        r = q(r)
                    }
                    $.apply(i, r),
                    j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                }
                return j && (P = u, C = s),
                p
            };
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
        O = a.document,
        P = 0,
        Q = 0,
        R = c(),
        S = c(),
        T = c(),
        U = function(a, b) {
            return a === b && (E = !0),
            0
        },
        V = 1 << 31,
        W = {}.hasOwnProperty,
        X = [],
        Y = X.pop,
        Z = X.push,
        $ = X.push,
        _ = X.slice,
        aa = function(a, b) {
            for (var c = 0,
            d = a.length; d > c; c++) if (a[c] === b) return c;
            return - 1
        },
        ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        ca = "[\\x20\\t\\r\\n\\f]",
        da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ea = da.replace("w", "w#"),
        fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
        ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
        ha = new RegExp(ca + "+", "g"),
        ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
        ja = new RegExp("^" + ca + "*," + ca + "*"),
        ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
        la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
        ma = new RegExp(ga),
        na = new RegExp("^" + ea + "$"),
        oa = {
            ID: new RegExp("^#(" + da + ")"),
            CLASS: new RegExp("^\\.(" + da + ")"),
            TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + fa),
            PSEUDO: new RegExp("^" + ga),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ba + ")$", "i"),
            needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
        },
        pa = /^(?:input|select|textarea|button)$/i,
        qa = /^h\d$/i,
        ra = /^[^{]+\{\s*\[native \w/,
        sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ta = /[+~]/,
        ua = /'|\\/g,
        va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
        wa = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b: 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        },
        xa = function() {
            F()
        };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes),
            X[O.childNodes.length].nodeType
        } catch(ya) {
            $ = {
                apply: X.length ?
                function(a, b) {
                    Z.apply(a, _.call(b))
                }: function(a, b) {
                    for (var c = a.length,
                    d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        v = b.support = {},
        y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !! b && "HTML" !== b.nodeName
        },
        F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a: O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), I = !y(d), v.attributes = e(function(a) {
                return a.className = "i",
                !a.getAttribute("className")
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")),
                !a.getElementsByTagName("*").length
            }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N,
                !d.getElementsByName || !d.getElementsByName(N).length
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            },
            w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), w.find.TAG = v.getElementsByTagName ?
            function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            }: function(a, b) {
                var c, d = [],
                e = 0,
                f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            },
            w.find.CLASS = v.getElementsByClassName &&
            function(a, b) {
                return I ? b.getElementsByClassName(a) : void 0
            },
            K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>",
                a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"),
                a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"),
                a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="),
                a.querySelectorAll(":checked").length || J.push(":checked"),
                a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }), e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"),
                a.appendChild(b).setAttribute("name", "D"),
                a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="),
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                a.querySelectorAll("*,:x"),
                J.push(",.*:")
            })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"),
                L.call(a, "[s!='']:x"),
                K.push("!=", ga)
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ?
            function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement: a,
                d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            }: function(a, b) {
                if (b) for (; b = b.parentNode;) if (b === a) return ! 0;
                return ! 1
            },
            U = b ?
            function(a, b) {
                if (a === b) return E = !0,
                0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c: (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
            }: function(a, b) {
                if (a === b) return E = !0,
                0;
                var c, e = 0,
                f = a.parentNode,
                h = b.parentNode,
                i = [a],
                j = [b];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode;) i.unshift(c);
                for (c = b; c = c.parentNode;) j.unshift(c);
                for (; i[e] === j[e];) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            },
            d) : G
        },
        b.matches = function(a, c) {
            return b(a, null, null, c)
        },
        b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch(e) {}
            return b(c, G, null, [a]).length > 0
        },
        b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a),
            M(a, b)
        },
        b.attr = function(a, b) { (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()],
            d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d: v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value: null
        },
        b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        },
        b.uniqueSort = function(a) {
            var b, c = [],
            d = 0,
            e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return D = null,
            a
        },
        x = b.getText = function(a) {
            var b, c = "",
            d = 0,
            e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else for (; b = a[d++];) c += x(b);
            return c
        },
        w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(va, wa),
                    a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return oa.CHILD.test(a[0]) ? null: (a[3] ? a[2] = a[4] || a[5] || "": c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ?
                    function() {
                        return ! 0
                    }: function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a,
                    function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c: !c || (f += "", "=" === c ? f === d: "!=" === c ? f !== d: "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice( - d.length) === d: "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                    g = "last" !== a.slice( - 4),
                    h = "of-type" === b;
                    return 1 === d && 0 === e ?
                    function(a) {
                        return !! a.parentNode
                    }: function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling": "previousSibling",
                        q = b.parentNode,
                        r = h && b.nodeName.toLowerCase(),
                        s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];) if (h ? l.nodeName.toLowerCase() === r: 1 === l.nodeType) return ! 1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return ! 0
                            }
                            if (o = [g ? q.firstChild: q.lastChild], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [P, n, m];
                                    break
                                }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                            else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r: 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                            return m -= e,
                            m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]),
                        a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [],
                    c = [],
                    e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a,
                        e(b, null, f, c),
                        b[0] = null,
                        !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return a = a.replace(va, wa),
                    function(b) {
                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                    }
                }),
                lang: d(function(a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a),
                    a = a.replace(va, wa).toLowerCase(),
                    function(b) {
                        var c;
                        do
                        if (c = I ? b.lang: b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(),
                        c === a || 0 === c.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return ! 1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return ! 1;
                    return ! 0
                },
                parent: function(a) {
                    return ! w.pseudos.empty(a)
                },
                header: function(a) {
                    return qa.test(a.nodeName)
                },
                input: function(a) {
                    return pa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }),
                last: j(function(a, b) {
                    return [b - 1]
                }),
                eq: j(function(a, b, c) {
                    return [0 > c ? c + b: c]
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b: c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b: c; ++d < b;) a.push(d);
                    return a
                })
            }
        },
        w.pseudos.nth = w.pseudos.eq;
        for (u in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) w.pseudos[u] = h(u);
        for (u in {
            submit: !0,
            reset: !0
        }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos,
        w.setFilters = new l,
        z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h;) { (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])),
                d = !1,
                (e = ka.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) ! (e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length: h ? b.error(a) : S(a, i).slice(0)
        },
        A = b.compile = function(a, b) {
            var c, d = [],
            e = [],
            f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]),
                f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)),
                f.selector = a
            }
            return f
        },
        B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
            l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                    j && (b = b.parentNode),
                    a = a.slice(f.shift().value.length)
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e--&&(g = f[e], !w.relative[h = g.type]);) if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                    if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d),
                    c;
                    break
                }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b),
            c
        },
        v.sortStable = N.split("").sort(U).join("") === N,
        v.detectDuplicates = !!E,
        F(),
        v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }),
        e(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width",
        function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }),
        v.attributes && e(function(a) {
            return a.innerHTML = "<input/>",
            a.firstChild.setAttribute("value", ""),
            "" === a.firstChild.getAttribute("value")
        }) || f("value",
        function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }),
        e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(ba,
        function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value: null
        }),
        b
    } (a);
    _.find = ea,
    _.expr = ea.selectors,
    _.expr[":"] = _.expr.pseudos,
    _.unique = ea.uniqueSort,
    _.text = ea.getText,
    _.isXMLDoc = ea.isXML,
    _.contains = ea.contains;
    var fa = _.expr.match.needsContext,
    ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    ha = /^.[^:#\[\.,]*$/;
    _.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"),
        1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b,
        function(a) {
            return 1 === a.nodeType
        }))
    },
    _.fn.extend({
        find: function(a) {
            var b, c = this.length,
            d = [],
            e = this;
            if ("string" != typeof a) return this.pushStack(_(a).filter(function() {
                for (b = 0; c > b; b++) if (_.contains(e[b], this)) return ! 0
            }));
            for (b = 0; c > b; b++) _.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? _.unique(d) : d),
            d.selector = this.selector ? this.selector + " " + a: a,
            d
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function(a) {
            return !! d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
        }
    });
    var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    ka = _.fn.init = function(a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a), !c || !c[1] && b) return ! b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b: Z, !0)), ga.test(c[1]) && _.isPlainObject(b)) for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            return d = Z.getElementById(c[2]),
            d && d.parentNode && (this.length = 1, this[0] = d),
            this.context = Z,
            this.selector = a,
            this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
    };
    ka.prototype = _.fn,
    ia = _(Z);
    var la = /^(?:parents|prev(?:Until|All))/,
    ma = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    _.extend({
        dir: function(a, b, c) {
            for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType;) if (1 === a.nodeType) {
                if (e && _(a).is(c)) break;
                d.push(a)
            }
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }),
    _.fn.extend({
        has: function(a) {
            var b = _(a, this),
            c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++) if (_.contains(this, b[a])) return ! 0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0,
            e = this.length,
            f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? _.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(a, b) {
            return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject: this.prevObject.filter(a))
        }
    }),
    _.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b: null
        },
        parents: function(a) {
            return _.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return _.dir(a, "parentNode", c)
        },
        next: function(a) {
            return e(a, "nextSibling")
        },
        prev: function(a) {
            return e(a, "previousSibling")
        },
        nextAll: function(a) {
            return _.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return _.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return _.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return _.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return _.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return _.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || _.merge([], a.childNodes)
        }
    },
    function(a, b) {
        _.fn[a] = function(c, d) {
            var e = _.map(this, b, c);
            return "Until" !== a.slice( - 5) && (d = c),
            d && "string" == typeof d && (e = _.filter(d, e)),
            this.length > 1 && (ma[a] || _.unique(e), la.test(a) && e.reverse()),
            this.pushStack(e)
        }
    });
    var na = /\S+/g,
    oa = {};
    _.Callbacks = function(a) {
        a = "string" == typeof a ? oa[a] || f(a) : _.extend({},
        a);
        var b, c, d, e, g, h, i = [],
        j = !a.once && [],
        k = function(f) {
            for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++) if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                b = !1;
                break
            }
            d = !1,
            i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
        },
        l = {
            add: function() {
                if (i) {
                    var c = i.length; !
                    function f(b) {
                        _.each(b,
                        function(b, c) {
                            var d = _.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                        })
                    } (arguments),
                    d ? g = i.length: b && (e = c, k(b))
                }
                return this
            },
            remove: function() {
                return i && _.each(arguments,
                function(a, b) {
                    for (var c; (c = _.inArray(b, i, c)) > -1;) i.splice(c, 1),
                    d && (g >= c && g--, h >= c && h--)
                }),
                this
            },
            has: function(a) {
                return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
            },
            empty: function() {
                return i = [],
                g = 0,
                this
            },
            disable: function() {
                return i = j = b = void 0,
                this
            },
            disabled: function() {
                return ! i
            },
            lock: function() {
                return j = void 0,
                b || l.disable(),
                this
            },
            locked: function() {
                return ! j
            },
            fireWith: function(a, b) {
                return ! i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)),
                this
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! c
            }
        };
        return l
    },
    _.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", _.Callbacks("once memory"), "resolved"], ["reject", "fail", _.Callbacks("once memory"), "rejected"], ["notify", "progress", _.Callbacks("memory")]],
            c = "pending",
            d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return _.Deferred(function(c) {
                        _.each(b,
                        function(b, f) {
                            var g = _.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                            })
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? _.extend(a, d) : d
                }
            },
            e = {};
            return d.pipe = d.then,
            _.each(b,
            function(a, f) {
                var g = f[2],
                h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                },
                b[1 ^ a][2].disable, b[2][2].lock),
                e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d: this, arguments),
                    this
                },
                e[f[0] + "With"] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b, c, d, e = 0,
            f = R.call(arguments),
            g = f.length,
            h = 1 !== g || a && _.isFunction(a.promise) ? g: 0,
            i = 1 === h ? a: _.Deferred(),
            j = function(a, c, d) {
                return function(e) {
                    c[a] = this,
                    d[a] = arguments.length > 1 ? R.call(arguments) : e,
                    d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            };
            if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f),
            i.promise()
        }
    });
    var pa;
    _.fn.ready = function(a) {
        return _.ready.promise().done(a),
        this
    },
    _.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? _.readyWait++:_.ready(!0)
        },
        ready: function(a) { (a === !0 ? --_.readyWait: _.isReady) || (_.isReady = !0, a !== !0 && --_.readyWait > 0 || (pa.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
        }
    }),
    _.ready.promise = function(b) {
        return pa || (pa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))),
        pa.promise(b)
    },
    _.ready.promise();
    var qa = _.access = function(a, b, c, d, e, f, g) {
        var h = 0,
        i = a.length,
        j = null == c;
        if ("object" === _.type(c)) {
            e = !0;
            for (h in c) _.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
            return j.call(_(a), c)
        })), b)) for (; i > h; h++) b(a[h], c, g ? d: d.call(a[h], h, b(a[h], c)));
        return e ? a: j ? b.call(a) : i ? b(a[0], c) : f
    };
    _.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    },
    h.uid = 1,
    h.accepts = _.acceptData,
    h.prototype = {
        key: function(a) {
            if (!h.accepts(a)) return 0;
            var b = {},
            c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    },
                    Object.defineProperties(a, b)
                } catch(d) {
                    b[this.expando] = c,
                    _.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}),
            c
        },
        set: function(a, b, c) {
            var d, e = this.key(a),
            f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
            else for (d in b) f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c: c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d: this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c: b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a),
            g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(na) || [])),
                c = d.length;
                for (; c--;) delete g[d[c]]
            }
        },
        hasData: function(a) {
            return ! _.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var ra = new h,
    sa = new h,
    ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    ua = /([A-Z])/g;
    _.extend({
        hasData: function(a) {
            return sa.hasData(a) || ra.hasData(a)
        },
        data: function(a, b, c) {
            return sa.access(a, b, c)
        },
        removeData: function(a, b) {
            sa.remove(a, b)
        },
        _data: function(a, b, c) {
            return ra.access(a, b, c)
        },
        _removeData: function(a, b) {
            ra.remove(a, b)
        }
    }),
    _.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
            g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = sa.get(f), 1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
                    ra.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                sa.set(this, a)
            }) : qa(this,
            function(b) {
                var c, d = _.camelCase(a);
                if (f && void 0 === b) {
                    if (c = sa.get(f, a), void 0 !== c) return c;
                    if (c = sa.get(f, d), void 0 !== c) return c;
                    if (c = i(f, d, void 0), void 0 !== c) return c
                } else this.each(function() {
                    var c = sa.get(this, d);
                    sa.set(this, d, b),
                    -1 !== a.indexOf("-") && void 0 !== c && sa.set(this, a, b)
                })
            },
            null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                sa.remove(this, a)
            })
        }
    }),
    _.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = ra.get(a, b), c && (!d || _.isArray(c) ? d = ra.access(a, b, _.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = _.queue(a, b),
            d = c.length,
            e = c.shift(),
            f = _._queueHooks(a, b),
            g = function() {
                _.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--),
            e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ra.get(a, c) || ra.access(a, c, {
                empty: _.Callbacks("once memory").add(function() {
                    ra.remove(a, [b + "queue", c])
                })
            })
        }
    }),
    _.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--),
            arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this: this.each(function() {
                var c = _.queue(this, a, b);
                _._queueHooks(this, a),
                "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                _.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
            e = _.Deferred(),
            f = this,
            g = this.length,
            h = function() {--d || e.resolveWith(f, [f])
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ra.get(f[g], a + "queueHooks"),
            c && c.empty && (d++, c.empty.add(h));
            return h(),
            e.promise(b)
        }
    });
    var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    wa = ["Top", "Right", "Bottom", "Left"],
    xa = function(a, b) {
        return a = b || a,
        "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
    },
    ya = /^(?:checkbox|radio)$/i; !
    function() {
        var a = Z.createDocumentFragment(),
        b = a.appendChild(Z.createElement("div")),
        c = Z.createElement("input");
        c.setAttribute("type", "radio"),
        c.setAttribute("checked", "checked"),
        c.setAttribute("name", "t"),
        b.appendChild(c),
        Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.innerHTML = "<textarea>x</textarea>",
        Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    } ();
    var za = "undefined";
    Y.focusinBubbles = "onfocusin" in a;
    var Aa = /^key/,
    Ba = /^(?:mouse|pointer|contextmenu)|click/,
    Ca = /^(?:focusinfocus|focusoutblur)$/,
    Da = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
            if (q) for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                return typeof _ !== za && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
            }), b = (b || "").match(na) || [""], j = b.length; j--;) h = Da.exec(b[j]) || [],
            n = p = h[1],
            o = (h[2] || "").split(".").sort(),
            n && (l = _.event.special[n] || {},
            n = (e ? l.delegateType: l.bindType) || n, l = _.event.special[n] || {},
            k = _.extend({
                type: n,
                origType: p,
                data: d,
                handler: c,
                guid: c.guid,
                selector: e,
                needsContext: e && _.expr.match.needsContext.test(e),
                namespace: o.join(".")
            },
            f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(na) || [""], j = b.length; j--;) if (h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = _.event.special[n] || {},
                    n = (d ? l.delegateType: l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f],
                    !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle), delete i[n])
                } else for (n in i) _.event.remove(a, n + b[j], c, d, !0);
                _.isEmptyObject(i) && (delete q.handle, ra.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || Z],
            n = X.call(b, "type") ? b.type: b,
            o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b: new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {},
            e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !_.isWindow(d)) {
                    for (i = l.delegateType || n, Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g),
                    h = g;
                    h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
                }
                for (f = 0; (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i: l.bindType || n,
                k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"),
                k && k.apply(g, c),
                k = j && g[j],
                k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = n,
                e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)),
                b.result
            }
        },
        dispatch: function(a) {
            a = _.event.fix(a);
            var b, c, d, e, f, g = [],
            h = R.call(arguments),
            i = (ra.get(this, "events") || {})[a.type] || [],
            j = _.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = _.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped();) for (a.currentTarget = e.elem, c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
            h = b.delegateCount,
            i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i !== this; i = i.parentNode || this) if (i.disabled !== !0 || "click" !== a.type) {
                for (d = [], c = 0; h > c; c++) f = b[c],
                e = f.selector + " ",
                void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length),
                d[e] && d.push(f);
                d.length && g.push({
                    elem: i,
                    handlers: d
                })
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }),
            g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode: b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)),
                a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                a
            }
        },
        fix: function(a) {
            if (a[_.expando]) return a;
            var b, c, d, e = a.type,
            f = a,
            g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks: Aa.test(e) ? this.keyHooks: {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b],
            a[c] = f[c];
            return a.target || (a.target = Z),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== l() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === l() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return _.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = _.extend(new _.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    _.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    },
    _.Event = function(a, b) {
        return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j: k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void(this[_.expando] = !0)) : new _.Event(a, b)
    },
    _.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = j,
            a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = j,
            a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = j,
            a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    },
    function(a, b) {
        _.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                e = a.relatedTarget,
                f = a.handleObj;
                return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b),
                c
            }
        }
    }),
    Y.focusinBubbles || _.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(a, b) {
        var c = function(a) {
            _.event.simulate(b, a.target, _.event.fix(a), !0)
        };
        _.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                e = ra.access(d, b);
                e || d.addEventListener(a, c, !0),
                ra.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                e = ra.access(d, b) - 1;
                e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0), ra.remove(d, b))
            }
        }
    }),
    _.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k;
            else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return _().off(a),
                f.apply(this, arguments)
            },
            d.guid = f.guid || (f.guid = _.guid++)),
            this.each(function() {
                _.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj,
            _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace: d.origType, d.selector, d.handler),
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0),
            c === !1 && (c = k),
            this.each(function() {
                _.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                _.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? _.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Fa = /<([\w:]+)/,
    Ga = /<|&#?\w+;/,
    Ha = /<(?:script|style|link)/i,
    Ia = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Ja = /^$|\/(?:java|ecma)script/i,
    Ka = /^true\/(.*)/,
    La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Ma = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Ma.optgroup = Ma.option,
    Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead,
    Ma.th = Ma.td,
    _.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
            i = _.contains(a.ownerDocument, a);
            if (! (Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a))) for (g = r(h), f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
            if (b) if (c) for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]);
            else q(a, h);
            return g = r(h, "script"),
            g.length > 0 && p(g, !i && r(a, "script")),
            h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++) if (e = a[m], e || 0 === e) if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
            else if (Ga.test(e)) {
                for (f = f || k.appendChild(b.createElement("div")), g = (Fa.exec(e) || ["", ""])[1].toLowerCase(), h = Ma[g] || Ma._default, f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
                _.merge(l, f.childNodes),
                f = k.firstChild,
                f.textContent = ""
            } else l.push(b.createTextNode(e));
            for (k.textContent = "", m = 0; e = l[m++];) if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c)) for (j = 0; e = f[j++];) Ja.test(e.type || "") && c.push(e);
            return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = _.event.special,
            g = 0; void 0 !== (c = a[g]); g++) {
                if (_.acceptData(c) && (e = c[ra.expando], e && (b = ra.cache[e]))) {
                    if (b.events) for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                    ra.cache[e] && delete ra.cache[e]
                }
                delete sa.cache[c[sa.expando]]
            }
        }
    }),
    _.fn.extend({
        text: function(a) {
            return qa(this,
            function(a) {
                return void 0 === a ? _.text(this) : this.empty().each(function() { (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            },
            null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments,
            function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments,
            function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments,
            function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
            function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)),
            c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null != a && a,
            b = null == b ? a: b,
            this.map(function() {
                return _.clone(this, a, b)
            })
        },
        html: function(a) {
            return qa(this,
            function(a) {
                var b = this[0] || {},
                c = 0,
                d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Ea, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {},
                        1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch(e) {}
                }
                b && this.empty().append(a)
            },
            null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments,
            function(b) {
                a = this.parentNode,
                _.cleanData(r(this)),
                a && a.replaceChild(b, this)
            }),
            a && (a.length || a.nodeType) ? this: this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0,
            j = this.length,
            k = this,
            l = j - 1,
            m = a[0],
            p = _.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ia.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                p && (a[0] = m.call(this, c, d.html())),
                d.domManip(a, b)
            });
            if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (e = _.map(r(c, "script"), n), f = e.length; j > i; i++) g = c,
                i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))),
                b.call(this[i], g, i);
                if (f) for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; f > i; i++) g = e[i],
                Ja.test(g.type || "") && !ra.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(La, "")))
            }
            return this
        }
    }),
    _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(a, b) {
        _.fn[a] = function(a) {
            for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this: this.clone(!0),
            _(e[g])[b](c),
            T.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var Na, Oa = {},
    Pa = /^margin/,
    Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"),
    Ra = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
    }; !
    function() {
        function b() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            g.innerHTML = "",
            e.appendChild(f);
            var b = a.getComputedStyle(g, null);
            c = "1%" !== b.top,
            d = "4px" === b.width,
            e.removeChild(f)
        }
        var c, d, e = Z.documentElement,
        f = Z.createElement("div"),
        g = Z.createElement("div");
        g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
            pixelPosition: function() {
                return b(),
                c
            },
            boxSizingReliable: function() {
                return null == d && b(),
                d
            },
            reliableMarginRight: function() {
                var b, c = g.appendChild(Z.createElement("div"));
                return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                c.style.marginRight = c.style.width = "0",
                g.style.width = "1px",
                e.appendChild(f),
                b = !parseFloat(a.getComputedStyle(c, null).marginRight),
                e.removeChild(f),
                g.removeChild(c),
                b
            }
        }))
    } (),
    _.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f],
        a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Sa = /^(none|table(?!-c[ea]).+)/,
    Ta = new RegExp("^(" + va + ")(.*)$", "i"),
    Ua = new RegExp("^([+-])=(" + va + ")", "i"),
    Va = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    Wa = {
        letterSpacing: "0",
        fontWeight: "400"
    },
    Xa = ["Webkit", "O", "Moz", "ms"];
    _.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1": c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = _.camelCase(b),
                i = a.style;
                return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)),
                g = _.cssHooks[b] || _.cssHooks[h],
                void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e: i[b] : (f = typeof c, "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), void(null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))))
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = _.camelCase(b);
            return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)),
            g = _.cssHooks[b] || _.cssHooks[h],
            g && "get" in g && (e = g.get(a, !0, c)),
            void 0 === e && (e = v(a, b, d)),
            "normal" === e && b in Wa && (e = Wa[b]),
            "" === c || c ? (f = parseFloat(e), c === !0 || _.isNumeric(f) ? f || 0 : e) : e
        }
    }),
    _.each(["height", "width"],
    function(a, b) {
        _.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Sa.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Va,
                function() {
                    return A(a, b, d)
                }) : A(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Ra(a);
                return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }),
    _.cssHooks.marginRight = w(Y.reliableMarginRight,
    function(a, b) {
        return b ? _.swap(a, {
            display: "inline-block"
        },
        v, [a, "marginRight"]) : void 0
    }),
    _.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(a, b) {
        _.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0,
                e = {},
                f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        },
        Pa.test(a) || (_.cssHooks[a + b].set = y)
    }),
    _.fn.extend({
        css: function(a, b) {
            return qa(this,
            function(a, b, c) {
                var d, e, f = {},
                g = 0;
                if (_.isArray(b)) {
                    for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = _.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
            },
            a, b, arguments.length > 1)
        },
        show: function() {
            return B(this, !0)
        },
        hide: function() {
            return B(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                xa(this) ? _(this).show() : _(this).hide()
            })
        }
    }),
    _.Tween = C,
    C.prototype = {
        constructor: C,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (_.cssNumber[c] ? "": "px")
        },
        cur: function() {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = C.propHooks[this.prop];
            return this.options.duration ? this.pos = b = _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : C.propHooks._default.set(this),
            this
        }
    },
    C.prototype.init.prototype = C.prototype,
    C.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b: 0) : a.elem[a.prop]
            },
            set: function(a) {
                _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    _.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return.5 - Math.cos(a * Math.PI) / 2
        }
    },
    _.fx = C.prototype.init,
    _.fx.step = {};
    var Ya, Za, $a = /^(?:toggle|show|hide)$/,
    _a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"),
    ab = /queueHooks$/,
    bb = [G],
    cb = {
        "*": [function(a, b) {
            var c = this.createTween(a, b),
            d = c.cur(),
            e = _a.exec(b),
            f = e && e[3] || (_.cssNumber[a] ? "": "px"),
            g = (_.cssNumber[a] || "px" !== f && +d) && _a.exec(_.css(c.elem, a)),
            h = 1,
            i = 20;
            if (g && g[3] !== f) {
                f = f || g[3],
                e = e || [],
                g = +d || 1;
                do h = h || ".5",
                g /= h,
                _.style(c.elem, a, g + f);
                while (h !== (h = c.cur() / d) && 1 !== h && --i)
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]),
            c
        }]
    };
    _.Animation = _.extend(I, {
        tweener: function(a, b) {
            _.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0,
            e = a.length; e > d; d++) c = a[d],
            cb[c] = cb[c] || [],
            cb[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? bb.unshift(a) : bb.push(a)
        }
    }),
    _.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? _.extend({},
        a) : {
            complete: c || !c && b || _.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !_.isFunction(b) && b
        };
        return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration: d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default,
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function() {
            _.isFunction(d.old) && d.old.call(this),
            d.queue && _.dequeue(this, d.queue)
        },
        d
    },
    _.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(xa).css("opacity", 0).show().end().animate({
                opacity: b
            },
            a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = _.isEmptyObject(a),
            f = _.speed(b, c, d),
            g = function() {
                var b = I(this, _.extend({},
                a), f); (e || ra.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g,
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop,
                b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0),
            b && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0,
                e = null != a && a + "queueHooks",
                f = _.timers,
                g = ra.get(this);
                if (e) g[e] && g[e].stop && d(g[e]);
                else for (e in g) g[e] && g[e].stop && ab.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1)); (b || !c) && _.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"),
            this.each(function() {
                var b, c = ra.get(this),
                d = c[a + "queue"],
                e = c[a + "queueHooks"],
                f = _.timers,
                g = d ? d.length: 0;
                for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }),
    _.each(["toggle", "show", "hide"],
    function(a, b) {
        var c = _.fn[b];
        _.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
        }
    }),
    _.each({
        slideDown: E("show"),
        slideUp: E("hide"),
        slideToggle: E("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(a, b) {
        _.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    _.timers = [],
    _.fx.tick = function() {
        var a, b = 0,
        c = _.timers;
        for (Ya = _.now(); b < c.length; b++) a = c[b],
        a() || c[b] !== a || c.splice(b--, 1);
        c.length || _.fx.stop(),
        Ya = void 0
    },
    _.fx.timer = function(a) {
        _.timers.push(a),
        a() ? _.fx.start() : _.timers.pop()
    },
    _.fx.interval = 13,
    _.fx.start = function() {
        Za || (Za = setInterval(_.fx.tick, _.fx.interval))
    },
    _.fx.stop = function() {
        clearInterval(Za),
        Za = null
    },
    _.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    _.fn.delay = function(a, b) {
        return a = _.fx ? _.fx.speeds[a] || a: a,
        b = b || "fx",
        this.queue(b,
        function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d)
            }
        })
    },
    function() {
        var a = Z.createElement("input"),
        b = Z.createElement("select"),
        c = b.appendChild(Z.createElement("option"));
        a.type = "checkbox",
        Y.checkOn = "" !== a.value,
        Y.optSelected = c.selected,
        b.disabled = !0,
        Y.optDisabled = !c.disabled,
        a = Z.createElement("input"),
        a.value = "t",
        a.type = "radio",
        Y.radioValue = "t" === a.value
    } ();
    var db, eb, fb = _.expr.attrHandle;
    _.fn.extend({
        attr: function(a, b) {
            return qa(this, _.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                _.removeAttr(this, a)
            })
        }
    }),
    _.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === za ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? eb: db)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e: (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e: (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
            f = b && b.match(na);
            if (f && 1 === a.nodeType) for (; c = f[e++];) d = _.propFix[c] || c,
            _.expr.match.bool.test(c) && (a[d] = !1),
            a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        }
    }),
    eb = {
        set: function(a, b, c) {
            return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c),
            c
        }
    },
    _.each(_.expr.match.bool.source.match(/\w+/g),
    function(a, b) {
        var c = fb[b] || _.find.attr;
        fb[b] = function(a, b, d) {
            var e, f;
            return d || (f = fb[b], fb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fb[b] = f),
            e
        }
    });
    var gb = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
        prop: function(a, b) {
            return qa(this, _.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[_.propFix[a] || a]
            })
        }
    }),
    _.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a),
            f && (b = _.propFix[b] || b, e = _.propHooks[b]),
            void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d: a[b] = c: e && "get" in e && null !== (d = e.get(a, b)) ? d: a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex: -1
                }
            }
        }
    }),
    Y.optSelected || (_.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex,
            null
        }
    }),
    _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
    function() {
        _.propFix[this.toLowerCase()] = this
    });
    var hb = /[\t\r\n\f]/g;
    _.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
            i = 0,
            j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).addClass(a.call(this, b, this.className))
            });
            if (h) for (b = (a || "").match(na) || []; j > i; i++) if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
                for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = _.trim(d),
                c.className !== g && (c.className = g)
            }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
            i = 0,
            j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).removeClass(a.call(this, b, this.className))
            });
            if (h) for (b = (a || "").match(na) || []; j > i; i++) if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
                for (f = 0; e = b[f++];) for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                g = a ? _.trim(d) : "",
                c.className !== g && (c.className = g)
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(_.isFunction(a) ?
            function(c) {
                _(this).toggleClass(a.call(this, c, this.className, b), b)
            }: function() {
                if ("string" === c) for (var b, d = 0,
                e = _(this), f = a.match(na) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else(c === za || "boolean" === c) && (this.className && ra.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "": ra.get(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ",
            c = 0,
            d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0) return ! 0;
            return ! 1
        }
    });
    var ib = /\r/g;
    _.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = _.isFunction(a), this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "": "number" == typeof e ? e += "": _.isArray(e) && (e = _.map(e,
                function(a) {
                    return null == a ? "": a + ""
                })), b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
            })) : e ? (b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c: (c = e.value, "string" == typeof c ? c.replace(ib, "") : null == c ? "": c)) : void 0
        }
    }),
    _.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = _.find.attr(a, "value");
                    return null != b ? b: _.trim(_.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options,
                    e = a.selectedIndex,
                    f = "select-one" === a.type || 0 > e,
                    g = f ? null: [], h = f ? e + 1 : d.length, i = 0 > e ? h: f ? e: 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (Y.optDisabled ? c.disabled: null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
                        if (b = _(c).val(), f) return b;
                        g.push(b)
                    }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options,
                    f = _.makeArray(b), g = e.length; g--;) d = e[g],
                    (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1),
                    f
                }
            }
        }
    }),
    _.each(["radio", "checkbox"],
    function() {
        _.valHooks[this] = {
            set: function(a, b) {
                return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0
            }
        },
        Y.checkOn || (_.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on": a.value
        })
    }),
    _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(a, b) {
        _.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }),
    _.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var jb = _.now(),
    kb = /\?/;
    _.parseJSON = function(a) {
        return JSON.parse(a + "")
    },
    _.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser,
            b = c.parseFromString(a, "text/xml")
        } catch(d) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a),
        b
    };
    var lb = /#.*$/,
    mb = /([?&])_=[^&]*/,
    nb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    ob = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    pb = /^(?:GET|HEAD)$/,
    qb = /^\/\//,
    rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    sb = {},
    tb = {},
    ub = "*/".concat("*"),
    vb = a.location.href,
    wb = rb.exec(vb.toLowerCase()) || [];
    _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vb,
            type: "GET",
            isLocal: ob.test(wb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ub,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": _.parseJSON,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
        },
        ajaxPrefilter: J(sb),
        ajaxTransport: J(tb),
        ajax: function(a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), u = v.getResponseHeader("etag"), u && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent": 304 === a ? w = "notmodified": (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess": "ajaxError", [v, l, i ? k: r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (b = a, a = void 0),
            b = b || {};
            var d, e, f, g, h, i, j, k, l = _.ajaxSetup({},
            b),
            m = l.context || l,
            n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
            o = _.Deferred(),
            p = _.Callbacks("once memory"),
            q = l.statusCode || {},
            r = {},
            s = {},
            t = 0,
            u = "canceled",
            v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!g) for (g = {}; b = nb.exec(f);) g[b[1].toLowerCase()] = b[2];
                        b = g[a.toLowerCase()]
                    }
                    return null == b ? null: b
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? f: null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b),
                    this
                },
                overrideMimeType: function(a) {
                    return t || (l.mimeType = a),
                    this
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > t) for (b in a) q[b] = [q[b], a[b]];
                    else v.always(a[v.status]);
                    return this
                },
                abort: function(a) {
                    var b = a || u;
                    return d && d.abort(b),
                    c(0, b),
                    this
                }
            };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || vb) + "").replace(lb, "").replace(qb, wb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(na) || [""], null == l.crossDomain && (i = rb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === wb[1] && i[2] === wb[2] && (i[3] || ("http:" === i[1] ? "80": "443")) === (wb[3] || ("http:" === wb[1] ? "80": "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(sb, l, b, v), 2 === t) return v;
            j = _.event && l.global,
            j && 0 === _.active++&&_.event.trigger("ajaxStart"),
            l.type = l.type.toUpperCase(),
            l.hasContent = !pb.test(l.type),
            e = l.url,
            l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&": "?") + l.data, delete l.data), l.cache === !1 && (l.url = mb.test(e) ? e.replace(mb, "$1_=" + jb++) : e + (kb.test(e) ? "&": "?") + "_=" + jb++)),
            l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])),
            (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + ub + "; q=0.01": "") : l.accepts["*"]);
            for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (k in {
                success: 1,
                error: 1,
                complete: 1
            }) v[k](l[k]);
            if (d = K(tb, l, b, v)) {
                v.readyState = 1,
                j && n.trigger("ajaxSend", [v, l]),
                l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout")
                },
                l.timeout));
                try {
                    t = 1,
                    d.send(r, c)
                } catch(w) {
                    if (! (2 > t)) throw w;
                    c( - 1, w)
                }
            } else c( - 1, "No Transport");
            return v
        },
        getJSON: function(a, b, c) {
            return _.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return _.get(a, void 0, b, "script")
        }
    }),
    _.each(["get", "post"],
    function(a, b) {
        _[b] = function(a, c, d, e) {
            return _.isFunction(c) && (e = e || d, d = c, c = void 0),
            _.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }),
    _._evalUrl = function(a) {
        return _.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    },
    _.fn.extend({
        wrapAll: function(a) {
            var b;
            return _.isFunction(a) ? this.each(function(b) {
                _(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return this.each(_.isFunction(a) ?
            function(b) {
                _(this).wrapInner(a.call(this, b))
            }: function() {
                var b = _(this),
                c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = _.isFunction(a);
            return this.each(function(c) {
                _(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    _.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    },
    _.expr.filters.visible = function(a) {
        return ! _.expr.filters.hidden(a)
    };
    var xb = /%20/g,
    yb = /\[\]$/,
    zb = /\r?\n/g,
    Ab = /^(?:submit|button|image|reset|file)$/i,
    Bb = /^(?:input|select|textarea|keygen)/i;
    _.param = function(a, b) {
        var c, d = [],
        e = function(a, b) {
            b = _.isFunction(b) ? b() : null == b ? "": b,
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a,
        function() {
            e(this.name, this.value)
        });
        else for (c in a) O(c, a[c], b, e);
        return d.join("&").replace(xb, "+")
    },
    _.fn.extend({
        serialize: function() {
            return _.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = _.prop(this, "elements");
                return a ? _.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !_(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !ya.test(a))
            }).map(function(a, b) {
                var c = _(this).val();
                return null == c ? null: _.isArray(c) ? _.map(c,
                function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(zb, "\r\n")
                }
            }).get()
        }
    }),
    // _.ajaxSettings.xhr = function() {
    //     try {
    //         return new XMLHttpRequest
    //     } catch(a) {}
    // };
    // var Cb = 0,
    // Db = {},
    // Eb = {
    //     0 : 200,
    //     1223 : 204
    // },
    // Fb = _.ajaxSettings.xhr();

    // a.attachEvent && a.attachEvent("onunload",
    // function() {
    //     for (var a in Db) Db[a]()
    // }),
    // Y.cors = !!Fb && "withCredentials" in Fb,
    // Y.ajax = Fb = !!Fb,
    // _.ajaxTransport(function(a) {
    //     var b;
    //     return Y.cors || Fb && !a.crossDomain ? {
    //         send: function(c, d) {
    //             var e, f = a.xhr(),
    //             g = ++Cb;
    //             if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
    //             a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
    //             a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
    //             for (e in c) f.setRequestHeader(e, c[e]);
    //             b = function(a) {
    //                 return function() {
    //                     b && (delete Db[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Eb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
    //                         text: f.responseText
    //                     }: void 0, f.getAllResponseHeaders()))
    //                 }
    //             },
    //             f.onload = b(),
    //             f.onerror = b("error"),
    //             b = Db[g] = b("abort");

    //             try {
    //                 f.send(a.hasContent && a.data || null)
    //             } catch(h) {
    //                 if (b) throw h
    //             }
    //         },
    //         abort: function() {
    //             b && b()
    //         }
    //     }: void 0
    // }),
    // _.ajaxSetup({
    //     accepts: {
    //         script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    //     },
    //     contents: {
    //         script: /(?:java|ecma)script/
    //     },
    //     converters: {
    //         "text script": function(a) {
    //             return _.globalEval(a),
    //             a
    //         }
    //     }
    // }),
    // _.ajaxPrefilter("script",
    // function(a) {
    //     void 0 === a.cache && (a.cache = !1),
    //     a.crossDomain && (a.type = "GET")
    // }),
    _.ajaxTransport("script",
    function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = _("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(),
                        c = null,
                        a && e("error" === a.type ? 404 : 200, a.type)
                    }),
                    Z.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Gb = [],
    Hb = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Gb.pop() || _.expando + "_" + jb++;
            return this[a] = !0,
            a
        }
    }),
    _.ajaxPrefilter("json jsonp",
    function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Hb.test(b.url) ? "url": "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Hb, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&": "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || _.error(e + " was not called"),
            g[0]
        },
        b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        },
        d.always(function() {
            a[e] = f,
            b[e] && (b.jsonpCallback = c.jsonpCallback, Gb.push(e)),
            g && _.isFunction(f) && f(g[0]),
            g = f = void 0
        }), "script") : void 0
    }),
    _.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1),
        b = b || Z;
        var d = ga.exec(a),
        e = !c && [];
        return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
    };
    var Ib = _.fn.load;
    _.fn.load = function(a, b, c) {
        if ("string" != typeof a && Ib) return Ib.apply(this, arguments);
        var d, e, f, g = this,
        h = a.indexOf(" ");
        return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)),
        _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"),
        g.length > 0 && _.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments,
            g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
        }).complete(c &&
        function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }),
        this
    },
    _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
    function(a, b) {
        _.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    _.expr.filters.animated = function(a) {
        return _.grep(_.timers,
        function(b) {
            return a === b.elem
        }).length
    };
    var Jb = a.document.documentElement;
    _.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = _.css(a, "position"),
            l = _(a),
            m = {};
            "static" === k && (a.style.position = "relative"),
            h = l.offset(),
            f = _.css(a, "top"),
            i = _.css(a, "left"),
            j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1,
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0),
            _.isFunction(b) && (b = b.call(a, c, h)),
            null != b.top && (m.top = b.top - h.top + g),
            null != b.left && (m.left = b.left - h.left + e),
            "using" in b ? b.using.call(a, m) : l.css(m)
        }
    },
    _.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this: this.each(function(b) {
                _.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
            e = {
                top: 0,
                left: 0
            },
            f = d && d.ownerDocument;
            return f ? (b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()), c = P(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e) : void 0
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                d = {
                    top: 0,
                    left: 0
                };
                return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)),
                {
                    top: b.top - d.top - _.css(c, "marginTop", !0),
                    left: b.left - d.left - _.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Jb; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
                return a || Jb
            })
        }
    }),
    _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(b, c) {
        var d = "pageYOffset" === c;
        _.fn[b] = function(e) {
            return qa(this,
            function(b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset: f, d ? f: a.pageYOffset) : b[e] = f)
            },
            b, e, arguments.length, null)
        }
    }),
    _.each(["top", "left"],
    function(a, b) {
        _.cssHooks[b] = w(Y.pixelPosition,
        function(a, c) {
            return c ? (c = v(a, b), Qa.test(c) ? _(a).position()[b] + "px": c) : void 0
        })
    }),
    _.each({
        Height: "height",
        Width: "width"
    },
    function(a, b) {
        _.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        },
        function(c, d) {
            _.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                g = c || (d === !0 || e === !0 ? "margin": "border");
                return qa(this,
                function(b, c, d) {
                    var e;
                    return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
                },
                b, f ? d: void 0, f, null)
            }
        })
    }),
    _.fn.size = function() {
        return this.length
    },
    _.fn.andSelf = _.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [],
    function() {
        return _
    });
    var Kb = a.jQuery,
    Lb = a.$;
    return _.noConflict = function(b) {
        return a.$ === _ && (a.$ = Lb),
        b && a.jQuery === _ && (a.jQuery = Kb),
        _
    },
    typeof b === za && (a.jQuery = a.$ = _),
    _
}),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("undefined" != typeof jQuery ? jQuery: window.Zepto)
} (function(a) {
    function b(b) {
        var c = b.data;
        b.isDefaultPrevented() || (b.preventDefault(), a(b.target).ajaxSubmit(c))
    }
    function c(b) {
        var c = b.target,
        d = a(c);
        if (!d.is("[type=submit],[type=image]")) {
            var e = d.closest("[type=submit]");
            if (0 === e.length) return;
            c = e[0]
        }
        var f = this;
        if (f.clk = c, "image" == c.type) if (void 0 !== b.offsetX) f.clk_x = b.offsetX,
        f.clk_y = b.offsetY;
        else if ("function" == typeof a.fn.offset) {
            var g = d.offset();
            f.clk_x = b.pageX - g.left,
            f.clk_y = b.pageY - g.top
        } else f.clk_x = b.pageX - c.offsetLeft,
        f.clk_y = b.pageY - c.offsetTop;
        setTimeout(function() {
            f.clk = f.clk_x = f.clk_y = null
        },
        100)
    }
    function d() {
        if (a.fn.ajaxSubmit.debug) {
            var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(b) : window.opera && window.opera.postError && window.opera.postError(b)
        }
    }
    var e = {};
    e.fileapi = void 0 !== a("<input type='file'/>").get(0).files,
    e.formdata = void 0 !== window.FormData;
    var f = !!a.fn.prop;
    a.fn.attr2 = function() {
        if (!f) return this.attr.apply(this, arguments);
        var a = this.prop.apply(this, arguments);
        return a && a.jquery || "string" == typeof a ? a: this.attr.apply(this, arguments)
    },
    a.fn.ajaxSubmit = function(b) {
        function c(c) {
            var d, e, f = a.param(c, b.traditional).split("&"),
            g = f.length,
            h = [];
            for (d = 0; d < g; d++) f[d] = f[d].replace(/\+/g, " "),
            e = f[d].split("="),
            h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
            return h
        }
        function g(d) {
            for (var e = new FormData,
            f = 0; f < d.length; f++) e.append(d[f].name, d[f].value);
            if (b.extraData) {
                var g = c(b.extraData);
                for (f = 0; f < g.length; f++) g[f] && e.append(g[f][0], g[f][1])
            }
            b.data = null;
            var h = a.extend(!0, {},
            a.ajaxSettings, b, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: i || "POST"
            });
            b.uploadProgress && (h.xhr = function() {
                var c = a.ajaxSettings.xhr();
                return c.upload && c.upload.addEventListener("progress",
                function(a) {
                    var c = 0,
                    d = a.loaded || a.position,
                    e = a.total;
                    a.lengthComputable && (c = Math.ceil(d / e * 100)),
                    b.uploadProgress(a, d, e, c)
                },
                !1),
                c
            }),
            h.data = null;
            var j = h.beforeSend;
            return h.beforeSend = function(a, c) {
                b.formData ? c.data = b.formData: c.data = e,
                j && j.call(this, a, c)
            },
            a.ajax(h)
        }
        function h(c) {
            function e(a) {
                var b = null;
                try {
                    a.contentWindow && (b = a.contentWindow.document)
                } catch(c) {
                    d("cannot get iframe.contentWindow document: " + c)
                }
                if (b) return b;
                try {
                    b = a.contentDocument ? a.contentDocument: a.document
                } catch(c) {
                    d("cannot get iframe.contentDocument: " + c),
                    b = a.document
                }
                return b
            }
            function g() {
                function b() {
                    try {
                        var a = e(r).readyState;
                        d("state = " + a),
                        a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50)
                    } catch(c) {
                        d("Server abort: ", c, " (", c.name, ")"),
                        h(A),
                        w && clearTimeout(w),
                        w = void 0
                    }
                }
                var c = l.attr2("target"),
                f = l.attr2("action");
                x.setAttribute("target", o),
                i && !/post/i.test(i) || x.setAttribute("method", "POST"),
                f != m.url && x.setAttribute("action", m.url),
                m.skipEncodingOverride || i && !/post/i.test(i) || l.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }),
                m.timeout && (w = setTimeout(function() {
                    v = !0,
                    h(z)
                },
                m.timeout));
                var g = [];
                try {
                    if (m.extraData) for (var j in m.extraData) m.extraData.hasOwnProperty(j) && (a.isPlainObject(m.extraData[j]) && m.extraData[j].hasOwnProperty("name") && m.extraData[j].hasOwnProperty("value") ? g.push(a('<input type="hidden" name="' + m.extraData[j].name + '">').val(m.extraData[j].value).appendTo(x)[0]) : g.push(a('<input type="hidden" name="' + j + '">').val(m.extraData[j]).appendTo(x)[0]));
                    m.iframeTarget || q.appendTo("body"),
                    r.attachEvent ? r.attachEvent("onload", h) : r.addEventListener("load", h, !1),
                    setTimeout(b, 15);
                    try {
                        x.submit()
                    } catch(k) {
                        var n = document.createElement("form").submit;
                        n.apply(x)
                    }
                } finally {
                    x.setAttribute("action", f),
                    c ? x.setAttribute("target", c) : l.removeAttr("target"),
                    a(g).remove()
                }
            }
            function h(b) {
                if (!s.aborted && !F) {
                    if (E = e(r), E || (d("cannot access response document"), b = A), b === z && s) return s.abort("timeout"),
                    void y.reject(s, "timeout");
                    if (b == A && s) return s.abort("server abort"),
                    void y.reject(s, "error", "server abort");
                    if (E && E.location.href != m.iframeSrc || v) {
                        r.detachEvent ? r.detachEvent("onload", h) : r.removeEventListener("load", h, !1);
                        var c, f = "success";
                        try {
                            if (v) throw "timeout";
                            var g = "xml" == m.dataType || E.XMLDocument || a.isXMLDoc(E);
                            if (d("isXml=" + g), !g && window.opera && (null === E.body || !E.body.innerHTML) && --G) return d("requeing onLoad callback, DOM not available"),
                            void setTimeout(h, 250);
                            var i = E.body ? E.body: E.documentElement;
                            s.responseText = i ? i.innerHTML: null,
                            s.responseXML = E.XMLDocument ? E.XMLDocument: E,
                            g && (m.dataType = "xml"),
                            s.getResponseHeader = function(a) {
                                var b = {
                                    "content-type": m.dataType
                                };
                                return b[a.toLowerCase()]
                            },
                            i && (s.status = Number(i.getAttribute("status")) || s.status, s.statusText = i.getAttribute("statusText") || s.statusText);
                            var j = (m.dataType || "").toLowerCase(),
                            k = /(json|script|text)/.test(j);
                            if (k || m.textarea) {
                                var l = E.getElementsByTagName("textarea")[0];
                                if (l) s.responseText = l.value,
                                s.status = Number(l.getAttribute("status")) || s.status,
                                s.statusText = l.getAttribute("statusText") || s.statusText;
                                else if (k) {
                                    var o = E.getElementsByTagName("pre")[0],
                                    p = E.getElementsByTagName("body")[0];
                                    o ? s.responseText = o.textContent ? o.textContent: o.innerText: p && (s.responseText = p.textContent ? p.textContent: p.innerText)
                                }
                            } else "xml" == j && !s.responseXML && s.responseText && (s.responseXML = H(s.responseText));
                            try {
                                D = J(s, j, m)
                            } catch(t) {
                                f = "parsererror",
                                s.error = c = t || f
                            }
                        } catch(t) {
                            d("error caught: ", t),
                            f = "error",
                            s.error = c = t || f
                        }
                        s.aborted && (d("upload aborted"), f = null),
                        s.status && (f = s.status >= 200 && s.status < 300 || 304 === s.status ? "success": "error"),
                        "success" === f ? (m.success && m.success.call(m.context, D, "success", s), y.resolve(s.responseText, "success", s), n && a.event.trigger("ajaxSuccess", [s, m])) : f && (void 0 === c && (c = s.statusText), m.error && m.error.call(m.context, s, f, c), y.reject(s, "error", c), n && a.event.trigger("ajaxError", [s, m, c])),
                        n && a.event.trigger("ajaxComplete", [s, m]),
                        n && !--a.active && a.event.trigger("ajaxStop"),
                        m.complete && m.complete.call(m.context, s, f),
                        F = !0,
                        m.timeout && clearTimeout(w),
                        setTimeout(function() {
                            m.iframeTarget ? q.attr("src", m.iframeSrc) : q.remove(),
                            s.responseXML = null
                        },
                        100)
                    }
                }
            }
            var j, k, m, n, o, q, r, s, t, u, v, w, x = l[0],
            y = a.Deferred();
            if (y.abort = function(a) {
                s.abort(a)
            },
            c) for (k = 0; k < p.length; k++) j = a(p[k]),
            f ? j.prop("disabled", !1) : j.removeAttr("disabled");
            if (m = a.extend(!0, {},
            a.ajaxSettings, b), m.context = m.context || m, o = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (q = a(m.iframeTarget), u = q.attr2("name"), u ? o = u: q.attr2("name", o)) : (q = a('<iframe name="' + o + '" src="' + m.iframeSrc + '" />'), q.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), r = q[0], s = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(b) {
                    var c = "timeout" === b ? "timeout": "aborted";
                    d("aborting upload... " + c),
                    this.aborted = 1;
                    try {
                        r.contentWindow.document.execCommand && r.contentWindow.document.execCommand("Stop")
                    } catch(e) {}
                    q.attr("src", m.iframeSrc),
                    s.error = c,
                    m.error && m.error.call(m.context, s, c, b),
                    n && a.event.trigger("ajaxError", [s, m, c]),
                    m.complete && m.complete.call(m.context, s, c)
                }
            },
            n = m.global, n && 0 === a.active++&&a.event.trigger("ajaxStart"), n && a.event.trigger("ajaxSend", [s, m]), m.beforeSend && m.beforeSend.call(m.context, s, m) === !1) return m.global && a.active--,
            y.reject(),
            y;
            if (s.aborted) return y.reject(),
            y;
            t = x.clk,
            t && (u = t.name, u && !t.disabled && (m.extraData = m.extraData || {},
            m.extraData[u] = t.value, "image" == t.type && (m.extraData[u + ".x"] = x.clk_x, m.extraData[u + ".y"] = x.clk_y)));
            var z = 1,
            A = 2,
            B = a("meta[name=csrf-token]").attr("content"),
            C = a("meta[name=csrf-param]").attr("content");
            C && B && (m.extraData = m.extraData || {},
            m.extraData[C] = B),
            m.forceSync ? g() : setTimeout(g, 10);
            var D, E, F, G = 50,
            H = a.parseXML ||
            function(a, b) {
                return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"),
                b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b: null
            },
            I = a.parseJSON ||
            function(a) {
                return window.eval("(" + a + ")")
            },
            J = function(b, c, d) {
                var e = b.getResponseHeader("content-type") || "",
                f = "xml" === c || !c && e.indexOf("xml") >= 0,
                g = f ? b.responseXML: b.responseText;
                return f && "parsererror" === g.documentElement.nodeName && a.error && a.error("parsererror"),
                d && d.dataFilter && (g = d.dataFilter(g, c)),
                "string" == typeof g && ("json" === c || !c && e.indexOf("json") >= 0 ? g = I(g) : ("script" === c || !c && e.indexOf("javascript") >= 0) && a.globalEval(g)),
                g
            };
            return y
        }
        if (!this.length) return d("ajaxSubmit: skipping submit process - no element selected"),
        this;
        var i, j, k, l = this;
        "function" == typeof b ? b = {
            success: b
        }: void 0 === b && (b = {}),
        i = b.type || this.attr2("method"),
        j = b.url || this.attr2("action"),
        k = "string" == typeof j ? a.trim(j) : "",
        k = k || window.location.href || "",
        k && (k = (k.match(/^([^#]+)/) || [])[1]),
        b = a.extend(!0, {
            url: k,
            success: a.ajaxSettings.success,
            type: i || a.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false": "about:blank"
        },
        b);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),
        this;
        if (b.beforeSerialize && b.beforeSerialize(this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSerialize callback"),
        this;
        var n = b.traditional;
        void 0 === n && (n = a.ajaxSettings.traditional);
        var o, p = [],
        q = this.formToArray(b.semantic, p);
        if (b.data && (b.extraData = b.data, o = a.param(b.data, n)), b.beforeSubmit && b.beforeSubmit(q, this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSubmit callback"),
        this;
        if (this.trigger("form-submit-validate", [q, this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
        this;
        var r = a.param(q, n);
        o && (r = r ? r + "&" + o: o),
        "GET" == b.type.toUpperCase() ? (b.url += (b.url.indexOf("?") >= 0 ? "&": "?") + r, b.data = null) : b.data = r;
        var s = [];
        if (b.resetForm && s.push(function() {
            l.resetForm()
        }), b.clearForm && s.push(function() {
            l.clearForm(b.includeHidden)
        }), !b.dataType && b.target) {
            var t = b.success ||
            function() {};
            s.push(function(c) {
                var d = b.replaceTarget ? "replaceWith": "html";
                a(b.target)[d](c).each(t, arguments)
            })
        } else b.success && s.push(b.success);
        if (b.success = function(a, c, d) {
            for (var e = b.context || this,
            f = 0,
            g = s.length; f < g; f++) s[f].apply(e, [a, c, d || l, l])
        },
        b.error) {
            var u = b.error;
            b.error = function(a, c, d) {
                var e = b.context || this;
                u.apply(e, [a, c, d, l])
            }
        }
        if (b.complete) {
            var v = b.complete;
            b.complete = function(a, c) {
                var d = b.context || this;
                v.apply(d, [a, c, l])
            }
        }
        var w = a("input[type=file]:enabled", this).filter(function() {
            return "" !== a(this).val()
        }),
        x = w.length > 0,
        y = "multipart/form-data",
        z = l.attr("enctype") == y || l.attr("encoding") == y,
        A = e.fileapi && e.formdata;
        d("fileAPI :" + A);
        var B, C = (x || z) && !A;
        b.iframe !== !1 && (b.iframe || C) ? b.closeKeepAlive ? a.get(b.closeKeepAlive,
        function() {
            B = h(q)
        }) : B = h(q) : B = (x || z) && A ? g(q) : a.ajax(b),
        l.removeData("jqxhr").data("jqxhr", B);
        for (var D = 0; D < p.length; D++) p[D] = null;
        return this.trigger("form-submit-notify", [this, b]),
        this
    },
    a.fn.ajaxForm = function(e) {
        if (e = e || {},
        e.delegation = e.delegation && a.isFunction(a.fn.on), !e.delegation && 0 === this.length) {
            var f = {
                s: this.selector,
                c: this.context
            };
            return ! a.isReady && f.s ? (d("DOM not ready, queuing ajaxForm"), a(function() {
                a(f.s, f.c).ajaxForm(e)
            }), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "": " (DOM not ready)")), this)
        }
        return e.delegation ? (a(document).off("submit.form-plugin", this.selector, b).off("click.form-plugin", this.selector, c).on("submit.form-plugin", this.selector, e, b).on("click.form-plugin", this.selector, e, c), this) : this.ajaxFormUnbind().bind("submit.form-plugin", e, b).bind("click.form-plugin", e, c)
    },
    a.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    },
    a.fn.formToArray = function(b, c) {
        var d = [];
        if (0 === this.length) return d;
        var f = this[0],
        g = b ? f.getElementsByTagName("*") : f.elements;
        if (!g) return d;
        var h, i, j, k, l, m, n;
        for (h = 0, m = g.length; h < m; h++) if (l = g[h], j = l.name, j && !l.disabled) if (b && f.clk && "image" == l.type) f.clk == l && (d.push({
            name: j,
            value: a(l).val(),
            type: l.type
        }), d.push({
            name: j + ".x",
            value: f.clk_x
        },
        {
            name: j + ".y",
            value: f.clk_y
        }));
        else if (k = a.fieldValue(l, !0), k && k.constructor == Array) for (c && c.push(l), i = 0, n = k.length; i < n; i++) d.push({
            name: j,
            value: k[i]
        });
        else if (e.fileapi && "file" == l.type) {
            c && c.push(l);
            var o = l.files;
            if (o.length) for (i = 0; i < o.length; i++) d.push({
                name: j,
                value: o[i],
                type: l.type
            });
            else d.push({
                name: j,
                value: "",
                type: l.type
            })
        } else null !== k && "undefined" != typeof k && (c && c.push(l), d.push({
            name: j,
            value: k,
            type: l.type,
            required: l.required
        }));
        if (!b && f.clk) {
            var p = a(f.clk),
            q = p[0];
            j = q.name,
            j && !q.disabled && "image" == q.type && (d.push({
                name: j,
                value: p.val()
            }), d.push({
                name: j + ".x",
                value: f.clk_x
            },
            {
                name: j + ".y",
                value: f.clk_y
            }))
        }
        return d
    },
    a.fn.formSerialize = function(b) {
        return a.param(this.formToArray(b))
    },
    a.fn.fieldSerialize = function(b) {
        var c = [];
        return this.each(function() {
            var d = this.name;
            if (d) {
                var e = a.fieldValue(this, b);
                if (e && e.constructor == Array) for (var f = 0,
                g = e.length; f < g; f++) c.push({
                    name: d,
                    value: e[f]
                });
                else null !== e && "undefined" != typeof e && c.push({
                    name: this.name,
                    value: e
                })
            }
        }),
        a.param(c)
    },
    a.fn.fieldValue = function(b) {
        for (var c = [], d = 0, e = this.length; d < e; d++) {
            var f = this[d],
            g = a.fieldValue(f, b);
            null === g || "undefined" == typeof g || g.constructor == Array && !g.length || (g.constructor == Array ? a.merge(c, g) : c.push(g))
        }
        return c
    },
    a.fieldValue = function(b, c) {
        var d = b.name,
        e = b.type,
        f = b.tagName.toLowerCase();
        if (void 0 === c && (c = !0), c && (!d || b.disabled || "reset" == e || "button" == e || ("checkbox" == e || "radio" == e) && !b.checked || ("submit" == e || "image" == e) && b.form && b.form.clk != b || "select" == f && b.selectedIndex == -1)) return null;
        if ("select" == f) {
            var g = b.selectedIndex;
            if (g < 0) return null;
            for (var h = [], i = b.options, j = "select-one" == e, k = j ? g + 1 : i.length, l = j ? g: 0; l < k; l++) {
                var m = i[l];
                if (m.selected) {
                    var n = m.value;
                    if (n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text: m.value), j) return n;
                    h.push(n)
                }
            }
            return h
        }
        return a(b).val()
    },
    a.fn.clearForm = function(b) {
        return this.each(function() {
            a("input,select,textarea", this).clearFields(b)
        })
    },
    a.fn.clearFields = a.fn.clearInputs = function(b) {
        var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var d = this.type,
            e = this.tagName.toLowerCase();
            c.test(d) || "textarea" == e ? this.value = "": "checkbox" == d || "radio" == d ? this.checked = !1 : "select" == e ? this.selectedIndex = -1 : "file" == d ? /MSIE/.test(navigator.userAgent) ? a(this).replaceWith(a(this).clone(!0)) : a(this).val("") : b && (b === !0 && /hidden/.test(d) || "string" == typeof b && a(this).is(b)) && (this.value = "")
        })
    },
    a.fn.resetForm = function() {
        return this.each(function() { ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    },
    a.fn.enable = function(a) {
        return void 0 === a && (a = !0),
        this.each(function() {
            this.disabled = !a
        })
    },
    a.fn.selected = function(b) {
        return void 0 === b && (b = !0),
        this.each(function() {
            var c = this.type;
            if ("checkbox" == c || "radio" == c) this.checked = b;
            else if ("option" == this.tagName.toLowerCase()) {
                var d = a(this).parent("select");
                b && d[0] && "select-one" == d[0].type && d.find("option").selected(!1),
                this.selected = b
            }
        })
    },
    a.fn.ajaxSubmit.debug = !1
}),
function(a, b) {
    function c(b, c, d, e) {
        var f = {
            data: e || 0 === e || e === !1 ? e: c ? c.data: {},
            _wrap: c ? c._wrap: null,
            tmpl: null,
            parent: c || null,
            nodes: [],
            calls: k,
            nest: l,
            wrap: m,
            html: n,
            update: o
        };
        return b && a.extend(f, b, {
            nodes: [],
            parent: c
        }),
        d && (f.tmpl = d, f._ctnt = f._ctnt || f.tmpl(a, f), f.key = ++w, (y.length ? u: t)[w] = f),
        f
    }
    function d(b, c, f) {
        var g, h = f ? a.map(f,
        function(a) {
            return "string" == typeof a ? b.key ? a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + r + '="' + b.key + '" $2') : a: d(a, b, a._ctnt)
        }) : b;
        return c ? h: (h = h.join(""), h.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
        function(b, c, d, f) {
            g = a(d).get(),
            j(g),
            c && (g = e(c).concat(g)),
            f && (g = g.concat(e(f)))
        }), g ? g: e(h))
    }
    function e(b) {
        var c = document.createElement("div");
        return c.innerHTML = b,
        a.makeArray(c.childNodes)
    }
    function f(b) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + a.trim(b).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
        function(b, c, d, e, f, g, i) {
            var j, k, l, m = a.tmpl.tag[d];
            if (!m) throw "Unknown template tag: " + d;
            return j = m._default || [],
            g && !/\w$/.test(f) && (f += g, g = ""),
            f ? (f = h(f), i = i ? "," + h(i) + ")": g ? ")": "", k = g ? f.indexOf(".") > -1 ? f + h(g) : "(" + f + ").call($item" + i: f, l = g ? k: "(typeof(" + f + ")==='function'?(" + f + ").call($item):(" + f + "))") : l = k = j.$1 || "null",
            e = h(e),
            "');" + m[c ? "close": "open"].split("$notnull_1").join(f ? "typeof(" + f + ")!=='undefined' && (" + f + ")!=null": "true").split("$1a").join(l).split("$1").join(k).split("$2").join(e || j.$2 || "") + "__.push('"
        }) + "');}return __;")
    }
    function g(b, c) {
        b._wrap = d(b, !0, a.isArray(c) ? c: [s.test(c) ? c: a(c).html()]).join("")
    }
    function h(a) {
        return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }
    function i(a) {
        var b = document.createElement("div");
        return b.appendChild(a.cloneNode(!0)),
        b.innerHTML
    }
    function j(b) {
        function d(b) {
            function d(a) {
                a += j,
                g = k[a] = k[a] || c(g, t[g.parent.key + j] || g.parent)
            }
            var e, f, g, h, i = b;
            if (h = b.getAttribute(r)) {
                for (; i.parentNode && 1 === (i = i.parentNode).nodeType && !(e = i.getAttribute(r)););
                e !== h && (i = i.parentNode ? 11 === i.nodeType ? 0 : i.getAttribute(r) || 0 : 0, (g = t[h]) || (g = u[h], g = c(g, t[i] || u[i]), g.key = ++w, t[w] = g), x && d(h)),
                b.removeAttribute(r)
            } else x && (g = a.data(b, "tmplItem")) && (d(g.key), t[g.key] = g, i = a.data(b.parentNode, "tmplItem"), i = i ? i.key: 0);
            if (g) {
                for (f = g; f && f.key != i;) f.nodes.push(b),
                f = f.parent;
                delete g._ctnt,
                delete g._wrap,
                a.data(b, "tmplItem", g)
            }
        }
        var e, f, g, h, i, j = "_" + x,
        k = {};
        for (g = 0, h = b.length; g < h; g++) if (1 === (e = b[g]).nodeType) {
            for (f = e.getElementsByTagName("*"), i = f.length - 1; i >= 0; i--) d(f[i]);
            d(e)
        }
    }
    function k(a, b, c, d) {
        return a ? void y.push({
            _: a,
            tmpl: b,
            item: this,
            data: c,
            options: d
        }) : y.pop()
    }
    function l(b, c, d) {
        return a.tmpl(a.template(b), c, d, this)
    }
    function m(b, c) {
        var d = b.options || {};
        return d.wrapped = c,
        a.tmpl(a.template(b.tmpl), b.data, d, b.item)
    }
    function n(b, c) {
        var d = this._wrap;
        return a.map(a(a.isArray(d) ? d.join("") : d).filter(b || "*"),
        function(a) {
            return c ? a.innerText || a.textContent: a.outerHTML || i(a)
        })
    }
    function o() {
        var b = this.nodes;
        a.tmpl(null, null, null, this).insertBefore(b[0]),
        a(b).remove()
    }
    var p, q = a.fn.domManip,
    r = "_tmplitem",
    s = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
    t = {},
    u = {},
    v = {
        key: 0,
        data: {}
    },
    w = 0,
    x = 0,
    y = [];
    a.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(b, c) {
        a.fn[b] = function(d) {
            var e, f, g, h, i = [],
            j = a(d),
            k = 1 === this.length && this[0].parentNode;
            if (p = t || {},
            k && 11 === k.nodeType && 1 === k.childNodes.length && 1 === j.length) j[c](this[0]),
            i = this;
            else {
                for (f = 0, g = j.length; f < g; f++) x = f,
                e = (f > 0 ? this.clone(!0) : this).get(),
                a(j[f])[c](e),
                i = i.concat(e);
                x = 0,
                i = this.pushStack(i, b, j.selector)
            }
            return h = p,
            p = null,
            a.tmpl.complete(h),
            i
        }
    }),
    a.fn.extend({
        tmpl: function(b, c, d) {
            return a.tmpl(this[0], b, c, d)
        },
        tmplItem: function() {
            return a.tmplItem(this[0])
        },
        template: function(b) {
            return a.template(b, this[0])
        },
        domManip: function(b, c, d, e) {
            if (b[0] && a.isArray(b[0])) {
                for (var f, g = a.makeArray(arguments), h = b[0], i = h.length, j = 0; j < i && !(f = a.data(h[j++], "tmplItem")););
                f && x && (g[2] = function(b) {
                    a.tmpl.afterManip(this, b, d)
                }),
                q.apply(this, g)
            } else q.apply(this, arguments);
            return x = 0,
            p || a.tmpl.complete(t),
            this
        }
    }),
    a.extend({
        tmpl: function(b, e, f, h) {
            var i, j = !h;
            if (j) h = v,
            b = a.template[b] || a.template(null, b),
            u = {};
            else if (!b) return b = h.tmpl,
            t[h.key] = h,
            h.nodes = [],
            h.wrapped && g(h, h.wrapped),
            a(d(h, null, h.tmpl(a, h)));
            return b ? ("function" == typeof e && (e = e.call(h || {})), f && f.wrapped && g(f, f.wrapped), i = a.isArray(e) ? a.map(e,
            function(a) {
                return a ? c(f, h, b, a) : null
            }) : [c(f, h, b, e)], j ? a(d(h, null, i)) : i) : []
        },
        tmplItem: function(b) {
            var c;
            for (b instanceof a && (b = b[0]); b && 1 === b.nodeType && !(c = a.data(b, "tmplItem")) && (b = b.parentNode););
            return c || v
        },
        template: function(b, c) {
            return c ? ("string" == typeof c ? c = f(c) : c instanceof a && (c = c[0] || {}), c.nodeType && (c = a.data(c, "tmpl") || a.data(c, "tmpl", f(c.innerHTML))), "string" == typeof b ? a.template[b] = c: c) : b ? "string" != typeof b ? a.template(null, b) : a.template[b] || a.template(null, s.test(b) ? b: a(b)) : null
        },
        encode: function(a) {
            return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    }),
    a.extend(a.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function(a) {
            t = {}
        },
        afterManip: function(b, c, d) {
            var e = 11 === c.nodeType ? a.makeArray(c.childNodes) : 1 === c.nodeType ? [c] : [];
            d.call(b, c),
            j(e),
            x++
        }
    })
} (jQuery),
!
function(a) {
    var b = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        ariaLive: !0,
        ariaHidden: !0,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        stopAutoOnClick: !1,
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: !1,
        onSliderLoad: function() {
            return ! 0
        },
        onSlideBefore: function() {
            return ! 0
        },
        onSlideAfter: function() {
            return ! 0
        },
        onSlideNext: function() {
            return ! 0
        },
        onSlidePrev: function() {
            return ! 0
        },
        onSliderResize: function() {
            return ! 0
        }
    };
    a.fn.bxSlider = function(c) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            a(this).bxSlider(c)
        }),
        this;
        var d = {},
        e = this,
        f = a(window).width(),
        g = a(window).height();
        if (!a(e).data("bxSlider")) {
            var h = function() {
                a(e).data("bxSlider") || (d.settings = a.extend({},
                b, c), d.settings.slideWidth = parseInt(d.settings.slideWidth), d.children = e.children(d.settings.slideSelector), d.children.length < d.settings.minSlides && (d.settings.minSlides = d.children.length), d.children.length < d.settings.maxSlides && (d.settings.maxSlides = d.children.length), d.settings.randomStart && (d.settings.startSlide = Math.floor(Math.random() * d.children.length)), d.active = {
                    index: d.settings.startSlide
                },
                d.carousel = d.settings.minSlides > 1 || d.settings.maxSlides > 1, d.carousel && (d.settings.preloadImages = "all"), d.minThreshold = d.settings.minSlides * d.settings.slideWidth + (d.settings.minSlides - 1) * d.settings.slideMargin, d.maxThreshold = d.settings.maxSlides * d.settings.slideWidth + (d.settings.maxSlides - 1) * d.settings.slideMargin, d.working = !1, d.controls = {},
                d.interval = null, d.animProp = "vertical" === d.settings.mode ? "top": "left", d.usingCSS = d.settings.useCSS && "fade" !== d.settings.mode &&
                function() {
                    for (var a = document.createElement("div"), b = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], c = 0; c < b.length; c++) if (void 0 !== a.style[b[c]]) return d.cssPrefix = b[c].replace("Perspective", "").toLowerCase(),
                    d.animProp = "-" + d.cssPrefix + "-transform",
                    !0;
                    return ! 1
                } (), "vertical" === d.settings.mode && (d.settings.maxSlides = d.settings.minSlides), e.data("origStyle", e.attr("style")), e.children(d.settings.slideSelector).each(function() {
                    a(this).data("origStyle", a(this).attr("style"))
                }), j())
            },
            j = function() {
                var b = d.children.eq(d.settings.startSlide);
                e.wrap('<div class="' + d.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'),
                d.viewport = e.parent(),
                d.settings.ariaLive && !d.settings.ticker && d.viewport.attr("aria-live", "polite"),
                d.loader = a('<div class="bx-loading" />'),
                d.viewport.prepend(d.loader),
                e.css({
                    width: "horizontal" === d.settings.mode ? 1e3 * d.children.length + 215 + "%": "auto",
                    position: "relative"
                }),
                d.usingCSS && d.settings.easing ? e.css("-" + d.cssPrefix + "-transition-timing-function", d.settings.easing) : d.settings.easing || (d.settings.easing = "swing"),
                d.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }),
                d.viewport.parent().css({
                    maxWidth: n()
                }),
                d.settings.pager || d.settings.controls || d.viewport.parent().css({
                    margin: "0 auto 0px"
                }),
                d.children.css({
                    "float": "horizontal" === d.settings.mode ? "left": "none",
                    listStyle: "none",
                    position: "relative"
                }),
                d.children.css("width", o()),
                "horizontal" === d.settings.mode && d.settings.slideMargin > 0 && d.children.css("marginRight", d.settings.slideMargin),
                "vertical" === d.settings.mode && d.settings.slideMargin > 0 && d.children.css("marginBottom", d.settings.slideMargin),
                "fade" === d.settings.mode && (d.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }), d.children.eq(d.settings.startSlide).css({
                    zIndex: d.settings.slideZIndex,
                    display: "block"
                })),
                d.controls.el = a('<div class="bx-controls" />'),
                d.settings.captions && y(),
                d.active.last = d.settings.startSlide === q() - 1,
                d.settings.video && e.fitVids(),
                ("all" === d.settings.preloadImages || d.settings.ticker) && (b = d.children),
                d.settings.ticker ? d.settings.pager = !1 : (d.settings.controls && w(), d.settings.auto && d.settings.autoControls && x(), d.settings.pager && v(), (d.settings.controls || d.settings.autoControls || d.settings.pager) && d.viewport.after(d.controls.el)),
                k(b, l)
            },
            k = function(b, c) {
                var d = b.find('img:not([src=""]), iframe').length,
                e = 0;
                return 0 === d ? void c() : void b.find('img:not([src=""]), iframe').each(function() {
                    a(this).one("load error",
                    function() {++e === d && c()
                    }).each(function() {
                        this.complete && a(this).load()
                    })
                })
            },
            l = function() {
                if (d.settings.infiniteLoop && "fade" !== d.settings.mode && !d.settings.ticker) {
                    var b = "vertical" === d.settings.mode ? d.settings.minSlides: d.settings.maxSlides,
                    c = d.children.slice(0, b).clone(!0).addClass("bx-clone"),
                    f = d.children.slice( - b).clone(!0).addClass("bx-clone");
                    d.settings.ariaHidden && (c.attr("aria-hidden", !0), f.attr("aria-hidden", !0)),
                    e.append(c).prepend(f)
                }
                d.loader.remove(),
                s(),
                "vertical" === d.settings.mode && (d.settings.adaptiveHeight = !0),
                d.viewport.height(m()),
                e.redrawSlider(),
                d.settings.onSliderLoad.call(e, d.active.index),
                d.initialized = !0,
                d.settings.responsive && a(window).bind("resize", S),
                d.settings.auto && d.settings.autoStart && (q() > 1 || d.settings.autoSlideForOnePage) && I(),
                d.settings.ticker && J(),
                d.settings.pager && E(d.settings.startSlide),
                d.settings.controls && H(),
                d.settings.touchEnabled && !d.settings.ticker && N(),
                d.settings.keyboardEnabled && !d.settings.ticker && a(document).keydown(M)
            },
            m = function() {
                var b = 0,
                c = a();
                if ("vertical" === d.settings.mode || d.settings.adaptiveHeight) if (d.carousel) {
                    var e = 1 === d.settings.moveSlides ? d.active.index: d.active.index * r();
                    for (c = d.children.eq(e), i = 1; i <= d.settings.maxSlides - 1; i++) c = e + i >= d.children.length ? c.add(d.children.eq(i - 1)) : c.add(d.children.eq(e + i))
                } else c = d.children.eq(d.active.index);
                else c = d.children;
                return "vertical" === d.settings.mode ? (c.each(function(c) {
                    b += a(this).outerHeight()
                }), d.settings.slideMargin > 0 && (b += d.settings.slideMargin * (d.settings.minSlides - 1))) : b = Math.max.apply(Math, c.map(function() {
                    return a(this).outerHeight(!1)
                }).get()),
                "border-box" === d.viewport.css("box-sizing") ? b += parseFloat(d.viewport.css("padding-top")) + parseFloat(d.viewport.css("padding-bottom")) + parseFloat(d.viewport.css("border-top-width")) + parseFloat(d.viewport.css("border-bottom-width")) : "padding-box" === d.viewport.css("box-sizing") && (b += parseFloat(d.viewport.css("padding-top")) + parseFloat(d.viewport.css("padding-bottom"))),
                b
            },
            n = function() {
                var a = "100%";
                return d.settings.slideWidth > 0 && (a = "horizontal" === d.settings.mode ? d.settings.maxSlides * d.settings.slideWidth + (d.settings.maxSlides - 1) * d.settings.slideMargin: d.settings.slideWidth),
                a
            },
            o = function() {
                var a = d.settings.slideWidth,
                b = d.viewport.width();
                if (0 === d.settings.slideWidth || d.settings.slideWidth > b && !d.carousel || "vertical" === d.settings.mode) a = b;
                else if (d.settings.maxSlides > 1 && "horizontal" === d.settings.mode) {
                    if (b > d.maxThreshold) return a;
                    b < d.minThreshold ? a = (b - d.settings.slideMargin * (d.settings.minSlides - 1)) / d.settings.minSlides: d.settings.shrinkItems && (a = Math.floor((b + d.settings.slideMargin) / Math.ceil((b + d.settings.slideMargin) / (a + d.settings.slideMargin)) - d.settings.slideMargin))
                }
                return a
            },
            p = function() {
                var a = 1,
                b = null;
                return "horizontal" === d.settings.mode && d.settings.slideWidth > 0 ? d.viewport.width() < d.minThreshold ? a = d.settings.minSlides: d.viewport.width() > d.maxThreshold ? a = d.settings.maxSlides: (b = d.children.first().width() + d.settings.slideMargin, a = Math.floor((d.viewport.width() + d.settings.slideMargin) / b)) : "vertical" === d.settings.mode && (a = d.settings.minSlides),
                a
            },
            q = function() {
                var a = 0,
                b = 0,
                c = 0;
                if (d.settings.moveSlides > 0) if (d.settings.infiniteLoop) a = Math.ceil(d.children.length / r());
                else for (; b < d.children.length;)++a,
                b = c + p(),
                c += d.settings.moveSlides <= p() ? d.settings.moveSlides: p();
                else a = Math.ceil(d.children.length / p());
                return a
            },
            r = function() {
                return d.settings.moveSlides > 0 && d.settings.moveSlides <= p() ? d.settings.moveSlides: p()
            },
            s = function() {
                var a, b, c;
                d.children.length > d.settings.maxSlides && d.active.last && !d.settings.infiniteLoop ? "horizontal" === d.settings.mode ? (b = d.children.last(), a = b.position(), t( - (a.left - (d.viewport.width() - b.outerWidth())), "reset", 0)) : "vertical" === d.settings.mode && (c = d.children.length - d.settings.minSlides, a = d.children.eq(c).position(), t( - a.top, "reset", 0)) : (a = d.children.eq(d.active.index * r()).position(), d.active.index === q() - 1 && (d.active.last = !0), void 0 !== a && ("horizontal" === d.settings.mode ? t( - a.left, "reset", 0) : "vertical" === d.settings.mode && t( - a.top, "reset", 0)))
            },
            t = function(b, c, f, g) {
                var h, i;
                d.usingCSS ? (i = "vertical" === d.settings.mode ? "translate3d(0, " + b + "px, 0)": "translate3d(" + b + "px, 0, 0)", e.css("-" + d.cssPrefix + "-transition-duration", f / 1e3 + "s"), "slide" === c ? (e.css(d.animProp, i), 0 !== f ? e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                function(b) {
                    a(b.target).is(e) && (e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), F())
                }) : F()) : "reset" === c ? e.css(d.animProp, i) : "ticker" === c && (e.css("-" + d.cssPrefix + "-transition-timing-function", "linear"), e.css(d.animProp, i), 0 !== f ? e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                function(b) {
                    a(b.target).is(e) && (e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), t(g.resetValue, "reset", 0), K())
                }) : (t(g.resetValue, "reset", 0), K()))) : (h = {},
                h[d.animProp] = b, "slide" === c ? e.animate(h, f, d.settings.easing,
                function() {
                    F()
                }) : "reset" === c ? e.css(d.animProp, b) : "ticker" === c && e.animate(h, f, "linear",
                function() {
                    t(g.resetValue, "reset", 0),
                    K()
                }))
            },
            u = function() {
                for (var b = "",
                c = "",
                e = q(), f = 0; e > f; f++) c = "",
                d.settings.buildPager && a.isFunction(d.settings.buildPager) || d.settings.pagerCustom ? (c = d.settings.buildPager(f), d.pagerEl.addClass("bx-custom-pager")) : (c = f + 1, d.pagerEl.addClass("bx-default-pager")),
                b += '<div class="bx-pager-item"><a href="" data-slide-index="' + f + '" class="bx-pager-link">' + c + "</a></div>";
                d.pagerEl.html(b)
            },
            v = function() {
                d.settings.pagerCustom ? d.pagerEl = a(d.settings.pagerCustom) : (d.pagerEl = a('<div class="bx-pager" />'), d.settings.pagerSelector ? a(d.settings.pagerSelector).html(d.pagerEl) : d.controls.el.addClass("bx-has-pager").append(d.pagerEl), u()),
                d.pagerEl.on("click touchend", "a", D)
            },
            w = function() {
                d.controls.next = a('<a class="bx-next" href="">' + d.settings.nextText + "</a>"),
                d.controls.prev = a('<a class="bx-prev" href="">' + d.settings.prevText + "</a>"),
                d.controls.next.bind("click touchend", z),
                d.controls.prev.bind("click touchend", A),
                d.settings.nextSelector && a(d.settings.nextSelector).append(d.controls.next),
                d.settings.prevSelector && a(d.settings.prevSelector).append(d.controls.prev),
                d.settings.nextSelector || d.settings.prevSelector || (d.controls.directionEl = a('<div class="bx-controls-direction" />'), d.controls.directionEl.append(d.controls.prev).append(d.controls.next), d.controls.el.addClass("bx-has-controls-direction").append(d.controls.directionEl))
            },
            x = function() {
                d.controls.start = a('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + d.settings.startText + "</a></div>"),
                d.controls.stop = a('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + d.settings.stopText + "</a></div>"),
                d.controls.autoEl = a('<div class="bx-controls-auto" />'),
                d.controls.autoEl.on("click", ".bx-start", B),
                d.controls.autoEl.on("click", ".bx-stop", C),
                d.settings.autoControlsCombine ? d.controls.autoEl.append(d.controls.start) : d.controls.autoEl.append(d.controls.start).append(d.controls.stop),
                d.settings.autoControlsSelector ? a(d.settings.autoControlsSelector).html(d.controls.autoEl) : d.controls.el.addClass("bx-has-controls-auto").append(d.controls.autoEl),
                G(d.settings.autoStart ? "stop": "start")
            },
            y = function() {
                d.children.each(function(b) {
                    var c = a(this).find("img:first").attr("title");
                    void 0 !== c && ("" + c).length && a(this).append('<div class="bx-caption"><span>' + c + "</span></div>")
                })
            },
            z = function(a) {
                a.preventDefault(),
                d.controls.el.hasClass("disabled") || (d.settings.auto && d.settings.stopAutoOnClick && e.stopAuto(), e.goToNextSlide())
            },
            A = function(a) {
                a.preventDefault(),
                d.controls.el.hasClass("disabled") || (d.settings.auto && d.settings.stopAutoOnClick && e.stopAuto(), e.goToPrevSlide())
            },
            B = function(a) {
                e.startAuto(),
                a.preventDefault()
            },
            C = function(a) {
                e.stopAuto(),
                a.preventDefault()
            },
            D = function(b) {
                var c, f;
                b.preventDefault(),
                d.controls.el.hasClass("disabled") || (d.settings.auto && d.settings.stopAutoOnClick && e.stopAuto(), c = a(b.currentTarget), void 0 !== c.attr("data-slide-index") && (f = parseInt(c.attr("data-slide-index")), f !== d.active.index && e.goToSlide(f)))
            },
            E = function(b) {
                var c = d.children.length;
                return "short" === d.settings.pagerType ? (d.settings.maxSlides > 1 && (c = Math.ceil(d.children.length / d.settings.maxSlides)), void d.pagerEl.html(b + 1 + d.settings.pagerShortSeparator + c)) : (d.pagerEl.find("a").removeClass("active"), void d.pagerEl.each(function(c, d) {
                    a(d).find("a").eq(b).addClass("active")
                }))
            },
            F = function() {
                if (d.settings.infiniteLoop) {
                    var a = "";
                    0 === d.active.index ? a = d.children.eq(0).position() : d.active.index === q() - 1 && d.carousel ? a = d.children.eq((q() - 1) * r()).position() : d.active.index === d.children.length - 1 && (a = d.children.eq(d.children.length - 1).position()),
                    a && ("horizontal" === d.settings.mode ? t( - a.left, "reset", 0) : "vertical" === d.settings.mode && t( - a.top, "reset", 0))
                }
                d.working = !1,
                d.settings.onSlideAfter.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index)
            },
            G = function(a) {
                d.settings.autoControlsCombine ? d.controls.autoEl.html(d.controls[a]) : (d.controls.autoEl.find("a").removeClass("active"), d.controls.autoEl.find("a:not(.bx-" + a + ")").addClass("active"))
            },
            H = function() {
                1 === q() ? (d.controls.prev.addClass("disabled"), d.controls.next.addClass("disabled")) : !d.settings.infiniteLoop && d.settings.hideControlOnEnd && (0 === d.active.index ? (d.controls.prev.addClass("disabled"), d.controls.next.removeClass("disabled")) : d.active.index === q() - 1 ? (d.controls.next.addClass("disabled"), d.controls.prev.removeClass("disabled")) : (d.controls.prev.removeClass("disabled"), d.controls.next.removeClass("disabled")))
            },
            I = function() {
                d.settings.autoDelay > 0 ? setTimeout(e.startAuto, d.settings.autoDelay) : (e.startAuto(), a(window).focus(function() {
                    e.startAuto()
                }).blur(function() {
                    e.stopAuto()
                })),
                d.settings.autoHover && e.hover(function() {
                    d.interval && (e.stopAuto(!0), d.autoPaused = !0)
                },
                function() {
                    d.autoPaused && (e.startAuto(!0), d.autoPaused = null)
                })
            },
            J = function() {
                var b, c, f, g, h, i, j, k, l = 0;
                "next" === d.settings.autoDirection ? e.append(d.children.clone().addClass("bx-clone")) : (e.prepend(d.children.clone().addClass("bx-clone")), b = d.children.first().position(), l = "horizontal" === d.settings.mode ? -b.left: -b.top),
                t(l, "reset", 0),
                d.settings.pager = !1,
                d.settings.controls = !1,
                d.settings.autoControls = !1,
                d.settings.tickerHover && (d.usingCSS ? (g = "horizontal" === d.settings.mode ? 4 : 5, d.viewport.hover(function() {
                    c = e.css("-" + d.cssPrefix + "-transform"),
                    f = parseFloat(c.split(",")[g]),
                    t(f, "reset", 0)
                },
                function() {
                    k = 0,
                    d.children.each(function(b) {
                        k += "horizontal" === d.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0)
                    }),
                    h = d.settings.speed / k,
                    i = "horizontal" === d.settings.mode ? "left": "top",
                    j = h * (k - Math.abs(parseInt(f))),
                    K(j)
                })) : d.viewport.hover(function() {
                    e.stop()
                },
                function() {
                    k = 0,
                    d.children.each(function(b) {
                        k += "horizontal" === d.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0);
                    }),
                    h = d.settings.speed / k,
                    i = "horizontal" === d.settings.mode ? "left": "top",
                    j = h * (k - Math.abs(parseInt(e.css(i)))),
                    K(j)
                })),
                K()
            },
            K = function(a) {
                var b, c, f, g = a ? a: d.settings.speed,
                h = {
                    left: 0,
                    top: 0
                },
                i = {
                    left: 0,
                    top: 0
                };
                "next" === d.settings.autoDirection ? h = e.find(".bx-clone").first().position() : i = d.children.first().position(),
                b = "horizontal" === d.settings.mode ? -h.left: -h.top,
                c = "horizontal" === d.settings.mode ? -i.left: -i.top,
                f = {
                    resetValue: c
                },
                t(b, "ticker", g, f)
            },
            L = function(b) {
                var c = a(window),
                d = {
                    top: c.scrollTop(),
                    left: c.scrollLeft()
                },
                e = b.offset();
                return d.right = d.left + c.width(),
                d.bottom = d.top + c.height(),
                e.right = e.left + b.outerWidth(),
                e.bottom = e.top + b.outerHeight(),
                !(d.right < e.left || d.left > e.right || d.bottom < e.top || d.top > e.bottom)
            },
            M = function(a) {
                var b = document.activeElement.tagName.toLowerCase(),
                c = "input|textarea",
                d = new RegExp(b, ["i"]),
                f = d.exec(c);
                if (null == f && L(e)) {
                    if (39 === a.keyCode) return z(a),
                    !1;
                    if (37 === a.keyCode) return A(a),
                    !1
                }
            },
            N = function() {
                d.touch = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                },
                d.viewport.bind("touchstart MSPointerDown pointerdown", O),
                d.viewport.on("click", ".bxslider a",
                function(a) {
                    d.viewport.hasClass("click-disabled") && (a.preventDefault(), d.viewport.removeClass("click-disabled"))
                })
            },
            O = function(a) {
                if (d.controls.el.addClass("disabled"), d.working) a.preventDefault(),
                d.controls.el.removeClass("disabled");
                else {
                    d.touch.originalPos = e.position();
                    var b = a.originalEvent,
                    c = "undefined" != typeof b.changedTouches ? b.changedTouches: [b];
                    d.touch.start.x = c[0].pageX,
                    d.touch.start.y = c[0].pageY,
                    d.viewport.get(0).setPointerCapture && (d.pointerId = b.pointerId, d.viewport.get(0).setPointerCapture(d.pointerId)),
                    d.viewport.bind("touchmove MSPointerMove pointermove", Q),
                    d.viewport.bind("touchend MSPointerUp pointerup", R),
                    d.viewport.bind("MSPointerCancel pointercancel", P)
                }
            },
            P = function(a) {
                t(d.touch.originalPos.left, "reset", 0),
                d.controls.el.removeClass("disabled"),
                d.viewport.unbind("MSPointerCancel pointercancel", P),
                d.viewport.unbind("touchmove MSPointerMove pointermove", Q),
                d.viewport.unbind("touchend MSPointerUp pointerup", R),
                d.viewport.get(0).releasePointerCapture && d.viewport.get(0).releasePointerCapture(d.pointerId)
            },
            Q = function(a) {
                var b = a.originalEvent,
                c = "undefined" != typeof b.changedTouches ? b.changedTouches: [b],
                e = Math.abs(c[0].pageX - d.touch.start.x),
                f = Math.abs(c[0].pageY - d.touch.start.y),
                g = 0,
                h = 0;
                3 * e > f && d.settings.preventDefaultSwipeX ? a.preventDefault() : 3 * f > e && d.settings.preventDefaultSwipeY && a.preventDefault(),
                "fade" !== d.settings.mode && d.settings.oneToOneTouch && ("horizontal" === d.settings.mode ? (h = c[0].pageX - d.touch.start.x, g = d.touch.originalPos.left + h) : (h = c[0].pageY - d.touch.start.y, g = d.touch.originalPos.top + h), t(g, "reset", 0))
            },
            R = function(a) {
                d.viewport.unbind("touchmove MSPointerMove pointermove", Q),
                d.controls.el.removeClass("disabled");
                var b = a.originalEvent,
                c = "undefined" != typeof b.changedTouches ? b.changedTouches: [b],
                f = 0,
                g = 0;
                d.touch.end.x = c[0].pageX,
                d.touch.end.y = c[0].pageY,
                "fade" === d.settings.mode ? (g = Math.abs(d.touch.start.x - d.touch.end.x), g >= d.settings.swipeThreshold && (d.touch.start.x > d.touch.end.x ? e.goToNextSlide() : e.goToPrevSlide(), e.stopAuto())) : ("horizontal" === d.settings.mode ? (g = d.touch.end.x - d.touch.start.x, f = d.touch.originalPos.left) : (g = d.touch.end.y - d.touch.start.y, f = d.touch.originalPos.top), !d.settings.infiniteLoop && (0 === d.active.index && g > 0 || d.active.last && 0 > g) ? t(f, "reset", 200) : Math.abs(g) >= d.settings.swipeThreshold ? (0 > g ? e.goToNextSlide() : e.goToPrevSlide(), e.stopAuto()) : t(f, "reset", 200)),
                d.viewport.unbind("touchend MSPointerUp pointerup", R),
                d.viewport.get(0).releasePointerCapture && d.viewport.get(0).releasePointerCapture(d.pointerId)
            },
            S = function(b) {
                if (d.initialized) if (d.working) window.setTimeout(S, 10);
                else {
                    var c = a(window).width(),
                    h = a(window).height(); (f !== c || g !== h) && (f = c, g = h, e.redrawSlider(), d.settings.onSliderResize.call(e, d.active.index))
                }
            },
            T = function(a) {
                var b = p();
                d.settings.ariaHidden && !d.settings.ticker && (d.children.attr("aria-hidden", "true"), d.children.slice(a, a + b).attr("aria-hidden", "false"))
            },
            U = function(a) {
                return 0 > a ? d.settings.infiniteLoop ? q() - 1 : d.active.index: a >= q() ? d.settings.infiniteLoop ? 0 : d.active.index: a
            };
            return e.goToSlide = function(b, c) {
                var f, g, h, i, j = !0,
                k = 0,
                l = {
                    left: 0,
                    top: 0
                },
                n = null;
                if (d.oldIndex = d.active.index, d.active.index = U(b), !d.working && d.active.index !== d.oldIndex) {
                    if (d.working = !0, j = d.settings.onSlideBefore.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index), "undefined" != typeof j && !j) return d.active.index = d.oldIndex,
                    void(d.working = !1);
                    "next" === c ? d.settings.onSlideNext.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index) || (j = !1) : "prev" === c && (d.settings.onSlidePrev.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index) || (j = !1)),
                    d.active.last = d.active.index >= q() - 1,
                    (d.settings.pager || d.settings.pagerCustom) && E(d.active.index),
                    d.settings.controls && H(),
                    "fade" === d.settings.mode ? (d.settings.adaptiveHeight && d.viewport.height() !== m() && d.viewport.animate({
                        height: m()
                    },
                    d.settings.adaptiveHeightSpeed), d.children.filter(":visible").fadeOut(d.settings.speed).css({
                        zIndex: 0
                    }), d.children.eq(d.active.index).css("zIndex", d.settings.slideZIndex + 1).fadeIn(d.settings.speed,
                    function() {
                        a(this).css("zIndex", d.settings.slideZIndex),
                        F()
                    })) : (d.settings.adaptiveHeight && d.viewport.height() !== m() && d.viewport.animate({
                        height: m()
                    },
                    d.settings.adaptiveHeightSpeed), !d.settings.infiniteLoop && d.carousel && d.active.last ? "horizontal" === d.settings.mode ? (n = d.children.eq(d.children.length - 1), l = n.position(), k = d.viewport.width() - n.outerWidth()) : (f = d.children.length - d.settings.minSlides, l = d.children.eq(f).position()) : d.carousel && d.active.last && "prev" === c ? (g = 1 === d.settings.moveSlides ? d.settings.maxSlides - r() : (q() - 1) * r() - (d.children.length - d.settings.maxSlides), n = e.children(".bx-clone").eq(g), l = n.position()) : "next" === c && 0 === d.active.index ? (l = e.find("> .bx-clone").eq(d.settings.maxSlides).position(), d.active.last = !1) : b >= 0 && (i = b * parseInt(r()), l = d.children.eq(i).position()), "undefined" != typeof l ? (h = "horizontal" === d.settings.mode ? -(l.left - k) : -l.top, t(h, "slide", d.settings.speed)) : d.working = !1),
                    d.settings.ariaHidden && T(d.active.index * r())
                }
            },
            e.goToNextSlide = function() {
                if (d.settings.infiniteLoop || !d.active.last) {
                    var a = parseInt(d.active.index) + 1;
                    e.goToSlide(a, "next")
                }
            },
            e.goToPrevSlide = function() {
                if (d.settings.infiniteLoop || 0 !== d.active.index) {
                    var a = parseInt(d.active.index) - 1;
                    e.goToSlide(a, "prev")
                }
            },
            e.startAuto = function(a) {
                d.interval || (d.interval = setInterval(function() {
                    "next" === d.settings.autoDirection ? e.goToNextSlide() : e.goToPrevSlide()
                },
                d.settings.pause), d.settings.autoControls && a !== !0 && G("stop"))
            },
            e.stopAuto = function(a) {
                d.interval && (clearInterval(d.interval), d.interval = null, d.settings.autoControls && a !== !0 && G("start"))
            },
            e.getCurrentSlide = function() {
                return d.active.index
            },
            e.getCurrentSlideElement = function() {
                return d.children.eq(d.active.index)
            },
            e.getSlideElement = function(a) {
                return d.children.eq(a)
            },
            e.getSlideCount = function() {
                return d.children.length
            },
            e.isWorking = function() {
                return d.working
            },
            e.redrawSlider = function() {
                d.children.add(e.find(".bx-clone")).outerWidth(o()),
                d.viewport.css("height", m()),
                d.settings.ticker || s(),
                d.active.last && (d.active.index = q() - 1),
                d.active.index >= q() && (d.active.last = !0),
                d.settings.pager && !d.settings.pagerCustom && (u(), E(d.active.index)),
                d.settings.ariaHidden && T(d.active.index * r())
            },
            e.destroySlider = function() {
                d.initialized && (d.initialized = !1, a(".bx-clone", this).remove(), d.children.each(function() {
                    void 0 !== a(this).data("origStyle") ? a(this).attr("style", a(this).data("origStyle")) : a(this).removeAttr("style")
                }), void 0 !== a(this).data("origStyle") ? this.attr("style", a(this).data("origStyle")) : a(this).removeAttr("style"), a(this).unwrap().unwrap(), d.controls.el && d.controls.el.remove(), d.controls.next && d.controls.next.remove(), d.controls.prev && d.controls.prev.remove(), d.pagerEl && d.settings.controls && !d.settings.pagerCustom && d.pagerEl.remove(), a(".bx-caption", this).remove(), d.controls.autoEl && d.controls.autoEl.remove(), clearInterval(d.interval), d.settings.responsive && a(window).unbind("resize", S), d.settings.keyboardEnabled && a(document).unbind("keydown", M), a(this).removeData("bxSlider"))
            },
            e.reloadSlider = function(b) {
                void 0 !== b && (c = b),
                e.destroySlider(),
                h(),
                a(e).data("bxSlider", this)
            },
            h(),
            a(e).data("bxSlider", this),
            this
        }
    }
} (jQuery),
!
function(a) {
    a.fn.transitionEnd = function(a) {
        function b(f) {
            if (f.target === this) for (a.call(this, f), c = 0; c < d.length; c++) e.off(d[c], b)
        }
        var c, d = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        e = this;
        if (a) for (c = 0; c < d.length; c++) e.on(d[c], b);
        return this
    },
    a.support = function() {
        var a = {
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
        return a
    } (),
    a.touchEvents = {
        start: a.support.touch ? "touchstart": "mousedown",
        move: a.support.touch ? "touchmove": "mousemove",
        end: a.support.touch ? "touchend": "mouseup"
    },
    a.getTouchPosition = function(a) {
        return a = a.originalEvent || a,
        "touchstart" === a.type || "touchmove" === a.type || "touchend" === a.type ? {
            x: a.targetTouches[0].pageX,
            y: a.targetTouches[0].pageY
        }: {
            x: a.pageX,
            y: a.pageY
        }
    },
    a.fn.scrollHeight = function() {
        return this[0].scrollHeight
    },
    a.fn.transform = function(a) {
        for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = a
        }
        return this
    },
    a.fn.transition = function(a) {
        "string" != typeof a && (a += "ms");
        for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = a
        }
        return this
    },
    a.getTranslate = function(a, b) {
        var c, d, e, f;
        return "undefined" == typeof b && (b = "x"),
        e = window.getComputedStyle(a, null),
        window.WebKitCSSMatrix ? f = new WebKitCSSMatrix("none" === e.webkitTransform ? "": e.webkitTransform) : (f = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), c = f.toString().split(",")),
        "x" === b && (d = window.WebKitCSSMatrix ? f.m41: 16 === c.length ? parseFloat(c[12]) : parseFloat(c[4])),
        "y" === b && (d = window.WebKitCSSMatrix ? f.m42: 16 === c.length ? parseFloat(c[13]) : parseFloat(c[5])),
        d || 0
    },
    a.requestAnimationFrame = function(a) {
        return window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(a) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(a) : window.setTimeout(a, 1e3 / 60)
    },
    a.cancelAnimationFrame = function(a) {
        return window.cancelAnimationFrame ? window.cancelAnimationFrame(a) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(a) : window.mozCancelAnimationFrame ? window.mozCancelAnimationFrame(a) : window.clearTimeout(a)
    },
    a.fn.join = function(a) {
        return this.toArray().join(a)
    }
} ($),
+
function(a) {
    a.Template7 = a.t7 = function() {
        function a(a) {
            return "[object Array]" === Object.prototype.toString.apply(a)
        }
        function b(a) {
            return "function" == typeof a
        }
        function c(a) {
            var b, c, d, e = a.replace(/[{}#}]/g, "").split(" "),
            f = [];
            for (c = 0; c < e.length; c++) {
                var g = e[c];
                if (0 === c) f.push(g);
                else if (0 === g.indexOf('"')) if (2 === g.match(/"/g).length) f.push(g);
                else {
                    for (b = 0, d = c + 1; d < e.length; d++) if (g += " " + e[d], e[d].indexOf('"') >= 0) {
                        b = d,
                        f.push(g);
                        break
                    }
                    b && (c = b)
                } else if (g.indexOf("=") > 0) {
                    var h = g.split("="),
                    i = h[0],
                    j = h[1];
                    if (2 !== j.match(/"/g).length) {
                        for (b = 0, d = c + 1; d < e.length; d++) if (j += " " + e[d], e[d].indexOf('"') >= 0) {
                            b = d;
                            break
                        }
                        b && (c = b)
                    }
                    var k = [i, j.replace(/"/g, "")];
                    f.push(k)
                } else f.push(g)
            }
            return f
        }
        function d(b) {
            var d, e, f = [];
            if (!b) return [];
            var g = b.split(/({{[^{^}]*}})/);
            for (d = 0; d < g.length; d++) {
                var h = g[d];
                if ("" !== h) if (h.indexOf("{{") < 0) f.push({
                    type: "plain",
                    content: h
                });
                else {
                    if (h.indexOf("{/") >= 0) continue;
                    if (h.indexOf("{#") < 0 && h.indexOf(" ") < 0 && h.indexOf("else") < 0) {
                        f.push({
                            type: "variable",
                            contextName: h.replace(/[{}]/g, "")
                        });
                        continue
                    }
                    var i = c(h),
                    j = i[0],
                    k = [],
                    l = {};
                    for (e = 1; e < i.length; e++) {
                        var m = i[e];
                        a(m) ? l[m[0]] = "false" !== m[1] && m[1] : k.push(m)
                    }
                    if (h.indexOf("{#") >= 0) {
                        var n, o = "",
                        p = "",
                        q = 0,
                        r = !1,
                        s = !1,
                        t = 0;
                        for (e = d + 1; e < g.length; e++) if (g[e].indexOf("{{#") >= 0 && t++, g[e].indexOf("{{/") >= 0 && t--, g[e].indexOf("{{#" + j) >= 0) o += g[e],
                        s && (p += g[e]),
                        q++;
                        else if (g[e].indexOf("{{/" + j) >= 0) {
                            if (! (q > 0)) {
                                n = e,
                                r = !0;
                                break
                            }
                            q--,
                            o += g[e],
                            s && (p += g[e])
                        } else g[e].indexOf("else") >= 0 && 0 === t ? s = !0 : (s || (o += g[e]), s && (p += g[e]));
                        r && (n && (d = n), f.push({
                            type: "helper",
                            helperName: j,
                            contextName: k,
                            content: o,
                            inverseContent: p,
                            hash: l
                        }))
                    } else h.indexOf(" ") > 0 && f.push({
                        type: "helper",
                        helperName: j,
                        contextName: k,
                        hash: l
                    })
                }
            }
            return f
        }
        var e = function(a) {
            function b(a, b) {
                return a.content ? g(a.content, b) : function() {
                    return ""
                }
            }
            function c(a, b) {
                return a.inverseContent ? g(a.inverseContent, b) : function() {
                    return ""
                }
            }
            function e(a, b) {
                var c, d, e = 0;
                if (0 === a.indexOf("../")) {
                    e = a.split("../").length - 1;
                    var f = b.split("_")[1] - e;
                    b = "ctx_" + (f >= 1 ? f: 1),
                    d = a.split("../")[e].split(".")
                } else 0 === a.indexOf("@global") ? (b = "$.Template7.global", d = a.split("@global.")[1].split(".")) : 0 === a.indexOf("@root") ? (b = "ctx_1", d = a.split("@root.")[1].split(".")) : d = a.split(".");
                c = b;
                for (var g = 0; g < d.length; g++) {
                    var h = d[g];
                    0 === h.indexOf("@") ? g > 0 ? c += "[(data && data." + h.replace("@", "") + ")]": c = "(data && data." + a.replace("@", "") + ")": isFinite(h) ? c += "[" + h + "]": 0 === h.indexOf("this") ? c = h.replace("this", b) : c += "." + h
                }
                return c
            }
            function f(a, b) {
                for (var c = [], d = 0; d < a.length; d++) 0 === a[d].indexOf('"') ? c.push(a[d]) : c.push(e(a[d], b));
                return c.join(", ")
            }
            function g(a, g) {
                if (g = g || 1, a = a || h.template, "string" != typeof a) throw new Error("Template7: Template must be a string");
                var i = d(a);
                if (0 === i.length) return function() {
                    return ""
                };
                var j = "ctx_" + g,
                k = "(function (" + j + ", data) {\n";
                1 === g && (k += "function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n", k += "function isFunction(func){return (typeof func === 'function');}\n", k += 'function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'),
                k += "var r = '';\n";
                var l;
                for (l = 0; l < i.length; l++) {
                    var m = i[l];
                    if ("plain" !== m.type) {
                        var n, o;
                        if ("variable" === m.type && (n = e(m.contextName, j), k += "r += c(" + n + ", " + j + ");"), "helper" === m.type) if (m.helperName in h.helpers) o = f(m.contextName, j),
                        k += "r += ($.Template7.helpers." + m.helperName + ").call(" + j + ", " + (o && o + ", ") + "{hash:" + JSON.stringify(m.hash) + ", data: data || {}, fn: " + b(m, g + 1) + ", inverse: " + c(m, g + 1) + ", root: ctx_1});";
                        else {
                            if (m.contextName.length > 0) throw new Error('Template7: Missing helper: "' + m.helperName + '"');
                            n = e(m.helperName, j),
                            k += "if (" + n + ") {",
                            k += "if (isArray(" + n + ")) {",
                            k += "r += ($.Template7.helpers.each).call(" + j + ", " + n + ", {hash:" + JSON.stringify(m.hash) + ", data: data || {}, fn: " + b(m, g + 1) + ", inverse: " + c(m, g + 1) + ", root: ctx_1});",
                            k += "}else {",
                            k += "r += ($.Template7.helpers.with).call(" + j + ", " + n + ", {hash:" + JSON.stringify(m.hash) + ", data: data || {}, fn: " + b(m, g + 1) + ", inverse: " + c(m, g + 1) + ", root: ctx_1});",
                            k += "}}"
                        }
                    } else k += "r +='" + m.content.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/'/g, "\\'") + "';"
                }
                return k += "\nreturn r;})",
                eval.call(window, k)
            }
            var h = this;
            h.template = a,
            h.compile = function(a) {
                return h.compiled || (h.compiled = g(a)),
                h.compiled
            }
        };
        e.prototype = {
            options: {},
            helpers: {
                "if": function(a, c) {
                    return b(a) && (a = a.call(this)),
                    a ? c.fn(this, c.data) : c.inverse(this, c.data)
                },
                unless: function(a, c) {
                    return b(a) && (a = a.call(this)),
                    a ? c.inverse(this, c.data) : c.fn(this, c.data)
                },
                each: function(c, d) {
                    var e = "",
                    f = 0;
                    if (b(c) && (c = c.call(this)), a(c)) {
                        for (d.hash.reverse && (c = c.reverse()), f = 0; f < c.length; f++) e += d.fn(c[f], {
                            first: 0 === f,
                            last: f === c.length - 1,
                            index: f
                        });
                        d.hash.reverse && (c = c.reverse())
                    } else for (var g in c) f++,
                    e += d.fn(c[g], {
                        key: g
                    });
                    return f > 0 ? e: d.inverse(this)
                },
                "with": function(a, c) {
                    return b(a) && (a = a.call(this)),
                    c.fn(a)
                },
                join: function(a, c) {
                    return b(a) && (a = a.call(this)),
                    a.join(c.hash.delimiter || c.hash.delimeter)
                },
                js: function(a, b) {
                    var c;
                    return c = a.indexOf("return") >= 0 ? "(function(){" + a + "})": "(function(){return (" + a + ")})",
                    eval.call(this, c).call(this)
                },
                js_compare: function(a, b) {
                    var c;
                    c = a.indexOf("return") >= 0 ? "(function(){" + a + "})": "(function(){return (" + a + ")})";
                    var d = eval.call(this, c).call(this);
                    return d ? b.fn(this, b.data) : b.inverse(this, b.data)
                }
            }
        };
        var f = function(a, b) {
            if (2 === arguments.length) {
                var c = new e(a),
                d = c.compile()(b);
                return c = null,
                d
            }
            return new e(a)
        };
        return f.registerHelper = function(a, b) {
            e.prototype.helpers[a] = b
        },
        f.unregisterHelper = function(a) {
            e.prototype.helpers[a] = void 0,
            delete e.prototype.helpers[a]
        },
        f.compile = function(a, b) {
            var c = new e(a, b);
            return c.compile()
        },
        f.options = e.prototype.options,
        f.helpers = e.prototype.helpers,
        f
    } ()
} ($),
function(a, b, c, d) {
    function e(a, b, c) {
        return setTimeout(j(a, c), b)
    }
    function f(a, b, c) {
        return !! Array.isArray(a) && (g(a, c[b], c), !0)
    }
    function g(a, b, c) {
        var e;
        if (a) if (a.forEach) a.forEach(b, c);
        else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a),
        e++;
        else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }
    function h(b, c, d) {
        var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
        return function() {
            var c = new Error("get-stack-trace"),
            d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
            f = a.console && (a.console.warn || a.console.log);
            return f && f.call(a.console, e, d),
            b.apply(this, arguments)
        }
    }
    function i(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e),
        d.constructor = a,
        d._super = e,
        c && la(d, c)
    }
    function j(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }
    function k(a, b) {
        return typeof a == oa ? a.apply(b ? b[0] || d: d, b) : a
    }
    function l(a, b) {
        return a === d ? b: a
    }
    function m(a, b, c) {
        g(q(b),
        function(b) {
            a.addEventListener(b, c, !1)
        })
    }
    function n(a, b, c) {
        g(q(b),
        function(b) {
            a.removeEventListener(b, c, !1)
        })
    }
    function o(a, b) {
        for (; a;) {
            if (a == b) return ! 0;
            a = a.parentNode
        }
        return ! 1
    }
    function p(a, b) {
        return a.indexOf(b) > -1
    }
    function q(a) {
        return a.trim().split(/\s+/g)
    }
    function r(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);
        for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;
            d++
        }
        return - 1
    }
    function s(a) {
        return Array.prototype.slice.call(a, 0)
    }
    function t(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];
            r(e, g) < 0 && d.push(a[f]),
            e[f] = g,
            f++
        }
        return c && (d = b ? d.sort(function(a, c) {
            return a[b] > c[b]
        }) : d.sort()),
        d
    }
    function u(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
            if (c = ma[g], e = c ? c + f: b, e in a) return e;
            g++
        }
        return d
    }
    function v() {
        return ua++
    }
    function w(b) {
        var c = b.ownerDocument || b;
        return c.defaultView || c.parentWindow || a
    }
    function x(a, b) {
        var c = this;
        this.manager = a,
        this.callback = b,
        this.element = a.element,
        this.target = a.options.inputTarget,
        this.domHandler = function(b) {
            k(a.options.enable, [a]) && c.handler(b)
        },
        this.init()
    }
    function y(a) {
        var b, c = a.options.inputClass;
        return new(b = c ? c: xa ? M: ya ? P: wa ? R: L)(a, z)
    }
    function z(a, b, c) {
        var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & Ea && d - e === 0,
        g = b & (Ga | Ha) && d - e === 0;
        c.isFirst = !!f,
        c.isFinal = !!g,
        f && (a.session = {}),
        c.eventType = b,
        A(a, c),
        a.emit("hammer.input", c),
        a.recognize(c),
        a.session.prevInput = c
    }
    function A(a, b) {
        var c = a.session,
        d = b.pointers,
        e = d.length;
        c.firstInput || (c.firstInput = D(b)),
        e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center: f.center,
        i = b.center = E(d);
        b.timeStamp = ra(),
        b.deltaTime = b.timeStamp - f.timeStamp,
        b.angle = I(h, i),
        b.distance = H(h, i),
        B(c, b),
        b.offsetDirection = G(b.deltaX, b.deltaY);
        var j = F(b.deltaTime, b.deltaX, b.deltaY);
        b.overallVelocityX = j.x,
        b.overallVelocityY = j.y,
        b.overallVelocity = qa(j.x) > qa(j.y) ? j.x: j.y,
        b.scale = g ? K(g.pointers, d) : 1,
        b.rotation = g ? J(g.pointers, d) : 0,
        b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length: c.prevInput.maxPointers: b.pointers.length,
        C(c, b);
        var k = a.element;
        o(b.srcEvent.target, k) && (k = b.srcEvent.target),
        b.target = k
    }
    function B(a, b) {
        var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};
        b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        },
        d = a.offsetDelta = {
            x: c.x,
            y: c.y
        }),
        b.deltaX = e.x + (c.x - d.x),
        b.deltaY = e.y + (c.y - d.y)
    }
    function C(a, b) {
        var c, e, f, g, h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;
        if (b.eventType != Ha && (i > Da || h.velocity === d)) {
            var j = b.deltaX - h.deltaX,
            k = b.deltaY - h.deltaY,
            l = F(i, j, k);
            e = l.x,
            f = l.y,
            c = qa(l.x) > qa(l.y) ? l.x: l.y,
            g = G(j, k),
            a.lastInterval = b
        } else c = h.velocity,
        e = h.velocityX,
        f = h.velocityY,
        g = h.direction;
        b.velocity = c,
        b.velocityX = e,
        b.velocityY = f,
        b.direction = g
    }
    function D(a) {
        for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
            clientX: pa(a.pointers[c].clientX),
            clientY: pa(a.pointers[c].clientY)
        },
        c++;
        return {
            timeStamp: ra(),
            pointers: b,
            center: E(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        }
    }
    function E(a) {
        var b = a.length;
        if (1 === b) return {
            x: pa(a[0].clientX),
            y: pa(a[0].clientY)
        };
        for (var c = 0,
        d = 0,
        e = 0; b > e;) c += a[e].clientX,
        d += a[e].clientY,
        e++;
        return {
            x: pa(c / b),
            y: pa(d / b)
        }
    }
    function F(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        }
    }
    function G(a, b) {
        return a === b ? Ia: qa(a) >= qa(b) ? 0 > a ? Ja: Ka: 0 > b ? La: Ma
    }
    function H(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }
    function I(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }
    function J(a, b) {
        return I(b[1], b[0], Ra) + I(a[1], a[0], Ra)
    }
    function K(a, b) {
        return H(b[0], b[1], Ra) / H(a[0], a[1], Ra)
    }
    function L() {
        this.evEl = Ta,
        this.evWin = Ua,
        this.pressed = !1,
        x.apply(this, arguments)
    }
    function M() {
        this.evEl = Xa,
        this.evWin = Ya,
        x.apply(this, arguments),
        this.store = this.manager.session.pointerEvents = []
    }
    function N() {
        this.evTarget = $a,
        this.evWin = _a,
        this.started = !1,
        x.apply(this, arguments)
    }
    function O(a, b) {
        var c = s(a.touches),
        d = s(a.changedTouches);
        return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)),
        [c, d]
    }
    function P() {
        this.evTarget = bb,
        this.targetIds = {},
        x.apply(this, arguments)
    }
    function Q(a, b) {
        var c = s(a.touches),
        d = this.targetIds;
        if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0,
        [c, c];
        var e, f, g = s(a.changedTouches),
        h = [],
        i = this.target;
        if (f = c.filter(function(a) {
            return o(a.target, i)
        }), b === Ea) for (e = 0; e < f.length;) d[f[e].identifier] = !0,
        e++;
        for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]),
        b & (Ga | Ha) && delete d[g[e].identifier],
        e++;
        return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
    }
    function R() {
        x.apply(this, arguments);
        var a = j(this.handler, this);
        this.touch = new P(this.manager, a),
        this.mouse = new L(this.manager, a),
        this.primaryTouch = null,
        this.lastTouches = []
    }
    function S(a, b) {
        a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b)
    }
    function T(a) {
        var b = a.changedPointers[0];
        if (b.identifier === this.primaryTouch) {
            var c = {
                x: b.clientX,
                y: b.clientY
            };
            this.lastTouches.push(c);
            var d = this.lastTouches,
            e = function() {
                var a = d.indexOf(c);
                a > -1 && d.splice(a, 1)
            };
            setTimeout(e, cb)
        }
    }
    function U(a) {
        for (var b = a.srcEvent.clientX,
        c = a.srcEvent.clientY,
        d = 0; d < this.lastTouches.length; d++) {
            var e = this.lastTouches[d],
            f = Math.abs(b - e.x),
            g = Math.abs(c - e.y);
            if (db >= f && db >= g) return ! 0
        }
        return ! 1
    }
    function V(a, b) {
        this.manager = a,
        this.set(b)
    }
    function W(a) {
        if (p(a, jb)) return jb;
        var b = p(a, kb),
        c = p(a, lb);
        return b && c ? jb: b || c ? b ? kb: lb: p(a, ib) ? ib: hb
    }
    function X() {
        if (!fb) return ! 1;
        var b = {},
        c = a.CSS && a.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(d) {
            b[d] = !c || a.CSS.supports("touch-action", d)
        }),
        b
    }
    function Y(a) {
        this.options = la({},
        this.defaults, a || {}),
        this.id = v(),
        this.manager = null,
        this.options.enable = l(this.options.enable, !0),
        this.state = nb,
        this.simultaneous = {},
        this.requireFail = []
    }
    function Z(a) {
        return a & sb ? "cancel": a & qb ? "end": a & pb ? "move": a & ob ? "start": ""
    }
    function $(a) {
        return a == Ma ? "down": a == La ? "up": a == Ja ? "left": a == Ka ? "right": ""
    }
    function _(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a
    }
    function aa() {
        Y.apply(this, arguments)
    }
    function ba() {
        aa.apply(this, arguments),
        this.pX = null,
        this.pY = null
    }
    function ca() {
        aa.apply(this, arguments)
    }
    function da() {
        Y.apply(this, arguments),
        this._timer = null,
        this._input = null
    }
    function ea() {
        aa.apply(this, arguments)
    }
    function fa() {
        aa.apply(this, arguments)
    }
    function ga() {
        Y.apply(this, arguments),
        this.pTime = !1,
        this.pCenter = !1,
        this._timer = null,
        this._input = null,
        this.count = 0
    }
    function ha(a, b) {
        return b = b || {},
        b.recognizers = l(b.recognizers, ha.defaults.preset),
        new ia(a, b)
    }
    function ia(a, b) {
        this.options = la({},
        ha.defaults, b || {}),
        this.options.inputTarget = this.options.inputTarget || a,
        this.handlers = {},
        this.session = {},
        this.recognizers = [],
        this.oldCssProps = {},
        this.element = a,
        this.input = y(this),
        this.touchAction = new V(this, this.options.touchAction),
        ja(this, !0),
        g(this.options.recognizers,
        function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]),
            a[3] && b.requireFailure(a[3])
        },
        this)
    }
    function ja(a, b) {
        var c = a.element;
        if (c.style) {
            var d;
            g(a.options.cssProps,
            function(e, f) {
                d = u(c.style, f),
                b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || ""
            }),
            b || (a.oldCssProps = {})
        }
    }
    function ka(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0),
        d.gesture = c,
        c.target.dispatchEvent(d)
    }
    var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"],
    na = b.createElement("div"),
    oa = "function",
    pa = Math.round,
    qa = Math.abs,
    ra = Date.now;
    la = "function" != typeof Object.assign ?
    function(a) {
        if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
        for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var e = arguments[c];
            if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f])
        }
        return b
    }: Object.assign;
    var sa = h(function(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]),
        f++;
        return a
    },
    "extend", "Use `assign`."),
    ta = h(function(a, b) {
        return sa(a, b, !0)
    },
    "merge", "Use `assign`."),
    ua = 1,
    va = /mobile|tablet|ip(ad|hone|od)|android/i,
    wa = "ontouchstart" in a,
    xa = u(a, "PointerEvent") !== d,
    ya = wa && va.test(navigator.userAgent),
    za = "touch",
    Aa = "pen",
    Ba = "mouse",
    Ca = "kinect",
    Da = 25,
    Ea = 1,
    Fa = 2,
    Ga = 4,
    Ha = 8,
    Ia = 1,
    Ja = 2,
    Ka = 4,
    La = 8,
    Ma = 16,
    Na = Ja | Ka,
    Oa = La | Ma,
    Pa = Na | Oa,
    Qa = ["x", "y"],
    Ra = ["clientX", "clientY"];
    x.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && m(this.element, this.evEl, this.domHandler),
            this.evTarget && m(this.target, this.evTarget, this.domHandler),
            this.evWin && m(w(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && n(this.element, this.evEl, this.domHandler),
            this.evTarget && n(this.target, this.evTarget, this.domHandler),
            this.evWin && n(w(this.element), this.evWin, this.domHandler)
        }
    };
    var Sa = {
        mousedown: Ea,
        mousemove: Fa,
        mouseup: Ga
    },
    Ta = "mousedown",
    Ua = "mousemove mouseup";
    i(L, x, {
        handler: function(a) {
            var b = Sa[a.type];
            b & Ea && 0 === a.button && (this.pressed = !0),
            b & Fa && 1 !== a.which && (b = Ga),
            this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, {
                pointers: [a],
                changedPointers: [a],
                pointerType: Ba,
                srcEvent: a
            }))
        }
    });
    var Va = {
        pointerdown: Ea,
        pointermove: Fa,
        pointerup: Ga,
        pointercancel: Ha,
        pointerout: Ha
    },
    Wa = {
        2 : za,
        3 : Aa,
        4 : Ba,
        5 : Ca
    },
    Xa = "pointerdown",
    Ya = "pointermove pointerup pointercancel";
    a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"),
    i(M, x, {
        handler: function(a) {
            var b = this.store,
            c = !1,
            d = a.type.toLowerCase().replace("ms", ""),
            e = Va[d],
            f = Wa[a.pointerType] || a.pointerType,
            g = f == za,
            h = r(b, a.pointerId, "pointerId");
            e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0),
            0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1))
        }
    });
    var Za = {
        touchstart: Ea,
        touchmove: Fa,
        touchend: Ga,
        touchcancel: Ha
    },
    $a = "touchstart",
    _a = "touchstart touchmove touchend touchcancel";
    i(N, x, {
        handler: function(a) {
            var b = Za[a.type];
            if (b === Ea && (this.started = !0), this.started) {
                var c = O.call(this, a, b);
                b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1),
                this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: za,
                    srcEvent: a
                })
            }
        }
    });
    var ab = {
        touchstart: Ea,
        touchmove: Fa,
        touchend: Ga,
        touchcancel: Ha
    },
    bb = "touchstart touchmove touchend touchcancel";
    i(P, x, {
        handler: function(a) {
            var b = ab[a.type],
            c = Q.call(this, a, b);
            c && this.callback(this.manager, b, {
                pointers: c[0],
                changedPointers: c[1],
                pointerType: za,
                srcEvent: a
            })
        }
    });
    var cb = 2500,
    db = 25;
    i(R, x, {
        handler: function(a, b, c) {
            var d = c.pointerType == za,
            e = c.pointerType == Ba;
            if (! (e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                if (d) S.call(this, b, c);
                else if (e && U.call(this, c)) return;
                this.callback(a, b, c)
            }
        },
        destroy: function() {
            this.touch.destroy(),
            this.mouse.destroy()
        }
    });
    var eb = u(na.style, "touchAction"),
    fb = eb !== d,
    gb = "compute",
    hb = "auto",
    ib = "manipulation",
    jb = "none",
    kb = "pan-x",
    lb = "pan-y",
    mb = X();
    V.prototype = {
        set: function(a) {
            a == gb && (a = this.compute()),
            fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a),
            this.actions = a.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var a = [];
            return g(this.manager.recognizers,
            function(b) {
                k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
            }),
            W(a.join(" "))
        },
        preventDefaults: function(a) {
            var b = a.srcEvent,
            c = a.offsetDirection;
            if (this.manager.session.prevented) return void b.preventDefault();
            var d = this.actions,
            e = p(d, jb) && !mb[jb],
            f = p(d, lb) && !mb[lb],
            g = p(d, kb) && !mb[kb];
            if (e) {
                var h = 1 === a.pointers.length,
                i = a.distance < 2,
                j = a.deltaTime < 250;
                if (h && i && j) return
            }
            return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0,
            a.preventDefault()
        }
    };
    var nb = 1,
    ob = 2,
    pb = 4,
    qb = 8,
    rb = qb,
    sb = 16,
    tb = 32;
    Y.prototype = {
        defaults: {},
        set: function(a) {
            return la(this.options, a),
            this.manager && this.manager.touchAction.update(),
            this
        },
        recognizeWith: function(a) {
            if (f(a, "recognizeWith", this)) return this;
            var b = this.simultaneous;
            return a = _(a, this),
            b[a.id] || (b[a.id] = a, a.recognizeWith(this)),
            this
        },
        dropRecognizeWith: function(a) {
            return f(a, "dropRecognizeWith", this) ? this: (a = _(a, this), delete this.simultaneous[a.id], this)
        },
        requireFailure: function(a) {
            if (f(a, "requireFailure", this)) return this;
            var b = this.requireFail;
            return a = _(a, this),
            -1 === r(b, a) && (b.push(a), a.requireFailure(this)),
            this
        },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this)) return this;
            a = _(a, this);
            var b = r(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1),
            this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(a) {
            return !! this.simultaneous[a.id]
        },
        emit: function(a) {
            function b(b) {
                c.manager.emit(b, a)
            }
            var c = this,
            d = this.state;
            qb > d && b(c.options.event + Z(d)),
            b(c.options.event),
            a.additionalEvent && b(a.additionalEvent),
            d >= qb && b(c.options.event + Z(d))
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void(this.state = tb)
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length;) {
                if (! (this.requireFail[a].state & (tb | nb))) return ! 1;
                a++
            }
            return ! 0
        },
        recognize: function(a) {
            var b = la({},
            a);
            return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void(this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void(this.state = tb))
        },
        process: function(a) {},
        getTouchAction: function() {},
        reset: function() {}
    },
    i(aa, Y, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b
        },
        process: function(a) {
            var b = this.state,
            c = a.eventType,
            d = b & (ob | pb),
            e = this.attrTest(a);
            return d && (c & Ha || !e) ? b | sb: d || e ? c & Ga ? b | qb: b & ob ? b | pb: ob: tb
        }
    }),
    i(ba, aa, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Pa
        },
        getTouchAction: function() {
            var a = this.options.direction,
            b = [];
            return a & Na && b.push(lb),
            a & Oa && b.push(kb),
            b
        },
        directionTest: function(a) {
            var b = this.options,
            c = !0,
            d = a.distance,
            e = a.direction,
            f = a.deltaX,
            g = a.deltaY;
            return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia: 0 > f ? Ja: Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia: 0 > g ? La: Ma, c = g != this.pY, d = Math.abs(a.deltaY))),
            a.direction = e,
            c && d > b.threshold && e & b.direction
        },
        attrTest: function(a) {
            return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a))
        },
        emit: function(a) {
            this.pX = a.deltaX,
            this.pY = a.deltaY;
            var b = $(a.direction);
            b && (a.additionalEvent = this.options.event + b),
            this._super.emit.call(this, a)
        }
    }),
    i(ca, aa, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [jb]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob)
        },
        emit: function(a) {
            if (1 !== a.scale) {
                var b = a.scale < 1 ? "in": "out";
                a.additionalEvent = this.options.event + b
            }
            this._super.emit.call(this, a)
        }
    }),
    i(da, Y, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [hb]
        },
        process: function(a) {
            var b = this.options,
            c = a.pointers.length === b.pointers,
            d = a.distance < b.threshold,
            f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();
            else if (a.eventType & Ea) this.reset(),
            this._timer = e(function() {
                this.state = rb,
                this.tryEmit()
            },
            b.time, this);
            else if (a.eventType & Ga) return rb;
            return tb
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(a) {
            this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)))
        }
    }),
    i(ea, aa, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [jb]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob)
        }
    }),
    i(fa, aa, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: Na | Oa,
            pointers: 1
        },
        getTouchAction: function() {
            return ba.prototype.getTouchAction.call(this)
        },
        attrTest: function(a) {
            var b, c = this.options.direction;
            return c & (Na | Oa) ? b = a.overallVelocity: c & Na ? b = a.overallVelocityX: c & Oa && (b = a.overallVelocityY),
            this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga
        },
        emit: function(a) {
            var b = $(a.offsetDirection);
            b && this.manager.emit(this.options.event + b, a),
            this.manager.emit(this.options.event, a)
        }
    }),
    i(ga, Y, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ib]
        },
        process: function(a) {
            var b = this.options,
            c = a.pointers.length === b.pointers,
            d = a.distance < b.threshold,
            f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ga) return this.failTimeout();
                var g = !this.pTime || a.timeStamp - this.pTime < b.interval,
                h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp,
                this.pCenter = a.center,
                h && g ? this.count += 1 : this.count = 1,
                this._input = a;
                var i = this.count % b.taps;
                if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                    this.state = rb,
                    this.tryEmit()
                },
                b.interval, this), ob) : rb
            }
            return tb
        },
        failTimeout: function() {
            return this._timer = e(function() {
                this.state = tb
            },
            this.options.interval, this),
            tb
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }),
    ha.VERSION = "2.0.8",
    ha.defaults = {
        domEvents: !1,
        touchAction: gb,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[ea, {
            enable: !1
        }], [ca, {
            enable: !1
        },
        ["rotate"]], [fa, {
            direction: Na
        }], [ba, {
            direction: Na
        },
        ["swipe"]], [ga], [ga, {
            event: "doubletap",
            taps: 2
        },
        ["tap"]], [da]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var ub = 1,
    vb = 2;
    ia.prototype = {
        set: function(a) {
            return la(this.options, a),
            a.touchAction && this.touchAction.update(),
            a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()),
            this
        },
        stop: function(a) {
            this.session.stopped = a ? vb: ub
        },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers,
                e = b.curRecognizer; (!e || e && e.state & rb) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length;) c = d[f],
                b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a),
                !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c),
                f++
            }
        },
        get: function(a) {
            if (a instanceof Y) return a;
            for (var b = this.recognizers,
            c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
            return null
        },
        add: function(a) {
            if (f(a, "add", this)) return this;
            var b = this.get(a.options.event);
            return b && this.remove(b),
            this.recognizers.push(a),
            a.manager = this,
            this.touchAction.update(),
            a
        },
        remove: function(a) {
            if (f(a, "remove", this)) return this;
            if (a = this.get(a)) {
                var b = this.recognizers,
                c = r(b, a); - 1 !== c && (b.splice(c, 1), this.touchAction.update())
            }
            return this
        },
        on: function(a, b) {
            if (a !== d && b !== d) {
                var c = this.handlers;
                return g(q(a),
                function(a) {
                    c[a] = c[a] || [],
                    c[a].push(b)
                }),
                this
            }
        },
        off: function(a, b) {
            if (a !== d) {
                var c = this.handlers;
                return g(q(a),
                function(a) {
                    b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
                }),
                this
            }
        },
        emit: function(a, b) {
            this.options.domEvents && ka(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length) {
                b.type = a,
                b.preventDefault = function() {
                    b.srcEvent.preventDefault()
                };
                for (var d = 0; d < c.length;) c[d](b),
                d++
            }
        },
        destroy: function() {
            this.element && ja(this, !1),
            this.handlers = {},
            this.session = {},
            this.input.destroy(),
            this.element = null
        }
    },
    la(ha, {
        INPUT_START: Ea,
        INPUT_MOVE: Fa,
        INPUT_END: Ga,
        INPUT_CANCEL: Ha,
        STATE_POSSIBLE: nb,
        STATE_BEGAN: ob,
        STATE_CHANGED: pb,
        STATE_ENDED: qb,
        STATE_RECOGNIZED: rb,
        STATE_CANCELLED: sb,
        STATE_FAILED: tb,
        DIRECTION_NONE: Ia,
        DIRECTION_LEFT: Ja,
        DIRECTION_RIGHT: Ka,
        DIRECTION_UP: La,
        DIRECTION_DOWN: Ma,
        DIRECTION_HORIZONTAL: Na,
        DIRECTION_VERTICAL: Oa,
        DIRECTION_ALL: Pa,
        Manager: ia,
        Input: x,
        TouchAction: V,
        TouchInput: P,
        MouseInput: L,
        PointerEventInput: M,
        TouchMouseInput: R,
        SingleTouchInput: N,
        Recognizer: Y,
        AttrRecognizer: aa,
        Tap: ga,
        Pan: ba,
        Swipe: fa,
        Pinch: ca,
        Rotate: ea,
        Press: da,
        on: m,
        off: n,
        each: g,
        merge: ta,
        extend: sa,
        assign: la,
        inherit: i,
        bindFn: j,
        prefixed: u
    });
    var wb = "undefined" != typeof a ? a: "undefined" != typeof self ? self: {};
    wb.Hammer = ha,
    "function" == typeof define && define.amd ? define(function() {
        return ha
    }) : "undefined" != typeof module && module.exports ? module.exports = ha: a[c] = ha
} (window, document, "Hammer"),
+
function(a) {
    var b;
    a.modal = function(c, d) {
        c = a.extend({},
        b, c);
        var e = c.buttons,
        f = e.map(function(a, b) {
            return '<a href="javascript:;" class="weui_btn_dialog ' + (a.className || "") + '">' + a.text + "</a>"
        }).join(""),
        g = '<div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">' + c.title + "</strong></div>" + (c.text ? '<div class="weui_dialog_bd">' + c.text + "</div>": "") + '<div class="weui_dialog_ft">' + f + "</div></div>",
        h = a.openModal(g, d);
        return h.find(".weui_btn_dialog").each(function(b, d) {
            var f = a(d);
            f.click(function() {
                c.autoClose && a.closeModal(),
                e[b].onClick && e[b].onClick.call(h)
            })
        }),
        h
    },
    a.openModal = function(b, c) {
        var d = a("<div class='weui_mask'></div>").appendTo(document.body);
        d.show();
        var e = a(b).appendTo(document.body);
        return c && e.transitionEnd(function() {
            c.call(e)
        }),
        e.show(),
        d.addClass("weui_mask_visible"),
        e.addClass("weui_dialog_visible"),
        e
    },
    a.closeModal = function() {
        a(".weui_mask_visible").removeClass("weui_mask_visible").transitionEnd(function() {
            a(this).remove()
        }),
        a(".weui_dialog_visible").removeClass("weui_dialog_visible").transitionEnd(function() {
            a(this).remove()
        })
    },
    a.alert = function(c, d, e) {
        var f;
        return "object" == typeof c ? f = c: ("function" == typeof d && (e = arguments[1], d = void 0), f = {
            text: c,
            title: d,
            onOK: e
        }),
        a.modal({
            text: f.text,
            title: f.title,
            buttons: [{
                text: b.buttonOK,
                className: "primary",
                onClick: f.onOK
            }]
        })
    },
    a.confirm = function(c, d, e, f) {
        var g;
        return "object" == typeof c ? g = c: ("function" == typeof d && (f = arguments[2], e = arguments[1], d = void 0), g = {
            text: c,
            title: d,
            onOK: e,
            onCancel: f
        }),
        a.modal({
            text: g.text,
            title: g.title,
            buttons: [{
                text: b.buttonCancel,
                className: "default",
                onClick: g.onCancel
            },
            {
                text: b.buttonOK,
                className: "primary",
                onClick: g.onOK
            }]
        })
    },
    a.prompt = function(c, d, e, f, g) {
        var h;
        "object" == typeof c ? h = c: ("function" == typeof d && (g = arguments[3], f = arguments[2], e = arguments[1], d = void 0), h = {
            text: c,
            title: d,
            input: g,
            onOK: e,
            onCancel: f,
            empty: !1
        });
        var i = a.modal({
            text: '<p class="weui-prompt-text">' + (h.text || "") + '</p><input type="text" class="weui_input weui-prompt-input" id="weui-prompt-input" value="' + (h.input || "") + '" />',
            title: h.title,
            autoClose: !1,
            buttons: [{
                text: b.buttonCancel,
                className: "default",
                onClick: function() {
                    a.closeModal(),
                    h.onCancel && h.onCancel.call(i)
                }
            },
            {
                text: b.buttonOK,
                className: "primary",
                onClick: function() {
                    var b = a("#weui-prompt-input").val();
                    return h.empty || "" !== b && null !== b ? (a.closeModal(), void(h.onOK && h.onOK.call(i, b))) : (i.find(".weui-prompt-input").focus()[0].select(), !1)
                }
            }]
        },
        function() {
            this.find(".weui-prompt-input").focus()[0].select()
        });
        return i
    },
    a.login = function(c, d, e, f, g, h) {
        var i;
        "object" == typeof c ? i = c: ("function" == typeof d && (h = arguments[4], g = arguments[3], f = arguments[2], e = arguments[1], d = void 0), i = {
            text: c,
            title: d,
            username: g,
            password: h,
            onOK: e,
            onCancel: f
        });
        var j = a.modal({
            text: '<p class="weui-prompt-text">' + (i.text || "") + '</p><input type="text" class="weui_input weui-prompt-input" id="weui-prompt-username" value="' + (i.username || "") + '" placeholder="输入用户名" /><input type="password" class="weui_input weui-prompt-input" id="weui-prompt-password" value="' + (i.password || "") + '" placeholder="输入密码" />',
            title: i.title,
            autoClose: !1,
            buttons: [{
                text: b.buttonCancel,
                className: "default",
                onClick: function() {
                    a.closeModal(),
                    i.onCancel && i.onCancel.call(j)
                }
            },
            {
                text: b.buttonOK,
                className: "primary",
                onClick: function() {
                    var b = a("#weui-prompt-username").val(),
                    c = a("#weui-prompt-password").val();
                    return i.empty || "" !== b && null !== b ? i.empty || "" !== c && null !== c ? (a.closeModal(), void(i.onOK && i.onOK.call(j, b, c))) : (j.find("#weui-prompt-password").focus()[0].select(), !1) : (j.find("#weui-prompt-username").focus()[0].select(), !1)
                }
            }]
        },
        function() {
            this.find("#weui-prompt-username").focus()[0].select()
        });
        return j
    },
    b = a.modal.prototype.defaults = {
        title: "提示",
        text: void 0,
        buttonOK: "确定",
        buttonCancel: "取消",
        buttons: [{
            text: "确定",
            className: "primary"
        }],
        autoClose: !0
    }
} ($),
+
function(a) {
    var b = function(b, c) {
        c = c || "";
        var d = (a("<div class='weui_mask_transparent'></div>").appendTo(document.body), '<div class="weui_toast ' + c + '">' + b + "</div>"),
        e = a(d).appendTo(document.body);
        e.show(),
        e.addClass("weui_toast_visible")
    },
    c = function(b) {
        a(".weui_mask_transparent").remove(),
        a(".weui_toast_visible").removeClass("weui_toast_visible").transitionEnd(function() {
            var c = a(this);
            c.remove(),
            b && b(c)
        })
    };
    a.toast = function(a, e, f) {
        "function" == typeof e && (f = e);
        var g;
        "cancel" == e ? g = "weui_toast_cancel": "forbidden" == e ? g = "weui_toast_forbidden": "text" == e && (g = "weui_toast_text"),
        b('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (a || "已经完成") + "</p>", g),
        setTimeout(function() {
            c(f)
        },
        d.duration)
    },
    a.showLoading = function(a) {
        for (var c = '<div class="weui_loading">',
        d = 0; 12 > d; d++) c += '<div class="weui_loading_leaf weui_loading_leaf_' + d + '"></div>';
        c += "</div>",
        c += '<p class="weui_toast_content">' + (a || "数据加载中") + "</p>",
        b(c, "weui_loading_toast")
    },
    a.hideLoading = function() {
        c()
    };
    var d = a.toast.prototype.defaults = {
        duration: 2e3
    }
} ($),
+
function(a) {
    var b, c = function(b) {
        var c = a("<div class='weui_mask weui_actions_mask'></div>").appendTo(document.body),
        d = b.actions || [],
        e = d.map(function(a, b) {
            return '<div class="weui_actionsheet_cell ' + (a.className || "") + '">' + a.text + "</div>"
        }).join(""),
        f = "";
        b.title && (f = '<div class="weui_actionsheet_title">' + b.title + "</div>");
        var g = '<div class="weui_actionsheet " id="weui_actionsheet">' + f + '<div class="weui_actionsheet_menu">' + e + '</div><div class="weui_actionsheet_action"><div class="weui_actionsheet_cell weui_actionsheet_cancel">取消</div></div></div>',
        h = a(g).appendTo(document.body);
        h.find(".weui_actionsheet_menu .weui_actionsheet_cell, .weui_actionsheet_action .weui_actionsheet_cell").each(function(c, e) {
            a(e).click(function() {
                a.closeActions(),
                b.onClose && b.onClose(),
                d[c] && d[c].onClick && d[c].onClick()
            })
        }),
        c.show(),
        h.show(),
        c.addClass("weui_mask_visible"),
        h.addClass("weui_actionsheet_toggle")
    },
    d = function() {
        a(".weui_mask").removeClass("weui_mask_visible").transitionEnd(function() {
            a(this).remove()
        }),
        a(".weui_actionsheet").removeClass("weui_actionsheet_toggle").transitionEnd(function() {
            a(this).remove()
        })
    };
    a.actions = function(d) {
        d = a.extend({},
        b, d),
        c(d)
    },
    a.closeActions = function() {
        d()
    },
    a(document).on("click", ".weui_actions_mask",
    function() {
        a.closeActions()
    });
    var b = a.actions.prototype.defaults = {
        title: void 0,
        onClose: void 0
    }
} ($),
+
function(a) {
    var b = function(b) {
        this.container = a(b),
        this.distance = 50,
        this.attachEvents()
    };
    b.prototype.touchStart = function(b) {
        if (!this.container.hasClass("refreshing")) {
            var c = a.getTouchPosition(b);
            this.start = c,
            this.diffX = this.diffY = 0
        }
    },
    b.prototype.touchMove = function(b) {
        if (!this.container.hasClass("refreshing")) {
            if (!this.start) return ! 1;
            if (! (this.container.scrollTop() > 0)) {
                var c = a.getTouchPosition(b);
                this.diffX = c.x - this.start.x,
                this.diffY = c.y - this.start.y,
                this.diffY < 0 || (this.container.addClass("touching"), b.preventDefault(), b.stopPropagation(), this.diffY = Math.pow(this.diffY, .8), this.container.css("transform", "translate3d(0, " + this.diffY + "px, 0)"), this.diffY < this.distance ? this.container.removeClass("pull-up").addClass("pull-down") : this.container.removeClass("pull-down").addClass("pull-up"))
            }
        }
    },
    b.prototype.touchEnd = function() {
        this.start = !1,
        this.diffY <= 0 || this.container.hasClass("refreshing") || (this.container.removeClass("touching"), this.container.removeClass("pull-down pull-up"), this.container.css("transform", ""), Math.abs(this.diffY) <= this.distance || (this.container.addClass("refreshing"), this.container.trigger("pull-to-refresh")))
    },
    b.prototype.attachEvents = function() {
        var b = this.container;
        b.addClass("weui-pull-to-refresh"),
        b.on(a.touchEvents.start, a.proxy(this.touchStart, this)),
        b.on(a.touchEvents.move, a.proxy(this.touchMove, this)),
        b.on(a.touchEvents.end, a.proxy(this.touchEnd, this))
    };
    var c = function(a) {
        new b(a)
    },
    d = function(b) {
        a(b).removeClass("refreshing")
    };
    a.fn.pullToRefresh = function() {
        return this.each(function() {
            c(this)
        })
    },
    a.fn.pullToRefreshDone = function() {
        return this.each(function() {
            d(this)
        })
    }
} ($),
+
function(a) {
    var b = function(b, c) {
        this.container = a(b),
        this.container.data("infinite", this),
        this.distance = c || 50,
        this.attachEvents()
    };
    b.prototype.scroll = function() {
        var b = this.container,
        c = b.scrollHeight() - (a(window).height() + b.scrollTop());
        c <= this.distance && b.trigger("infinite")
    },
    b.prototype.attachEvents = function(b) {
        var c = this.container,
        d = "BODY" === c[0].tagName.toUpperCase() ? a(document) : c;
        d[b ? "off": "on"]("scroll", a.proxy(this.scroll, this))
    },
    b.prototype.detachEvents = function(a) {
        this.attachEvents(!0)
    },
    a.fn.infinite = function(a) {
        return this.each(function() {
            new b(this, a)
        })
    },
    a.fn.destroyInfinite = function() {
        return this.each(function() {
            var b = a(this).data("infinite");
            b && b.detachEvents && b.detachEvents()
        })
    }
} ($),
+
function(a) {
    var b = "weui_bar_item_on",
    c = function(c) {
        var d = a(c);
        if (!d.hasClass(b)) {
            var e = d.attr("href");
            if (/^#/.test(e)) {
                d.parent().find("." + b).removeClass(b),
                d.addClass(b);
                var f = d.parents(".weui_tab").find(".weui_tab_bd");
                f.find(".weui_tab_bd_item_active").removeClass("weui_tab_bd_item_active"),
                a(e).addClass("weui_tab_bd_item_active")
            }
        }
    };
    a.showTab = c,
    a(document).on("click", ".weui_tabbar_item, .weui_navbar_item",
    function(d) {
        var e = a(d.currentTarget),
        f = e.attr("href");
        e.hasClass(b) || /^#/.test(f) && (d.preventDefault(), c(e))
    })
} ($),
+
function(a) {
    a(document).on("click", ".weui_search_bar label",
    function(b) {
        a(b.target).parents(".weui_search_bar").addClass("weui_search_focusing")
    }).on("blur", ".weui_search_input",
    function(b) {
        var c = a(b.target);
        c.val() || c.parents(".weui_search_bar").removeClass("weui_search_focusing")
    }).on("click", ".weui_search_cancel",
    function(b) {
        a(b.target).parents(".weui_search_bar").removeClass("weui_search_focusing").find(".weui_search_input").val("").blur()
    }).on("click", ".weui_icon_clear",
    function(b) {
        a(b.target).parents(".weui_search_bar").find(".weui_search_input").val("").focus()
    })
} ($),
function(a) {
    var b = {},
    c = navigator.userAgent,
    d = c.match(/(Android);?[\s\/]+([\d.]+)?/),
    e = c.match(/(iPad).*OS\s([\d_]+)/),
    f = c.match(/(iPod)(.*OS\s([\d_]+))?/),
    g = !e && c.match(/(iPhone\sOS)\s([\d_]+)/);
    if (b.ios = b.android = b.iphone = b.ipad = b.androidChrome = !1, d && (b.os = "android", b.osVersion = d[2], b.android = !0, b.androidChrome = c.toLowerCase().indexOf("chrome") >= 0), (e || g || f) && (b.os = "ios", b.ios = !0), g && !f && (b.osVersion = g[2].replace(/_/g, "."), b.iphone = !0), e && (b.osVersion = e[2].replace(/_/g, "."), b.ipad = !0), f && (b.osVersion = f[3] ? f[3].replace(/_/g, ".") : null, b.iphone = !0), b.ios && b.osVersion && c.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = c.toLowerCase().split("version/")[1].split(" ")[0]), b.webView = (g || e || f) && c.match(/.*AppleWebKit(?!.*Safari)/i), b.os && "ios" === b.os) {
        var h = b.osVersion.split(".");
        b.minimalUi = !b.webView && (f || g) && (1 * h[0] === 7 ? 1 * h[1] >= 1 : 1 * h[0] > 7) && a('meta[name="viewport"]').length > 0 && a('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
    }
    var i = a(window).width(),
    j = a(window).height();
    b.statusBar = !1,
    b.webView && i * j === screen.width * screen.height ? b.statusBar = !0 : b.statusBar = !1;
    var k = [];
    if (b.pixelRatio = window.devicePixelRatio || 1, k.push("pixel-ratio-" + Math.floor(b.pixelRatio)), b.pixelRatio >= 2 && k.push("retina"), b.os && (k.push(b.os, b.os + "-" + b.osVersion.split(".")[0], b.os + "-" + b.osVersion.replace(/\./g, "-")), "ios" === b.os)) for (var l = parseInt(b.osVersion.split(".")[0], 10), m = l - 1; m >= 6; m--) k.push("ios-gt-" + m);
    b.statusBar ? k.push("with-statusbar-overlay") : a("html").removeClass("with-statusbar-overlay"),
    k.length > 0 && a("html").addClass(k.join(" ")),
    a.device = b
} ($),
+
function(a) {
    var b = function(b) {
        function c() {
            var b = !1;
            return i.params.convertToPopover || i.params.onlyInPopover ? (!i.inline && i.params.input && (i.params.onlyInPopover ? b = !0 : a.device.ios ? b = !!a.device.ipad: a(window).width() >= 768 && (b = !0)), b) : b
        }
        function d() {
            return !! (i.opened && i.container && i.container.length > 0 && i.container.parents(".popover").length > 0)
        }
        function e() {
            if (i.opened) for (var a = 0; a < i.cols.length; a++) i.cols[a].divider || (i.cols[a].calcSize(), i.cols[a].setValue(i.cols[a].value, 0, !1))
        }
        function f(a) {
            if (a.preventDefault(), !i.opened && (i.open(), i.params.scrollToInput && !c())) {
                var b = i.input.parents(".content");
                if (0 === b.length) return;
                var d, e = parseInt(b.css("padding-top"), 10),
                f = parseInt(b.css("padding-bottom"), 10),
                g = b[0].offsetHeight - e - i.container.height(),
                h = b[0].scrollHeight - e - i.container.height(),
                j = i.input.offset().top - e + i.input[0].offsetHeight;
                if (j > g) {
                    var k = b.scrollTop() + j - g;
                    k + g > h && (d = k + g - h + f, g === h && (d = i.container.height()), b.css({
                        "padding-bottom": d + "px"
                    })),
                    b.scrollTop(k, 300)
                }
            }
        }
        function g(b) {
            d() || (i.input && i.input.length > 0 ? b.target !== i.input[0] && 0 === a(b.target).parents(".weui-picker-modal").length && i.close() : 0 === a(b.target).parents(".weui-picker-modal").length && i.close())
        }
        function h() {
            i.opened = !1,
            i.input && i.input.length > 0 && i.input.parents(".page-content").css({
                "padding-bottom": ""
            }),
            i.params.onClose && i.params.onClose(i),
            i.container.find(".picker-items-col").each(function() {
                i.destroyPickerCol(this)
            })
        }
        var i = this,
        j = {
            updateValuesOnMomentum: !1,
            updateValuesOnTouchmove: !0,
            rotateEffect: !1,
            momentumRatio: 7,
            freeMode: !1,
            scrollToInput: !0,
            inputReadOnly: !0,
            toolbar: !0,
            toolbarCloseText: "完成",
            title: "请选择",
            toolbarTemplate: '<div class="toolbar">          <div class="toolbar-inner">          <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>          <h1 class="title">{{title}}</h1>          </div>          </div>'
        };
        b = b || {};
        for (var k in j)"undefined" == typeof b[k] && (b[k] = j[k]);
        i.params = b,
        i.cols = [],
        i.initialized = !1,
        i.inline = !!i.params.container;
        var l = a.device.ios || navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0 && !a.device.android;
        return i.setValue = function(a, b) {
            for (var c = 0,
            d = 0; d < i.cols.length; d++) i.cols[d] && !i.cols[d].divider && (i.cols[d].setValue(a[c], b), c++)
        },
        i.updateValue = function() {
            for (var b = [], c = [], d = 0; d < i.cols.length; d++) i.cols[d].divider || (b.push(i.cols[d].value), c.push(i.cols[d].displayValue));
            b.indexOf(void 0) >= 0 || (i.value = b, i.displayValue = c, i.params.onChange && i.params.onChange(i, i.value, i.displayValue), i.input && i.input.length > 0 && (a(i.input).val(i.params.formatValue ? i.params.formatValue(i, i.value, i.displayValue) : i.value.join(" ")), a(i.input).trigger("change")))
        },
        i.initPickerCol = function(b, c) {
            function d() {
                s = a.requestAnimationFrame(function() {
                    m.updateItems(void 0, void 0, 0),
                    d()
                })
            }
            function e(b) {
                if (!u && !t) {
                    b.preventDefault(),
                    t = !0;
                    var c = a.getTouchPosition(b);
                    v = w = c.y,
                    x = (new Date).getTime(),
                    F = !0,
                    z = B = a.getTranslate(m.wrapper[0], "y")
                }
            }
            function f(b) {
                if (t) {
                    b.preventDefault(),
                    F = !1;
                    var c = a.getTouchPosition(b);
                    w = c.y,
                    u || (a.cancelAnimationFrame(s), u = !0, z = B = a.getTranslate(m.wrapper[0], "y"), m.wrapper.transition(0)),
                    b.preventDefault();
                    var d = w - v;
                    B = z + d,
                    A = void 0,
                    q > B && (B = q - Math.pow(q - B, .8), A = "min"),
                    B > r && (B = r + Math.pow(B - r, .8), A = "max"),
                    m.wrapper.transform("translate3d(0," + B + "px,0)"),
                    m.updateItems(void 0, B, 0, i.params.updateValuesOnTouchmove),
                    D = B - C || B,
                    E = (new Date).getTime(),
                    C = B
                }
            }
            function g(b) {
                if (!t || !u) return void(t = u = !1);
                t = u = !1,
                m.wrapper.transition(""),
                A && ("min" === A ? m.wrapper.transform("translate3d(0," + q + "px,0)") : m.wrapper.transform("translate3d(0," + r + "px,0)")),
                y = (new Date).getTime();
                var c, e;
                y - x > 300 ? e = B: (c = Math.abs(D / (y - E)), e = B + D * i.params.momentumRatio),
                e = Math.max(Math.min(e, r), q);
                var f = -Math.floor((e - r) / o);
                i.params.freeMode || (e = -f * o + r),
                m.wrapper.transform("translate3d(0," + parseInt(e, 10) + "px,0)"),
                m.updateItems(f, e, "", !0),
                i.params.updateValuesOnMomentum && (d(), m.wrapper.transitionEnd(function() {
                    a.cancelAnimationFrame(s)
                })),
                setTimeout(function() {
                    F = !0
                },
                100)
            }
            function h(b) {
                if (F) {
                    a.cancelAnimationFrame(s);
                    var c = a(this).attr("data-picker-value");
                    m.setValue(c)
                }
            }
            var j = a(b),
            k = j.index(),
            m = i.cols[k];
            if (!m.divider) {
                m.container = j,
                m.wrapper = m.container.find(".picker-items-col-wrapper"),
                m.items = m.wrapper.find(".picker-item");
                var n, o, p, q, r;
                m.replaceValues = function(a, b) {
                    m.destroyEvents(),
                    m.values = a,
                    m.displayValues = b;
                    var c = i.columnHTML(m, !0);
                    m.wrapper.html(c),
                    m.items = m.wrapper.find(".picker-item"),
                    m.calcSize(),
                    m.setValue(m.values[0], 0, !0),
                    m.initEvents()
                },
                m.calcSize = function() {
                    i.params.rotateEffect && (m.container.removeClass("picker-items-col-absolute"), m.width || m.container.css({
                        width: ""
                    }));
                    var b, c;
                    b = 0,
                    c = m.container[0].offsetHeight,
                    n = m.wrapper[0].offsetHeight,
                    o = m.items[0].offsetHeight,
                    p = o * m.items.length,
                    q = c / 2 - p + o / 2,
                    r = c / 2 - o / 2,
                    m.width && (b = m.width, parseInt(b, 10) === b && (b += "px"), m.container.css({
                        width: b
                    })),
                    i.params.rotateEffect && (m.width || (m.items.each(function() {
                        var c = a(this);
                        c.css({
                            width: "auto"
                        }),
                        b = Math.max(b, c[0].offsetWidth),
                        c.css({
                            width: ""
                        })
                    }), m.container.css({
                        width: b + 2 + "px"
                    })), m.container.addClass("picker-items-col-absolute"))
                },
                m.calcSize(),
                m.wrapper.transform("translate3d(0," + r + "px,0)").transition(0);
                var s;
                m.setValue = function(b, c, e) {
                    "undefined" == typeof c && (c = "");
                    var f = m.wrapper.find('.picker-item[data-picker-value="' + b + '"]').index();
                    if ("undefined" != typeof f && -1 !== f) {
                        var g = -f * o + r;
                        m.wrapper.transition(c),
                        m.wrapper.transform("translate3d(0," + g + "px,0)"),
                        i.params.updateValuesOnMomentum && m.activeIndex && m.activeIndex !== f && (a.cancelAnimationFrame(s), m.wrapper.transitionEnd(function() {
                            a.cancelAnimationFrame(s)
                        }), d()),
                        m.updateItems(f, g, c, e)
                    }
                },
                m.updateItems = function(b, c, d, e) {
                    "undefined" == typeof c && (c = a.getTranslate(m.wrapper[0], "y")),
                    "undefined" == typeof b && (b = -Math.round((c - r) / o)),
                    0 > b && (b = 0),
                    b >= m.items.length && (b = m.items.length - 1);
                    var f = m.activeIndex;
                    m.activeIndex = b,
                    m.wrapper.find(".picker-selected").removeClass("picker-selected"),
                    i.params.rotateEffect && m.items.transition(d);
                    var g = m.items.eq(b).addClass("picker-selected").transform(""); (e || "undefined" == typeof e) && (m.value = g.attr("data-picker-value"), m.displayValue = m.displayValues ? m.displayValues[b] : m.value, f !== b && (m.onChange && m.onChange(i, m.value, m.displayValue), i.updateValue())),
                    i.params.rotateEffect && ((c - (Math.floor((c - r) / o) * o + r)) / o, m.items.each(function() {
                        var b = a(this),
                        d = b.index() * o,
                        e = r - c,
                        f = d - e,
                        g = f / o,
                        h = Math.ceil(m.height / o / 2) + 1,
                        i = -18 * g;
                        i > 180 && (i = 180),
                        -180 > i && (i = -180),
                        Math.abs(g) > h ? b.addClass("picker-item-far") : b.removeClass("picker-item-far"),
                        b.transform("translate3d(0, " + ( - c + r) + "px, " + (l ? -110 : 0) + "px) rotateX(" + i + "deg)")
                    }))
                },
                c && m.updateItems(0, r, 0);
                var t, u, v, w, x, y, z, A, B, C, D, E, F = !0;
                m.initEvents = function(b) {
                    var c = b ? "off": "on";
                    m.container[c](a.touchEvents.start, e),
                    m.container[c](a.touchEvents.move, f),
                    m.container[c](a.touchEvents.end, g),
                    m.items[c]("click", h)
                },
                m.destroyEvents = function() {
                    m.initEvents(!0)
                },
                m.container[0].f7DestroyPickerCol = function() {
                    m.destroyEvents()
                },
                m.initEvents()
            }
        },
        i.destroyPickerCol = function(b) {
            b = a(b),
            "f7DestroyPickerCol" in b[0] && b[0].f7DestroyPickerCol()
        },
        a(window).on("resize", e),
        i.columnHTML = function(a, b) {
            var c = "",
            d = "";
            if (a.divider) d += '<div class="picker-items-col picker-items-col-divider ' + (a.textAlign ? "picker-items-col-" + a.textAlign: "") + " " + (a.cssClass || "") + '">' + a.content + "</div>";
            else {
                for (var e = 0; e < a.values.length; e++) c += '<div class="picker-item" data-picker-value="' + a.values[e] + '">' + (a.displayValues ? a.displayValues[e] : a.values[e]) + "</div>";
                d += '<div class="picker-items-col ' + (a.textAlign ? "picker-items-col-" + a.textAlign: "") + " " + (a.cssClass || "") + '"><div class="picker-items-col-wrapper">' + c + "</div></div>"
            }
            return b ? c: d
        },
        i.layout = function() {
            var a, b = "",
            c = "";
            i.cols = [];
            var d = "";
            for (a = 0; a < i.params.cols.length; a++) {
                var e = i.params.cols[a];
                d += i.columnHTML(i.params.cols[a]),
                i.cols.push(e)
            }
            c = "weui-picker-modal picker-columns " + (i.params.cssClass || "") + (i.params.rotateEffect ? " picker-3d": "") + (1 === i.params.cols.length ? " picker-columns-single": ""),
            b = '<div class="' + c + '">' + (i.params.toolbar ? i.params.toolbarTemplate.replace(/{{closeText}}/g, i.params.toolbarCloseText).replace(/{{title}}/g, i.params.title) : "") + '<div class="picker-modal-inner picker-items">' + d + '<div class="picker-center-highlight"></div></div></div>',
            i.pickerHTML = b
        },
        i.params.input && (i.input = a(i.params.input), i.input.length > 0 && (i.params.inputReadOnly && i.input.prop("readOnly", !0), i.inline || i.input.on("click", f), i.params.inputReadOnly && i.input.on("focus mousedown",
        function(a) {
            a.preventDefault()
        }))),
        i.inline || a("html").on("click", g),
        i.opened = !1,
        i.open = function() {
            var b = c();
            i.opened || (i.layout(), b ? (i.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + i.pickerHTML + "</div></div>", i.popover = a.popover(i.pickerHTML, i.params.input, !0), i.container = a(i.popover).find(".weui-picker-modal"), a(i.popover).on("close",
            function() {
                h()
            })) : i.inline ? (i.container = a(i.pickerHTML), i.container.addClass("picker-modal-inline"), a(i.params.container).append(i.container)) : (i.container = a(a.openPicker(i.pickerHTML)), a(i.container).on("close",
            function() {
                h()
            })), i.container[0].f7Picker = i, i.container.find(".picker-items-col").each(function() {
                var a = !0; (!i.initialized && i.params.value || i.initialized && i.value) && (a = !1),
                i.initPickerCol(this, a)
            }), i.initialized ? i.value && i.setValue(i.value, 0) : i.params.value && i.setValue(i.params.value, 0)),
            i.opened = !0,
            i.initialized = !0,
            i.params.onOpen && i.params.onOpen(i)
        },
        i.close = function(b) {
            return i.opened && !i.inline ? d() ? void a.closePicker(i.popover) : void a.closePicker(i.container) : void 0
        },
        i.destroy = function() {
            i.close(),
            i.params.input && i.input.length > 0 && i.input.off("click focus", f),
            a("html").off("click", g),
            a(window).off("resize", e)
        },
        i.inline && i.open(),
        i
    };
    a(document).on("click", ".close-picker",
    function() {
        var b = a(".weui-picker-modal.weui-picker-modal-visible");
        b.length > 0 && a.closePicker(b)
    }),
    a(document).on(a.touchEvents.move, ".picker-modal-inner",
    function(a) {
        a.preventDefault()
    }),
    a.openPicker = function(b, c, d) {
        "function" == typeof c && (d = c, c = void 0),
        a.closePicker();
        var e = a("<div class='weui-picker-container " + (c || "") + "'></div>").appendTo(document.body);
        e.show(),
        e.addClass("weui-picker-container-visible");
        var f = a(b).appendTo(e);
        return f.width(),
        f.addClass("weui-picker-modal-visible"),
        d && e.on("close", d),
        f
    },
    a.updatePicker = function(b) {
        var c = a(".weui-picker-container-visible");
        if (!c[0]) return ! 1;
        c.html("");
        var d = a(b).appendTo(c);
        return d.addClass("weui-picker-modal-visible"),
        d
    },
    a.closePicker = function(b, c) {
        "function" == typeof b && (c = b),
        a(".weui-picker-modal-visible").removeClass("weui-picker-modal-visible").transitionEnd(function() {
            a(this).parent().remove(),
            c && c()
        }).trigger("close")
    },
    a.fn.picker = function(c) {
        var d = arguments;
        return this.each(function() {
            if (this) {
                var e = a(this),
                f = e.data("picker");
                if (!f) {
                    c = c || {};
                    var g = e.val();
                    void 0 === c.value && "" !== g && (c.value = c.cols.length > 1 ? g.split(" ") : [g]);
                    var h = a.extend({
                        input: this
                    },
                    c);
                    f = new b(h),
                    e.data("picker", f)
                }
                "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
            }
        })
    }
} ($),
+
function(a) {
    var b, c = function(b, c) {
        this.config = c,
        this.data = {
            values: "",
            titles: "",
            origins: [],
            length: 0
        },
        this.$input = a(b),
        this.$input.prop("readOnly", !0),
        this.initConfig(),
        c = this.config,
        this.$input.click(a.proxy(this.open, this))
    };
    c.prototype.initConfig = function() {
        this.config = a.extend({},
        b, this.config);
        var c = this.config;
        c.items && c.items.length && (c.items = c.items.map(function(a, b) {
            return "string" == typeof a ? {
                title: a,
                value: a
            }: a
        }), this.tpl = a.t7.compile("<div class='weui-picker-modal weui-select-modal'>" + c.toolbarTemplate + (c.multi ? c.checkboxTemplate: c.radioTemplate) + "</div>"), void 0 !== c.input && this.$input.val(c.input), this.parseInitValue(), this._init = !0)
    },
    c.prototype.updateInputValue = function(a, b) {
        var c, d;
        this.config.multi ? (c = a.join(this.config.split), d = b.join(this.config.split)) : (c = a[0], d = b[0]);
        var e = [];
        this.config.items.forEach(function(b) {
            a.each(function(a, c) {
                b.value == c && e.push(b)
            })
        }),
        this.$input.val(d).data("values", c),
        this.$input.attr("value", d).attr("data-values", c);
        var f = {
            values: c,
            titles: d,
            valuesArray: a,
            titlesArray: b,
            origins: e,
            length: e.length
        };
        this.data = f,
        this.$input.trigger("change", f),
        this.config.onChange && this.config.onChange.call(this, f)
    },
    c.prototype.parseInitValue = function() {
        var a = this.$input.val(),
        b = this.config.items;
        if (this._init || void 0 !== a && null != a && "" !== a) for (var c = this.config.multi ? a.split(this.config.split) : [a], d = 0; d < b.length; d++) {
            b[d].checked = !1;
            for (var e = 0; e < c.length; e++) b[d].title === c[e] && (b[d].checked = !0)
        }
    },
    c.prototype._bind = function(b) {
        var c = this,
        d = this.config;
        b.on("change",
        function(e) {
            var f = b.find("input:checked"),
            g = f.map(function() {
                return a(this).val()
            }),
            h = f.map(function() {
                return a(this).data("title")
            });
            c.updateInputValue(g, h),
            d.autoClose && !d.multi && a.closePicker()
        }).on("click", ".close-select",
        function() {
            c.close()
        })
    },
    c.prototype.update = function(b) {
        this.config = a.extend({},
        this.config, b),
        this.initConfig(),
        this._open && this._bind(a.updatePicker(this.getHTML()))
    },
    c.prototype.open = function(b, c) {
        if (!this._open) {
            this.parseInitValue();
            var d = this.config,
            e = this.dialog = a.openPicker(this.getHTML(), a.proxy(this.onClose, this));
            this._bind(e),
            this._open = !0,
            d.onOpen && d.onOpen(this)
        }
    },
    c.prototype.close = function(b, c) {
        var d = this,
        e = this.config.beforeClose;
        if (!c) {
            if (e && "function" == typeof e && e.call(this, this.data.values, this.data.titles) === !1) return ! 1;
            if (this.config.multi) {
                if (void 0 !== this.config.min && this.data.length < this.config.min) return a.toast("请至少选择" + this.config.min + "个", "text"),
                !1;
                if (void 0 !== this.config.max && this.data.length > this.config.max) return a.toast("最多只能选择" + this.config.max + "个", "text"),
                !1
            }
        }
        a.closePicker(function() {
            d.onClose(),
            b && b()
        })
    },
    c.prototype.onClose = function() {
        this._open = !1,
        this.config.onClose && this.config.onClose(this)
    },
    c.prototype.getHTML = function(a) {
        var b = this.config;
        return this.tpl({
            items: b.items,
            title: b.title,
            closeText: b.closeText
        })
    },
    a.fn.select = function(b, d) {
        return this.each(function() {
            var e = a(this);
            e.data("weui-select") || e.data("weui-select", new c(this, b));
            var f = e.data("weui-select");
            return "string" == typeof b && f[b].call(f, d),
            f
        })
    },
    b = a.fn.select.prototype.defaults = {
        items: [],
        input: void 0,
        title: "请选择",
        multi: !1,
        closeText: "确定",
        autoClose: !0,
        onChange: void 0,
        beforeClose: void 0,
        onClose: void 0,
        onOpen: void 0,
        split: ",",
        min: void 0,
        max: void 0,
        toolbarTemplate: '<div class="toolbar">      <div class="toolbar-inner">      <a href="javascript:;" class="picker-button close-select">{{closeText}}</a>      <h1 class="title">{{title}}</h1>      </div>      </div>',
        radioTemplate: '<div class="weui_cells weui_cells_radio">        {{#items}}        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">          <div class="weui_cell_bd weui_cell_primary">            <p>{{this.title}}</p>          </div>          <div class="weui_cell_ft">            <input type="radio" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}">            <span class="weui_icon_checked"></span>          </div>        </label>        {{/items}}      </div>',
        checkboxTemplate: '<div class="weui_cells weui_cells_checkbox">        {{#items}}        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">          <div class="weui_cell_bd weui_cell_primary">            <p>{{this.title}}</p>          </div>          <div class="weui_cell_ft">            <input type="checkbox" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}" >            <span class="weui_icon_checked"></span>          </div>        </label>        {{/items}}      </div>'
    }
} ($),
+
function(a) {
    var b, c = !1,
    d = function(d) {
        function e() {
            var b = !1;
            return k.params.convertToPopover || k.params.onlyInPopover ? (!k.inline && k.params.input && (k.params.onlyInPopover ? b = !0 : a.device.ios ? b = !!a.device.ipad: a(window).width() >= 768 && (b = !0)), b) : b
        }
        function f() {
            return !! (k.opened && k.container && k.container.length > 0 && k.container.parents(".popover").length > 0)
        }
        function g(a) {
            a = new Date(a);
            var b = a.getFullYear(),
            c = a.getMonth(),
            d = c + 1,
            e = a.getDate(),
            f = a.getDay();
            return k.params.dateFormat.replace(/yyyy/g, b).replace(/yy/g, (b + "").substring(2)).replace(/mm/g, 10 > d ? "0" + d: d).replace(/m/g, d).replace(/MM/g, k.params.monthNames[c]).replace(/M/g, k.params.monthNamesShort[c]).replace(/dd/g, 10 > e ? "0" + e: e).replace(/d/g, e).replace(/DD/g, k.params.dayNames[f]).replace(/D/g, k.params.dayNamesShort[f]);
        }
        function h(a) {
            if (a.preventDefault(), !k.opened && (k.open(), k.params.scrollToInput && !e())) {
                var b = k.input.parents(".page-content");
                if (0 === b.length) return;
                var c, d = parseInt(b.css("padding-top"), 10),
                f = parseInt(b.css("padding-bottom"), 10),
                g = b[0].offsetHeight - d - k.container.height(),
                h = b[0].scrollHeight - d - k.container.height(),
                i = k.input.offset().top - d + k.input[0].offsetHeight;
                if (i > g) {
                    var j = b.scrollTop() + i - g;
                    j + g > h && (c = j + g - h + f, g === h && (c = k.container.height()), b.css({
                        "padding-bottom": c + "px"
                    })),
                    b.scrollTop(j, 300)
                }
            }
        }
        function i(b) {
            f() || (k.input && k.input.length > 0 ? b.target !== k.input[0] && 0 === a(b.target).parents(".weui-picker-modal").length && k.close() : 0 === a(b.target).parents(".weui-picker-modal").length && k.close())
        }
        function j() {
            k.opened = !1,
            k.input && k.input.length > 0 && k.input.parents(".page-content").css({
                "padding-bottom": ""
            }),
            k.params.onClose && k.params.onClose(k),
            k.destroyCalendarEvents()
        }
        var k = this;
        d = d || {};
        for (var l in b)"undefined" == typeof d[l] && (d[l] = b[l]);
        k.params = d,
        k.initialized = !1,
        k.inline = !!k.params.container,
        k.isH = "horizontal" === k.params.direction;
        var m = k.isH && c ? -1 : 1;
        return k.animating = !1,
        k.addValue = function(a) {
            if (k.params.multiple) {
                k.value || (k.value = []);
                for (var b, c = 0; c < k.value.length; c++) new Date(a).getTime() === new Date(k.value[c]).getTime() && (b = c);
                "undefined" == typeof b ? k.value.push(a) : k.value.splice(b, 1),
                k.updateValue()
            } else k.value = [a],
            k.updateValue()
        },
        k.setValue = function(a) {
            k.value = a,
            k.updateValue()
        },
        k.updateValue = function() {
            k.wrapper.find(".picker-calendar-day-selected").removeClass("picker-calendar-day-selected");
            var b, c;
            for (b = 0; b < k.value.length; b++) {
                var d = new Date(k.value[b]);
                k.wrapper.find('.picker-calendar-day[data-date="' + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + '"]').addClass("picker-calendar-day-selected")
            }
            if (k.params.onChange && k.params.onChange(k, k.value, k.value.map(g)), k.input && k.input.length > 0) {
                if (k.params.formatValue) c = k.params.formatValue(k, k.value);
                else {
                    for (c = [], b = 0; b < k.value.length; b++) c.push(g(k.value[b]));
                    c = c.join(", ")
                }
                a(k.input).val(c),
                a(k.input).trigger("change")
            }
        },
        k.initCalendarEvents = function() {
            function b(b) {
                if (!h && !g) {
                    g = !0;
                    var c = a.getTouchPosition(b);
                    i = n = c.x,
                    j = n = c.y,
                    o = (new Date).getTime(),
                    u = 0,
                    x = !0,
                    w = void 0,
                    q = r = k.monthsTranslate
                }
            }
            function d(b) {
                if (g) {
                    var c = a.getTouchPosition(b);
                    if (l = c.x, n = c.y, "undefined" == typeof w && (w = !!(w || Math.abs(n - j) > Math.abs(l - i))), k.isH && w) return void(g = !1);
                    if (b.preventDefault(), k.animating) return void(g = !1);
                    x = !1,
                    h || (h = !0, s = k.wrapper[0].offsetWidth, t = k.wrapper[0].offsetHeight, k.wrapper.transition(0)),
                    b.preventDefault(),
                    v = k.isH ? l - i: n - j,
                    u = v / (k.isH ? s: t),
                    r = 100 * (k.monthsTranslate * m + u),
                    k.wrapper.transform("translate3d(" + (k.isH ? r: 0) + "%, " + (k.isH ? 0 : r) + "%, 0)")
                }
            }
            function e(a) {
                return g && h ? (g = h = !1, p = (new Date).getTime(), 300 > p - o ? Math.abs(v) < 10 ? k.resetMonth() : v >= 10 ? c ? k.nextMonth() : k.prevMonth() : c ? k.prevMonth() : k.nextMonth() : -.5 >= u ? c ? k.prevMonth() : k.nextMonth() : u >= .5 ? c ? k.nextMonth() : k.prevMonth() : k.resetMonth(), void setTimeout(function() {
                    x = !0
                },
                100)) : void(g = h = !1)
            }
            function f(b) {
                if (x) {
                    var c = a(b.target).parents(".picker-calendar-day");
                    if (0 === c.length && a(b.target).hasClass("picker-calendar-day") && (c = a(b.target)), 0 !== c.length && (!c.hasClass("picker-calendar-day-selected") || k.params.multiple) && !c.hasClass("picker-calendar-day-disabled")) {
                        c.hasClass("picker-calendar-day-next") && k.nextMonth(),
                        c.hasClass("picker-calendar-day-prev") && k.prevMonth();
                        var d = c.attr("data-year"),
                        e = c.attr("data-month"),
                        f = c.attr("data-day");
                        k.params.onDayClick && k.params.onDayClick(k, c[0], d, e, f),
                        k.addValue(new Date(d, e, f).getTime()),
                        k.params.closeOnSelect && k.close()
                    }
                }
            }
            var g, h, i, j, l, n, o, p, q, r, s, t, u, v, w, x = !0;
            k.container.find(".picker-calendar-prev-month").on("click", k.prevMonth),
            k.container.find(".picker-calendar-next-month").on("click", k.nextMonth),
            k.container.find(".picker-calendar-prev-year").on("click", k.prevYear),
            k.container.find(".picker-calendar-next-year").on("click", k.nextYear),
            k.wrapper.on("click", f),
            k.params.touchMove && (k.wrapper.on(a.touchEvents.start, b), k.wrapper.on(a.touchEvents.move, d), k.wrapper.on(a.touchEvents.end, e)),
            k.container[0].f7DestroyCalendarEvents = function() {
                k.container.find(".picker-calendar-prev-month").off("click", k.prevMonth),
                k.container.find(".picker-calendar-next-month").off("click", k.nextMonth),
                k.container.find(".picker-calendar-prev-year").off("click", k.prevYear),
                k.container.find(".picker-calendar-next-year").off("click", k.nextYear),
                k.wrapper.off("click", f),
                k.params.touchMove && (k.wrapper.off(a.touchEvents.start, b), k.wrapper.off(a.touchEvents.move, d), k.wrapper.off(a.touchEvents.end, e))
            }
        },
        k.destroyCalendarEvents = function(a) {
            "f7DestroyCalendarEvents" in k.container[0] && k.container[0].f7DestroyCalendarEvents()
        },
        k.daysInMonth = function(a) {
            var b = new Date(a);
            return new Date(b.getFullYear(), b.getMonth() + 1, 0).getDate()
        },
        k.monthHTML = function(a, b) {
            a = new Date(a);
            var c = a.getFullYear(),
            d = a.getMonth();
            a.getDate(),
            "next" === b && (a = 11 === d ? new Date(c + 1, 0) : new Date(c, d + 1, 1)),
            "prev" === b && (a = 0 === d ? new Date(c - 1, 11) : new Date(c, d - 1, 1)),
            "next" !== b && "prev" !== b || (d = a.getMonth(), c = a.getFullYear());
            var e = k.daysInMonth(new Date(a.getFullYear(), a.getMonth()).getTime() - 864e6),
            f = k.daysInMonth(a),
            g = new Date(a.getFullYear(), a.getMonth()).getDay();
            0 === g && (g = 7);
            var h, i, j, l = [],
            m = 6,
            n = 7,
            o = "",
            p = 0 + (k.params.firstDay - 1),
            q = (new Date).setHours(0, 0, 0, 0),
            r = k.params.minDate ? new Date(k.params.minDate).getTime() : null,
            s = k.params.maxDate ? new Date(k.params.maxDate).getTime() : null;
            if (k.value && k.value.length) for (i = 0; i < k.value.length; i++) l.push(new Date(k.value[i]).setHours(0, 0, 0, 0));
            for (i = 1; m >= i; i++) {
                var t = "";
                for (j = 1; n >= j; j++) {
                    var u = j;
                    p++;
                    var v = p - g,
                    w = "";
                    0 > v ? (v = e + v + 1, w += " picker-calendar-day-prev", h = new Date(0 > d - 1 ? c - 1 : c, 0 > d - 1 ? 11 : d - 1, v).getTime()) : (v += 1, v > f ? (v -= f, w += " picker-calendar-day-next", h = new Date(d + 1 > 11 ? c + 1 : c, d + 1 > 11 ? 0 : d + 1, v).getTime()) : h = new Date(c, d, v).getTime()),
                    h === q && (w += " picker-calendar-day-today"),
                    l.indexOf(h) >= 0 && (w += " picker-calendar-day-selected"),
                    k.params.weekendDays.indexOf(u - 1) >= 0 && (w += " picker-calendar-day-weekend"),
                    (r && r > h || s && h > s) && (w += " picker-calendar-day-disabled"),
                    h = new Date(h);
                    var x = h.getFullYear(),
                    y = h.getMonth();
                    t += '<div data-year="' + x + '" data-month="' + y + '" data-day="' + v + '" class="picker-calendar-day' + w + '" data-date="' + (x + "-" + y + "-" + v) + '"><span>' + v + "</span></div>"
                }
                o += '<div class="picker-calendar-row">' + t + "</div>"
            }
            return o = '<div class="picker-calendar-month" data-year="' + c + '" data-month="' + d + '">' + o + "</div>"
        },
        k.animating = !1,
        k.updateCurrentMonthYear = function(a) {
            "undefined" == typeof a ? (k.currentMonth = parseInt(k.months.eq(1).attr("data-month"), 10), k.currentYear = parseInt(k.months.eq(1).attr("data-year"), 10)) : (k.currentMonth = parseInt(k.months.eq("next" === a ? k.months.length - 1 : 0).attr("data-month"), 10), k.currentYear = parseInt(k.months.eq("next" === a ? k.months.length - 1 : 0).attr("data-year"), 10)),
            k.container.find(".current-month-value").text(k.params.monthNames[k.currentMonth]),
            k.container.find(".current-year-value").text(k.currentYear)
        },
        k.onMonthChangeStart = function(a) {
            k.updateCurrentMonthYear(a),
            k.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
            var b = "next" === a ? k.months.length - 1 : 0;
            k.months.eq(b).addClass("picker-calendar-month-current"),
            k.months.eq("next" === a ? b - 1 : b + 1).addClass("next" === a ? "picker-calendar-month-prev": "picker-calendar-month-next"),
            k.params.onMonthYearChangeStart && k.params.onMonthYearChangeStart(k, k.currentYear, k.currentMonth)
        },
        k.onMonthChangeEnd = function(a, b) {
            k.animating = !1;
            var c, d, e;
            k.wrapper.find(".picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)").remove(),
            "undefined" == typeof a && (a = "next", b = !0),
            b ? (k.wrapper.find(".picker-calendar-month-next, .picker-calendar-month-prev").remove(), d = k.monthHTML(new Date(k.currentYear, k.currentMonth), "prev"), c = k.monthHTML(new Date(k.currentYear, k.currentMonth), "next")) : e = k.monthHTML(new Date(k.currentYear, k.currentMonth), a),
            ("next" === a || b) && k.wrapper.append(e || c),
            ("prev" === a || b) && k.wrapper.prepend(e || d),
            k.months = k.wrapper.find(".picker-calendar-month"),
            k.setMonthsTranslate(k.monthsTranslate),
            k.params.onMonthAdd && k.params.onMonthAdd(k, "next" === a ? k.months.eq(k.months.length - 1)[0] : k.months.eq(0)[0]),
            k.params.onMonthYearChangeEnd && k.params.onMonthYearChangeEnd(k, k.currentYear, k.currentMonth)
        },
        k.setMonthsTranslate = function(a) {
            a = a || k.monthsTranslate || 0,
            "undefined" == typeof k.monthsTranslate && (k.monthsTranslate = a),
            k.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
            var b = 100 * -(a + 1) * m,
            c = 100 * -a * m,
            d = 100 * -(a - 1) * m;
            k.months.eq(0).transform("translate3d(" + (k.isH ? b: 0) + "%, " + (k.isH ? 0 : b) + "%, 0)").addClass("picker-calendar-month-prev"),
            k.months.eq(1).transform("translate3d(" + (k.isH ? c: 0) + "%, " + (k.isH ? 0 : c) + "%, 0)").addClass("picker-calendar-month-current"),
            k.months.eq(2).transform("translate3d(" + (k.isH ? d: 0) + "%, " + (k.isH ? 0 : d) + "%, 0)").addClass("picker-calendar-month-next")
        },
        k.nextMonth = function(b) {
            "undefined" != typeof b && "object" != typeof b || (b = "", k.params.animate || (b = 0));
            var c = parseInt(k.months.eq(k.months.length - 1).attr("data-month"), 10),
            d = parseInt(k.months.eq(k.months.length - 1).attr("data-year"), 10),
            e = new Date(d, c),
            f = e.getTime(),
            g = !k.animating;
            if (k.params.maxDate && f > new Date(k.params.maxDate).getTime()) return k.resetMonth();
            if (k.monthsTranslate--, c === k.currentMonth) {
                var h = 100 * -k.monthsTranslate * m,
                i = a(k.monthHTML(f, "next")).transform("translate3d(" + (k.isH ? h: 0) + "%, " + (k.isH ? 0 : h) + "%, 0)").addClass("picker-calendar-month-next");
                k.wrapper.append(i[0]),
                k.months = k.wrapper.find(".picker-calendar-month"),
                k.params.onMonthAdd && k.params.onMonthAdd(k, k.months.eq(k.months.length - 1)[0])
            }
            k.animating = !0,
            k.onMonthChangeStart("next");
            var j = 100 * k.monthsTranslate * m;
            k.wrapper.transition(b).transform("translate3d(" + (k.isH ? j: 0) + "%, " + (k.isH ? 0 : j) + "%, 0)"),
            g && k.wrapper.transitionEnd(function() {
                k.onMonthChangeEnd("next")
            }),
            k.params.animate || k.onMonthChangeEnd("next")
        },
        k.prevMonth = function(b) {
            "undefined" != typeof b && "object" != typeof b || (b = "", k.params.animate || (b = 0));
            var c = parseInt(k.months.eq(0).attr("data-month"), 10),
            d = parseInt(k.months.eq(0).attr("data-year"), 10),
            e = new Date(d, c + 1, ( - 1)),
            f = e.getTime(),
            g = !k.animating;
            if (k.params.minDate && f < new Date(k.params.minDate).getTime()) return k.resetMonth();
            if (k.monthsTranslate++, c === k.currentMonth) {
                var h = 100 * -k.monthsTranslate * m,
                i = a(k.monthHTML(f, "prev")).transform("translate3d(" + (k.isH ? h: 0) + "%, " + (k.isH ? 0 : h) + "%, 0)").addClass("picker-calendar-month-prev");
                k.wrapper.prepend(i[0]),
                k.months = k.wrapper.find(".picker-calendar-month"),
                k.params.onMonthAdd && k.params.onMonthAdd(k, k.months.eq(0)[0])
            }
            k.animating = !0,
            k.onMonthChangeStart("prev");
            var j = 100 * k.monthsTranslate * m;
            k.wrapper.transition(b).transform("translate3d(" + (k.isH ? j: 0) + "%, " + (k.isH ? 0 : j) + "%, 0)"),
            g && k.wrapper.transitionEnd(function() {
                k.onMonthChangeEnd("prev")
            }),
            k.params.animate || k.onMonthChangeEnd("prev")
        },
        k.resetMonth = function(a) {
            "undefined" == typeof a && (a = "");
            var b = 100 * k.monthsTranslate * m;
            k.wrapper.transition(a).transform("translate3d(" + (k.isH ? b: 0) + "%, " + (k.isH ? 0 : b) + "%, 0)")
        },
        k.setYearMonth = function(a, b, c) {
            "undefined" == typeof a && (a = k.currentYear),
            "undefined" == typeof b && (b = k.currentMonth),
            "undefined" != typeof c && "object" != typeof c || (c = "", k.params.animate || (c = 0));
            var d;
            if (d = a < k.currentYear ? new Date(a, b + 1, ( - 1)).getTime() : new Date(a, b).getTime(), k.params.maxDate && d > new Date(k.params.maxDate).getTime()) return ! 1;
            if (k.params.minDate && d < new Date(k.params.minDate).getTime()) return ! 1;
            var e = new Date(k.currentYear, k.currentMonth).getTime(),
            f = d > e ? "next": "prev",
            g = k.monthHTML(new Date(a, b));
            k.monthsTranslate = k.monthsTranslate || 0;
            var h, i, j = k.monthsTranslate,
            l = !k.animating;
            d > e ? (k.monthsTranslate--, k.animating || k.months.eq(k.months.length - 1).remove(), k.wrapper.append(g), k.months = k.wrapper.find(".picker-calendar-month"), h = 100 * -(j - 1) * m, k.months.eq(k.months.length - 1).transform("translate3d(" + (k.isH ? h: 0) + "%, " + (k.isH ? 0 : h) + "%, 0)").addClass("picker-calendar-month-next")) : (k.monthsTranslate++, k.animating || k.months.eq(0).remove(), k.wrapper.prepend(g), k.months = k.wrapper.find(".picker-calendar-month"), h = 100 * -(j + 1) * m, k.months.eq(0).transform("translate3d(" + (k.isH ? h: 0) + "%, " + (k.isH ? 0 : h) + "%, 0)").addClass("picker-calendar-month-prev")),
            k.params.onMonthAdd && k.params.onMonthAdd(k, "next" === f ? k.months.eq(k.months.length - 1)[0] : k.months.eq(0)[0]),
            k.animating = !0,
            k.onMonthChangeStart(f),
            i = 100 * k.monthsTranslate * m,
            k.wrapper.transition(c).transform("translate3d(" + (k.isH ? i: 0) + "%, " + (k.isH ? 0 : i) + "%, 0)"),
            l && k.wrapper.transitionEnd(function() {
                k.onMonthChangeEnd(f, !0)
            }),
            k.params.animate || k.onMonthChangeEnd(f)
        },
        k.nextYear = function() {
            k.setYearMonth(k.currentYear + 1)
        },
        k.prevYear = function() {
            k.setYearMonth(k.currentYear - 1)
        },
        k.layout = function() {
            var a, b = "",
            c = "",
            d = k.value && k.value.length ? k.value[0] : (new Date).setHours(0, 0, 0, 0),
            e = k.monthHTML(d, "prev"),
            f = k.monthHTML(d),
            g = k.monthHTML(d, "next"),
            h = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (e + f + g) + "</div></div>",
            i = "";
            if (k.params.weekHeader) {
                for (a = 0; 7 > a; a++) {
                    var j = a + k.params.firstDay > 6 ? a - 7 + k.params.firstDay: a + k.params.firstDay,
                    l = k.params.dayNamesShort[j];
                    i += '<div class="picker-calendar-week-day ' + (k.params.weekendDays.indexOf(j) >= 0 ? "picker-calendar-week-day-weekend": "") + '"> ' + l + "</div>"
                }
                i = '<div class="picker-calendar-week-days">' + i + "</div>"
            }
            c = "weui-picker-calendar " + (k.params.cssClass || ""),
            k.inline || (c = "weui-picker-modal " + c);
            var m = k.params.toolbar ? k.params.toolbarTemplate.replace(/{{closeText}}/g, k.params.toolbarCloseText) : "";
            k.params.toolbar && (m = k.params.toolbarTemplate.replace(/{{closeText}}/g, k.params.toolbarCloseText).replace(/{{monthPicker}}/g, k.params.monthPicker ? k.params.monthPickerTemplate: "").replace(/{{yearPicker}}/g, k.params.yearPicker ? k.params.yearPickerTemplate: "")),
            b = '<div class="' + c + '">' + m + '<div class="picker-modal-inner">' + i + h + "</div></div>",
            k.pickerHTML = b
        },
        k.params.input && (k.input = a(k.params.input), k.input.length > 0 && (k.params.inputReadOnly && k.input.prop("readOnly", !0), k.inline || k.input.on("click", h), k.params.inputReadOnly && k.input.on("focus mousedown",
        function(a) {
            a.preventDefault()
        }))),
        k.inline || a(document).on("click touchend", i),
        k.opened = !1,
        k.open = function() {
            var b = e() && !1,
            c = !1;
            k.opened || (k.value || k.params.value && (k.value = k.params.value, c = !0), k.layout(), b ? (k.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + k.pickerHTML + "</div></div>", k.popover = a.popover(k.pickerHTML, k.params.input, !0), k.container = a(k.popover).find(".weui-picker-modal"), a(k.popover).on("close",
            function() {
                j()
            })) : k.inline ? (k.container = a(k.pickerHTML), k.container.addClass("picker-modal-inline"), a(k.params.container).append(k.container)) : (k.container = a(a.openPicker(k.pickerHTML)), a(k.container).on("close",
            function() {
                j()
            })), k.container[0].f7Calendar = k, k.wrapper = k.container.find(".picker-calendar-months-wrapper"), k.months = k.wrapper.find(".picker-calendar-month"), k.updateCurrentMonthYear(), k.monthsTranslate = 0, k.setMonthsTranslate(), k.initCalendarEvents(), c && k.updateValue()),
            k.opened = !0,
            k.initialized = !0,
            k.params.onMonthAdd && k.months.each(function() {
                k.params.onMonthAdd(k, this)
            }),
            k.params.onOpen && k.params.onOpen(k)
        },
        k.close = function() {
            return k.opened && !k.inline ? (k.animating = !1, f() ? void a.closePicker(k.popover) : void a.closePicker(k.container)) : void 0
        },
        k.destroy = function() {
            k.close(),
            k.params.input && k.input.length > 0 && (k.input.off("click focus", h), k.input.data("calendar", null)),
            a("html").off("click", i)
        },
        k.inline && k.open(),
        k
    },
    e = function(a) {
        return 10 > a ? "0" + a: a
    };
    a.fn.calendar = function(b, c) {
        return b = b || {},
        this.each(function() {
            var f = a(this);
            if (f[0]) {
                var g = {};
                "INPUT" === f[0].tagName.toUpperCase() ? g.input = f: g.container = f;
                var h = f.data("calendar");
                if (!h) {
                    if (!b.value && f.val() && (b.value = [f.val()]), !b.value) {
                        var i = new Date;
                        b.value = [i.getFullYear() + "-" + e(i.getMonth() + 1) + "-" + e(i.getDate())]
                    }
                    h = f.data("calendar", new d(a.extend(g, b)))
                }
                "string" == typeof b && h[b].call(h, c)
            }
        })
    },
    b = a.fn.calendar.prototype.defaults = {
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        firstDay: 1,
        weekendDays: [0, 6],
        multiple: !1,
        dateFormat: "yyyy-mm-dd",
        direction: "horizontal",
        minDate: null,
        maxDate: null,
        touchMove: !0,
        animate: !0,
        closeOnSelect: !0,
        monthPicker: !0,
        monthPickerTemplate: '<div class="picker-calendar-month-picker"><a href="javascript:;" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a><div class="current-month-value"></div><a href="javascript:;" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a></div>',
        yearPicker: !0,
        yearPickerTemplate: '<div class="picker-calendar-year-picker"><a href="javascript:;" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a><span class="current-year-value"></span><a href="javascript:;" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a></div>',
        weekHeader: !0,
        scrollToInput: !0,
        inputReadOnly: !0,
        convertToPopover: !0,
        onlyInPopover: !1,
        toolbar: !0,
        toolbarCloseText: "Done",
        toolbarTemplate: '<div class="toolbar"><div class="toolbar-inner">{{yearPicker}}{{monthPicker}}</div></div>'
    }
} ($),
+
function(a) {
    var b, c = function(b, c) {
        this.input = a(b),
        this.params = c,
        this.initMonthes = "01 02 03 04 05 06 07 08 09 10 11 12".split(" "),
        this.initYears = function() {
            for (var a = [], b = 1950; 2030 >= b; b++) a.push(b);
            return a
        } ();
        var d = a.extend({},
        c, this.getConfig());
        a(this.input).picker(d)
    };
    c.prototype = {
        getDays: function(a) {
            for (var b = [], c = 1; (a || 31) >= c; c++) b.push(10 > c ? "0" + c: c);
            return b
        },
        getDaysByMonthAndYear: function(a, b) {
            var c = new Date(b, parseInt(a) + 1 - 1, 1),
            d = new Date(c - 1);
            return this.getDays(d.getDate())
        },
        formatNumber: function(a) {
            return 10 > a ? "0" + a: a
        },
        formatValue: function(a, b) {
            var c = this.params;
            return a[0] + c.dateSplit + a[1] + c.dateSplit + a[2] + c.dateTimeSplit + a[3] + c.timeSplit + a[4]
        },
        stringToArray: function(a) {
            var b = this.params,
            c = a.split(b.dateTimeSplit),
            d = c[0],
            e = c[1];
            return [].concat(d.split(b.dateSplit), e ? e.split(b.timeSplit) : [])
        },
        arrayToDate: function(a) {
            var b = this.params;
            if (3 === a.length) return new Date(a.join(b.dateSplit));
            var c = new Date(a.slice(0, 3).join(b.dateSplit));
            return c.setHours(a[3]),
            c.setMinutes(a[4]),
            c
        },
        getConfig: function() {
            var a, b = new Date,
            c = this.params,
            d = this,
            e = {
                rotateEffect: !1,
                value: [b.getFullYear(), this.formatNumber(b.getMonth() + 1), this.formatNumber(b.getDate()), this.formatNumber(b.getHours()), this.formatNumber(b.getMinutes())],
                onChange: function(b, e, f) {
                    var g = b.cols,
                    h = d.getDaysByMonthAndYear(g[1].value, g[0].value),
                    i = b.cols[2].value;
                    i > h.length && (i = h.length),
                    b.cols[2].setValue(i);
                    var j = d.arrayToDate(e),
                    k = !0;
                    if (c.min) {
                        var l = d.arrayToDate(d.stringToArray("function" == typeof c.min ? c.min() : c.min)); + l > j && (b.setValue(a), k = !1)
                    }
                    if (c.max) {
                        var m = d.arrayToDate(d.stringToArray("function" == typeof c.max ? c.max() : c.max));
                        j > +m && (b.setValue(a), k = !1)
                    }
                    k && (a = e),
                    d.params.onChange && d.params.onChange.apply(this, arguments)
                },
                formatValue: function(a, b, c) {
                    return d.formatValue(b, c)
                },
                cols: [{
                    values: d.initYears
                },
                {
                    divider: !0,
                    content: this.params.dateSplit
                },
                {
                    values: d.initMonthes
                },
                {
                    divider: !0,
                    content: this.params.dateSplit
                },
                {
                    values: d.getDays()
                },
                {
                    divider: !0,
                    content: this.params.dateTimeSplit
                },
                {
                    values: function() {
                        if (d.params.hours) return d.params.hours;
                        for (var a = [], b = 0; 23 >= b; b++) a.push(d.formatNumber(b));
                        return a
                    } ()
                },
                {
                    divider: !0,
                    content: this.params.timeSplit
                },
                {
                    values: function() {
                        if (d.params.minutes) return d.params.minutes;
                        for (var a = [], b = 0; 59 >= b; b++) a.push(d.formatNumber(b));
                        return a
                    } ()
                }]
            },
            f = this.input.val();
            return f && (e.value = this.stringToArray(f)),
            this.params.value && (this.input.val(this.params.value), e.value = this.stringToArray(this.params.value)),
            e
        }
    },
    a.fn.datetimePicker = function(d) {
        return d = a.extend({},
        b, d),
        this.each(function() {
            if (this) {
                var b = a(this),
                e = b.data("datetime");
                return e || b.data("datetime", new c(this, d)),
                e
            }
        })
    },
    b = a.fn.datetimePicker.prototype.defaults = {
        dateSplit: "-",
        timeSplit: ":",
        dateTimeSplit: " ",
        input: void 0,
        hours: void 0,
        minutes: void 0,
        min: void 0,
        max: void 0
    }
} ($),
+
function(a) {
    a.openPopup = function(b, c) {
        a.closePopup(),
        b = a(b),
        b.show(),
        b.width(),
        b.addClass("weui-popup-container-visible");
        var d = b.find(".weui-popup-modal");
        d.width(),
        d.transitionEnd(function() {
            d.trigger("open")
        })
    },
    a.closePopup = function(b, c) {
        b = a(b || ".weui-popup-container-visible"),
        b.find(".weui-popup-modal").transitionEnd(function() {
            var d = a(this);
            d.trigger("close"),
            b.hide(),
            c && b.remove()
        }),
        b.removeClass("weui-popup-container-visible")
    },
    a(document).on("click", ".close-popup, .weui-popup-overlay",
    function() {
        a.closePopup()
    }).on("click", ".open-popup",
    function() {
        a(a(this).data("target")).popup()
    }).on("click", ".weui-popup-container",
    function(b) {
        a(b.target).hasClass("weui-popup-container") && a.closePopup()
    }),
    a.fn.popup = function() {
        return this.each(function() {
            a.openPopup(this)
        })
    }
} ($),
+
function(a) {
    var b, c, d, e, f, g, h = function(c) {
        var d = a.getTouchPosition(c);
        e = d,
        f = g = 0,
        b.addClass("touching")
    },
    i = function(c) {
        if (!e) return ! 1;
        c.preventDefault(),
        c.stopPropagation();
        var d = a.getTouchPosition(c);
        f = d.x - e.x,
        g = d.y - e.y,
        g > 0 && (g = Math.sqrt(g)),
        b.css("transform", "translate3d(0, " + g + "px, 0)")
    },
    j = function() {
        b.removeClass("touching"),
        b.attr("style", ""),
        0 > g && Math.abs(g) > .38 * b.height() && a.closeNotification(),
        Math.abs(f) <= 1 && Math.abs(g) <= 1 && b.trigger("noti-click"),
        e = !1
    },
    k = function(b) {
        b.on(a.touchEvents.start, h),
        b.on(a.touchEvents.move, i),
        b.on(a.touchEvents.end, j)
    };
    a.notification = a.noti = function(e) {
        e = a.extend({},
        c, e),
        b = a(".notification"),
        b[0] || (b = a('<div class="notification"></div>').appendTo(document.body), k(b)),
        b.off("noti-click"),
        e.onClick && b.on("noti-click",
        function() {
            e.onClick(e.data)
        }),
        b.html(a.t7.compile(e.tpl)(e)),
        b.show(),
        b.addClass("notification-in"),
        b.data("params", e);
        var f = function() {
            d && (clearTimeout(d), d = null),
            d = setTimeout(function() {
                b.hasClass("touching") ? f() : a.closeNotification()
            },
            e.time)
        };
        f()
    },
    a.closeNotification = function() {
        d && clearTimeout(d),
        d = null;
        var b = a(".notification").removeClass("notification-in").transitionEnd(function() {
            a(this).remove()
        });
        if (b[0]) {
            var c = a(".notification").data("params");
            c && c.onClose && c.onClose(c.data)
        }
    },
    c = a.noti.prototype.defaults = {
        title: void 0,
        text: void 0,
        media: void 0,
        time: 4e3,
        onClick: void 0,
        onClose: void 0,
        data: void 0,
        tpl: '<div class="notification-inner">{{#if media}}<div class="notification-media">{{media}}</div>{{/if}}<div class="notification-content">{{#if title}}<div class="notification-title">{{title}}</div>{{/if}}{{#if text}}<div class="notification-text">{{text}}</div>{{/if}}</div><div class="notification-handle-bar"></div></div>'
    }
} ($),
+
function(a) {
    var b;
    a.toptip = function(c, d, e) {
        if (c) {
            "string" == typeof d && (e = d, d = void 0),
            d = d || 3e3;
            var f = e ? "bg-" + e: "bg-danger",
            g = a(".weui_toptips").remove();
            g = a('<div class="weui_toptips"></div>').appendTo(document.body),
            g.html(c),
            g[0].className = "weui_toptips " + f,
            clearTimeout(b),
            g.hasClass("weui_toptips_visible") || (g.show().width(), g.addClass("weui_toptips_visible")),
            b = setTimeout(function() {
                g.removeClass("weui_toptips_visible").transitionEnd(function() {
                    g.remove()
                })
            },
            d)
        }
    }
} ($),


+
function(a) {
    var b;
    a.fn.cityPicker = function(c) {
        return c = a.extend({},
        b, c),
        this.each(function() {
            var b = function(a) {
                for (var b = [], c = 0; c < a.length; c++) {
                    var d = a[c];
                    "请选择" !== d.name && b.push(d.name)
                }
                return b.length ? b: [""]
            },
            d = function(a) {
                return a.sub ? b(a.sub) : [""]
            },
            e = function(a) {
                for (var b = 0; b < g.length; b++) if (g[b].name === a) return d(g[b]);
                return [""]
            },
            f = function(a, b) {
                for (var c = 0; c < g.length; c++) if (g[c].name === a) for (var e = 0; e < g[c].sub.length; e++) if (g[c].sub[e].name === b) return d(g[c].sub[e]);
                return [""]
            },
            g = a.rawCitiesData,
            h = g.map(function(a) {
                return a.name
            }),
            i = d(g[0]),
            j = d(g[0].sub[0]),
            k = h[0],
            l = i[0],
            m = j[0],
            n = [{
                values: h,
                cssClass: "col-province"
            },
            {
                values: i,
                cssClass: "col-city"
            }];
            c.showDistrict && n.push({
                values: j,
                cssClass: "col-district"
            });
            var o = {
                cssClass: "city-picker",
                rotateEffect: !1,
                onChange: function(a, b, d) {
                    var g, h = a.cols[0].value;
                    if (h !== k) {
                        var i = e(h);
                        g = i[0];
                        var j = f(h, g);
                        return a.cols[1].replaceValues(i),
                        c.showDistrict && a.cols[2].replaceValues(j),
                        k = h,
                        l = g,
                        void a.updateValue()
                    }
                    c.showDistrict && (g = a.cols[1].value, g !== l && (a.cols[2].replaceValues(f(h, g)), l = g, a.updateValue()))
                },
                cols: n
            };
            if (this) {
                var p = a.extend(o, c),
                q = a(this).val();
                q && (p.value = q.split(" "), p.value[0] && (k = p.value[0], p.cols[1].values = e(p.value[0])), p.value[1] ? (l = p.value[1], c.showDistrict && (p.cols[2].values = f(p.value[0], p.value[1]))) : (m = p.value[2], c.showDistrict && (p.cols[2].values = f(p.value[0], p.cols[1].values[0])))),
                a(this).picker(p)
            }
        })
    },
    b = a.fn.cityPicker.prototype.defaults = {
        showDistrict: !0
    }
} ($),
!
function() {
    function a(a) {
        a.fn.swiper = function(b) {
            var d;
            return a(this).each(function() {
                var a = new c(this, b);
                d || (d = a)
            }),
            d
        }
    }
    var b, c = function(a, d) {
        function e(a) {
            return Math.floor(a)
        }
        function f() {
            t.autoplayTimeoutId = setTimeout(function() {
                t.params.loop ? (t.fixLoop(), t._slideNext(), t.emit("onAutoplay", t)) : t.isEnd ? d.autoplayStopOnLast ? t.stopAutoplay() : (t._slideTo(0), t.emit("onAutoplay", t)) : (t._slideNext(), t.emit("onAutoplay", t))
            },
            t.params.autoplay)
        }
        function g(a, c) {
            var d = b(a.target);
            if (!d.is(c)) if ("string" == typeof c) d = d.parents(c);
            else if (c.nodeType) {
                var e;
                return d.parents().each(function(a, b) {
                    b === c && (e = c)
                }),
                e ? c: void 0
            }
            if (0 !== d.length) return d[0]
        }
        function h(a, b) {
            b = b || {};
            var c = window.MutationObserver || window.WebkitMutationObserver,
            d = new c(function(a) {
                a.forEach(function(a) {
                    t.onResize(!0),
                    t.emit("onObserverUpdate", t, a)
                })
            });
            d.observe(a, {
                attributes: "undefined" == typeof b.attributes || b.attributes,
                childList: "undefined" == typeof b.childList || b.childList,
                characterData: "undefined" == typeof b.characterData || b.characterData
            }),
            t.observers.push(d)
        }
        function i(a) {
            a.originalEvent && (a = a.originalEvent);
            var b = a.keyCode || a.charCode;
            if (!t.params.allowSwipeToNext && (t.isHorizontal() && 39 === b || !t.isHorizontal() && 40 === b)) return ! 1;
            if (!t.params.allowSwipeToPrev && (t.isHorizontal() && 37 === b || !t.isHorizontal() && 38 === b)) return ! 1;
            if (! (a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === b || 39 === b || 38 === b || 40 === b) {
                    var c = !1;
                    if (t.container.parents(".swiper-slide").length > 0 && 0 === t.container.parents(".swiper-slide-active").length) return;
                    var d = {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    },
                    e = window.innerWidth,
                    f = window.innerHeight,
                    g = t.container.offset();
                    t.rtl && (g.left = g.left - t.container[0].scrollLeft);
                    for (var h = [[g.left, g.top], [g.left + t.width, g.top], [g.left, g.top + t.height], [g.left + t.width, g.top + t.height]], i = 0; i < h.length; i++) {
                        var j = h[i];
                        j[0] >= d.left && j[0] <= d.left + e && j[1] >= d.top && j[1] <= d.top + f && (c = !0)
                    }
                    if (!c) return
                }
                t.isHorizontal() ? (37 !== b && 39 !== b || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (39 === b && !t.rtl || 37 === b && t.rtl) && t.slideNext(), (37 === b && !t.rtl || 39 === b && t.rtl) && t.slidePrev()) : (38 !== b && 40 !== b || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 === b && t.slideNext(), 38 === b && t.slidePrev())
            }
        }
        function j(a) {
            a.originalEvent && (a = a.originalEvent);
            var b = t.mousewheel.event,
            c = 0,
            d = t.rtl ? -1 : 1;
            if ("mousewheel" === b) if (t.params.mousewheelForceToAxis) if (t.isHorizontal()) {
                if (! (Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY))) return;
                c = a.wheelDeltaX * d
            } else {
                if (! (Math.abs(a.wheelDeltaY) > Math.abs(a.wheelDeltaX))) return;
                c = a.wheelDeltaY
            } else c = Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY) ? -a.wheelDeltaX * d: -a.wheelDeltaY;
            else if ("DOMMouseScroll" === b) c = -a.detail;
            else if ("wheel" === b) if (t.params.mousewheelForceToAxis) if (t.isHorizontal()) {
                if (! (Math.abs(a.deltaX) > Math.abs(a.deltaY))) return;
                c = -a.deltaX * d
            } else {
                if (! (Math.abs(a.deltaY) > Math.abs(a.deltaX))) return;
                c = -a.deltaY
            } else c = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? -a.deltaX * d: -a.deltaY;
            if (0 !== c) {
                if (t.params.mousewheelInvert && (c = -c), t.params.freeMode) {
                    var e = t.getWrapperTranslate() + c * t.params.mousewheelSensitivity,
                    f = t.isBeginning,
                    g = t.isEnd;
                    if (e >= t.minTranslate() && (e = t.minTranslate()), e <= t.maxTranslate() && (e = t.maxTranslate()), t.setWrapperTransition(0), t.setWrapperTranslate(e), t.updateProgress(), t.updateActiveIndex(), (!f && t.isBeginning || !g && t.isEnd) && t.updateClasses(), t.params.freeModeSticky ? (clearTimeout(t.mousewheel.timeout), t.mousewheel.timeout = setTimeout(function() {
                        t.slideReset()
                    },
                    300)) : t.params.lazyLoading && t.lazy && t.lazy.load(), 0 === e || e === t.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - t.mousewheel.lastScrollTime > 60) if (0 > c) if (t.isEnd && !t.params.loop || t.animating) {
                        if (t.params.mousewheelReleaseOnEdges) return ! 0
                    } else t.slideNext();
                    else if (t.isBeginning && !t.params.loop || t.animating) {
                        if (t.params.mousewheelReleaseOnEdges) return ! 0
                    } else t.slidePrev();
                    t.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return t.params.autoplay && t.stopAutoplay(),
                a.preventDefault ? a.preventDefault() : a.returnValue = !1,
                !1
            }
        }
        function k(a, c) {
            a = b(a);
            var d, e, f, g = t.rtl ? -1 : 1;
            d = a.attr("data-swiper-parallax") || "0",
            e = a.attr("data-swiper-parallax-x"),
            f = a.attr("data-swiper-parallax-y"),
            e || f ? (e = e || "0", f = f || "0") : t.isHorizontal() ? (e = d, f = "0") : (f = d, e = "0"),
            e = e.indexOf("%") >= 0 ? parseInt(e, 10) * c * g + "%": e * c * g + "px",
            f = f.indexOf("%") >= 0 ? parseInt(f, 10) * c + "%": f * c + "px",
            a.transform("translate3d(" + e + ", " + f + ",0px)")
        }
        function l(a) {
            return 0 !== a.indexOf("on") && (a = a[0] !== a[0].toUpperCase() ? "on" + a[0].toUpperCase() + a.substring(1) : "on" + a),
            a
        }
        if (! (this instanceof c)) return new c(a, d);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            },
            flip: {
                slideShadows: !0,
                limitRotation: !0
            },
            cube: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            },
            fade: {
                crossFade: !1
            },
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        },
        n = d && d.virtualTranslate;
        d = d || {};
        var o = {};
        for (var p in d) if ("object" != typeof d[p] || null === d[p] || d[p].nodeType || d[p] === window || d[p] === document || "undefined" != typeof Dom7 && d[p] instanceof Dom7 || "undefined" != typeof jQuery && d[p] instanceof jQuery) o[p] = d[p];
        else {
            o[p] = {};
            for (var q in d[p]) o[p][q] = d[p][q]
        }
        for (var r in m) if ("undefined" == typeof d[r]) d[r] = m[r];
        else if ("object" == typeof d[r]) for (var s in m[r])"undefined" == typeof d[r][s] && (d[r][s] = m[r][s]);
        var t = this;
        if (t.params = d, t.originalParams = o, t.classNames = [], "undefined" != typeof b && "undefined" != typeof Dom7 && (b = Dom7), ("undefined" != typeof b || (b = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery: Dom7)) && (t.$ = b, t.currentBreakpoint = void 0, t.getActiveBreakpoint = function() {
            if (!t.params.breakpoints) return ! 1;
            var a, b = !1,
            c = [];
            for (a in t.params.breakpoints) t.params.breakpoints.hasOwnProperty(a) && c.push(a);
            c.sort(function(a, b) {
                return parseInt(a, 10) > parseInt(b, 10)
            });
            for (var d = 0; d < c.length; d++) a = c[d],
            a >= window.innerWidth && !b && (b = a);
            return b || "max"
        },
        t.setBreakpoint = function() {
            var a = t.getActiveBreakpoint();
            if (a && t.currentBreakpoint !== a) {
                var b = a in t.params.breakpoints ? t.params.breakpoints[a] : t.originalParams,
                c = t.params.loop && b.slidesPerView !== t.params.slidesPerView;
                for (var d in b) t.params[d] = b[d];
                t.currentBreakpoint = a,
                c && t.destroyLoop && t.reLoop(!0)
            }
        },
        t.params.breakpoints && t.setBreakpoint(), t.container = b(a), 0 !== t.container.length)) {
            if (t.container.length > 1) {
                var u = [];
                return t.container.each(function() {
                    u.push(new c(this, d))
                }),
                u
            }
            t.container[0].swiper = t,
            t.container.data("swiper", t),
            t.classNames.push("swiper-container-" + t.params.direction),
            t.params.freeMode && t.classNames.push("swiper-container-free-mode"),
            t.support.flexbox || (t.classNames.push("swiper-container-no-flexbox"), t.params.slidesPerColumn = 1),
            t.params.autoHeight && t.classNames.push("swiper-container-autoheight"),
            (t.params.parallax || t.params.watchSlidesVisibility) && (t.params.watchSlidesProgress = !0),
            ["cube", "coverflow", "flip"].indexOf(t.params.effect) >= 0 && (t.support.transforms3d ? (t.params.watchSlidesProgress = !0, t.classNames.push("swiper-container-3d")) : t.params.effect = "slide"),
            "slide" !== t.params.effect && t.classNames.push("swiper-container-" + t.params.effect),
            "cube" === t.params.effect && (t.params.resistanceRatio = 0, t.params.slidesPerView = 1, t.params.slidesPerColumn = 1, t.params.slidesPerGroup = 1, t.params.centeredSlides = !1, t.params.spaceBetween = 0, t.params.virtualTranslate = !0, t.params.setWrapperSize = !1),
            "fade" !== t.params.effect && "flip" !== t.params.effect || (t.params.slidesPerView = 1, t.params.slidesPerColumn = 1, t.params.slidesPerGroup = 1, t.params.watchSlidesProgress = !0, t.params.spaceBetween = 0, t.params.setWrapperSize = !1, "undefined" == typeof n && (t.params.virtualTranslate = !0)),
            t.params.grabCursor && t.support.touch && (t.params.grabCursor = !1),
            t.wrapper = t.container.children("." + t.params.wrapperClass),
            t.params.pagination && (t.paginationContainer = b(t.params.pagination), t.params.uniqueNavElements && "string" == typeof t.params.pagination && t.paginationContainer.length > 1 && 1 === t.container.find(t.params.pagination).length && (t.paginationContainer = t.container.find(t.params.pagination)), "bullets" === t.params.paginationType && t.params.paginationClickable ? t.paginationContainer.addClass("swiper-pagination-clickable") : t.params.paginationClickable = !1, t.paginationContainer.addClass("swiper-pagination-" + t.params.paginationType)),
            (t.params.nextButton || t.params.prevButton) && (t.params.nextButton && (t.nextButton = b(t.params.nextButton), t.params.uniqueNavElements && "string" == typeof t.params.nextButton && t.nextButton.length > 1 && 1 === t.container.find(t.params.nextButton).length && (t.nextButton = t.container.find(t.params.nextButton))), t.params.prevButton && (t.prevButton = b(t.params.prevButton), t.params.uniqueNavElements && "string" == typeof t.params.prevButton && t.prevButton.length > 1 && 1 === t.container.find(t.params.prevButton).length && (t.prevButton = t.container.find(t.params.prevButton)))),
            t.isHorizontal = function() {
                return "horizontal" === t.params.direction
            },
            t.rtl = t.isHorizontal() && ("rtl" === t.container[0].dir.toLowerCase() || "rtl" === t.container.css("direction")),
            t.rtl && t.classNames.push("swiper-container-rtl"),
            t.rtl && (t.wrongRTL = "-webkit-box" === t.wrapper.css("display")),
            t.params.slidesPerColumn > 1 && t.classNames.push("swiper-container-multirow"),
            t.device.android && t.classNames.push("swiper-container-android"),
            t.container.addClass(t.classNames.join(" ")),
            t.translate = 0,
            t.progress = 0,
            t.velocity = 0,
            t.lockSwipeToNext = function() {
                t.params.allowSwipeToNext = !1
            },
            t.lockSwipeToPrev = function() {
                t.params.allowSwipeToPrev = !1
            },
            t.lockSwipes = function() {
                t.params.allowSwipeToNext = t.params.allowSwipeToPrev = !1
            },
            t.unlockSwipeToNext = function() {
                t.params.allowSwipeToNext = !0
            },
            t.unlockSwipeToPrev = function() {
                t.params.allowSwipeToPrev = !0
            },
            t.unlockSwipes = function() {
                t.params.allowSwipeToNext = t.params.allowSwipeToPrev = !0
            },
            t.params.grabCursor && (t.container[0].style.cursor = "move", t.container[0].style.cursor = "-webkit-grab", t.container[0].style.cursor = "-moz-grab", t.container[0].style.cursor = "grab"),
            t.imagesToLoad = [],
            t.imagesLoaded = 0,
            t.loadImage = function(a, b, c, d, e) {
                function f() {
                    e && e()
                }
                var g;
                a.complete && d ? f() : b ? (g = new window.Image, g.onload = f, g.onerror = f, c && (g.srcset = c), b && (g.src = b)) : f()
            },
            t.preloadImages = function() {
                function a() {
                    "undefined" != typeof t && null !== t && (void 0 !== t.imagesLoaded && t.imagesLoaded++, t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(), t.emit("onImagesReady", t)))
                }
                t.imagesToLoad = t.container.find("img");
                for (var b = 0; b < t.imagesToLoad.length; b++) t.loadImage(t.imagesToLoad[b], t.imagesToLoad[b].currentSrc || t.imagesToLoad[b].getAttribute("src"), t.imagesToLoad[b].srcset || t.imagesToLoad[b].getAttribute("srcset"), !0, a)
            },
            t.autoplayTimeoutId = void 0,
            t.autoplaying = !1,
            t.autoplayPaused = !1,
            t.startAutoplay = function() {
                return "undefined" == typeof t.autoplayTimeoutId && ( !! t.params.autoplay && (!t.autoplaying && (t.autoplaying = !0, t.emit("onAutoplayStart", t), void f())))
            },
            t.stopAutoplay = function(a) {
                t.autoplayTimeoutId && (t.autoplayTimeoutId && clearTimeout(t.autoplayTimeoutId), t.autoplaying = !1, t.autoplayTimeoutId = void 0, t.emit("onAutoplayStop", t))
            },
            t.pauseAutoplay = function(a) {
                t.autoplayPaused || (t.autoplayTimeoutId && clearTimeout(t.autoplayTimeoutId), t.autoplayPaused = !0, 0 === a ? (t.autoplayPaused = !1, f()) : t.wrapper.transitionEnd(function() {
                    t && (t.autoplayPaused = !1, t.autoplaying ? f() : t.stopAutoplay())
                }))
            },
            t.minTranslate = function() {
                return - t.snapGrid[0]
            },
            t.maxTranslate = function() {
                return - t.snapGrid[t.snapGrid.length - 1]
            },
            t.updateAutoHeight = function() {
                var a = t.slides.eq(t.activeIndex)[0];
                if ("undefined" != typeof a) {
                    var b = a.offsetHeight;
                    b && t.wrapper.css("height", b + "px")
                }
            },
            t.updateContainerSize = function() {
                var a, b;
                a = "undefined" != typeof t.params.width ? t.params.width: t.container[0].clientWidth,
                b = "undefined" != typeof t.params.height ? t.params.height: t.container[0].clientHeight,
                0 === a && t.isHorizontal() || 0 === b && !t.isHorizontal() || (a = a - parseInt(t.container.css("padding-left"), 10) - parseInt(t.container.css("padding-right"), 10), b = b - parseInt(t.container.css("padding-top"), 10) - parseInt(t.container.css("padding-bottom"), 10), t.width = a, t.height = b, t.size = t.isHorizontal() ? t.width: t.height)
            },
            t.updateSlidesSize = function() {
                t.slides = t.wrapper.children("." + t.params.slideClass),
                t.snapGrid = [],
                t.slidesGrid = [],
                t.slidesSizesGrid = [];
                var a, b = t.params.spaceBetween,
                c = -t.params.slidesOffsetBefore,
                d = 0,
                f = 0;
                if ("undefined" != typeof t.size) {
                    "string" == typeof b && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * t.size),
                    t.virtualSize = -b,
                    t.rtl ? t.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : t.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var g;
                    t.params.slidesPerColumn > 1 && (g = Math.floor(t.slides.length / t.params.slidesPerColumn) === t.slides.length / t.params.slidesPerColumn ? t.slides.length: Math.ceil(t.slides.length / t.params.slidesPerColumn) * t.params.slidesPerColumn, "auto" !== t.params.slidesPerView && "row" === t.params.slidesPerColumnFill && (g = Math.max(g, t.params.slidesPerView * t.params.slidesPerColumn)));
                    var h, i = t.params.slidesPerColumn,
                    j = g / i,
                    k = j - (t.params.slidesPerColumn * j - t.slides.length);
                    for (a = 0; a < t.slides.length; a++) {
                        h = 0;
                        var l = t.slides.eq(a);
                        if (t.params.slidesPerColumn > 1) {
                            var m, n, o;
                            "column" === t.params.slidesPerColumnFill ? (n = Math.floor(a / i), o = a - n * i, (n > k || n === k && o === i - 1) && ++o >= i && (o = 0, n++), m = n + o * g / i, l.css({
                                "-webkit-box-ordinal-group": m,
                                "-moz-box-ordinal-group": m,
                                "-ms-flex-order": m,
                                "-webkit-order": m,
                                order: m
                            })) : (o = Math.floor(a / j), n = a - o * j),
                            l.css({
                                "margin-top": 0 !== o && t.params.spaceBetween && t.params.spaceBetween + "px"
                            }).attr("data-swiper-column", n).attr("data-swiper-row", o)
                        }
                        "none" !== l.css("display") && ("auto" === t.params.slidesPerView ? (h = t.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0), t.params.roundLengths && (h = e(h))) : (h = (t.size - (t.params.slidesPerView - 1) * b) / t.params.slidesPerView, t.params.roundLengths && (h = e(h)), t.isHorizontal() ? t.slides[a].style.width = h + "px": t.slides[a].style.height = h + "px"), t.slides[a].swiperSlideSize = h, t.slidesSizesGrid.push(h), t.params.centeredSlides ? (c = c + h / 2 + d / 2 + b, 0 === a && (c = c - t.size / 2 - b), Math.abs(c) < .001 && (c = 0), f % t.params.slidesPerGroup === 0 && t.snapGrid.push(c), t.slidesGrid.push(c)) : (f % t.params.slidesPerGroup === 0 && t.snapGrid.push(c), t.slidesGrid.push(c), c = c + h + b), t.virtualSize += h + b, d = h, f++)
                    }
                    t.virtualSize = Math.max(t.virtualSize, t.size) + t.params.slidesOffsetAfter;
                    var p;
                    if (t.rtl && t.wrongRTL && ("slide" === t.params.effect || "coverflow" === t.params.effect) && t.wrapper.css({
                        width: t.virtualSize + t.params.spaceBetween + "px"
                    }), t.support.flexbox && !t.params.setWrapperSize || (t.isHorizontal() ? t.wrapper.css({
                        width: t.virtualSize + t.params.spaceBetween + "px"
                    }) : t.wrapper.css({
                        height: t.virtualSize + t.params.spaceBetween + "px"
                    })), t.params.slidesPerColumn > 1 && (t.virtualSize = (h + t.params.spaceBetween) * g, t.virtualSize = Math.ceil(t.virtualSize / t.params.slidesPerColumn) - t.params.spaceBetween, t.wrapper.css({
                        width: t.virtualSize + t.params.spaceBetween + "px"
                    }), t.params.centeredSlides)) {
                        for (p = [], a = 0; a < t.snapGrid.length; a++) t.snapGrid[a] < t.virtualSize + t.snapGrid[0] && p.push(t.snapGrid[a]);
                        t.snapGrid = p
                    }
                    if (!t.params.centeredSlides) {
                        for (p = [], a = 0; a < t.snapGrid.length; a++) t.snapGrid[a] <= t.virtualSize - t.size && p.push(t.snapGrid[a]);
                        t.snapGrid = p,
                        Math.floor(t.virtualSize - t.size) - Math.floor(t.snapGrid[t.snapGrid.length - 1]) > 1 && t.snapGrid.push(t.virtualSize - t.size)
                    }
                    0 === t.snapGrid.length && (t.snapGrid = [0]),
                    0 !== t.params.spaceBetween && (t.isHorizontal() ? t.rtl ? t.slides.css({
                        marginLeft: b + "px"
                    }) : t.slides.css({
                        marginRight: b + "px"
                    }) : t.slides.css({
                        marginBottom: b + "px"
                    })),
                    t.params.watchSlidesProgress && t.updateSlidesOffset()
                }
            },
            t.updateSlidesOffset = function() {
                for (var a = 0; a < t.slides.length; a++) t.slides[a].swiperSlideOffset = t.isHorizontal() ? t.slides[a].offsetLeft: t.slides[a].offsetTop
            },
            t.updateSlidesProgress = function(a) {
                if ("undefined" == typeof a && (a = t.translate || 0), 0 !== t.slides.length) {
                    "undefined" == typeof t.slides[0].swiperSlideOffset && t.updateSlidesOffset();
                    var b = -a;
                    t.rtl && (b = a),
                    t.slides.removeClass(t.params.slideVisibleClass);
                    for (var c = 0; c < t.slides.length; c++) {
                        var d = t.slides[c],
                        e = (b - d.swiperSlideOffset) / (d.swiperSlideSize + t.params.spaceBetween);
                        if (t.params.watchSlidesVisibility) {
                            var f = -(b - d.swiperSlideOffset),
                            g = f + t.slidesSizesGrid[c],
                            h = f >= 0 && f < t.size || g > 0 && g <= t.size || 0 >= f && g >= t.size;
                            h && t.slides.eq(c).addClass(t.params.slideVisibleClass)
                        }
                        d.progress = t.rtl ? -e: e
                    }
                }
            },
            t.updateProgress = function(a) {
                "undefined" == typeof a && (a = t.translate || 0);
                var b = t.maxTranslate() - t.minTranslate(),
                c = t.isBeginning,
                d = t.isEnd;
                0 === b ? (t.progress = 0, t.isBeginning = t.isEnd = !0) : (t.progress = (a - t.minTranslate()) / b, t.isBeginning = t.progress <= 0, t.isEnd = t.progress >= 1),
                t.isBeginning && !c && t.emit("onReachBeginning", t),
                t.isEnd && !d && t.emit("onReachEnd", t),
                t.params.watchSlidesProgress && t.updateSlidesProgress(a),
                t.emit("onProgress", t, t.progress)
            },
            t.updateActiveIndex = function() {
                var a, b, c, d = t.rtl ? t.translate: -t.translate;
                for (b = 0; b < t.slidesGrid.length; b++)"undefined" != typeof t.slidesGrid[b + 1] ? d >= t.slidesGrid[b] && d < t.slidesGrid[b + 1] - (t.slidesGrid[b + 1] - t.slidesGrid[b]) / 2 ? a = b: d >= t.slidesGrid[b] && d < t.slidesGrid[b + 1] && (a = b + 1) : d >= t.slidesGrid[b] && (a = b); (0 > a || "undefined" == typeof a) && (a = 0),
                c = Math.floor(a / t.params.slidesPerGroup),
                c >= t.snapGrid.length && (c = t.snapGrid.length - 1),
                a !== t.activeIndex && (t.snapIndex = c, t.previousIndex = t.activeIndex, t.activeIndex = a, t.updateClasses())
            },
            t.updateClasses = function() {
                t.slides.removeClass(t.params.slideActiveClass + " " + t.params.slideNextClass + " " + t.params.slidePrevClass);
                var a = t.slides.eq(t.activeIndex);
                a.addClass(t.params.slideActiveClass);
                var c = a.next("." + t.params.slideClass).addClass(t.params.slideNextClass);
                t.params.loop && 0 === c.length && t.slides.eq(0).addClass(t.params.slideNextClass);
                var d = a.prev("." + t.params.slideClass).addClass(t.params.slidePrevClass);
                if (t.params.loop && 0 === d.length && t.slides.eq( - 1).addClass(t.params.slidePrevClass), t.paginationContainer && t.paginationContainer.length > 0) {
                    var e, f = t.params.loop ? Math.ceil((t.slides.length - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                    if (t.params.loop ? (e = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup), e > t.slides.length - 1 - 2 * t.loopedSlides && (e -= t.slides.length - 2 * t.loopedSlides), e > f - 1 && (e -= f), 0 > e && "bullets" !== t.params.paginationType && (e = f + e)) : e = "undefined" != typeof t.snapIndex ? t.snapIndex: t.activeIndex || 0, "bullets" === t.params.paginationType && t.bullets && t.bullets.length > 0 && (t.bullets.removeClass(t.params.bulletActiveClass), t.paginationContainer.length > 1 ? t.bullets.each(function() {
                        b(this).index() === e && b(this).addClass(t.params.bulletActiveClass)
                    }) : t.bullets.eq(e).addClass(t.params.bulletActiveClass)), "fraction" === t.params.paginationType && (t.paginationContainer.find("." + t.params.paginationCurrentClass).text(e + 1), t.paginationContainer.find("." + t.params.paginationTotalClass).text(f)), "progress" === t.params.paginationType) {
                        var g = (e + 1) / f,
                        h = g,
                        i = 1;
                        t.isHorizontal() || (i = g, h = 1),
                        t.paginationContainer.find("." + t.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + h + ") scaleY(" + i + ")").transition(t.params.speed)
                    }
                    "custom" === t.params.paginationType && t.params.paginationCustomRender && (t.paginationContainer.html(t.params.paginationCustomRender(t, e + 1, f)), t.emit("onPaginationRendered", t, t.paginationContainer[0]))
                }
                t.params.loop || (t.params.prevButton && t.prevButton && t.prevButton.length > 0 && (t.isBeginning ? (t.prevButton.addClass(t.params.buttonDisabledClass), t.params.a11y && t.a11y && t.a11y.disable(t.prevButton)) : (t.prevButton.removeClass(t.params.buttonDisabledClass), t.params.a11y && t.a11y && t.a11y.enable(t.prevButton))), t.params.nextButton && t.nextButton && t.nextButton.length > 0 && (t.isEnd ? (t.nextButton.addClass(t.params.buttonDisabledClass), t.params.a11y && t.a11y && t.a11y.disable(t.nextButton)) : (t.nextButton.removeClass(t.params.buttonDisabledClass), t.params.a11y && t.a11y && t.a11y.enable(t.nextButton))))
            },
            t.updatePagination = function() {
                if (t.params.pagination && t.paginationContainer && t.paginationContainer.length > 0) {
                    var a = "";
                    if ("bullets" === t.params.paginationType) {
                        for (var b = t.params.loop ? Math.ceil((t.slides.length - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length, c = 0; b > c; c++) a += t.params.paginationBulletRender ? t.params.paginationBulletRender(c, t.params.bulletClass) : "<" + t.params.paginationElement + ' class="' + t.params.bulletClass + '"></' + t.params.paginationElement + ">";
                        t.paginationContainer.html(a),
                        t.bullets = t.paginationContainer.find("." + t.params.bulletClass),
                        t.params.paginationClickable && t.params.a11y && t.a11y && t.a11y.initPagination()
                    }
                    "fraction" === t.params.paginationType && (a = t.params.paginationFractionRender ? t.params.paginationFractionRender(t, t.params.paginationCurrentClass, t.params.paginationTotalClass) : '<span class="' + t.params.paginationCurrentClass + '"></span> / <span class="' + t.params.paginationTotalClass + '"></span>', t.paginationContainer.html(a)),
                    "progress" === t.params.paginationType && (a = t.params.paginationProgressRender ? t.params.paginationProgressRender(t, t.params.paginationProgressbarClass) : '<span class="' + t.params.paginationProgressbarClass + '"></span>', t.paginationContainer.html(a)),
                    "custom" !== t.params.paginationType && t.emit("onPaginationRendered", t, t.paginationContainer[0])
                }
            },
            t.update = function(a) {
                function b() {
                    d = Math.min(Math.max(t.translate, t.maxTranslate()), t.minTranslate()),
                    t.setWrapperTranslate(d),
                    t.updateActiveIndex(),
                    t.updateClasses()
                }
                if (t.updateContainerSize(), t.updateSlidesSize(), t.updateProgress(), t.updatePagination(), t.updateClasses(), t.params.scrollbar && t.scrollbar && t.scrollbar.set(), a) {
                    var c, d;
                    t.controller && t.controller.spline && (t.controller.spline = void 0),
                    t.params.freeMode ? (b(), t.params.autoHeight && t.updateAutoHeight()) : (c = ("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0), c || b())
                } else t.params.autoHeight && t.updateAutoHeight()
            },
            t.onResize = function(a) {
                t.params.breakpoints && t.setBreakpoint();
                var b = t.params.allowSwipeToPrev,
                c = t.params.allowSwipeToNext;
                t.params.allowSwipeToPrev = t.params.allowSwipeToNext = !0,
                t.updateContainerSize(),
                t.updateSlidesSize(),
                ("auto" === t.params.slidesPerView || t.params.freeMode || a) && t.updatePagination(),
                t.params.scrollbar && t.scrollbar && t.scrollbar.set(),
                t.controller && t.controller.spline && (t.controller.spline = void 0);
                var d = !1;
                if (t.params.freeMode) {
                    var e = Math.min(Math.max(t.translate, t.maxTranslate()), t.minTranslate());
                    t.setWrapperTranslate(e),
                    t.updateActiveIndex(),
                    t.updateClasses(),
                    t.params.autoHeight && t.updateAutoHeight()
                } else t.updateClasses(),
                d = ("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0);
                t.params.lazyLoading && !d && t.lazy && t.lazy.load(),
                t.params.allowSwipeToPrev = b,
                t.params.allowSwipeToNext = c
            };
            var v = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? v = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (v = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
            t.touchEvents = {
                start: t.support.touch || !t.params.simulateTouch ? "touchstart": v[0],
                move: t.support.touch || !t.params.simulateTouch ? "touchmove": v[1],
                end: t.support.touch || !t.params.simulateTouch ? "touchend": v[2]
            },
            (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === t.params.touchEventsTarget ? t.container: t.wrapper).addClass("swiper-wp8-" + t.params.direction),
            t.initEvents = function(a) {
                var b = a ? "off": "on",
                c = a ? "removeEventListener": "addEventListener",
                e = "container" === t.params.touchEventsTarget ? t.container[0] : t.wrapper[0],
                f = t.support.touch ? e: document,
                g = !!t.params.nested;
                t.browser.ie ? (e[c](t.touchEvents.start, t.onTouchStart, !1), f[c](t.touchEvents.move, t.onTouchMove, g), f[c](t.touchEvents.end, t.onTouchEnd, !1)) : (t.support.touch && (e[c](t.touchEvents.start, t.onTouchStart, !1), e[c](t.touchEvents.move, t.onTouchMove, g), e[c](t.touchEvents.end, t.onTouchEnd, !1)), !d.simulateTouch || t.device.ios || t.device.android || (e[c]("mousedown", t.onTouchStart, !1), document[c]("mousemove", t.onTouchMove, g), document[c]("mouseup", t.onTouchEnd, !1))),
                window[c]("resize", t.onResize),
                t.params.nextButton && t.nextButton && t.nextButton.length > 0 && (t.nextButton[b]("click", t.onClickNext), t.params.a11y && t.a11y && t.nextButton[b]("keydown", t.a11y.onEnterKey)),
                t.params.prevButton && t.prevButton && t.prevButton.length > 0 && (t.prevButton[b]("click", t.onClickPrev), t.params.a11y && t.a11y && t.prevButton[b]("keydown", t.a11y.onEnterKey)),
                t.params.pagination && t.params.paginationClickable && (t.paginationContainer[b]("click", "." + t.params.bulletClass, t.onClickIndex), t.params.a11y && t.a11y && t.paginationContainer[b]("keydown", "." + t.params.bulletClass, t.a11y.onEnterKey)),
                (t.params.preventClicks || t.params.preventClicksPropagation) && e[c]("click", t.preventClicks, !0)
            },
            t.attachEvents = function() {
                t.initEvents()
            },
            t.detachEvents = function() {
                t.initEvents(!0)
            },
            t.allowClick = !0,
            t.preventClicks = function(a) {
                t.allowClick || (t.params.preventClicks && a.preventDefault(), t.params.preventClicksPropagation && t.animating && (a.stopPropagation(), a.stopImmediatePropagation()))
            },
            t.onClickNext = function(a) {
                a.preventDefault(),
                t.isEnd && !t.params.loop || t.slideNext()
            },
            t.onClickPrev = function(a) {
                a.preventDefault(),
                t.isBeginning && !t.params.loop || t.slidePrev()
            },
            t.onClickIndex = function(a) {
                a.preventDefault();
                var c = b(this).index() * t.params.slidesPerGroup;
                t.params.loop && (c += t.loopedSlides),
                t.slideTo(c)
            },
            t.updateClickedSlide = function(a) {
                var c = g(a, "." + t.params.slideClass),
                d = !1;
                if (c) for (var e = 0; e < t.slides.length; e++) t.slides[e] === c && (d = !0);
                if (!c || !d) return t.clickedSlide = void 0,
                void(t.clickedIndex = void 0);
                if (t.clickedSlide = c, t.clickedIndex = b(c).index(), t.params.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex) {
                    var f, h = t.clickedIndex;
                    if (t.params.loop) {
                        if (t.animating) return;
                        f = b(t.clickedSlide).attr("data-swiper-slide-index"),
                        t.params.centeredSlides ? h < t.loopedSlides - t.params.slidesPerView / 2 || h > t.slides.length - t.loopedSlides + t.params.slidesPerView / 2 ? (t.fixLoop(), h = t.wrapper.children("." + t.params.slideClass + '[data-swiper-slide-index="' + f + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                            t.slideTo(h)
                        },
                        0)) : t.slideTo(h) : h > t.slides.length - t.params.slidesPerView ? (t.fixLoop(), h = t.wrapper.children("." + t.params.slideClass + '[data-swiper-slide-index="' + f + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                            t.slideTo(h)
                        },
                        0)) : t.slideTo(h)
                    } else t.slideTo(h)
                }
            };
            var w, x, y, z, A, B, C, D, E, F, G = "input, select, textarea, button",
            H = Date.now(),
            I = [];
            t.animating = !1,
            t.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var J, K;
            if (t.onTouchStart = function(a) {
                if (a.originalEvent && (a = a.originalEvent), J = "touchstart" === a.type, J || !("which" in a) || 3 !== a.which) {
                    if (t.params.noSwiping && g(a, "." + t.params.noSwipingClass)) return void(t.allowClick = !0);
                    if (!t.params.swipeHandler || g(a, t.params.swipeHandler)) {
                        var c = t.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX: a.pageX,
                        d = t.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY: a.pageY;
                        if (! (t.device.ios && t.params.iOSEdgeSwipeDetection && c <= t.params.iOSEdgeSwipeThreshold)) {
                            if (w = !0, x = !1, y = !0, A = void 0, K = void 0, t.touches.startX = c, t.touches.startY = d, z = Date.now(), t.allowClick = !0, t.updateContainerSize(), t.swipeDirection = void 0, t.params.threshold > 0 && (D = !1), "touchstart" !== a.type) {
                                var e = !0;
                                b(a.target).is(G) && (e = !1),
                                document.activeElement && b(document.activeElement).is(G) && document.activeElement.blur(),
                                e && a.preventDefault()
                            }
                            t.emit("onTouchStart", t, a)
                        }
                    }
                }
            },
            t.onTouchMove = function(a) {
                if (a.originalEvent && (a = a.originalEvent), !J || "mousemove" !== a.type) {
                    if (a.preventedByNestedSwiper) return t.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX: a.pageX,
                    void(t.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY: a.pageY);
                    if (t.params.onlyExternal) return t.allowClick = !1,
                    void(w && (t.touches.startX = t.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX: a.pageX, t.touches.startY = t.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY: a.pageY, z = Date.now()));
                    if (J && document.activeElement && a.target === document.activeElement && b(a.target).is(G)) return x = !0,
                    void(t.allowClick = !1);
                    if (y && t.emit("onTouchMove", t, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                        if (t.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX: a.pageX, t.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY: a.pageY, "undefined" == typeof A) {
                            var c = 180 * Math.atan2(Math.abs(t.touches.currentY - t.touches.startY), Math.abs(t.touches.currentX - t.touches.startX)) / Math.PI;
                            A = t.isHorizontal() ? c > t.params.touchAngle: 90 - c > t.params.touchAngle
                        }
                        if (A && t.emit("onTouchMoveOpposite", t, a), "undefined" == typeof K && t.browser.ieTouch && (t.touches.currentX === t.touches.startX && t.touches.currentY === t.touches.startY || (K = !0)), w) {
                            if (A) return void(w = !1);
                            if (K || !t.browser.ieTouch) {
                                t.allowClick = !1,
                                t.emit("onSliderMove", t, a),
                                a.preventDefault(),
                                t.params.touchMoveStopPropagation && !t.params.nested && a.stopPropagation(),
                                x || (d.loop && t.fixLoop(), C = t.getWrapperTranslate(), t.setWrapperTransition(0), t.animating && t.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), t.params.autoplay && t.autoplaying && (t.params.autoplayDisableOnInteraction ? t.stopAutoplay() : t.pauseAutoplay()), F = !1, t.params.grabCursor && (t.container[0].style.cursor = "move", t.container[0].style.cursor = "-webkit-grabbing", t.container[0].style.cursor = "-moz-grabbin", t.container[0].style.cursor = "grabbing")),
                                x = !0;
                                var e = t.touches.diff = t.isHorizontal() ? t.touches.currentX - t.touches.startX: t.touches.currentY - t.touches.startY;
                                e *= t.params.touchRatio,
                                t.rtl && (e = -e),
                                t.swipeDirection = e > 0 ? "prev": "next",
                                B = e + C;
                                var f = !0;
                                if (e > 0 && B > t.minTranslate() ? (f = !1, t.params.resistance && (B = t.minTranslate() - 1 + Math.pow( - t.minTranslate() + C + e, t.params.resistanceRatio))) : 0 > e && B < t.maxTranslate() && (f = !1, t.params.resistance && (B = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - C - e, t.params.resistanceRatio))), f && (a.preventedByNestedSwiper = !0), !t.params.allowSwipeToNext && "next" === t.swipeDirection && C > B && (B = C), !t.params.allowSwipeToPrev && "prev" === t.swipeDirection && B > C && (B = C), t.params.followFinger) {
                                    if (t.params.threshold > 0) {
                                        if (! (Math.abs(e) > t.params.threshold || D)) return void(B = C);
                                        if (!D) return D = !0,
                                        t.touches.startX = t.touches.currentX,
                                        t.touches.startY = t.touches.currentY,
                                        B = C,
                                        void(t.touches.diff = t.isHorizontal() ? t.touches.currentX - t.touches.startX: t.touches.currentY - t.touches.startY)
                                    } (t.params.freeMode || t.params.watchSlidesProgress) && t.updateActiveIndex(),
                                    t.params.freeMode && (0 === I.length && I.push({
                                        position: t.touches[t.isHorizontal() ? "startX": "startY"],
                                        time: z
                                    }), I.push({
                                        position: t.touches[t.isHorizontal() ? "currentX": "currentY"],
                                        time: (new window.Date).getTime()
                                    })),
                                    t.updateProgress(B),
                                    t.setWrapperTranslate(B)
                                }
                            }
                        }
                    }
                }
            },
            t.onTouchEnd = function(a) {
                if (a.originalEvent && (a = a.originalEvent), y && t.emit("onTouchEnd", t, a), y = !1, w) {
                    t.params.grabCursor && x && w && (t.container[0].style.cursor = "move", t.container[0].style.cursor = "-webkit-grab", t.container[0].style.cursor = "-moz-grab", t.container[0].style.cursor = "grab");
                    var c = Date.now(),
                    d = c - z;
                    if (t.allowClick && (t.updateClickedSlide(a), t.emit("onTap", t, a), 300 > d && c - H > 300 && (E && clearTimeout(E), E = setTimeout(function() {
                        t && (t.params.paginationHide && t.paginationContainer.length > 0 && !b(a.target).hasClass(t.params.bulletClass) && t.paginationContainer.toggleClass(t.params.paginationHiddenClass), t.emit("onClick", t, a))
                    },
                    300)), 300 > d && 300 > c - H && (E && clearTimeout(E), t.emit("onDoubleTap", t, a))), H = Date.now(), setTimeout(function() {
                        t && (t.allowClick = !0)
                    },
                    0), !w || !x || !t.swipeDirection || 0 === t.touches.diff || B === C) return void(w = x = !1);
                    w = x = !1;
                    var e;
                    if (e = t.params.followFinger ? t.rtl ? t.translate: -t.translate: -B, t.params.freeMode) {
                        if (e < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                        if (e > -t.maxTranslate()) return void(t.slides.length < t.snapGrid.length ? t.slideTo(t.snapGrid.length - 1) : t.slideTo(t.slides.length - 1));
                        if (t.params.freeModeMomentum) {
                            if (I.length > 1) {
                                var f = I.pop(),
                                g = I.pop(),
                                h = f.position - g.position,
                                i = f.time - g.time;
                                t.velocity = h / i,
                                t.velocity = t.velocity / 2,
                                Math.abs(t.velocity) < t.params.freeModeMinimumVelocity && (t.velocity = 0),
                                (i > 150 || (new window.Date).getTime() - f.time > 300) && (t.velocity = 0)
                            } else t.velocity = 0;
                            I.length = 0;
                            var j = 1e3 * t.params.freeModeMomentumRatio,
                            k = t.velocity * j,
                            l = t.translate + k;
                            t.rtl && (l = -l);
                            var m, n = !1,
                            o = 20 * Math.abs(t.velocity) * t.params.freeModeMomentumBounceRatio;
                            if (l < t.maxTranslate()) t.params.freeModeMomentumBounce ? (l + t.maxTranslate() < -o && (l = t.maxTranslate() - o), m = t.maxTranslate(), n = !0, F = !0) : l = t.maxTranslate();
                            else if (l > t.minTranslate()) t.params.freeModeMomentumBounce ? (l - t.minTranslate() > o && (l = t.minTranslate() + o), m = t.minTranslate(), n = !0, F = !0) : l = t.minTranslate();
                            else if (t.params.freeModeSticky) {
                                var p, q = 0;
                                for (q = 0; q < t.snapGrid.length; q += 1) if (t.snapGrid[q] > -l) {
                                    p = q;
                                    break
                                }
                                l = Math.abs(t.snapGrid[p] - l) < Math.abs(t.snapGrid[p - 1] - l) || "next" === t.swipeDirection ? t.snapGrid[p] : t.snapGrid[p - 1],
                                t.rtl || (l = -l)
                            }
                            if (0 !== t.velocity) j = t.rtl ? Math.abs(( - l - t.translate) / t.velocity) : Math.abs((l - t.translate) / t.velocity);
                            else if (t.params.freeModeSticky) return void t.slideReset();
                            t.params.freeModeMomentumBounce && n ? (t.updateProgress(m), t.setWrapperTransition(j), t.setWrapperTranslate(l), t.onTransitionStart(), t.animating = !0, t.wrapper.transitionEnd(function() {
                                t && F && (t.emit("onMomentumBounce", t), t.setWrapperTransition(t.params.speed), t.setWrapperTranslate(m), t.wrapper.transitionEnd(function() {
                                    t && t.onTransitionEnd()
                                }))
                            })) : t.velocity ? (t.updateProgress(l), t.setWrapperTransition(j), t.setWrapperTranslate(l), t.onTransitionStart(), t.animating || (t.animating = !0, t.wrapper.transitionEnd(function() {
                                t && t.onTransitionEnd()
                            }))) : t.updateProgress(l),
                            t.updateActiveIndex()
                        }
                        return void((!t.params.freeModeMomentum || d >= t.params.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex()))
                    }
                    var r, s = 0,
                    u = t.slidesSizesGrid[0];
                    for (r = 0; r < t.slidesGrid.length; r += t.params.slidesPerGroup)"undefined" != typeof t.slidesGrid[r + t.params.slidesPerGroup] ? e >= t.slidesGrid[r] && e < t.slidesGrid[r + t.params.slidesPerGroup] && (s = r, u = t.slidesGrid[r + t.params.slidesPerGroup] - t.slidesGrid[r]) : e >= t.slidesGrid[r] && (s = r, u = t.slidesGrid[t.slidesGrid.length - 1] - t.slidesGrid[t.slidesGrid.length - 2]);
                    var v = (e - t.slidesGrid[s]) / u;
                    if (d > t.params.longSwipesMs) {
                        if (!t.params.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (v >= t.params.longSwipesRatio ? t.slideTo(s + t.params.slidesPerGroup) : t.slideTo(s)),
                        "prev" === t.swipeDirection && (v > 1 - t.params.longSwipesRatio ? t.slideTo(s + t.params.slidesPerGroup) : t.slideTo(s))
                    } else {
                        if (!t.params.shortSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && t.slideTo(s + t.params.slidesPerGroup),
                        "prev" === t.swipeDirection && t.slideTo(s)
                    }
                }
            },
            t._slideTo = function(a, b) {
                return t.slideTo(a, b, !0, !0)
            },
            t.slideTo = function(a, b, c, d) {
                "undefined" == typeof c && (c = !0),
                "undefined" == typeof a && (a = 0),
                0 > a && (a = 0),
                t.snapIndex = Math.floor(a / t.params.slidesPerGroup),
                t.snapIndex >= t.snapGrid.length && (t.snapIndex = t.snapGrid.length - 1);
                var e = -t.snapGrid[t.snapIndex];
                t.params.autoplay && t.autoplaying && (d || !t.params.autoplayDisableOnInteraction ? t.pauseAutoplay(b) : t.stopAutoplay()),
                t.updateProgress(e);
                for (var f = 0; f < t.slidesGrid.length; f++) - Math.floor(100 * e) >= Math.floor(100 * t.slidesGrid[f]) && (a = f);
                return ! (!t.params.allowSwipeToNext && e < t.translate && e < t.minTranslate()) && (!(!t.params.allowSwipeToPrev && e > t.translate && e > t.maxTranslate() && (t.activeIndex || 0) !== a) && ("undefined" == typeof b && (b = t.params.speed), t.previousIndex = t.activeIndex || 0, t.activeIndex = a, t.rtl && -e === t.translate || !t.rtl && e === t.translate ? (t.params.autoHeight && t.updateAutoHeight(), t.updateClasses(), "slide" !== t.params.effect && t.setWrapperTranslate(e), !1) : (t.updateClasses(), t.onTransitionStart(c), 0 === b ? (t.setWrapperTranslate(e), t.setWrapperTransition(0), t.onTransitionEnd(c)) : (t.setWrapperTranslate(e), t.setWrapperTransition(b), t.animating || (t.animating = !0, t.wrapper.transitionEnd(function() {
                    t && t.onTransitionEnd(c)
                }))), !0)))
            },
            t.onTransitionStart = function(a) {
                "undefined" == typeof a && (a = !0),
                t.params.autoHeight && t.updateAutoHeight(),
                t.lazy && t.lazy.onTransitionStart(),
                a && (t.emit("onTransitionStart", t), t.activeIndex !== t.previousIndex && (t.emit("onSlideChangeStart", t), t.activeIndex > t.previousIndex ? t.emit("onSlideNextStart", t) : t.emit("onSlidePrevStart", t)))
            },
            t.onTransitionEnd = function(a) {
                t.animating = !1,
                t.setWrapperTransition(0),
                "undefined" == typeof a && (a = !0),
                t.lazy && t.lazy.onTransitionEnd(),
                a && (t.emit("onTransitionEnd", t), t.activeIndex !== t.previousIndex && (t.emit("onSlideChangeEnd", t), t.activeIndex > t.previousIndex ? t.emit("onSlideNextEnd", t) : t.emit("onSlidePrevEnd", t))),
                t.params.hashnav && t.hashnav && t.hashnav.setHash()
            },
            t.slideNext = function(a, b, c) {
                return t.params.loop ? !t.animating && (t.fixLoop(), t.container[0].clientLeft, t.slideTo(t.activeIndex + t.params.slidesPerGroup, b, a, c)) : t.slideTo(t.activeIndex + t.params.slidesPerGroup, b, a, c)
            },
            t._slideNext = function(a) {
                return t.slideNext(!0, a, !0)
            },
            t.slidePrev = function(a, b, c) {
                return t.params.loop ? !t.animating && (t.fixLoop(), t.container[0].clientLeft, t.slideTo(t.activeIndex - 1, b, a, c)) : t.slideTo(t.activeIndex - 1, b, a, c)
            },
            t._slidePrev = function(a) {
                return t.slidePrev(!0, a, !0)
            },
            t.slideReset = function(a, b, c) {
                return t.slideTo(t.activeIndex, b, a)
            },
            t.setWrapperTransition = function(a, b) {
                t.wrapper.transition(a),
                "slide" !== t.params.effect && t.effects[t.params.effect] && t.effects[t.params.effect].setTransition(a),
                t.params.parallax && t.parallax && t.parallax.setTransition(a),
                t.params.scrollbar && t.scrollbar && t.scrollbar.setTransition(a),
                t.params.control && t.controller && t.controller.setTransition(a, b),
                t.emit("onSetTransition", t, a)
            },
            t.setWrapperTranslate = function(a, b, c) {
                var d = 0,
                f = 0,
                g = 0;
                t.isHorizontal() ? d = t.rtl ? -a: a: f = a,
                t.params.roundLengths && (d = e(d), f = e(f)),
                t.params.virtualTranslate || (t.support.transforms3d ? t.wrapper.transform("translate3d(" + d + "px, " + f + "px, " + g + "px)") : t.wrapper.transform("translate(" + d + "px, " + f + "px)")),
                t.translate = t.isHorizontal() ? d: f;
                var h, i = t.maxTranslate() - t.minTranslate();
                h = 0 === i ? 0 : (a - t.minTranslate()) / i,
                h !== t.progress && t.updateProgress(a),
                b && t.updateActiveIndex(),
                "slide" !== t.params.effect && t.effects[t.params.effect] && t.effects[t.params.effect].setTranslate(t.translate),
                t.params.parallax && t.parallax && t.parallax.setTranslate(t.translate),
                t.params.scrollbar && t.scrollbar && t.scrollbar.setTranslate(t.translate),
                t.params.control && t.controller && t.controller.setTranslate(t.translate, c),
                t.emit("onSetTranslate", t, t.translate)
            },
            t.getTranslate = function(a, b) {
                var c, d, e, f;
                return "undefined" == typeof b && (b = "x"),
                t.params.virtualTranslate ? t.rtl ? -t.translate: t.translate: (e = window.getComputedStyle(a, null), window.WebKitCSSMatrix ? (d = e.transform || e.webkitTransform, d.split(",").length > 6 && (d = d.split(", ").map(function(a) {
                    return a.replace(",", ".")
                }).join(", ")), f = new window.WebKitCSSMatrix("none" === d ? "": d)) : (f = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), c = f.toString().split(",")), "x" === b && (d = window.WebKitCSSMatrix ? f.m41: 16 === c.length ? parseFloat(c[12]) : parseFloat(c[4])), "y" === b && (d = window.WebKitCSSMatrix ? f.m42: 16 === c.length ? parseFloat(c[13]) : parseFloat(c[5])), t.rtl && d && (d = -d), d || 0)
            },
            t.getWrapperTranslate = function(a) {
                return "undefined" == typeof a && (a = t.isHorizontal() ? "x": "y"),
                t.getTranslate(t.wrapper[0], a)
            },
            t.observers = [], t.initObservers = function() {
                if (t.params.observeParents) for (var a = t.container.parents(), b = 0; b < a.length; b++) h(a[b]);
                h(t.container[0], {
                    childList: !1
                }),
                h(t.wrapper[0], {
                    attributes: !1
                })
            },
            t.disconnectObservers = function() {
                for (var a = 0; a < t.observers.length; a++) t.observers[a].disconnect();
                t.observers = []
            },
            t.createLoop = function() {
                t.wrapper.children("." + t.params.slideClass + "." + t.params.slideDuplicateClass).remove();
                var a = t.wrapper.children("." + t.params.slideClass);
                "auto" !== t.params.slidesPerView || t.params.loopedSlides || (t.params.loopedSlides = a.length),
                t.loopedSlides = parseInt(t.params.loopedSlides || t.params.slidesPerView, 10),
                t.loopedSlides = t.loopedSlides + t.params.loopAdditionalSlides,
                t.loopedSlides > a.length && (t.loopedSlides = a.length);
                var c, d = [],
                e = [];
                for (a.each(function(c, f) {
                    var g = b(this);
                    c < t.loopedSlides && e.push(f),
                    c < a.length && c >= a.length - t.loopedSlides && d.push(f),
                    g.attr("data-swiper-slide-index", c)
                }), c = 0; c < e.length; c++) t.wrapper.append(b(e[c].cloneNode(!0)).addClass(t.params.slideDuplicateClass));
                for (c = d.length - 1; c >= 0; c--) t.wrapper.prepend(b(d[c].cloneNode(!0)).addClass(t.params.slideDuplicateClass))
            },
            t.destroyLoop = function() {
                t.wrapper.children("." + t.params.slideClass + "." + t.params.slideDuplicateClass).remove(),
                t.slides.removeAttr("data-swiper-slide-index")
            },
            t.reLoop = function(a) {
                var b = t.activeIndex - t.loopedSlides;
                t.destroyLoop(),
                t.createLoop(),
                t.updateSlidesSize(),
                a && t.slideTo(b + t.loopedSlides, 0, !1)
            },
            t.fixLoop = function() {
                var a;
                t.activeIndex < t.loopedSlides ? (a = t.slides.length - 3 * t.loopedSlides + t.activeIndex, a += t.loopedSlides, t.slideTo(a, 0, !1, !0)) : ("auto" === t.params.slidesPerView && t.activeIndex >= 2 * t.loopedSlides || t.activeIndex > t.slides.length - 2 * t.params.slidesPerView) && (a = -t.slides.length + t.activeIndex + t.loopedSlides, a += t.loopedSlides, t.slideTo(a, 0, !1, !0))
            },
            t.appendSlide = function(a) {
                if (t.params.loop && t.destroyLoop(), "object" == typeof a && a.length) for (var b = 0; b < a.length; b++) a[b] && t.wrapper.append(a[b]);
                else t.wrapper.append(a);
                t.params.loop && t.createLoop(),
                t.params.observer && t.support.observer || t.update(!0)
            },
            t.prependSlide = function(a) {
                t.params.loop && t.destroyLoop();
                var b = t.activeIndex + 1;
                if ("object" == typeof a && a.length) {
                    for (var c = 0; c < a.length; c++) a[c] && t.wrapper.prepend(a[c]);
                    b = t.activeIndex + a.length
                } else t.wrapper.prepend(a);
                t.params.loop && t.createLoop(),
                t.params.observer && t.support.observer || t.update(!0),
                t.slideTo(b, 0, !1)
            },
            t.removeSlide = function(a) {
                t.params.loop && (t.destroyLoop(), t.slides = t.wrapper.children("." + t.params.slideClass));
                var b, c = t.activeIndex;
                if ("object" == typeof a && a.length) {
                    for (var d = 0; d < a.length; d++) b = a[d],
                    t.slides[b] && t.slides.eq(b).remove(),
                    c > b && c--;
                    c = Math.max(c, 0)
                } else b = a,
                t.slides[b] && t.slides.eq(b).remove(),
                c > b && c--,
                c = Math.max(c, 0);
                t.params.loop && t.createLoop(),
                t.params.observer && t.support.observer || t.update(!0),
                t.params.loop ? t.slideTo(c + t.loopedSlides, 0, !1) : t.slideTo(c, 0, !1)
            },
            t.removeAllSlides = function() {
                for (var a = [], b = 0; b < t.slides.length; b++) a.push(b);
                t.removeSlide(a)
            },
            t.effects = {
                fade: {
                    setTranslate: function() {
                        for (var a = 0; a < t.slides.length; a++) {
                            var b = t.slides.eq(a),
                            c = b[0].swiperSlideOffset,
                            d = -c;
                            t.params.virtualTranslate || (d -= t.translate);
                            var e = 0;
                            t.isHorizontal() || (e = d, d = 0);
                            var f = t.params.fade.crossFade ? Math.max(1 - Math.abs(b[0].progress), 0) : 1 + Math.min(Math.max(b[0].progress, -1), 0);
                            b.css({
                                opacity: f
                            }).transform("translate3d(" + d + "px, " + e + "px, 0px)")
                        }
                    },
                    setTransition: function(a) {
                        if (t.slides.transition(a), t.params.virtualTranslate && 0 !== a) {
                            var b = !1;
                            t.slides.transitionEnd(function() {
                                if (!b && t) {
                                    b = !0,
                                    t.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], c = 0; c < a.length; c++) t.wrapper.trigger(a[c])
                                }
                            })
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var a = 0; a < t.slides.length; a++) {
                            var c = t.slides.eq(a),
                            d = c[0].progress;
                            t.params.flip.limitRotation && (d = Math.max(Math.min(c[0].progress, 1), -1));
                            var e = c[0].swiperSlideOffset,
                            f = -180 * d,
                            g = f,
                            h = 0,
                            i = -e,
                            j = 0;
                            if (t.isHorizontal() ? t.rtl && (g = -g) : (j = i, i = 0, h = -g, g = 0), c[0].style.zIndex = -Math.abs(Math.round(d)) + t.slides.length, t.params.flip.slideShadows) {
                                var k = t.isHorizontal() ? c.find(".swiper-slide-shadow-left") : c.find(".swiper-slide-shadow-top"),
                                l = t.isHorizontal() ? c.find(".swiper-slide-shadow-right") : c.find(".swiper-slide-shadow-bottom");
                                0 === k.length && (k = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left": "top") + '"></div>'), c.append(k)),
                                0 === l.length && (l = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right": "bottom") + '"></div>'), c.append(l)),
                                k.length && (k[0].style.opacity = Math.max( - d, 0)),
                                l.length && (l[0].style.opacity = Math.max(d, 0))
                            }
                            c.transform("translate3d(" + i + "px, " + j + "px, 0px) rotateX(" + h + "deg) rotateY(" + g + "deg)")
                        }
                    },
                    setTransition: function(a) {
                        if (t.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), t.params.virtualTranslate && 0 !== a) {
                            var c = !1;
                            t.slides.eq(t.activeIndex).transitionEnd(function() {
                                if (!c && t && b(this).hasClass(t.params.slideActiveClass)) {
                                    c = !0,
                                    t.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], d = 0; d < a.length; d++) t.wrapper.trigger(a[d])
                                }
                            })
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var a, c = 0;
                        t.params.cube.shadow && (t.isHorizontal() ? (a = t.wrapper.find(".swiper-cube-shadow"), 0 === a.length && (a = b('<div class="swiper-cube-shadow"></div>'), t.wrapper.append(a)), a.css({
                            height: t.width + "px"
                        })) : (a = t.container.find(".swiper-cube-shadow"), 0 === a.length && (a = b('<div class="swiper-cube-shadow"></div>'), t.container.append(a))));
                        for (var d = 0; d < t.slides.length; d++) {
                            var e = t.slides.eq(d),
                            f = 90 * d,
                            g = Math.floor(f / 360);
                            t.rtl && (f = -f, g = Math.floor( - f / 360));
                            var h = Math.max(Math.min(e[0].progress, 1), -1),
                            i = 0,
                            j = 0,
                            k = 0;
                            d % 4 === 0 ? (i = 4 * -g * t.size, k = 0) : (d - 1) % 4 === 0 ? (i = 0, k = 4 * -g * t.size) : (d - 2) % 4 === 0 ? (i = t.size + 4 * g * t.size, k = t.size) : (d - 3) % 4 === 0 && (i = -t.size, k = 3 * t.size + 4 * t.size * g),
                            t.rtl && (i = -i),
                            t.isHorizontal() || (j = i, i = 0);
                            var l = "rotateX(" + (t.isHorizontal() ? 0 : -f) + "deg) rotateY(" + (t.isHorizontal() ? f: 0) + "deg) translate3d(" + i + "px, " + j + "px, " + k + "px)";
                            if (1 >= h && h > -1 && (c = 90 * d + 90 * h, t.rtl && (c = 90 * -d - 90 * h)), e.transform(l), t.params.cube.slideShadows) {
                                var m = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                                n = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
                                0 === m.length && (m = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left": "top") + '"></div>'), e.append(m)),
                                0 === n.length && (n = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right": "bottom") + '"></div>'), e.append(n)),
                                m.length && (m[0].style.opacity = Math.max( - h, 0)),
                                n.length && (n[0].style.opacity = Math.max(h, 0))
                            }
                        }
                        if (t.wrapper.css({
                            "-webkit-transform-origin": "50% 50% -" + t.size / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + t.size / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + t.size / 2 + "px",
                            "transform-origin": "50% 50% -" + t.size / 2 + "px"
                        }), t.params.cube.shadow) if (t.isHorizontal()) a.transform("translate3d(0px, " + (t.width / 2 + t.params.cube.shadowOffset) + "px, " + -t.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + t.params.cube.shadowScale + ")");
                        else {
                            var o = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                            p = 1.5 - (Math.sin(2 * o * Math.PI / 360) / 2 + Math.cos(2 * o * Math.PI / 360) / 2),
                            q = t.params.cube.shadowScale,
                            r = t.params.cube.shadowScale / p,
                            s = t.params.cube.shadowOffset;
                            a.transform("scale3d(" + q + ", 1, " + r + ") translate3d(0px, " + (t.height / 2 + s) + "px, " + -t.height / 2 / r + "px) rotateX(-90deg)")
                        }
                        var u = t.isSafari || t.isUiWebView ? -t.size / 2 : 0;
                        t.wrapper.transform("translate3d(0px,0," + u + "px) rotateX(" + (t.isHorizontal() ? 0 : c) + "deg) rotateY(" + (t.isHorizontal() ? -c: 0) + "deg)")
                    },
                    setTransition: function(a) {
                        t.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),
                        t.params.cube.shadow && !t.isHorizontal() && t.container.find(".swiper-cube-shadow").transition(a)
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var a = t.translate,
                        c = t.isHorizontal() ? -a + t.width / 2 : -a + t.height / 2, d = t.isHorizontal() ? t.params.coverflow.rotate: -t.params.coverflow.rotate, e = t.params.coverflow.depth, f = 0, g = t.slides.length; g > f; f++) {
                            var h = t.slides.eq(f),
                            i = t.slidesSizesGrid[f],
                            j = h[0].swiperSlideOffset,
                            k = (c - j - i / 2) / i * t.params.coverflow.modifier,
                            l = t.isHorizontal() ? d * k: 0,
                            m = t.isHorizontal() ? 0 : d * k,
                            n = -e * Math.abs(k),
                            o = t.isHorizontal() ? 0 : t.params.coverflow.stretch * k,
                            p = t.isHorizontal() ? t.params.coverflow.stretch * k: 0;
                            Math.abs(p) < .001 && (p = 0),
                            Math.abs(o) < .001 && (o = 0),
                            Math.abs(n) < .001 && (n = 0),
                            Math.abs(l) < .001 && (l = 0),
                            Math.abs(m) < .001 && (m = 0);
                            var q = "translate3d(" + p + "px," + o + "px," + n + "px)  rotateX(" + m + "deg) rotateY(" + l + "deg)";
                            if (h.transform(q), h[0].style.zIndex = -Math.abs(Math.round(k)) + 1, t.params.coverflow.slideShadows) {
                                var r = t.isHorizontal() ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"),
                                s = t.isHorizontal() ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
                                0 === r.length && (r = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left": "top") + '"></div>'), h.append(r)),
                                0 === s.length && (s = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right": "bottom") + '"></div>'), h.append(s)),
                                r.length && (r[0].style.opacity = k > 0 ? k: 0),
                                s.length && (s[0].style.opacity = -k > 0 ? -k: 0)
                            }
                        }
                        if (t.browser.ie) {
                            var u = t.wrapper[0].style;
                            u.perspectiveOrigin = c + "px 50%"
                        }
                    },
                    setTransition: function(a) {
                        t.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a)
                    }
                }
            },
            t.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(a, c) {
                    if ("undefined" != typeof a && ("undefined" == typeof c && (c = !0), 0 !== t.slides.length)) {
                        var d = t.slides.eq(a),
                        e = d.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)"); ! d.hasClass("swiper-lazy") || d.hasClass("swiper-lazy-loaded") || d.hasClass("swiper-lazy-loading") || (e = e.add(d[0])),
                        0 !== e.length && e.each(function() {
                            var a = b(this);
                            a.addClass("swiper-lazy-loading");
                            var e = a.attr("data-background"),
                            f = a.attr("data-src"),
                            g = a.attr("data-srcset");
                            t.loadImage(a[0], f || e, g, !1,
                            function() {
                                if (e ? (a.css("background-image", 'url("' + e + '")'), a.removeAttr("data-background")) : (g && (a.attr("srcset", g), a.removeAttr("data-srcset")), f && (a.attr("src", f), a.removeAttr("data-src"))), a.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), d.find(".swiper-lazy-preloader, .preloader").remove(), t.params.loop && c) {
                                    var b = d.attr("data-swiper-slide-index");
                                    if (d.hasClass(t.params.slideDuplicateClass)) {
                                        var h = t.wrapper.children('[data-swiper-slide-index="' + b + '"]:not(.' + t.params.slideDuplicateClass + ")");
                                        t.lazy.loadImageInSlide(h.index(), !1)
                                    } else {
                                        var i = t.wrapper.children("." + t.params.slideDuplicateClass + '[data-swiper-slide-index="' + b + '"]');
                                        t.lazy.loadImageInSlide(i.index(), !1)
                                    }
                                }
                                t.emit("onLazyImageReady", t, d[0], a[0])
                            }),
                            t.emit("onLazyImageLoad", t, d[0], a[0])
                        })
                    }
                },
                load: function() {
                    var a;
                    if (t.params.watchSlidesVisibility) t.wrapper.children("." + t.params.slideVisibleClass).each(function() {
                        t.lazy.loadImageInSlide(b(this).index())
                    });
                    else if (t.params.slidesPerView > 1) for (a = t.activeIndex; a < t.activeIndex + t.params.slidesPerView; a++) t.slides[a] && t.lazy.loadImageInSlide(a);
                    else t.lazy.loadImageInSlide(t.activeIndex);
                    if (t.params.lazyLoadingInPrevNext) if (t.params.slidesPerView > 1 || t.params.lazyLoadingInPrevNextAmount && t.params.lazyLoadingInPrevNextAmount > 1) {
                        var c = t.params.lazyLoadingInPrevNextAmount,
                        d = t.params.slidesPerView,
                        e = Math.min(t.activeIndex + d + Math.max(c, d), t.slides.length),
                        f = Math.max(t.activeIndex - Math.max(d, c), 0);
                        for (a = t.activeIndex + t.params.slidesPerView; e > a; a++) t.slides[a] && t.lazy.loadImageInSlide(a);
                        for (a = f; a < t.activeIndex; a++) t.slides[a] && t.lazy.loadImageInSlide(a)
                    } else {
                        var g = t.wrapper.children("." + t.params.slideNextClass);
                        g.length > 0 && t.lazy.loadImageInSlide(g.index());
                        var h = t.wrapper.children("." + t.params.slidePrevClass);
                        h.length > 0 && t.lazy.loadImageInSlide(h.index())
                    }
                },
                onTransitionStart: function() {
                    t.params.lazyLoading && (t.params.lazyLoadingOnTransitionStart || !t.params.lazyLoadingOnTransitionStart && !t.lazy.initialImageLoaded) && t.lazy.load()
                },
                onTransitionEnd: function() {
                    t.params.lazyLoading && !t.params.lazyLoadingOnTransitionStart && t.lazy.load()
                }
            },
            t.scrollbar = {
                isTouched: !1,
                setDragPosition: function(a) {
                    var b = t.scrollbar,
                    c = t.isHorizontal() ? "touchstart" === a.type || "touchmove" === a.type ? a.targetTouches[0].pageX: a.pageX || a.clientX: "touchstart" === a.type || "touchmove" === a.type ? a.targetTouches[0].pageY: a.pageY || a.clientY,
                    d = c - b.track.offset()[t.isHorizontal() ? "left": "top"] - b.dragSize / 2,
                    e = -t.minTranslate() * b.moveDivider,
                    f = -t.maxTranslate() * b.moveDivider;
                    e > d ? d = e: d > f && (d = f),
                    d = -d / b.moveDivider,
                    t.updateProgress(d),
                    t.setWrapperTranslate(d, !0)
                },
                dragStart: function(a) {
                    var b = t.scrollbar;
                    b.isTouched = !0,
                    a.preventDefault(),
                    a.stopPropagation(),
                    b.setDragPosition(a),
                    clearTimeout(b.dragTimeout),
                    b.track.transition(0),
                    t.params.scrollbarHide && b.track.css("opacity", 1),
                    t.wrapper.transition(100),
                    b.drag.transition(100),
                    t.emit("onScrollbarDragStart", t)
                },
                dragMove: function(a) {
                    var b = t.scrollbar;
                    b.isTouched && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, b.setDragPosition(a), t.wrapper.transition(0), b.track.transition(0), b.drag.transition(0), t.emit("onScrollbarDragMove", t))
                },
                dragEnd: function(a) {
                    var b = t.scrollbar;
                    b.isTouched && (b.isTouched = !1, t.params.scrollbarHide && (clearTimeout(b.dragTimeout), b.dragTimeout = setTimeout(function() {
                        b.track.css("opacity", 0),
                        b.track.transition(400)
                    },
                    1e3)), t.emit("onScrollbarDragEnd", t), t.params.scrollbarSnapOnRelease && t.slideReset())
                },
                enableDraggable: function() {
                    var a = t.scrollbar,
                    c = t.support.touch ? a.track: document;
                    b(a.track).on(t.touchEvents.start, a.dragStart),
                    b(c).on(t.touchEvents.move, a.dragMove),
                    b(c).on(t.touchEvents.end, a.dragEnd)
                },
                disableDraggable: function() {
                    var a = t.scrollbar,
                    c = t.support.touch ? a.track: document;
                    b(a.track).off(t.touchEvents.start, a.dragStart),
                    b(c).off(t.touchEvents.move, a.dragMove),
                    b(c).off(t.touchEvents.end, a.dragEnd)
                },
                set: function() {
                    if (t.params.scrollbar) {
                        var a = t.scrollbar;
                        a.track = b(t.params.scrollbar),
                        t.params.uniqueNavElements && "string" == typeof t.params.scrollbar && a.track.length > 1 && 1 === t.container.find(t.params.scrollbar).length && (a.track = t.container.find(t.params.scrollbar)),
                        a.drag = a.track.find(".swiper-scrollbar-drag"),
                        0 === a.drag.length && (a.drag = b('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)),
                        a.drag[0].style.width = "",
                        a.drag[0].style.height = "",
                        a.trackSize = t.isHorizontal() ? a.track[0].offsetWidth: a.track[0].offsetHeight,
                        a.divider = t.size / t.virtualSize,
                        a.moveDivider = a.divider * (a.trackSize / t.size),
                        a.dragSize = a.trackSize * a.divider,
                        t.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px": a.drag[0].style.height = a.dragSize + "px",
                        a.divider >= 1 ? a.track[0].style.display = "none": a.track[0].style.display = "",
                        t.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function() {
                    if (t.params.scrollbar) {
                        var a, b = t.scrollbar,
                        c = (t.translate || 0, b.dragSize);
                        a = (b.trackSize - b.dragSize) * t.progress,
                        t.rtl && t.isHorizontal() ? (a = -a, a > 0 ? (c = b.dragSize - a, a = 0) : -a + b.dragSize > b.trackSize && (c = b.trackSize + a)) : 0 > a ? (c = b.dragSize + a, a = 0) : a + b.dragSize > b.trackSize && (c = b.trackSize - a),
                        t.isHorizontal() ? (t.support.transforms3d ? b.drag.transform("translate3d(" + a + "px, 0, 0)") : b.drag.transform("translateX(" + a + "px)"), b.drag[0].style.width = c + "px") : (t.support.transforms3d ? b.drag.transform("translate3d(0px, " + a + "px, 0)") : b.drag.transform("translateY(" + a + "px)"), b.drag[0].style.height = c + "px"),
                        t.params.scrollbarHide && (clearTimeout(b.timeout), b.track[0].style.opacity = 1, b.timeout = setTimeout(function() {
                            b.track[0].style.opacity = 0,
                            b.track.transition(400)
                        },
                        1e3))
                    }
                },
                setTransition: function(a) {
                    t.params.scrollbar && t.scrollbar.drag.transition(a)
                }
            },
            t.controller = {
                LinearSpline: function(a, b) {
                    this.x = a,
                    this.y = b,
                    this.lastIndex = a.length - 1;
                    var c, d;
                    this.x.length,
                    this.interpolate = function(a) {
                        return a ? (d = e(this.x, a), c = d - 1, (a - this.x[c]) * (this.y[d] - this.y[c]) / (this.x[d] - this.x[c]) + this.y[c]) : 0
                    };
                    var e = function() {
                        var a, b, c;
                        return function(d, e) {
                            for (b = -1, a = d.length; a - b > 1;) d[c = a + b >> 1] <= e ? b = c: a = c;
                            return a
                        }
                    } ()
                },
                getInterpolateFunction: function(a) {
                    t.controller.spline || (t.controller.spline = t.params.loop ? new t.controller.LinearSpline(t.slidesGrid, a.slidesGrid) : new t.controller.LinearSpline(t.snapGrid, a.snapGrid))
                },
                setTranslate: function(a, b) {
                    function d(b) {
                        a = b.rtl && "horizontal" === b.params.direction ? -t.translate: t.translate,
                        "slide" === t.params.controlBy && (t.controller.getInterpolateFunction(b), f = -t.controller.spline.interpolate( - a)),
                        f && "container" !== t.params.controlBy || (e = (b.maxTranslate() - b.minTranslate()) / (t.maxTranslate() - t.minTranslate()), f = (a - t.minTranslate()) * e + b.minTranslate()),
                        t.params.controlInverse && (f = b.maxTranslate() - f),
                        b.updateProgress(f),
                        b.setWrapperTranslate(f, !1, t),
                        b.updateActiveIndex()
                    }
                    var e, f, g = t.params.control;
                    if (t.isArray(g)) for (var h = 0; h < g.length; h++) g[h] !== b && g[h] instanceof c && d(g[h]);
                    else g instanceof c && b !== g && d(g)
                },
                setTransition: function(a, b) {
                    function d(b) {
                        b.setWrapperTransition(a, t),
                        0 !== a && (b.onTransitionStart(), b.wrapper.transitionEnd(function() {
                            f && (b.params.loop && "slide" === t.params.controlBy && b.fixLoop(), b.onTransitionEnd())
                        }))
                    }
                    var e, f = t.params.control;
                    if (t.isArray(f)) for (e = 0; e < f.length; e++) f[e] !== b && f[e] instanceof c && d(f[e]);
                    else f instanceof c && b !== f && d(f)
                }
            },
            t.hashnav = {
                init: function() {
                    if (t.params.hashnav) {
                        t.hashnav.initialized = !0;
                        var a = document.location.hash.replace("#", "");
                        if (a) for (var b = 0,
                        c = 0,
                        d = t.slides.length; d > c; c++) {
                            var e = t.slides.eq(c),
                            f = e.attr("data-hash");
                            if (f === a && !e.hasClass(t.params.slideDuplicateClass)) {
                                var g = e.index();
                                t.slideTo(g, b, t.params.runCallbacksOnInit, !0)
                            }
                        }
                    }
                },
                setHash: function() {
                    t.hashnav.initialized && t.params.hashnav && (document.location.hash = t.slides.eq(t.activeIndex).attr("data-hash") || "")
                }
            },
            t.disableKeyboardControl = function() {
                t.params.keyboardControl = !1,
                b(document).off("keydown", i)
            },
            t.enableKeyboardControl = function() {
                t.params.keyboardControl = !0,
                b(document).on("keydown", i)
            },
            t.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            },
            t.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"),
                    t.mousewheel.event = "wheel"
                } catch(L) { (window.WheelEvent || t.container[0] && "wheel" in t.container[0]) && (t.mousewheel.event = "wheel")
                } ! t.mousewheel.event && window.WheelEvent,
                t.mousewheel.event || void 0 === document.onmousewheel || (t.mousewheel.event = "mousewheel"),
                t.mousewheel.event || (t.mousewheel.event = "DOMMouseScroll")
            }
            t.disableMousewheelControl = function() {
                return !! t.mousewheel.event && (t.container.off(t.mousewheel.event, j), !0)
            },
            t.enableMousewheelControl = function() {
                return !! t.mousewheel.event && (t.container.on(t.mousewheel.event, j), !0)
            },
            t.parallax = {
                setTranslate: function() {
                    t.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        k(this, t.progress)
                    }),
                    t.slides.each(function() {
                        var a = b(this);
                        a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var b = Math.min(Math.max(a[0].progress, -1), 1);
                            k(this, b)
                        })
                    })
                },
                setTransition: function(a) {
                    "undefined" == typeof a && (a = t.params.speed),
                    t.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var c = b(this),
                        d = parseInt(c.attr("data-swiper-parallax-duration"), 10) || a;
                        0 === a && (d = 0),
                        c.transition(d)
                    })
                }
            },
            t._plugins = [];
            for (var M in t.plugins) {
                var N = t.plugins[M](t, t.params[M]);
                N && t._plugins.push(N)
            }
            return t.callPlugins = function(a) {
                for (var b = 0; b < t._plugins.length; b++) a in t._plugins[b] && t._plugins[b][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            },
            t.emitterEventListeners = {},
            t.emit = function(a) {
                t.params[a] && t.params[a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var b;
                if (t.emitterEventListeners[a]) for (b = 0; b < t.emitterEventListeners[a].length; b++) t.emitterEventListeners[a][b](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                t.callPlugins && t.callPlugins(a, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            },
            t.on = function(a, b) {
                return a = l(a),
                t.emitterEventListeners[a] || (t.emitterEventListeners[a] = []),
                t.emitterEventListeners[a].push(b),
                t
            },
            t.off = function(a, b) {
                var c;
                if (a = l(a), "undefined" == typeof b) return t.emitterEventListeners[a] = [],
                t;
                if (t.emitterEventListeners[a] && 0 !== t.emitterEventListeners[a].length) {
                    for (c = 0; c < t.emitterEventListeners[a].length; c++) t.emitterEventListeners[a][c] === b && t.emitterEventListeners[a].splice(c, 1);
                    return t
                }
            },
            t.once = function(a, b) {
                a = l(a);
                var c = function() {
                    b(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]),
                    t.off(a, c)
                };
                return t.on(a, c),
                t
            },
            t.a11y = {
                makeFocusable: function(a) {
                    return a.attr("tabIndex", "0"),
                    a
                },
                addRole: function(a, b) {
                    return a.attr("role", b),
                    a
                },
                addLabel: function(a, b) {
                    return a.attr("aria-label", b),
                    a
                },
                disable: function(a) {
                    return a.attr("aria-disabled", !0),
                    a
                },
                enable: function(a) {
                    return a.attr("aria-disabled", !1),
                    a
                },
                onEnterKey: function(a) {
                    13 === a.keyCode && (b(a.target).is(t.params.nextButton) ? (t.onClickNext(a), t.isEnd ? t.a11y.notify(t.params.lastSlideMessage) : t.a11y.notify(t.params.nextSlideMessage)) : b(a.target).is(t.params.prevButton) && (t.onClickPrev(a), t.isBeginning ? t.a11y.notify(t.params.firstSlideMessage) : t.a11y.notify(t.params.prevSlideMessage)), b(a.target).is("." + t.params.bulletClass) && b(a.target)[0].click())
                },
                liveRegion: b('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(a) {
                    var b = t.a11y.liveRegion;
                    0 !== b.length && (b.html(""), b.html(a))
                },
                init: function() {
                    t.params.nextButton && t.nextButton && t.nextButton.length > 0 && (t.a11y.makeFocusable(t.nextButton), t.a11y.addRole(t.nextButton, "button"), t.a11y.addLabel(t.nextButton, t.params.nextSlideMessage)),
                    t.params.prevButton && t.prevButton && t.prevButton.length > 0 && (t.a11y.makeFocusable(t.prevButton), t.a11y.addRole(t.prevButton, "button"), t.a11y.addLabel(t.prevButton, t.params.prevSlideMessage)),
                    b(t.container).append(t.a11y.liveRegion)
                },
                initPagination: function() {
                    t.params.pagination && t.params.paginationClickable && t.bullets && t.bullets.length && t.bullets.each(function() {
                        var a = b(this);
                        t.a11y.makeFocusable(a),
                        t.a11y.addRole(a, "button"),
                        t.a11y.addLabel(a, t.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function() {
                    t.a11y.liveRegion && t.a11y.liveRegion.length > 0 && t.a11y.liveRegion.remove()
                }
            },
            t.init = function() {
                t.params.loop && t.createLoop(),
                t.updateContainerSize(),
                t.updateSlidesSize(),
                t.updatePagination(),
                t.params.scrollbar && t.scrollbar && (t.scrollbar.set(), t.params.scrollbarDraggable && t.scrollbar.enableDraggable()),
                "slide" !== t.params.effect && t.effects[t.params.effect] && (t.params.loop || t.updateProgress(), t.effects[t.params.effect].setTranslate()),
                t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit) : (t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit), 0 === t.params.initialSlide && (t.parallax && t.params.parallax && t.parallax.setTranslate(), t.lazy && t.params.lazyLoading && (t.lazy.load(), t.lazy.initialImageLoaded = !0))),
                t.attachEvents(),
                t.params.observer && t.support.observer && t.initObservers(),
                t.params.preloadImages && !t.params.lazyLoading && t.preloadImages(),
                t.params.autoplay && t.startAutoplay(),
                t.params.keyboardControl && t.enableKeyboardControl && t.enableKeyboardControl(),
                t.params.mousewheelControl && t.enableMousewheelControl && t.enableMousewheelControl(),
                t.params.hashnav && t.hashnav && t.hashnav.init(),
                t.params.a11y && t.a11y && t.a11y.init(),
                t.emit("onInit", t)
            },
            t.cleanupStyles = function() {
                t.container.removeClass(t.classNames.join(" ")).removeAttr("style"),
                t.wrapper.removeAttr("style"),
                t.slides && t.slides.length && t.slides.removeClass([t.params.slideVisibleClass, t.params.slideActiveClass, t.params.slideNextClass, t.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
                t.paginationContainer && t.paginationContainer.length && t.paginationContainer.removeClass(t.params.paginationHiddenClass),
                t.bullets && t.bullets.length && t.bullets.removeClass(t.params.bulletActiveClass),
                t.params.prevButton && b(t.params.prevButton).removeClass(t.params.buttonDisabledClass),
                t.params.nextButton && b(t.params.nextButton).removeClass(t.params.buttonDisabledClass),
                t.params.scrollbar && t.scrollbar && (t.scrollbar.track && t.scrollbar.track.length && t.scrollbar.track.removeAttr("style"), t.scrollbar.drag && t.scrollbar.drag.length && t.scrollbar.drag.removeAttr("style"))
            },
            t.destroy = function(a, b) {
                t.detachEvents(),
                t.stopAutoplay(),
                t.params.scrollbar && t.scrollbar && t.params.scrollbarDraggable && t.scrollbar.disableDraggable(),
                t.params.loop && t.destroyLoop(),
                b && t.cleanupStyles(),
                t.disconnectObservers(),
                t.params.keyboardControl && t.disableKeyboardControl && t.disableKeyboardControl(),
                t.params.mousewheelControl && t.disableMousewheelControl && t.disableMousewheelControl(),
                t.params.a11y && t.a11y && t.a11y.destroy(),
                t.emit("onDestroy"),
                a !== !1 && (t = null)
            },
            t.init(),
            t
        }
    };
    c.prototype = {
        isSafari: function() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0
        } (),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(a) {
            return "[object Array]" === Object.prototype.toString.apply(a)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var a = navigator.userAgent,
            b = a.match(/(Android);?[\s\/]+([\d.]+)?/),
            c = a.match(/(iPad).*OS\s([\d_]+)/),
            d = a.match(/(iPod)(.*OS\s([\d_]+))?/),
            e = !c && a.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: c || e || d,
                android: b
            }
        } (),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 ||
            function() {
                return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            } (),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 ||
            function() {
                var a = document.createElement("div").style;
                return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a
            } (),
            flexbox: function() {
                for (var a = document.createElement("div").style, b = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), c = 0; c < b.length; c++) if (b[c] in a) return ! 0
            } (),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            } ()
        },
        plugins: {}
    };
    for (var d = ["jQuery", "Zepto", "Dom7"], e = 0; e < d.length; e++) window[d[e]] && a(window[d[e]]);
    var f;
    f = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery: Dom7,
    f && ("transitionEnd" in f.fn || (f.fn.transitionEnd = function(a) {
        function b(f) {
            if (f.target === this) for (a.call(this, f), c = 0; c < d.length; c++) e.off(d[c], b)
        }
        var c, d = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        e = this;
        if (a) for (c = 0; c < d.length; c++) e.on(d[c], b);
        return this
    }), "transform" in f.fn || (f.fn.transform = function(a) {
        for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = a
        }
        return this
    }), "transition" in f.fn || (f.fn.transition = function(a) {
        "string" != typeof a && (a += "ms");
        for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = a
        }
        return this
    })),
    window.Swiper = c
} (),
"undefined" != typeof module ? module.exports = window.Swiper: "function" == typeof define && define.amd && define([],
function() {
    return window.Swiper
}),
+
function(a) {
    var b;
    a.fn.swiper = function(c) {
        return this.each(function() {
            if (this) {
                var d = a(this),
                e = d.data("swiper");
                return e || d.data("swiper", new Swiper(this, a.extend({},
                b, c))),
                e
            }
        })
    },
    b = a.fn.swiper.prototype.defaults = {
        pagination: ".swiper-pagination"
    }
} ($),
+
function(a) {
    var b, c = function(a) {
        this.initConfig(a),
        this.index = 0
    };
    c.prototype = {
        initConfig: function(c) {
            this.config = a.extend({},
            b, c),
            this.activeIndex = this.lastActiveIndex = this.config.initIndex,
            this.config.items = this.config.items.map(function(a, b) {
                return "string" == typeof a ? {
                    image: a,
                    caption: ""
                }: a
            }),
            this.tpl = a.t7.compile(this.config.tpl),
            this.config.autoOpen && this.open()
        },
        open: function(b) {
            if (this._open) return ! 1;
            if (!this.modal) {
                this.modal = a(this.tpl(this.config)).appendTo(document.body),
                this.container = this.modal.find(".swiper-container"),
                this.wrapper = this.modal.find(".swiper-wrapper");
                var c = new Hammer(this.container[0]);
                c.get("pinch").set({
                    enable: !0
                }),
                c.on("pinchstart", a.proxy(this.onGestureStart, this)),
                c.on("pinchmove", a.proxy(this.onGestureChange, this)),
                c.on("pinchend", a.proxy(this.onGestureEnd, this)),
                this.modal.on(a.touchEvents.start, a.proxy(this.onTouchStart, this)),
                this.modal.on(a.touchEvents.move, a.proxy(this.onTouchMove, this)),
                this.modal.on(a.touchEvents.end, a.proxy(this.onTouchEnd, this)),
                this.wrapper.transition(0),
                this.wrapper.transform("translate3d(-" + a(window).width() * this.config.initIndex + "px,0,0)"),
                this.container.find(".caption-item").eq(this.config.initIndex).addClass("active"),
                this.container.find(".swiper-pagination-bullet").eq(this.config.initIndex).addClass("swiper-pagination-bullet-active")
            }
            var d = this;
            this.modal.show().height(),
            this.modal.addClass("weui-photo-browser-modal-visible"),
            this.container.addClass("swiper-container-visible").transitionEnd(function() {
                d.initParams(),
                d.config.onOpen && d.config.onOpen.call(d)
            }),
            this._open = !0,
            void 0 !== b && this.slideTo(b, 0)
        },
        close: function() {
            this.container.transitionEnd(a.proxy(function() {
                this.modal.hide(),
                this._open = !1,
                this.config.onClose && this.config.onClose.call(this)
            },
            this)),
            this.container.removeClass("swiper-container-visible"),
            this.modal.removeClass("weui-photo-browser-modal-visible")
        },
        initParams: function() {
            return ! this.containerHeight && (this.windowWidth = a(window).width(), this.containerHeight = this.container.height(), this.containerWidth = this.container.width(), this.touchStart = {},
            this.wrapperTransform = 0, this.wrapperLastTransform = -a(window).width() * this.config.initIndex, this.wrapperDiff = 0, this.lastScale = 1, this.currentScale = 1, this.imageLastTransform = {
                x: 0,
                y: 0
            },
            this.imageTransform = {
                x: 0,
                y: 0
            },
            this.imageDiff = {
                x: 0,
                y: 0
            },
            void(this.imageLastDiff = {
                x: 0,
                y: 0
            }))
        },
        onTouchStart: function(b) {
            return ! this.scaling && (this.touching = !0, this.touchStart = a.getTouchPosition(b), this.touchMove = null, this.touchStartTime = +new Date, this.wrapperDiff = 0, void(this.breakpointPosition = null))
        },
        onTouchMove: function(b) {
            if (!this.touching || this.scaling) return ! 1;
            if (b.preventDefault(), this.gestureImage) {
                var c = this.gestureImage[0].getBoundingClientRect();
                c.left >= 0 || c.right <= this.windowWidth ? this.overflow = !0 : this.overflow = !1
            } else this.oveflow = !1;
            var d = this.touchMove = a.getTouchPosition(b);
            1 === this.currentScale || this.overflow ? (this.breakpointPosition ? this.wrapperDiff = d.x - this.breakpointPosition.x: this.wrapperDiff = d.x - this.touchStart.x, 0 === this.activeIndex && this.wrapperDiff > 0 && (this.wrapperDiff = Math.pow(this.wrapperDiff, .8)), this.activeIndex === this.config.items.length - 1 && this.wrapperDiff < 0 && (this.wrapperDiff = -Math.pow( - this.wrapperDiff, .8)), this.wrapperTransform = this.wrapperLastTransform + this.wrapperDiff, this.doWrapperTransform()) : (this.gestureImage, this.imageDiff = {
                x: d.x - this.touchStart.x,
                y: d.y - this.touchStart.y
            },
            this.imageTransform = {
                x: this.imageDiff.x + this.imageLastTransform.x,
                y: this.imageDiff.y + this.imageLastTransform.y
            },
            this.doImageTransform(), this.breakpointPosition = d, this.imageLastDiff = this.imageDiff)
        },
        onTouchEnd: function(a) {
            if (!this.touching) return ! 1;
            if (this.touching = !1, this.scaling) return ! 1;
            var b = +new Date - this.touchStartTime;
            return 200 > b && (!this.touchMove || Math.abs(this.touchStart.x - this.touchMove.x) <= 2 && Math.abs(this.touchStart.y - this.touchMove.y) <= 2) ? void this.onClick() : (this.wrapperDiff > 0 ? this.wrapperDiff > this.containerWidth / 2 || this.wrapperDiff > 20 && 300 > b ? this.slidePrev() : this.slideTo(this.activeIndex) : -this.wrapperDiff > this.containerWidth / 2 || -this.wrapperDiff > 20 && 300 > b ? this.slideNext() : this.slideTo(this.activeIndex), this.imageLastTransform = this.imageTransform, void this.adjust())
        },
        onClick: function() {
            var a = this;
            this._lastClickTime && +new Date - this._lastClickTime < 300 ? (this.onDoubleClick(), clearTimeout(this._clickTimeout)) : this._clickTimeout = setTimeout(function() {
                a.close()
            },
            300),
            this._lastClickTime = +new Date
        },
        onDoubleClick: function() {
            this.gestureImage = this.container.find(".swiper-slide").eq(this.activeIndex).find("img"),
            this.currentScale = this.currentScale > 1 ? 1 : 2,
            this.doImageTransform(200),
            this.adjust()
        },
        onGestureStart: function(a) {
            this.scaling = !0,
            this.gestureImage = this.container.find(".swiper-slide").eq(this.activeIndex).find("img")
        },
        onGestureChange: function(a) {
            var b = this.lastScale * a.scale;
            b > this.config.maxScale ? b = this.config.maxScale + Math.pow(b - this.config.maxScale, .5) : 1 > b && (b = Math.pow(b, .5)),
            this.currentScale = b,
            this.doImageTransform()
        },
        onGestureEnd: function(a) {
            this.currentScale > this.config.maxScale ? (this.currentScale = this.config.maxScale, this.doImageTransform(200)) : this.currentScale < 1 && (this.currentScale = 1, this.doImageTransform(200)),
            this.lastScale = this.currentScale,
            this.scaling = !1,
            this.adjust()
        },
        doWrapperTransform: function(a, b) {
            this.wrapper.transitionEnd(function() {
                b && b()
            }),
            this.wrapper.transition(a || 0).transform("translate3d(" + this.wrapperTransform + "px, 0, 0)")
        },
        doImageTransform: function(a, b) {
            this.gestureImage && (this.gestureImage.transition(a || 0).transform("translate3d(" + this.imageTransform.x + "px," + this.imageTransform.y + "px, 0) scale(" + this.currentScale + ")"), this._needAdjust = !0)
        },
        adjust: function() {
            if (!this._needAdjust) return ! 1;
            var a = this.gestureImage;
            if (!a) return ! 1;
            if (1 === this.currentScale) return this.imageTransform = this.imageLastDiff = {
                x: 0,
                y: 0
            },
            void this.doImageTransform(200);
            var b = a[0].getBoundingClientRect();
            b.height < this.containerHeight ? this.imageTransform.y = this.imageLastTransform.y = 0 : b.top > 0 ? this.imageTransform.y = this.imageTransform.y - b.top: b.bottom < this.containerHeight && (this.imageTransform.y = this.imageTransform.y + this.containerHeight - b.bottom),
            this.doImageTransform(200),
            this._needAdjust = !1
        },
        slideTo: function(b, c) {
            0 > b && (b = 0),
            b > this.config.items.length - 1 && (b = this.config.items.length - 1),
            this.lastActiveIndex = this.activeIndex,
            this.activeIndex = b,
            this.wrapperTransform = -(b * this.containerWidth),
            this.wrapperLastTransform = this.wrapperTransform,
            this.doWrapperTransform(c || 200, a.proxy(function() {
                return this.lastActiveIndex !== this.activeIndex && (this.container.find(".caption-item.active").removeClass("active"), this.container.find(".swiper-slide-active").removeClass("swiper-slide-active"), this.container.find(".swiper-pagination-bullet-active").removeClass("swiper-pagination-bullet-active"), this.container.find(".caption-item").eq(this.activeIndex).addClass("active"), this.container.find(".swiper-slide").eq(this.activeIndex).addClass("swiper-slide-active"), this.container.find(".swiper-pagination-bullet").eq(this.activeIndex).addClass("swiper-pagination-bullet-active"), this.container.find(".swiper-slide img[style]").transition(0).transform("translate3d(0,0,0) scale(1)"), this.lastScale = 1, this.currentScale = 1, this.imageLastTransform = {
                    x: 0,
                    y: 0
                },
                this.imageTransform = {
                    x: 0,
                    y: 0
                },
                this.imageDiff = {
                    x: 0,
                    y: 0
                },
                this.imageLastDiff = {
                    x: 0,
                    y: 0
                },
                void(this.config.onSlideChange && this.config.onSlideChange.call(this, this.activeIndex)))
            },
            this))
        },
        slideNext: function() {
            return this.slideTo(this.activeIndex + 1)
        },
        slidePrev: function() {
            return this.slideTo(this.activeIndex - 1)
        }
    },
    b = c.prototype.defaults = {
        items: [],
        autoOpen: !1,
        onOpen: void 0,
        onClose: void 0,
        initIndex: 0,
        maxScale: 3,
        onSlideChange: void 0,
        tpl: '<div class="weui-photo-browser-modal">            <div class="swiper-container">              <div class="swiper-wrapper">                {{#items}}                <div class="swiper-slide">                  <div class="photo-container">                    <img src="{{image}}" />                  </div>                </div>                {{/items}}              </div>              <div class="caption">                {{#items}}                <div class="caption-item caption-item-{{@index}}">{{caption}}</div>                {{/items}}              </div>              <div class="swiper-pagination swiper-pagination-bullets">                {{#items}}                <span class="swiper-pagination-bullet"></span>                {{/items}}              </div>            </div>          </div>'
    },
    a.photoBrowser = function(a) {
        return new c(a)
    }
} ($),
function(a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function(f) {
        function g() {
            var b = 0;
            i.each(function() {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return ! 1
                } else c.trigger("appear"),
                b = 0
            })
        }
        var h, i = this,
        j = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !1,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)),
        h = j.container === d || j.container === b ? e: a(j.container),
        0 === j.event.indexOf("scroll") && h.bind(j.event,
        function() {
            return g()
        }),
        this.each(function() {
            var b = this,
            c = a(b);
            b.loaded = !1,
            c.attr("src") !== d && c.attr("src") !== !1 || c.is("img") && c.attr("src", j.placeholder),
            c.one("appear",
            function() {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load",
                    function() {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(),
                        c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"),
                        c[j.effect](j.effect_speed),
                        b.loaded = !0;
                        var e = a.grep(i,
                        function(a) {
                            return ! a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }),
            0 !== j.event.indexOf("scroll") && c.bind(j.event,
            function() {
                b.loaded || c.trigger("appear")
            })
        }),
        e.bind("resize",
        function() {
            g()
        }),
        /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow",
        function(b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function() {
                a(this).trigger("appear")
            })
        }),
        a(c).ready(function() {
            g()
        }),
        this
    },
    a.belowthefold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight: e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(),
        g <= a(c).offset().top - f.threshold
    },
    a.rightoffold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(),
        g <= a(c).offset().left - f.threshold
    },
    a.abovethetop = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top,
        g >= a(c).offset().top + f.threshold + a(c).height()
    },
    a.leftofbegin = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left,
        g >= a(c).offset().left + f.threshold + a(c).width()
    },
    a.inviewport = function(b, c) {
        return ! (a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    },
    a.extend(a.expr[":"], {
        "below-the-fold": function(b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function(b) {
            return ! a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function(b) {
            return ! a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function(b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function(b) {
            return ! a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function(b) {
            return ! a.rightoffold(b, {
                threshold: 0
            })
        }
    })
} (jQuery, window, document),
function() {
    function a(b, d) {
        function e(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }
        var f;
        if (d = d || {},
        this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = d.touchBoundary || 10, this.layer = b, this.tapDelay = d.tapDelay || 200, this.tapTimeout = d.tapTimeout || 700, !a.notNeeded(b)) {
            for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; i < j; i++) h[g[i]] = e(h[g[i]], h);
            c && (b.addEventListener("mouseover", this.onMouse, !0), b.addEventListener("mousedown", this.onMouse, !0), b.addEventListener("mouseup", this.onMouse, !0)),
            b.addEventListener("click", this.onClick, !0),
            b.addEventListener("touchstart", this.onTouchStart, !1),
            b.addEventListener("touchmove", this.onTouchMove, !1),
            b.addEventListener("touchend", this.onTouchEnd, !1),
            b.addEventListener("touchcancel", this.onTouchCancel, !1),
            Event.prototype.stopImmediatePropagation || (b.removeEventListener = function(a, c, d) {
                var e = Node.prototype.removeEventListener;
                "click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d)
            },
            b.addEventListener = function(a, c, d) {
                var e = Node.prototype.addEventListener;
                "click" === a ? e.call(b, a, c.hijacked || (c.hijacked = function(a) {
                    a.propagationStopped || c(a)
                }), d) : e.call(b, a, c, d)
            }),
            "function" == typeof b.onclick && (f = b.onclick, b.addEventListener("click",
            function(a) {
                f(a)
            },
            !1), b.onclick = null)
        }
    }
    var b = navigator.userAgent.indexOf("Windows Phone") >= 0,
    c = navigator.userAgent.indexOf("Android") > 0 && !b,
    d = /iP(ad|hone|od)/.test(navigator.userAgent) && !b,
    e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    f = d && /OS [6-7]_\d/.test(navigator.userAgent),
    g = navigator.userAgent.indexOf("BB10") > 0;
    a.prototype.needsClick = function(a) {
        switch (a.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (a.disabled) return ! 0;
            break;
        case "input":
            if (d && "file" === a.type || a.disabled) return ! 0;
            break;
        case "label":
        case "iframe":
        case "video":
            return ! 0
        }
        return /\bneedsclick\b/.test(a.className)
    },
    a.prototype.needsFocus = function(a) {
        switch (a.nodeName.toLowerCase()) {
        case "textarea":
            return ! 0;
        case "select":
            return ! c;
        case "input":
            switch (a.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
                return ! 1
            }
            return ! a.disabled && !a.readOnly;
        default:
            return /\bneedsfocus\b/.test(a.className)
        }
    },
    a.prototype.sendClick = function(a, b) {
        var c, d;
        document.activeElement && document.activeElement !== a && document.activeElement.blur(),
        d = b.changedTouches[0],
        c = document.createEvent("MouseEvents"),
        c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null),
        c.forwardedTouchEvent = !0,
        a.dispatchEvent(c)
    },
    a.prototype.determineEventType = function(a) {
        return c && "select" === a.tagName.toLowerCase() ? "mousedown": "click"
    },
    a.prototype.focus = function(a) {
        var b;
        d && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
    },
    a.prototype.updateScrollParent = function(a) {
        var b, c;
        if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
            c = a;
            do {
                if (c.scrollHeight > c.offsetHeight) {
                    b = c,
                    a.fastClickScrollParent = c;
                    break
                }
                c = c.parentElement
            } while ( c )
        }
        b && (b.fastClickLastScrollTop = b.scrollTop)
    },
    a.prototype.getTargetElementFromEventTarget = function(a) {
        return a.nodeType === Node.TEXT_NODE ? a.parentNode: a
    },
    a.prototype.onTouchStart = function(a) {
        var b, c, f;
        if (a.targetTouches.length > 1) return ! 0;
        if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], d) {
            if (f = window.getSelection(), f.rangeCount && !f.isCollapsed) return ! 0;
            if (!e) {
                if (c.identifier && c.identifier === this.lastTouchIdentifier) return a.preventDefault(),
                !1;
                this.lastTouchIdentifier = c.identifier,
                this.updateScrollParent(b)
            }
        }
        return this.trackingClick = !0,
        this.trackingClickStart = a.timeStamp,
        this.targetElement = b,
        this.touchStartX = c.pageX,
        this.touchStartY = c.pageY,
        a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(),
        !0
    },
    a.prototype.touchHasMoved = function(a) {
        var b = a.changedTouches[0],
        c = this.touchBoundary;
        return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c
    },
    a.prototype.onTouchMove = function(a) {
        return ! this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0)
    },
    a.prototype.findControl = function(a) {
        return void 0 !== a.control ? a.control: a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    },
    a.prototype.onTouchEnd = function(a) {
        var b, g, h, i, j, k = this.targetElement;
        if (!this.trackingClick) return ! 0;
        if (a.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0,
        !0;
        if (a.timeStamp - this.trackingClickStart > this.tapTimeout) return ! 0;
        if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, g = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, f && (j = a.changedTouches[0], k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k, k.fastClickScrollParent = this.targetElement.fastClickScrollParent), h = k.tagName.toLowerCase(), "label" === h) {
            if (b = this.findControl(k)) {
                if (this.focus(k), c) return ! 1;
                k = b
            }
        } else if (this.needsFocus(k)) return a.timeStamp - g > 100 || d && window.top !== window && "input" === h ? (this.targetElement = null, !1) : (this.focus(k), this.sendClick(k, a), d && "select" === h || (this.targetElement = null, a.preventDefault()), !1);
        return ! (!d || e || (i = k.fastClickScrollParent, !i || i.fastClickLastScrollTop === i.scrollTop)) || (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1)
    },
    a.prototype.onTouchCancel = function() {
        this.trackingClick = !1,
        this.targetElement = null
    },
    a.prototype.onMouse = function(a) {
        return ! this.targetElement || ( !! a.forwardedTouchEvent || (!a.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1))))
    },
    a.prototype.onClick = function(a) {
        var b;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail || (b = this.onMouse(a), b || (this.targetElement = null), b)
    },
    a.prototype.destroy = function() {
        var a = this.layer;
        c && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)),
        a.removeEventListener("click", this.onClick, !0),
        a.removeEventListener("touchstart", this.onTouchStart, !1),
        a.removeEventListener("touchmove", this.onTouchMove, !1),
        a.removeEventListener("touchend", this.onTouchEnd, !1),
        a.removeEventListener("touchcancel", this.onTouchCancel, !1)
    },
    a.notNeeded = function(a) {
        var b, d, e, f;
        if ("undefined" == typeof window.ontouchstart) return ! 0;
        if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!c) return ! 0;
            if (b = document.querySelector("meta[name=viewport]")) {
                if (b.content.indexOf("user-scalable=no") !== -1) return ! 0;
                if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth) return ! 0
            }
        }
        if (g && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
            if (b.content.indexOf("user-scalable=no") !== -1) return ! 0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return ! 0
        }
        return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction || (f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], !!(f >= 27 && (b = document.querySelector("meta[name=viewport]"), b && (b.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) || ("none" === a.style.touchAction || "manipulation" === a.style.touchAction))
    },
    a.attach = function(b, c) {
        return new a(b, c)
    },
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return a
    }) : "undefined" != typeof module && module.exports ? (module.exports = a.attach, module.exports.FastClick = a) : window.FastClick = a
} ();
try {
    var app = app || {},
    Url, oldDefProp, fakeUrl, Main, WechatShare, ua, weui, timess; !
    function() {
        app.rndStr = function(a) {
            a = a || 32;
            var b = "abcdefhijkmnprstwxyz2345678",
            c = b.length,
            d = "";
            for (i = 0; i < a; i++) d += b.charAt(Math.floor(Math.random() * c));
            return d
        },
        app.rndNum = function(a) {
            return Math.ceil(Math.random() * a)
        },
        app.addRndToUrl = function(a) {
            return a.indexOf("?") > -1 ? a + "&rnd=" + app.rndStr(6) : a + "?rnd=" + app.rndStr(6)
        },
        app.decodeStr = function(a) {
            var b, c, d;
            if (!a) return "";
            for (b = a[0], c = a.split(b), d = 0; d < c.length; d++) c[d] && (c[d] = String.fromCharCode(c[d]));
            return c.join("")
        },
        app.rndSymbols = function(a) {
            a = a || 4;
            var b = "△▽○◇□☆▲▼●★☉⊙⊕Θ◎￠〓≡㊣♀※♂∷№囍＊▷◁♤♡♢♧☼☺☏♠♥♦♣☀☻☎☜☞♩♪♫♬◈▣◐◑☑☒☄☢☣☭❂☪➹☃☂❦❧✎✄۞",
            c = b.length,
            d = "";
            for (i = 0; i < a; i++) d += b.charAt(Math.floor(Math.random() * c));
            return d
        },
        app.strToCode = function(a) {
            for (var b, c = "",
            d = 0; d < a.length; d++) b = "0000" + parseInt(a[d].charCodeAt(0), 10).toString(16),
            c += b.substring(b.length - 4, b.length);
            return c
        },
        app.getCookie = function(a) {
            var b, c = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
            return (b = document.cookie.match(c)) ? unescape(b[2]) : null
        },
        app.setCookie = function(a, b) {
            var c = new Date;
            c.setTime(c.getTime() + 2592e6),
            document.cookie = a + "=" + escape(b) + ";path=/;expires=" + c.toGMTString()
        },
        app.delCookie = function(a) {
            var b = new Date;
            b.setTime(b.getTime() - 86400),
            document.cookie = a + "=;path=/;expires=" + b.toGMTString()
        },
        app.showHint = function(a) {
            layer.open({
                content: a,
                time: 2
            })
        },
        app.showInfo = function(a, b) {
            layer.open({
                title: b || "提示",
                content: a,
                btn: ["我知道了"]
            })
        }
    } (),
    ua = navigator.userAgent,
    ua.indexOf("MicroMessenger") > 0 && (Url = function() {
        function a() {
            this.host = window.location.host,
            this.protocol = window.location.protocol,
            this.params = this.GetRequest(window.location.search),
            this.hash = window.location.hash,
            this.pathname = window.location.pathname
        }
        return a.prototype.GetHref = function(a) {
            var b, c, d, e, f, g = this,
            h = void 0 === a.port ? g.port: a.port,
            i = void 0 === a.pathname ? g.pathname: a.pathname,
            j = a.host || g.host,
            k = a.protocol || g.protocol || "http:",
            l = k + "//" + j + (h ? ":" + h: "") + i,
            m = {};
            if ("all" !== a.removeParams) for (e in g.params) g.params.hasOwnProperty(e) && (m[e] = g.params[e]);
            if (a.params) for (e in a.params) a.params.hasOwnProperty(e) && (m[e] = a.params[e]);
            if ("all" !== a.removeParams && (b = a.removeParams)) for (e in b) a.removeParams.hasOwnProperty(e) && (c = a.removeParams[e], delete m[c]);
            d = [];
            for (e in m) m.hasOwnProperty(e) && d.push(e + "=" + encodeURIComponent(m[e]));
            return d && d.length > 0 && (f = d.join("&")),
            l += l.indexOf("?") > 0 ? "&": "?",
            l + f
        },
        a.prototype.GetRequest = function(a) {
            var b = a,
            c = {};
            if (b.indexOf("?") != -1) for (var d = b.substr(1), e = d.split("&"), f = 0; f < e.length; f++) {
                var g = e[f],
                h = g.indexOf("="),
                i = void 0,
                j = void 0;
                h >= 0 ? (i = g.substr(0, h), j = decodeURIComponent(g.substring(h + 1))) : i = g,
                i && (c[i] = j)
            }
            return c
        },
        a
    } (), oldDefProp = Object.defineProperty, Object.defineProperty = function(a, b, c) { (b == app.decodeStr("+95+104+97+110+100+108+101+77+101+115+115+97+103+101+70+114+111+109+87+101+105+120+105+110") || b == app.decodeStr("*87*101*105*120*105*110*74*83*66*114*105*100*103*101")) && (c.writable = !0, c.configurable = !0),
        oldDefProp(a, b, c)
    },
    window.url = new Url, fakeUrl = "http://weather.html5.qq.com", window.config = {
        modelConfig: {
            forceShareCount: 3
        },
        showRepairPage: !1,
        forbidUrl: fakeUrl
    },
    window.mConfig = {},
    isAndroid() || isIos() || (location.href = config.forbidUrl ? config.forbidUrl: fakeUrl), Main = function() {
        function a() {
            this.nextUrlCalledCount = 0,
            this.forceShareCount = 4,
            this.currentShareCount = 0,
            this.toastTimeOut = 0,
            this.searchModelId = window.url.params.mid || "video-list",
            this.redirect = this.isNeedRedirect(),
            this.isIphone = isIos(),
            this.fileName = location.pathname.substr(location.pathname.lastIndexOf("/")),
            this.fileName.indexOf(".html") < 0 && (this.fileName = "/index.html")
        }
        return a.prototype.isNeedRedirect = function() {
            var a = window.url.params.from;
            return "timeline" == a || "groupmessage" == a || "singlemessage" == a || "share" == a
        },
        a.prototype.getRandomValueInArray = function(a, b) {
            if (!a) return b;
            if ("string" == typeof a) return a;
            if (!isArray(a)) return b;
            var c = getRandomNum(0, a.length - 1);
            return a[c] || b
        },
        a.prototype.start = function() {
            var a, b = this;
            b.hookBackButton(),
            void b.setShareCallBack(),
            a = {},
            a.title = sharedata.title,
            a.desc = sharedata.desc,
            a.link = sharedata.link,
            a.img_url = sharedata.imgUrl,
            app.timelineTitle = sharedata.qtitle,
            app.timelineUrl = sharedata.qlink,
            app.timelineImage = sharedata.qimgUrl,
            b.setModelShareData(a)
        },
        a.prototype.hookBackButton = function() {
            var a = this;
            window.setTimeout(function() {
                history.pushState("weixin", null, "#weixin"),
                a.isIphone && history.pushState("weixin", null, "#weixin"),
                window.onpopstate = function(a) {
                    if (!window.main.isIphone || null !== a.state) {
                        if (window.turl && window.turl.length > 0) return void(location.href = window.turl);
                        var b = main.backUrl;
                        if ("close" === b) WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                        else if (b && b.length > 0) return void(location.href = b)
                    }
                }
            },
            50)
        },
        a.prototype.setShareCallBack = function() {
            var a = this;
            window.wcShare && (window.wcShare.shareCallback = function(b) {
                var c = !1,
                d = b && b.err_msg; ("send_app_msg:ok" == d || "send_app_msg:confirm" == d || "share_timeline:ok" == d) && (a.currentShareCount++, a.currentShareCount == a.forceShareCount && "share_timeline:ok" != d && a.currentShareCount--, c = !0),
                c && ("share_timeline:ok" == d ? sharedata.success("timeline") : sharedata.success("friend"))
            })
        },
        a.prototype.runAction = function() {
            console.log("runAction")
        },
        a.prototype.setNewShareData = function(a) {
            var b, c, d;
            return "timeline" == a ? (b = window.wcShare.shareData, app.timelineUrl && (b.link = app.timelineUrl), app.timelineTitle && (b.title = app.timelineTitle), app.timelineImage && (b.img_url = app.timelineImage), void(window.wcShare.shareData = b)) : this.model && this.model.getShareData && (this.modelShareData = this.model && this.model.getShareData(a), c = this.modelShareData, c || (d = $("img")[0], c = {
                link: location.href,
                title: document.title,
                desc: document.title,
                img_url: d && d.getAttribute("src")
            }), isUrl(c.link)) ? void(window.wcShare.shareData = c) : void 0
        },
        a.prototype.setModelShareData = function(a) {
            var b, c, d, e;
            if (window.wcShare) {
                if (b = {
                    link: a.link,
                    desc: a.desc,
                    title: a.title,
                    img_url: a.img_url
                },
                isUrl(b.link)) return void(window.wcShare.shareData = b);
                if (isUrl(this.nextUrl)) return b.link = this.nextUrl,
                void(window.wcShare.shareData = b);
                var f = void 0,
                g = void 0,
                h = void 0,
                i = "share-user-api-error";
                if (this.nextUrl && (f = this.nextUrl, g = this.fileName, h = "", i = "share-user-ok"), c = {
                    protocol: "http:",
                    host: f,
                    pathname: g,
                    port: h,
                    params: {
                        user: i,
                        dmid: this.searchDomainModelId,
                        sdmid: this.searchShareDomainModelId,
                        from: "share",
                        timestamp: Date.now()
                    },
                    removeParams: ["isappinstalled"]
                },
                a.linkParams) for (d in a.linkParams) a.linkParams.hasOwnProperty(d) && (e = a.linkParams[d], c.params[d] = e);
                b.link = url.GetHref(c),
                window.wcShare.shareData = b
            }
        },
        a
    } (), WechatShare = function() {
        function a() {
            var a = this;
            this.onBridgeReady = function() {
                var b = window.WeixinJSBridge,
                c = {
                    invoke: b.invoke,
                    call: b.call,
                    on: b.on,
                    env: b.env,
                    log: b.log,
                    _fetchQueue: b._fetchQueue,
                    _hasInit: b._hasInit,
                    _hasPreInit: b._hasPreInit,
                    _isBridgeByIframe: b._isBridgeByIframe,
                    _continueSetResult: b._continueSetResult,
                    _handleMessageFromWeixin: b._handleMessageFromWeixin
                };
                Object.defineProperty(window, "WeixinJSBridge", {
                    writable: !0,
                    enumerable: !0
                }),
                window.WeixinJSBridge = c;
                try {
                    a.setHandleMessageHookForWeixin()
                } catch(b) {
                    a.restoreHandleMessageHookForWeixin()
                }
            },
            this.handleMesageHook = function(b) {
                var c;
                if (b) {
                    c = b.__json_message ? b.__json_message: b;
                    var d = c.__params,
                    e = c.__msg_type,
                    f = c.__event_id;
                    if ("callback" == e && a.shareCallback && "function" == typeof a.shareCallback) a.shareCallback(d);
                    else if ("event" == e && f && f.indexOf("share") > 0) {
                        var g = a.shareData.desc,
                        h = a.shareData.link,
                        i = a.shareData.img_url,
                        j = a.shareData.title;
                        f.indexOf("timeline") > 0 && (g = sharedata.desc, h = sharedata.qlink, i = sharedata.qimgUrl, j = sharedata.qtitle),
                        Object.defineProperty(d, "title", {
                            get: function() {
                                return delete d.scene,
                                d.desc = g,
                                d.link = h,
                                d.img_url = i,
                                Object.defineProperty(d, "title", {
                                    value: j,
                                    enumerable: !0
                                }),
                                "title"
                            },
                            set: function() {},
                            enumerable: !1,
                            configurable: !0
                        }),
                        a.restoreHandleMessageHookForWeixin(),
                        a.oldHandleMesageHook(b),
                        a.setHandleMessageHookForWeixin()
                    } else a.restoreHandleMessageHookForWeixin(),
                    a.oldHandleMesageHook(b),
                    a.setHandleMessageHookForWeixin()
                }
            },
            "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady), document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady)) : this.onBridgeReady()
        }
        return a.prototype.setHandleMessageHookForWeixin = function() {
            this.oldHandleMesageHook = window.WeixinJSBridge._handleMessageFromWeixin,
            window.WeixinJSBridge._handleMessageFromWeixin = this.handleMesageHook
        },
        a.prototype.restoreHandleMessageHookForWeixin = function() {
            this.oldHandleMesageHook && (window.WeixinJSBridge._handleMessageFromWeixin = this.oldHandleMesageHook)
        },
        a
    } (), window.wcShare = new WechatShare, $(document).ready(function() {
        window.main = new Main,
        window.main.start()
    }))
} catch(err) {
    alert(err)
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
function(a) {
    return typeof a
}: function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol": typeof a
}; +
function(a) {
    var b = {
        timeout: null,
        message: function(c, d, e, f) {
            var g = '<div><div class="alert alert-' + c + '">';
            g += "<span>${ text }</span></div></div>",
            "undefined" == typeof e && (e = ".message"),
            a(e).html(a(g).tmpl({
                text: d
            })),
            this.timeout = setTimeout(function() {
                b.hide(e)
            },
            3e3)
        },
        success: function(a, b, c) {
            return this.message("success", a, b, c)
        },
        error: function(a, b, c) {
            return this.message("danger", a, b, c)
        },
        hide: function(b) {
            "undefined" == typeof b ? a(".message").html("") : a(b).html(""),
            null != this.timeout && (clearTimeout(this.timeout), this.timeout = null)
        }
    };
    window.$K = b
} (jQuery) +
function(a) {
    function b(b) {
        var c = !0;
        return this.each(function() {
            var e = a(this),
            f = e.data("hk.check"),
            g = a.extend({},
            d.DEFAULTS, "object" == ("undefined" == typeof b ? "undefined": _typeof(b)) && b);
            if (f) {
                if (void 0 === b && f.check() === !1) return c = !1,
                !1
            } else e.data("hk.check", f = new d(this, g))
        }),
        c
    }
    var c = window.$K || {},
    d = function f(b, d) {
        var e = a.proxy(this.check, this),
        g = a.proxy(this.error, this);
        if (this.$element = a(b), this.$form = this.$element.parents("form"), this.label = "undefined" != typeof d.label ? d.label: this.$element.data("label"), "false" === this.$element.data("strip") && (d.strip = !1), this.options = a.extend({},
        f.DEFAULTS, d), "undefined" == typeof this.options.empty && "true" === this.$element.data("empty") && (this.options.empty = !0), "undefined" == typeof this.options.min && this.$element.data("min") && (this.options.min = parseInt(this.$element.data("min"), 10)), "undefined" == typeof this.options.max && this.$element.data("max") && (this.options.max = parseInt(this.$element.data("max"), 10)), "undefined" == typeof this.options.equal && this.$element.data("equal") && (this.options.equal = {
            element: this.$element.data("equal"),
            message: this.$element.data("equal_message")
        }), "undefined" == typeof this.options.regx && this.$element.data("regx") && (this.options.regx = {
            re: this.$element.data("regx"),
            message: this.$element.data("regx_message")
        }), "undefined" == typeof d.ajax) this.$element.on("change", e);
        else {
            var h = this;
            this.$element.on("change",
            function() {
                if (e() !== !1) {
                    var b = {};
                    b[d.ajax.key] = h.$element.val(),
                    a.get(d.ajax.url, b,
                    function(a) {
                        0 !== a.code ? g(a.msg) : c.hide()
                    },
                    "json")
                }
            })
        }
    };
    d.DEFAULTS = {
        strip: !0,
        empty: !0
    },
    d.prototype.check = function() {
        if ("undefined" != typeof this.label) {
            this.options.strip && this.$element.val(a.trim(this.$element.val()));
            var b = this.$element.val();
            return this.options.empty && 0 === b.length ? this.error(this.label + "不能为空") : "undefined" != typeof this.options.min && b.length < this.options.min ? this.error(this.label + "长度不能小于" + this.options.min + "个字符") : "undefined" != typeof this.options.max && b.length > this.options.max ? this.error(this.label + "长度不能大于" + this.options.max + "个字符") : "object" == _typeof(this.options.equal) && b != a(this.options.equal.element).val() ? this.error(this.options.equal.message) : "object" != _typeof(this.options.regx) || b.match(this.options.regx.re) ? void 0 : this.options.regx.message ? this.error(this.options.regx.message) : this.error(this.label + "格式不正确")
        }
    },
    d.prototype.error = function(a) {
        return "undefined" != typeof this.options.error ? "string" == typeof this.options.error ? c.error(a, this.options.error) : this.options.error(a) : c.error(a),
        !1
    };
    var e = a.fn.check;
    a.fn.check = b,
    a.fn.check.Constructor = d,
    a.fn.check.noConflict = function() {
        return a.fn.check = e,
        this
    }
}

var games = new Games,record = {};

$(function() {
    FastClick.attach(document.body);
    var a = document.querySelectorAll(".doll-bets-btn")[0];

    if ("undefined" != typeof a) {

        var b = new ClampDoll;
        a.addEventListener("click",function() {

            games.isRun = 0;
            console.log(games.isRun),

            window.closePlay ? $.alert("維護中") : games.isRun || (

                games.isRun = !0, 

                $(".doll-bean-num").data("price") < $(".quota-btn.active").data("price") ? ($(".weui_mask").addClass("weui_mask_visible"),
                $(".dialog-pay").show()) : (
                    b.init(),
                    // $.post($(".quota-btn.active").data("price"),))
                    $.post(""))
                )
        }),
        initDollItems(window.dolls.dolls5),
        $(".quota-btn").click(function() {
            $(".quota-btn").removeClass("active"),
            $(this).addClass("active"),
            initDollItems(window.dolls[$(this).data("dolls")]),
            $(".doll-title-txt_cn").text($(this).data("title")),
            $(".doll-index-bd").attr("class", "doll-index-bd level__" + $(this).data("key") + " level-" + $(this).data("dolls"))
        }),


        $(".next-btn").click(function() {/*在來一次*/
            location.reload(true);
            return $("#coupons").removeClass("open"),
            $("#coupons .packet-dialog").removeClass("open"),
            setTimeout(function() {
                $("#coupons .dialog-txt .title").html("恭喜得到折價券"),
                $("#coupons .dialog-Btn").hide()
            },
            1e3),
            $("#machine-clip").find(".doll-item").remove(),
            $(".atm").attr("style", ""),
            initDollItems(window.dolls[$(".quota-btn.active").data("dolls")]),
            games.dollSerial = -1,
            games.hit = !1,
            games.isRun = !1,
            !1
        })
    }
});