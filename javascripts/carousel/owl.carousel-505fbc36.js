!function(t,e,s,i){function n(e,s){this.settings=null,this.options=t.extend({},n.Defaults,s),this.$element=t(e),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},t.each(["onResize","onThrottledResize"],t.proxy(function(e,s){this._handlers[s]=t.proxy(this[s],this)},this)),t.each(n.Plugins,t.proxy(function(t,e){this._plugins[t.charAt(0).toLowerCase()+t.slice(1)]=new e(this)},this)),t.each(n.Workers,t.proxy(function(e,s){this._pipe.push({filter:s.filter,run:t.proxy(s.run,this)})},this)),this.setup(),this.initialize()}n.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:e,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},n.Width={Default:"default",Inner:"inner",Outer:"outer"},n.Type={Event:"event",State:"state"},n.Plugins={},n.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(t){t.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(t){var e=this.settings.margin||"",s=!this.settings.autoWidth,i=this.settings.rtl,n={width:"auto","margin-left":i?e:"","margin-right":i?"":e};!s&&this.$stage.children().css(n),t.css=n}},{filter:["width","items","settings"],run:function(t){var e=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,s=null,i=this._items.length,n=!this.settings.autoWidth,r=[];for(t.items={merge:!1,width:e};i--;)s=this._mergers[i],s=this.settings.mergeFit&&Math.min(s,this.settings.items)||s,t.items.merge=s>1||t.items.merge,r[i]=n?e*s:this._items[i].width();this._widths=r}},{filter:["items","settings"],run:function(){var e=[],s=this._items,i=this.settings,n=Math.max(2*i.items,4),r=2*Math.ceil(s.length/2),a=i.loop&&s.length?i.rewind?n:Math.max(n,r):0,o="",h="";for(a/=2;a--;)e.push(this.normalize(e.length/2,!0)),o+=s[e[e.length-1]][0].outerHTML,e.push(this.normalize(s.length-1-(e.length-1)/2,!0)),h=s[e[e.length-1]][0].outerHTML+h;this._clones=e,t(o).addClass("cloned").appendTo(this.$stage),t(h).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var t=this.settings.rtl?1:-1,e=this._clones.length+this._items.length,s=-1,i=0,n=0,r=[];++s<e;)i=r[s-1]||0,n=this._widths[this.relative(s)]+this.settings.margin,r.push(i+n*t);this._coordinates=r}},{filter:["width","items","settings"],run:function(){var t=this.settings.stagePadding,e=this._coordinates,s={width:Math.ceil(Math.abs(e[e.length-1]))+2*t,"padding-left":t||"","padding-right":t||""};this.$stage.css(s)}},{filter:["width","items","settings"],run:function(t){var e=this._coordinates.length,s=!this.settings.autoWidth,i=this.$stage.children();if(s&&t.items.merge)for(;e--;)t.css.width=this._widths[this.relative(e)],i.eq(e).css(t.css);else s&&(t.css.width=t.items.width,i.css(t.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(t){t.current=t.current?this.$stage.children().index(t.current):0,t.current=Math.max(this.minimum(),Math.min(this.maximum(),t.current)),this.reset(t.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var t,e,s,i,n=this.settings.rtl?1:-1,r=2*this.settings.stagePadding,a=this.coordinates(this.current())+r,o=a+this.width()*n,h=[];for(s=0,i=this._coordinates.length;s<i;s++)t=this._coordinates[s-1]||0,e=Math.abs(this._coordinates[s])+r*n,(this.op(t,"<=",a)&&this.op(t,">",o)||this.op(e,"<",a)&&this.op(e,">",o))&&h.push(s);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+h.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],n.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var e,s,n;e=this.$element.find("img"),s=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:i,n=this.$element.children(s).width(),e.length&&n<=0&&this.preloadAutoWidthImages(e)}this.$element.addClass(this.options.loadingClass),this.$stage=t("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},n.prototype.setup=function(){var e=this.viewport(),s=this.options.responsive,i=-1,n=null;s?(t.each(s,function(t){t<=e&&t>i&&(i=Number(t))}),n=t.extend({},this.options,s[i]),"function"==typeof n.stagePadding&&(n.stagePadding=n.stagePadding()),delete n.responsive,n.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+i))):n=t.extend({},this.options),this.trigger("change",{property:{name:"settings",value:n}}),this._breakpoint=i,this.settings=n,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},n.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},n.prototype.prepare=function(e){var s=this.trigger("prepare",{content:e});return s.data||(s.data=t("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(e)),this.trigger("prepared",{content:s.data}),s.data},n.prototype.update=function(){for(var e=0,s=this._pipe.length,i=t.proxy(function(t){return this[t]},this._invalidated),n={};e<s;)(this._invalidated.all||t.grep(this._pipe[e].filter,i).length>0)&&this._pipe[e].run(n),e++;this._invalidated={},!this.is("valid")&&this.enter("valid")},n.prototype.width=function(t){switch(t=t||n.Width.Default){case n.Width.Inner:case n.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},n.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},n.prototype.onThrottledResize=function(){e.clearTimeout(this.resizeTimer),this.resizeTimer=e.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},n.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},n.prototype.registerEventHandlers=function(){t.support.transition&&this.$stage.on(t.support.transition.end+".owl.core",t.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(e,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",t.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",t.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",t.proxy(this.onDragEnd,this)))},n.prototype.onDragStart=function(e){var i=null;3!==e.which&&(t.support.transform?(i=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),i={x:i[16===i.length?12:4],y:i[16===i.length?13:5]}):(i=this.$stage.position(),i={x:this.settings.rtl?i.left+this.$stage.width()-this.width()+this.settings.margin:i.left,y:i.top}),this.is("animating")&&(t.support.transform?this.animate(i.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===e.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=t(e.target),this._drag.stage.start=i,this._drag.stage.current=i,this._drag.pointer=this.pointer(e),t(s).on("mouseup.owl.core touchend.owl.core",t.proxy(this.onDragEnd,this)),t(s).one("mousemove.owl.core touchmove.owl.core",t.proxy(function(e){var i=this.difference(this._drag.pointer,this.pointer(e));t(s).on("mousemove.owl.core touchmove.owl.core",t.proxy(this.onDragMove,this)),Math.abs(i.x)<Math.abs(i.y)&&this.is("valid")||(e.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},n.prototype.onDragMove=function(t){var e=null,s=null,i=null,n=this.difference(this._drag.pointer,this.pointer(t)),r=this.difference(this._drag.stage.start,n);this.is("dragging")&&(t.preventDefault(),this.settings.loop?(e=this.coordinates(this.minimum()),s=this.coordinates(this.maximum()+1)-e,r.x=((r.x-e)%s+s)%s+e):(e=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),s=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),i=this.settings.pullDrag?-1*n.x/5:0,r.x=Math.max(Math.min(r.x,e+i),s+i)),this._drag.stage.current=r,this.animate(r.x))},n.prototype.onDragEnd=function(e){var i=this.difference(this._drag.pointer,this.pointer(e)),n=this._drag.stage.current,r=i.x>0^this.settings.rtl?"left":"right";t(s).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==i.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(n.x,0!==i.x?r:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=r,(Math.abs(i.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},n.prototype.closest=function(e,s){var i=-1,n=30,r=this.width(),a=this.coordinates();return this.settings.freeDrag||t.each(a,t.proxy(function(t,o){return"left"===s&&e>o-n&&e<o+n?i=t:"right"===s&&e>o-r-n&&e<o-r+n?i=t+1:this.op(e,"<",o)&&this.op(e,">",a[t+1]||o-r)&&(i="left"===s?t+1:t),-1===i},this)),this.settings.loop||(this.op(e,">",a[this.minimum()])?i=e=this.minimum():this.op(e,"<",a[this.maximum()])&&(i=e=this.maximum())),i},n.prototype.animate=function(e){var s=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),s&&(this.enter("animating"),this.trigger("translate")),t.support.transform3d&&t.support.transition?this.$stage.css({transform:"translate3d("+e+"px,0px,0px)",transition:this.speed()/1e3+"s"}):s?this.$stage.animate({left:e+"px"},this.speed(),this.settings.fallbackEasing,t.proxy(this.onTransitionEnd,this)):this.$stage.css({left:e+"px"})},n.prototype.is=function(t){return this._states.current[t]&&this._states.current[t]>0},n.prototype.current=function(t){if(t===i)return this._current;if(0===this._items.length)return i;if(t=this.normalize(t),this._current!==t){var e=this.trigger("change",{property:{name:"position",value:t}});e.data!==i&&(t=this.normalize(e.data)),this._current=t,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},n.prototype.invalidate=function(e){return"string"===t.type(e)&&(this._invalidated[e]=!0,this.is("valid")&&this.leave("valid")),t.map(this._invalidated,function(t,e){return e})},n.prototype.reset=function(t){(t=this.normalize(t))!==i&&(this._speed=0,this._current=t,this.suppress(["translate","translated"]),this.animate(this.coordinates(t)),this.release(["translate","translated"]))},n.prototype.normalize=function(t,e){var s=this._items.length,n=e?0:this._clones.length;return!this.isNumeric(t)||s<1?t=i:(t<0||t>=s+n)&&(t=((t-n/2)%s+s)%s+n/2),t},n.prototype.relative=function(t){return t-=this._clones.length/2,this.normalize(t,!0)},n.prototype.maximum=function(t){var e,s,i,n=this.settings,r=this._coordinates.length;if(n.loop)r=this._clones.length/2+this._items.length-1;else if(n.autoWidth||n.merge){for(e=this._items.length,s=this._items[--e].width(),i=this.$element.width();e--&&!((s+=this._items[e].width()+this.settings.margin)>i););r=e+1}else r=n.center?this._items.length-1:this._items.length-n.items;return t&&(r-=this._clones.length/2),Math.max(r,0)},n.prototype.minimum=function(t){return t?0:this._clones.length/2},n.prototype.items=function(t){return t===i?this._items.slice():(t=this.normalize(t,!0),this._items[t])},n.prototype.mergers=function(t){return t===i?this._mergers.slice():(t=this.normalize(t,!0),this._mergers[t])},n.prototype.clones=function(e){var s=this._clones.length/2,n=s+this._items.length,r=function(t){return t%2==0?n+t/2:s-(t+1)/2};return e===i?t.map(this._clones,function(t,e){return r(e)}):t.map(this._clones,function(t,s){return t===e?r(s):null})},n.prototype.speed=function(t){return t!==i&&(this._speed=t),this._speed},n.prototype.coordinates=function(e){var s,n=1,r=e-1;return e===i?t.map(this._coordinates,t.proxy(function(t,e){return this.coordinates(e)},this)):(this.settings.center?(this.settings.rtl&&(n=-1,r=e+1),s=this._coordinates[e],s+=(this.width()-s+(this._coordinates[r]||0))/2*n):s=this._coordinates[r]||0,s=Math.ceil(s))},n.prototype.duration=function(t,e,s){return 0===s?0:Math.min(Math.max(Math.abs(e-t),1),6)*Math.abs(s||this.settings.smartSpeed)},n.prototype.to=function(t,e){var s=this.current(),i=null,n=t-this.relative(s),r=(n>0)-(n<0),a=this._items.length,o=this.minimum(),h=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(n)>a/2&&(n+=-1*r*a),t=s+n,(i=((t-o)%a+a)%a+o)!==t&&i-n<=h&&i-n>0&&(s=i-n,t=i,this.reset(s))):this.settings.rewind?(h+=1,t=(t%h+h)%h):t=Math.max(o,Math.min(h,t)),this.speed(this.duration(s,t,e)),this.current(t),this.$element.is(":visible")&&this.update()},n.prototype.next=function(t){t=t||!1,this.to(this.relative(this.current())+1,t)},n.prototype.prev=function(t){t=t||!1,this.to(this.relative(this.current())-1,t)},n.prototype.onTransitionEnd=function(t){if(t!==i&&(t.stopPropagation(),(t.target||t.srcElement||t.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},n.prototype.viewport=function(){var i;return this.options.responsiveBaseElement!==e?i=t(this.options.responsiveBaseElement).width():e.innerWidth?i=e.innerWidth:s.documentElement&&s.documentElement.clientWidth?i=s.documentElement.clientWidth:console.warn("Can not detect viewport width."),i},n.prototype.replace=function(e){this.$stage.empty(),this._items=[],e&&(e=e instanceof jQuery?e:t(e)),this.settings.nestedItemSelector&&(e=e.find("."+this.settings.nestedItemSelector)),e.filter(function(){return 1===this.nodeType}).each(t.proxy(function(t,e){e=this.prepare(e),this.$stage.append(e),this._items.push(e),this._mergers.push(1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},n.prototype.add=function(e,s){var n=this.relative(this._current);s=s===i?this._items.length:this.normalize(s,!0),e=e instanceof jQuery?e:t(e),this.trigger("add",{content:e,position:s}),e=this.prepare(e),0===this._items.length||s===this._items.length?(0===this._items.length&&this.$stage.append(e),0!==this._items.length&&this._items[s-1].after(e),this._items.push(e),this._mergers.push(1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[s].before(e),this._items.splice(s,0,e),this._mergers.splice(s,0,1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[n]&&this.reset(this._items[n].index()),this.invalidate("items"),this.trigger("added",{content:e,position:s})},n.prototype.remove=function(t){(t=this.normalize(t,!0))!==i&&(this.trigger("remove",{content:this._items[t],position:t}),this._items[t].remove(),this._items.splice(t,1),this._mergers.splice(t,1),this.invalidate("items"),this.trigger("removed",{content:null,position:t}))},n.prototype.preloadAutoWidthImages=function(e){e.each(t.proxy(function(e,s){this.enter("pre-loading"),s=t(s),t(new Image).one("load",t.proxy(function(t){s.attr("src",t.target.src),s.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",s.attr("src")||s.attr("data-src")||s.attr("data-src-retina"))},this))},n.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),t(s).off(".owl.core"),!1!==this.settings.responsive&&(e.clearTimeout(this.resizeTimer),this.off(e,"resize",this._handlers.onThrottledResize));for(var i in this._plugins)this._plugins[i].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},n.prototype.op=function(t,e,s){var i=this.settings.rtl;switch(e){case"<":return i?t>s:t<s;case">":return i?t<s:t>s;case">=":return i?t<=s:t>=s;case"<=":return i?t>=s:t<=s}},n.prototype.on=function(t,e,s,i){t.addEventListener?t.addEventListener(e,s,i):t.attachEvent&&t.attachEvent("on"+e,s)},n.prototype.off=function(t,e,s,i){t.removeEventListener?t.removeEventListener(e,s,i):t.detachEvent&&t.detachEvent("on"+e,s)},n.prototype.trigger=function(e,s,i){var r={item:{count:this._items.length,index:this.current()}},a=t.camelCase(t.grep(["on",e,i],function(t){return t}).join("-").toLowerCase()),o=t.Event([e,"owl",i||"carousel"].join(".").toLowerCase(),t.extend({relatedTarget:this},r,s));return this._supress[e]||(t.each(this._plugins,function(t,e){e.onTrigger&&e.onTrigger(o)}),this.register({type:n.Type.Event,name:e}),this.$element.trigger(o),this.settings&&"function"==typeof this.settings[a]&&this.settings[a].call(this,o)),o},n.prototype.enter=function(e){t.each([e].concat(this._states.tags[e]||[]),t.proxy(function(t,e){this._states.current[e]===i&&(this._states.current[e]=0),this._states.current[e]++},this))},n.prototype.leave=function(e){t.each([e].concat(this._states.tags[e]||[]),t.proxy(function(t,e){this._states.current[e]--},this))},n.prototype.register=function(e){if(e.type===n.Type.Event){if(t.event.special[e.name]||(t.event.special[e.name]={}),!t.event.special[e.name].owl){var s=t.event.special[e.name]._default;t.event.special[e.name]._default=function(t){return!s||!s.apply||t.namespace&&-1!==t.namespace.indexOf("owl")?t.namespace&&t.namespace.indexOf("owl")>-1:s.apply(this,arguments)},t.event.special[e.name].owl=!0}}else e.type===n.Type.State&&(this._states.tags[e.name]?this._states.tags[e.name]=this._states.tags[e.name].concat(e.tags):this._states.tags[e.name]=e.tags,this._states.tags[e.name]=t.grep(this._states.tags[e.name],t.proxy(function(s,i){return t.inArray(s,this._states.tags[e.name])===i},this)))},n.prototype.suppress=function(e){t.each(e,t.proxy(function(t,e){this._supress[e]=!0},this))},n.prototype.release=function(e){t.each(e,t.proxy(function(t,e){delete this._supress[e]},this))},n.prototype.pointer=function(t){var s={x:null,y:null};return t=t.originalEvent||t||e.event,t=t.touches&&t.touches.length?t.touches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,t.pageX?(s.x=t.pageX,s.y=t.pageY):(s.x=t.clientX,s.y=t.clientY),s},n.prototype.isNumeric=function(t){return!isNaN(parseFloat(t))},n.prototype.difference=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},t.fn.owlCarousel=function(e){var s=Array.prototype.slice.call(arguments,1);return this.each(function(){var i=t(this),r=i.data("owl.carousel");r||(r=new n(this,"object"==typeof e&&e),i.data("owl.carousel",r),t.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(e,s){r.register({type:n.Type.Event,name:s}),r.$element.on(s+".owl.carousel.core",t.proxy(function(t){t.namespace&&t.relatedTarget!==this&&(this.suppress([s]),r[s].apply(this,[].slice.call(arguments,1)),this.release([s]))},r))})),"string"==typeof e&&"_"!==e.charAt(0)&&r[e].apply(r,s)})},t.fn.owlCarousel.Constructor=n}(window.Zepto||window.jQuery,window,document);