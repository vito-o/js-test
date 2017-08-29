/*
属性检测
js对象可以看做属性的集合，监测集合中的成员的所属关系 - 判断某个属性是否存在于某个对象中。
可以通过in、hasOwnPreperty()、propertyIsEnumerable()方法来
对象hasOwnProperty()方法用来监测给定的名字是否有对象的自有属性。对于继承属性他将返回false
propertyIsEnumerable()是hasOwnProperty()的增强版，只有检测导师自有属性且这个属性的可枚举性为true时他才返回true。
除了in运算符之外，另一种更简便的方法是使用 !== 判断一个属性是否是undefined
Object.getOwnPropertyNames()
属性getter和setter


*/
function inherit(p){
	if(p == null) throw TypeError();
	if(Object.create)
		return Object.create(p)
	var t = typeof p;
	if(t !== 'object' && t!=='function') throw TypeError();
	function f(){}
	f.prototype = p;
	return new f();
}
var o = inherit({i:10,j:18,k:20})
o.x = 1;
o.y = 2;
o.z = 3;
o.f = function(){}
for(p in o){
	if(!o.hasOwnProperty(p)) continue;
	if(typeof o[p] === 'function') continue;
	//console.log(p);
}

//用来枚举属性的对象工具函数
function extend(o, p){
	for(prop in p){
		o[prop] = p[prop];
	}
	return o;
}

function merge(o, p){
	for(prop in p){
		if(o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop];
 	}
 	return o;
}

function restrict(o, p){
	for(prop in o){
		if(!(prop in p)) delete o[prop];
	}
	return o;
}

function subtract(o, p){
	for(prop in p){
		delete o[prop];
	}
	return 0;
}

function union(o, p){
	return extend(extend({},o),p);
}

function intersection(o, p){
	return restrict(extend({},o), p)
}

function keys(o){
	if(typeof o !== 'object') throw  TypeError();
	var result = [];
	for(var prop in o){
		if(o.hasOwnProperty(prop)){
			result.push(prop)
		}
	}
	return result;
}

var p = {
	x:1.0,
	y:1.0,

	get r(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	set r(newValue){
		var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
		var ratio = newValue/oldvalue;
		this.x *= ratio;
		this.y *= ratio;
	},
	get theta(){return Math.atan2(this.y, this.x)}
}

var q = inherit(p)
q.x = 1;
q.y = 1;


var serialnum = {
	$n:0,
	get next(){return this.$n++},
	set next(n){
		if(n>=this.$n) this.$n = n;
		else throw '序列号的值不能比当前值小';
	}
}

var random = {
	get octet(){return Math.floor(Math.random()*256);},
	get uint16(){return Math.floor(Math.random()*65536)},
	get int16(){return Math.floor(Math.random()*65536)-32768}

}

//属性的特性
//数据属性的4个特性分别是他的值(value)、可写性(writable)、可枚举(enumerable)、可配置(configurable)
//Object.getOwnPropertyDescriptor()   对于继承属性和不存在的属性，返回undefined

var o = {}
Object.defineProperty(o, 'x', 
	{
		value:1,
		writable:true,
		enumerable:false,
		configurable:true
	}
);

Object.defineProperty(o, 'x', {get:function(){return 0}})

var p = Object.defineProperties({}, {
	x:{value:1, writable:false, enumerable:true, configurable:true},
	y:{value:1, writable:true, enumerable:true, configurable:true},
	r:{
		get:function(){return Math.sqrt(this.x*this.x + this.y*this.y)},
		enumerable:true,
		configurable:true
	}
});

//定义Object.prototype.extend
Object.defineProperty(Object.prototype, 'extend', {
	writable:true,
	enumerable:false,
	configurable:true,
	value:function(o){
		var names = Object.getOwnPropertyNames(o);
		for(var i=0;i<names.length;i++){
			if(names[i] in this) continue;
			var desc = Object.getPropertyDescriptor(o, name[i]);
			Object.defineProperty(this, names[i], desc)
		}
	}
});

//每个对象都有与之相关的原型(prototype)、类(class)和可扩展性(extensible attribute)
//原型属性 
/*
对象的原型属性是用来继承属性的，经常吧o的原型属性直接叫做o的原型

*/
var p = {x:1}
var o = Object.create(p);
//console.log(p.isPrototypeOf(o));
//console.log(Object.prototype.isPrototypeOf(o));

function classof(o){
	if(o === null) return 'Null';
	if(o === undefined) return 'Undefined';
	return Object.prototype.toString.call(o).slice(8,-1);
}

//对象可扩展性
/*
通过对象传入Object.isExtensible()来判断该对象是否可扩展
如果将对象转为不可扩展的，需要调用Object.preventExtensions(); 不可逆转，但对原型无效果
Object.seal()和Object.preventExtensions()类似，除了能够将对象设置为不可扩展，换可以将对象的所有自有属性都设置为不可配置
也就是说，不能给这个对象添加新属性，而且他已有的属性也不能删除或配置，不过他已有的可写属性依然可以设置。对那些已经封闭（sealed）
起来的对象是不能解封的。可以使用Object.isSealed()来监测对象是否封闭。

Object.freeze()将更严格地锁定对象--‘冻结’（frozen）。除了将对设置为不可扩展的和将其属性设置为不可配置的之外，还
可以将他自有的所有数据属性设置为只读（setter不受影响），Object.isFrozen()来监测对象是否冻结。
*/
var o = Object.seal(
	Object.create(
		Object.freeze({x:1}),
		{y:{value:2, writable:true}}
	)
)
for(prop in o){
	//console.log(prop);
}

/*
对象序列化（serialization）是指将对象的状态转换为字符串，也可将字符串还原为对象。
JSON.stringify()和JSON.parse()用来序列化和还有js对象
*/
var o = {x:1, y:{z:[false, null, '']}};
var s = JSON.stringify(o);
var p = JSON.parse(s);
//console.log(s)
//console.log(p)




/*********************数组*************************/
//数组直接量中的值不一定要是常量
/*
数组允许有可选的结尾的逗号，故[,,]只有两个元素而非三个
*/
var base = 1024;
var table = [base, base+1, base+2, base+3];

var a1 = [,];
var a2 = [undefined];
console.log(0 in a1);
console.log(0 in a2);