!function(n,i){var t={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}};if(!i)throw new Error("Modernizr is not loaded.");n.each(["cssanimations","csstransitions","csstransforms","csstransforms3d","prefixed"],function(n,t){if("undefined"==typeof i[t])throw new Error(['Modernizr "',t,'" is not loaded.'].join(""))}),i.csstransitions&&(n.support.transition=new String(i.prefixed("transition")),n.support.transition.end=t.transition.end[n.support.transition],/Android 4\.[123]/.test(navigator.userAgent)&&(n.support.transition.end="webkitTransitionEnd")),i.cssanimations&&(n.support.animation=new String(i.prefixed("animation")),n.support.animation.end=t.animation.end[n.support.animation]),i.csstransforms&&(n.support.transform=new String(i.prefixed("transform")),n.support.transform3d=i.csstransforms3d)}(window.Zepto||window.jQuery,window.Modernizr,window,document);