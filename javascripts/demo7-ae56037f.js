!function(){function e(){if(classie.has(i,"open")){classie.remove(i,"open"),classie.remove(n,"overlay-open"),classie.add(i,"close");var e=function(n){if(support.transitions){if("visibility"!==n.propertyName)return;this.removeEventListener(transEndEventName,e)}classie.remove(i,"close")};support.transitions?i.addEventListener(transEndEventName,e):e()}else classie.has(i,"close")||(classie.add(i,"open"),classie.add(n,"overlay-open"))}var n=document.querySelector("div.container"),t=document.getElementById("trigger-overlay"),i=document.querySelector("div.overlay"),s=i.querySelector("button.overlay-close");transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},transEndEventName=transEndEventNames[Modernizr.prefixed("transition")],support={transitions:Modernizr.csstransitions},t.addEventListener("click",e),s.addEventListener("click",e)}();