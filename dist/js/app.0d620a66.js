(function(e){function t(t){for(var o,i,r=t[0],c=t[1],u=t[2],d=0,b=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&b.push(a[i][0]),a[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(b.length)b.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(o=!1)}o&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},a={app:0},s=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var u=0;u<r.length;u++)t(r[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0313":function(e,t,n){"use strict";var o=n("548a"),a=n.n(o);a.a},"034f":function(e,t,n){"use strict";var o=n("85ec"),a=n.n(o);a.a},1:function(e,t){},"1f1c":function(e,t,n){"use strict";var o=n("ae5d"),a=n.n(o);a.a},2:function(e,t){},"2f2b":function(e,t,n){},4678:function(e,t,n){var o={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=s(e);return n(t)}function s(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}a.keys=function(){return Object.keys(o)},a.resolve=s,e.exports=a,a.id="4678"},"548a":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o,a,s=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("CommonHeader"),n("router-view")],1)},r=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"p-navbar"},[n("div",{staticClass:"p-navbar-links"},[n("div",{staticClass:"p-navbar-links-left"},[n("router-link",{attrs:{to:"/"}},[e.hasAuthority&&e.isLogined?n("v-fa",{staticClass:"p-bookIcon",attrs:{icon:"book-open"}}):n("v-fa",{staticClass:"p-bookIcon",attrs:{icon:"book"}})],1),""!==e.currentUserName?n("span",{staticClass:"p-headerLabel"},[e._v("こんにちは、"+e._s(e.currentUserName)+"さん")]):n("span",{staticClass:"p-headerLabel"},[e._v("BookManager")])],1),e.isLogined&&e.hasAuthority?n("div",{staticClass:"p-navbar-links-right"},[e.isBurgerShow?n("slide",{attrs:{right:"",noOverlay:"",width:"250"}},[n("router-link",{staticClass:"p-link",attrs:{to:"/bookRegistration"}},[e._v("書籍登録")]),n("router-link",{staticClass:"p-link",attrs:{to:"/books"}},[e._v("書籍一覧")]),e.isLogined?n("router-link",{staticClass:"p-link",attrs:{to:"/logout"}},[e._v("ログアウト")]):n("router-link",{staticClass:"p-link",attrs:{to:"/login"}},[e._v("ログイン")])],1):n("div",[n("router-link",{staticClass:"p-link",attrs:{to:"/bookRegistration"}},[e._v("書籍登録")]),n("router-link",{staticClass:"p-link",attrs:{to:"/books"}},[e._v("書籍一覧")]),e.isLogined?n("router-link",{staticClass:"p-link",attrs:{to:"/logout"}},[e._v("ログアウト")]):n("router-link",{staticClass:"p-link",attrs:{to:"/login"}},[e._v("ログイン")])],1)],1):e._e()])])},u=[],l=n("59ca"),d=n.n(l),b=(n("66ce"),n("ea7b"),n("1157")),f=n.n(b),p=n("db0f"),h={data:function(){return{currentUserName:"",isLogined:!1,isBurgerShow:!0}},components:{Slide:p["Slide"]},methods:{resizeHandler:function(){this.isBurgerShow=f()(window).width()<600}},created:function(){var e=this;d.a.auth().onAuthStateChanged((function(t){t||(e.currentUserName="",e.isLogined=!1),e.currentUserName=t.displayName,e.isLogined=!0})),this.isBurgerShow=f()(window).width()<600,window.addEventListener("resize",this.resizeHandler)},beforeDestroy:function(){window.removeEventListener("resize",this.resizeHandler)},computed:{hasAuthority:function(){return"/noAuthority"!==this.$route.path}}},k=h,m=(n("1f1c"),n("2877")),v=Object(m["a"])(k,c,u,!1,null,null,null),g=v.exports,j={components:{CommonHeader:g}},y=j,C=(n("034f"),Object(m["a"])(y,i,r,!1,null,null,null)),_=C.exports,w=(n("4d63"),n("ac1f"),n("25f0"),n("8c4f")),I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-booksWrapper"},e._l(e.books,(function(e){return n("Books",{key:e.bookIsbnCode10,attrs:{book:e}})})),1)},S=[],B=(n("7db0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-bookInfo"},[n("div",[n("img",{staticClass:"p-bookInfo-image",attrs:{src:e.book.bookImage}})]),n("div",{staticClass:"p-bookInfo-detail"},[n("div",{staticClass:"p-bookInfo-detail-title"},[n("a",{staticClass:"p-bookInfo-detail-link",attrs:{href:e.book.bookLink,target:"_blank"}},[e._v(e._s(e.book.bookTitle))])]),n("span",{staticClass:"p-bookInfo-detail-insertDate"},[e._v("登録日:"),n("br"),e._v(e._s(e.book.insertDate))])])])}),D=[],x={props:["book"],data:function(){return{}}},E=x,z=(n("0313"),Object(m["a"])(E,B,D,!1,null,null,null)),$=z.exports,O={components:{Books:$},data:function(){return{books:[]}},created:function(){var e=this,t=d.a.database(),n=t.ref("server/saving-data/books").orderByChild("publishedDate");n.on("value",(function(t){e.books=t.val()}))},updated:function(){this.$nextTick((function(){for(var e=f()(".p-booksWrapper"),t=[],n=0;n<e.find(".p-bookInfo").length;n++)t.push(f()("<div>",{class:"p-bookInfo__empty"}));e.append(t)}))}},A=O,L=(n("e525"),Object(m["a"])(A,I,S,!1,null,null,null)),N=L.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-pageWrapper"},[e.books.length?n("div",[e._l(e.books,(function(e){return n("Books",{key:e.bookIsbnCode10,attrs:{book:e}})})),e.isDuplicateBook?n("div",[n("span",[e._v("登録済みの書籍です。")])]):n("button",{staticClass:"p-bookInfo-registerButton btn btn-primary",attrs:{disabled:e.isRegisterd},on:{click:e.registerBookInfo}},[n("span",[e._v(e._s(e.buttonMessage))])])],2):e._e(),e.isEmptyResult?n("div",[e._m(0)]):e._e(),n("BarcodeReader")],1)},q=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-notFound"},[n("span",[e._v("検索結果:0件")])])}],T=(n("b64b"),n("c1df")),M=n.n(T),P=n("c51a"),H=n.n(P),U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isScan,expression:"isScan"}],staticClass:"p-scanWrapper"}),n("section",[e.isScan?e._e():n("button",{staticClass:"p-scanButton btn btn-primary",attrs:{type:"button"},on:{click:e.startScan}},[e._v(" バーコードで検索 ")]),e.isScan?e._e():n("div",{staticClass:"p-scanDescription"},[n("p",[e._v("※動作ブラウザ")]),n("p",[e._v("iPhone:Safari")]),n("p",[e._v("Android:Chrome")])])]),e.isScan?e._e():n("section",{staticClass:"p-isbnSearchInputGroup input-group mb-3"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"form-control",attrs:{type:"text",placeholder:"上段バーコードのISBN入力"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("input",{staticClass:"btn btn-primary",attrs:{value:"検索",type:"button"},on:{click:e.search}})])])])},W=[],G=(n("4160"),n("d81d"),n("d3b7"),n("e25e"),n("1276"),n("159b"),n("8a00")),Y=n.n(G),F={data:function(){return{code:null,isScan:!1,isSearched:!1,width:0,height:0}},methods:{startScan:function(){var e=this;e.$eventHub.$emit("scan-start"),Y.a.init({inputStream:{name:"Live",type:"LiveStream",target:document.querySelector(".p-scanWrapper"),constraints:{facingMode:"environment"},area:{top:"0%",right:"0%",left:"0%",bottom:"50%"}},locator:{patchSize:"medium",halfSample:!0},numOfWorkers:2,decoder:{readers:["ean_reader"]},locate:!0},(function(e){e||Y.a.start()})),this.isScan=!0},getEanCode:function(){var e=this;Y.a.onDetected((function(t){var n=t.codeResult.code;void 0!==n&&(e.checkDigit(n)?(e.code=n,Y.a.stop(),e.isScan=!1,e.isSearched=!0,Y.a.stop(),e.$eventHub.$emit("success-scan",e.code)):e.getEanCode())}))},checkDigit:function(e){var t=e.toString().split("").map((function(e){return parseInt(e)})),n=0,o=t.pop();return t.forEach((function(e,t){n+=e*(t%2===0?1:3)})),n%=10,n=0===n?0:10-n,o===n},search:function(){this.isSearched=!0,this.$eventHub.$emit("success-scan",this.code)}},updated:function(){this.$nextTick((function(){this.getEanCode()}))},created:function(){this.width=document.documentElement.clientWidth,this.height=document.documentElement.clientHeight,f()("body").css("width",this.w)},watch:{isScan:function(){f()("video").css({"z-index":"-100",position:"absolute",width:"90%",height:"60%"}),f()(".drawingBuffer").css({position:"absolute"})}}},J=F,K=(n("93bc"),Object(m["a"])(J,U,W,!1,null,"ebb9ccec",null)),Q=K.exports,X={components:{Books:$,BarcodeReader:Q},data:function(){return{books:[],bookTitle:"",bookImage:"",bookIsbnCode10:0,bookIsbnCode13:0,bookLink:"",publishedDate:"",isDuplicateBook:!1,isRegisterd:!1,isSearched:!1,isScanNow:!1,inquiryCount:0}},methods:{getBookInfo:function(e){var t=this;t.isDuplicateBook=!1,t.isRegisterd=!1,t.checkDuplicateBook(e),t.isSearched=!0,t.inquiryCount=0,t.resetBookData(),t.inquiryOpenBd(e).done((function(n){n||t.inquiryGoogleBooks(e).done((function(n){n||t.inquiryNationalLibrary(e).done((function(){}))}))}))},inquiryNationalLibrary:function(e){var t=this;return f.a.ajax({url:"https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&recordPacking=xml&query=isbn=".concat(e),cache:!1,type:"get",datatype:"xml"}).then((function(n){var o=JSON.parse(H.a.xml2json((new XMLSerializer).serializeToString(n)));t.setBookInfo(o,e,1)}),(function(e){return e}))},inquiryGoogleBooks:function(e){var t=this;return f.a.ajax({url:"https://www.googleapis.com/books/v1/volumes?q=isbn:".concat(e),cache:!1,type:"get",datatype:"json"}).then((function(n){var o=!0;return 0===n.totalItems?o=!1:t.setBookInfo(n,e,2),f.a.Deferred().resolve(o)}),(function(){return"error"}))},inquiryOpenBd:function(e){var t=this;return f.a.ajax({url:"https://api.openbd.jp/v1/get?isbn=".concat(e),cache:!1,type:"get",datatype:"json"}).then((function(n){var o=!0;return null===n[0]?o=!1:t.setBookInfo(n,e,3),f.a.Deferred().resolve(o)}),(function(){return"error"}))},setBookInfo:function(e,t,n){var o,a=this;function s(e,t,n,o){""===a.bookTitle&&(a.bookTitle=t),""===a.bookImage&&(a.bookImage=n),0===a.bookIsbnCode10&&10===e.length&&(a.bookIsbnCode10=e),0===a.bookIsbnCode13&&13===e.length&&(a.bookIsbnCode13=e),""===a.bookLink&&(a.bookLink="https://www.amazon.co.jp/s?k=".concat(e,"&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss")),""===a.publishedDate&&(a.publishedDate=M()(o).format("YYYY-MM-DD"))}switch(n){case 1:if("0"===e.elements[0].elements[1].elements[0].text){a.books=[];break}var i=e.elements[0].elements[4].elements[0].elements[2].elements[0].elements[0].elements[0].text;s(t,i,"","");break;case 2:o=e.items[0].volumeInfo,s(t,o.title,o.imageLinks.smallThumbnail,o.publishedDate);break;case 3:o=e[0].summary,s(t,o.title,o.cover,o.pubdate);break}""!==a.bookImage&&0!==a.bookIsbnCode10&&0!==a.bookIsbnCode13&&""!==a.publishedDate||0!==a.inquiryCount||(a.inquiryCount++,a.inquiryGoogleBooks(t)),0===a.bookIsbnCode10&&0===a.bookIsbnCode13||(a.books=[{bookTitle:a.bookTitle,bookImage:""===a.bookImage?"http://placehold.jp/24/cccccc/ffffff/128x165.png?text=Image%0D%0ANotFound":a.bookImage,bookIsbnCode10:a.bookIsbnCode10,bookIsbnCode13:a.bookIsbnCode13,bookLink:a.bookLink,publishedDate:a.publishedDate,insertDate:M()(new Date).format("YYYY/MM/DD")}]),a.isSearched=!0,""===a.books[0].bookTitle&&a.resetBookData()},registerBookInfo:function(){var e=this,t=d.a.database(),n=t.ref("server/saving-data/books");n.push(e.books[0]),e.isRegisterd=!0},checkDuplicateBook:function(e){var t=this,n=d.a.database(),o=n.ref("server/saving-data/books");o.orderByChild("bookIsbnCode10").startAt(e).endAt(e).once("value",(function(e){e.val()&&0!==Object.keys(e.val()).length&&(t.isDuplicateBook=!0)})),o.orderByChild("bookIsbnCode13").startAt(e).endAt(e).once("value",(function(e){e.val()&&0!==Object.keys(e.val()).length&&(t.isDuplicateBook=!0)}))},resetBookData:function(){this.books=[],this.bookTitle="",this.bookImage="",this.bookIsbnCode10=0,this.bookIsbnCode13=0,this.bookLink="",this.publishedDate="",this.isScanNow=!0}},created:function(){this.$eventHub.$on("success-scan",this.getBookInfo),this.$eventHub.$on("scan-start",this.resetBookData)},computed:{buttonMessage:function(){return this.isRegisterd?"登録済み":"登録"},isEmptyResult:function(){return!(0!==this.books.length||!this.isSearched||this.isScanNow)}}},V=X,Z=(n("f888"),Object(m["a"])(V,R,q,!1,null,"4b897be3",null)),ee=Z.exports,te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-pageWrapper"},[e._m(0),n("button",{staticClass:"p-loginButton btn btn-primary",on:{click:e.googleLogin}},[e._v(" Googleアカウントでログイン ")])])},ne=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-message"},[n("span",[e._v("ログインすると以下の機能が利用できます。")]),n("ul",{staticClass:"p-message-list"},[n("li",[e._v("バーコード情報から書籍の登録")]),n("li",[e._v("登録された書籍の閲覧")])])])}],oe={name:"login",data:function(){return{errorMessage:""}},methods:{googleLogin:function(){var e=this,t=new d.a.auth.GoogleAuthProvider;d.a.auth().signInWithRedirect(t).then((function(t){console.log(t);var n={id:t.user.uid,name:t.user.displayName,domain:t.additionalUserInfo.profile.hd};console.log(n);var o=d.a.database().ref("server/saving-data/users");o.child(n.id).set(n),e.$router.push("/")})).catch((function(t){console.log(t),e.$router.push({path:"/"})}))}},beforeCreate:function(){null!==d.a.auth().currentUser&&this.$router.push({path:"/books"})}},ae=oe,se=(n("9e91"),Object(m["a"])(ae,te,ne,!1,null,"da40aa14",null)),ie=se.exports,re={data:function(){return{}},created:function(){var e=this;d.a.auth().signOut().then((function(){e.$router.push({path:"/"})}))}},ce=re,ue=Object(m["a"])(ce,o,a,!1,null,null,null),le=ue.exports,de=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-messageWrapper"},[n("span",{staticClass:"p-message"},[e._v("お使いのアカウントには閲覧権限がありません。")]),n("router-link",{attrs:{to:"/logout"}},[n("button",{staticClass:"btn btn-primary"},[e._v("ログアウトする")])])],1)},be=[],fe={data:function(){return{user:null}}},pe=fe,he=(n("cf29"),Object(m["a"])(pe,de,be,!1,null,"9ce8d700",null)),ke=he.exports;s["default"].use(w["a"]);var me=new w["a"]({mode:"history",routes:[{path:"/",component:N,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){var t=new RegExp(".*@monoworks.co.jp$");if(null===e)return n({path:"/login"});t.test(e.email)?n():n({path:"/noAuthority"})}))}},{path:"/books",component:N,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){var t=new RegExp(".*@monoworks.co.jp$");if(null===e)return n({path:"/login"});t.test(e.email)?n():n({path:"/noAuthority"})}))}},{path:"/bookRegistration",component:ee,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){var t=new RegExp(".*@monoworks.co.jp$");if(null===e)return n({path:"/login"});t.test(e.email)?n():n({path:"/noAuthority"})}))}},{path:"/noAuthority",component:ke,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){if(null===e)return n({path:"/login"});n()}))}},{path:"/login",component:ie,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){if(null!==e)return n({path:"/books"});n()}))}},{path:"/logout",component:le,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){if(null===e)return n({path:"/login"});n()}))}},{path:"*",component:N,beforeEnter:function(e,t,n){d.a.auth().onAuthStateChanged((function(e){var t=new RegExp(".*@monoworks.co.jp$");if(null===e)return n({path:"/login"});t.test(e.email)?n():n({path:"/noAuthority"})}))}}]}),ve=me,ge=(n("000b"),n("5f5b")),je=(n("f9e3"),n("ecee")),ye=n("c074"),Ce=n("b702"),_e=n("f2d1"),we=n("ad3d");je["c"].add(ye["a"],Ce["a"],_e["a"]),s["default"].component("v-fa",we["a"]),s["default"].prototype.$eventHub=new s["default"],s["default"].use(ve,ge["a"],ge["IconPlugin"]),s["default"].config.productionTip=!1;var Ie={apiKey:"AIzaSyBqTUMBDPsd4Nl9sS7RrwPh3QaHhFyqjq4",authDomain:"bookmanager-5ba4c.firebaseapp.com",databaseURL:"https://bookmanager-5ba4c.firebaseio.com",projectId:"bookmanager-5ba4c",storageBucket:"bookmanager-5ba4c.appspot.com",messagingSenderId:"991241456327",appId:"1:991241456327:web:933a53fa86a3fa5e7f0ce2",measurementId:"G-PNHNDBKK49"};d.a.initializeApp(Ie),d.a.analytics(),s["default"].config.productionTip=!1,new s["default"]({router:ve,render:function(e){return e(_)}}).$mount("#app")},6704:function(e,t,n){},7599:function(e,t,n){},"85ec":function(e,t,n){},"93bc":function(e,t,n){"use strict";var o=n("9a34"),a=n.n(o);a.a},"9a34":function(e,t,n){},"9e91":function(e,t,n){"use strict";var o=n("7599"),a=n.n(o);a.a},ae5d:function(e,t,n){},cf29:function(e,t,n){"use strict";var o=n("6704"),a=n.n(o);a.a},e525:function(e,t,n){"use strict";var o=n("f4b9"),a=n.n(o);a.a},f4b9:function(e,t,n){},f888:function(e,t,n){"use strict";var o=n("2f2b"),a=n.n(o);a.a}});
//# sourceMappingURL=app.0d620a66.js.map