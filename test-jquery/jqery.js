(function(){
	if(window.jQuery){
		var _jquery = window.jQuery;
	}
	var jQuery = window.jQuery = function(selector, content){
		return new jQuery.prototype.init(selector, content);
	}

	if(window.$){
		var _$ = window.$;
	}
	window.$ = jQuery;

	var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
	
	jQuery.fn = jQuery.prototype = {
		init:function(selector, content){

			selector = selector || document;

			//Handle $(DOMHTML)
			if(selector.nodeType){
				this[0] = selector;
				this.length = 1;
				return this;
			//Handle html string
			}else if(typeof selector == 'string'){
				var match = quickExpr.exec(selector);
				if(match){

				}else{
					return new jQuery(content).find(selector);
				}

			}
		},

		jQuery:'1.2.3',

		length:0,

		find:function(selector){
			var elems = jQuery.map(this, function(elem){
				return jQuery.find(selector, elem);
			});

			return this.pushStack(/[^+>] [^=>]/.text(selector) || selector.indexOf('..') > -1 ? jQuery.unique(elems) : elems)
		},
		map:function(callback){
			return this.pushStack(jQuery.map(this, function(elem,i){
				return callback.call(elem, i, elem)
			}))
		},
		pushStack:function(elems){
			var ret = jQuery(elems);

			ret.prevObject = this;

			return ret;
		},
		unique:function(array){
			var ret = [],
				done = {};

			try{
				for(var i = 0, length = array.length; i < length; i++){
					var id = jQuery.data(array[i]);

					if(!done[id]){
						done[id] = true;
						ret.push(array[i]);
					}
				}
			}catch(e){
				ret = array;
			}

			return ret;
		}
	}

	jQuery.prototype.init.prototype = jQuery.prototype;

})(window)