(window.webpackJsonp=window.webpackJsonp||[]).push([[8,9,81],{1410:function(t,e,n){"use strict";n.r(e);var a={components:{Layout:n(395).default}},i=n(36),r=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Layout",{scopedSlots:this._u([{key:"sidebar-top",fn:function(){return[e("EntandoVersionLinks")]},proxy:!0},{key:"page-body",fn:function(){return[e("Content",{staticClass:"theme-default-content"})]},proxy:!0}])}),this._v(" "),e("Tracking")],1)}),[],!1,null,null,null);e.default=r.exports},366:function(t,e,n){"use strict";n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return c})),n.d(e,"a",(function(){return h})),n.d(e,"f",(function(){return d})),n.d(e,"e",(function(){return p}));n(25),n(62),n(364),n(121),n(363),n(195),n(61),n(7),n(45),n(31);var a=/#.*$/,i=/\.(md|html)$/,r=/\/$/,s=/^[a-z]+:/i;function o(t){return decodeURI(t).replace(a,"").replace(i,"")}function l(t){return s.test(t)}function u(t){return/^mailto:/.test(t)}function c(t){return/^tel:/.test(t)}function h(t){if(l(t))return t;var e=t.match(a),n=e?e[0]:"",i=o(t);return r.test(i)?t:i+".html"+n}function f(t,e,n){if(l(e))return{type:"external",path:e};n&&(e=function(t,e,n){var a=t.charAt(0);if("/"===a)return t;if("?"===a||"#"===a)return e+t;var i=e.split("/");n&&i[i.length-1]||i.pop();for(var r=t.replace(/^\//,"").split("/"),s=0;s<r.length;s++){var o=r[s];".."===o?i.pop():"."!==o&&i.push(o)}""!==i[0]&&i.unshift("");return i.join("/")}(e,n));for(var a=o(e),i=0;i<t.length;i++)if(o(t[i].regularPath)===a)return Object.assign({},t[i],{type:"page",path:h(t[i].path)});return console.error('[vuepress] No matching page found for sidebar item "'.concat(e,'"')),{}}function d(t,e,n,a){var i=n.pages,r=n.themeConfig,s=a&&r.locales&&r.locales[a]||r;if("auto"===(t.frontmatter.sidebar||s.sidebar||r.sidebar))return g(t);var o=s.sidebar||r.sidebar;if(o){var l=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(var n in e)if(0===(a=t,/(\.html|\/)$/.test(a)?a:a+"/").indexOf(encodeURI(n)))return{base:n,config:e[n]};var a;return{}}(e,o),u=l.base,c=l.config;return"auto"===c?g(t):c?c.map((function(t){return function t(e,n,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if("string"==typeof e)return f(n,e,a);if(Array.isArray(e))return Object.assign(f(n,e[0],a),{title:e[1]});var r=e.children||[];return 0===r.length&&e.path?Object.assign(f(n,e.path,a),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,children:r.map((function(e){return t(e,n,a,i+1)})),collapsable:!1!==e.collapsable}}(t,i,u)})):[]}return[]}function g(t){var e=function(t){var e;return(t=t.map((function(t){return Object.assign({},t)}))).forEach((function(t){2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)})),t.filter((function(t){return 2===t.level}))}(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map((function(e){return{type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}}))}]}function p(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}},367:function(t,e,n){},370:function(t,e,n){},371:function(t,e,n){},375:function(t,e,n){"use strict";n(367)},378:function(t,e,n){"use strict";n.r(e);var a=n(46),i=(n(64),n(61),n(25),n(62),n(7),n(124),n(376)),r=n(366),s={name:"SecondaryNavLinks",components:{NavLink:n(368).default,DropdownLink:i.default},computed:{userNav:function(){return"/"===this.$page.path?this.$themeLocaleConfig.landingSecondaryNav||this.$site.themeConfig.landingSecondaryNav||[]:this.$themeLocaleConfig.secondaryNav||this.$site.themeConfig.secondaryNav||[]},nav:function(){var t=this,e=this.$site.locales;if(e&&Object.keys(e).length>1){var n=this.$page.path,i=this.$router.options.routes,r=this.$site.themeConfig.locales||{},s={text:this.$themeLocaleConfig.selectText||"Languages",ariaLabel:this.$themeLocaleConfig.ariaLabel||"Select language",items:Object.keys(e).map((function(a){var s,o=e[a],l=r[a]&&r[a].label||o.lang;return o.lang===t.$lang?s=n:(s=n.replace(t.$localeConfig.path,a),i.some((function(t){return t.path===s}))||(s=a)),{text:l,link:s}}))};return[].concat(Object(a.a)(this.userNav),[s])}return this.userNav},userLinks:function(){return(this.nav||[]).map((function(t){return Object.assign(Object(r.e)(t),{items:(t.items||[]).map(r.e)})}))}}},o=(n(375),n(36)),l=Object(o.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return this.userLinks.length?e("nav",{staticClass:"nav-links"},this._l(this.userLinks,(function(t){return e("div",{key:t.link,staticClass:"nav-item"},["links"===t.type?e("DropdownLink",{attrs:{item:t}}):e("NavLink",{attrs:{item:t}})],1)})),0):this._e()}),[],!1,null,null,null);e.default=l.exports},381:function(t,e,n){"use strict";n(370)},382:function(t,e,n){"use strict";n(371)},384:function(t,e,n){"use strict";n.r(e);var a=n(400),i=n(402),r=n(399),s=n(392),o=n(378);function l(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var u={name:"Navbar",components:{SidebarButton:r.default,NavLinks:s.default,SearchBox:i.a,AlgoliaSearchBox:a.a,SecondaryNavLinks:o.default},data:function(){return{linksWrapMaxWidth:null}},computed:{algolia:function(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch:function(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}},mounted:function(){var t=this,e=parseInt(l(this.$el,"paddingLeft"))+parseInt(l(this.$el,"paddingRight")),n=function(){document.documentElement.clientWidth<719?t.linksWrapMaxWidth=null:t.linksWrapMaxWidth=t.$el.offsetWidth-e-(t.$refs.siteName&&t.$refs.siteName.offsetWidth||0)};n(),window.addEventListener("resize",n,!1)}},c=(n(381),n(36)),h=Object(c.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"navbar"},[n("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),t.$site.themeConfig.entando.logoLink?n("a",{staticClass:"home-link",attrs:{href:t.$site.themeConfig.entando.logoLink}},[t.$site.themeConfig.logo?n("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e()]):n("RouterLink",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?n("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$siteTitle?n("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),n("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[n("NavLinks",{staticClass:"can-hide"})],1),t._v(" "),n("div",{staticClass:"entando-navbar can-hide"},[n("SecondaryNavLinks"),t._v(" "),t.isAlgoliaSearch?n("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?n("SearchBox"):t._e()],1)],1)}),[],!1,null,null,null);e.default=h.exports},385:function(t,e,n){"use strict";n.r(e);var a=n(393),i=n(394),r={components:{PageEdit:a.default,PageNav:i.default},props:["sidebarItems"]},s=(n(382),n(36)),o=Object(s.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"page"},[t._t("top"),t._v(" "),t._t("body"),t._v(" "),n("PageEdit"),t._v(" "),n("PageNav",t._b({},"PageNav",{sidebarItems:t.sidebarItems},!1)),t._v(" "),t._t("bottom")],2)}),[],!1,null,null,null);e.default=o.exports},395:function(t,e,n){"use strict";n.r(e);var a=n(403),i=n(384),r=n(385),s=n(404),o=n(366),l={name:"Layout",components:{Home:a.default,Page:r.default,Sidebar:s.default,Navbar:i.default},data:function(){return{isSidebarOpen:!1}},computed:{shouldShowNavbar:function(){var t=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems:function(){return Object(o.f)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted:function(){var t=this;this.$router.afterEach((function(){t.isSidebarOpen=!1}))},methods:{toggleSidebar:function(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart:function(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd:function(t){var e=t.changedTouches[0].clientX-this.touchStart.x,n=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(n)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}},u=n(36),c=Object(u.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?n("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),n("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),n("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("sidebar-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("sidebar-bottom")]},proxy:!0}],null,!0)}),t._v(" "),t.$page.frontmatter.home?n("Home"):n("Page",{attrs:{"sidebar-items":t.sidebarItems},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("page-top")]},proxy:!0},{key:"body",fn:function(){return[t._t("page-body")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("page-bottom")]},proxy:!0}],null,!0)})],1)}),[],!1,null,null,null);e.default=c.exports}}]);