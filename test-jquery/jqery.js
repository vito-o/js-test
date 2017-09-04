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
			console.log(jQuery);
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

	jQuery.extend = jQuery.fn.extend = function(){
		//copy reference to target object
		var target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false,
			options;

		//Handle a deep copy situation
		if(target.constructor == Boolean){
			deep = target;
			target = arguments[1] || {};
			//skip the boolean and the target
			i = 2;
		}

		//Handle case when target is a string or something (possible in deep copy)
		if(typeof target != 'object' && typeof target != 'function'){
			target = {};

			if(length == 1){
				target = this;
				i = 0;
			}
		}

		for(; i < length; i++){
			//only deal  with non-null/undefined values
			if((options = arguments[i]) != null)
				//Extend the base object
				for(var name in options){
					if(target === options[name])
						continue;

					//Recurse is we're merging object values
					if(deep && options[name] && typeof options[name] == 'object' && target[name] && !options[name].nodeType)
						target[name] = jQuery.extend(target[name], options[name]);
					
					else if(options[name] != undefined)
						target[name] = options[name];			
				}
		}

		//Return the modified object
		return target;

	}

	jQuery.extend({
		map:function(elems, callback){
			var ret = [];

			//Go through the array, translating each of the items to their new value (or values)
			for(var i = 0, length = elems.length; i < length; i++){
				var value = callback(elems[i], i);

				if(value != null && value != undefined){
					if(value.constructor != Array)
						value = [value];
					ret = ret.concat(value);
				}
			}
		}
	})

})(window)