/*
对象的扩展
*/

//属性简写
var foo = 'bar';
var baz = {foo};	//等同于var baz = {foo:foo}

function f(x,y){	//function f(x,y){return {x:x,y:y}
	return {x,y}
}

//方法简写
var o = {			//var o = {method:function(){return 'Hello!'}}
	method(){
		return 'Hello!';
	}
}

var birth = '2000/01/01';
var Person = {
	name:'张三',
	birth,
	hello(){
		console.log('my name is', this.name);
	}

}

function getPoint(){
	var x = 1;
	var y = 10;
	return {x,y}
}

var ms = {}

function getItem(key){
	return key in ms ? ms[key] : null;
}

function setItem(key, value){
	ms[key] = value;
}

function clear(){
	ms = {}
}

//module.exports = {getItem, setItem, clear};
var cart = {
	_wheels:4,
	get wheel(){
		return this._wheels;
	},
	set wheels(value){
		if(value<this._wheels){
			throw new Error('数值太小了！');
		}
		this._wheels = value;
	}
}

/*var obj = {
	class(){}
}

var obj = {
	* m(){
		yield 'hello world';
	}
}*/

//属性名表达式
let propKey = 'foo';
let obj = {
	[propKey]:true,
	['a'+'bc']:123
}

var lastWord = 'last world';
var a = {
	'first world':'hello',
	[lastWord]:'world'
}

let obj1 = {
	['h'+'ello'](){
		return 'hi';
	}
}


const keyA = {a:1}
const keyB = {b:2}
const myObject = {
	[keyA]:'valueA',
	[keyB]:'valueB'
}

//方法的name属性
const person = {
	sayName(){
		console.log('hello!');
	}
}

const obj2 = {
	get foo(){},
	set foo(x){}
}

const descriptor = Object.getOwnPropertyDescriptor(obj2, 'foo');

(new Function()).name;

var doSomething = function(){

}
doSomething.bind().name;

const key1 = Symbol('description');
const key2 = Symbol();
let obj3 = {
	[key1](){},
	[key2](){},
}

//Object.is() 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
Object.is('foo', 'foo');
Object.is({}, {})
//不同之处：
//console.log(+0 === -0);
//console.log(NaN === NaN);

//console.log(Object.is(+0,-0));
//console.log(Object.is(NaN, NaN));

Object.defineProperty(Object, 'is', {
	value:function(x,y){
		if(x===y){
			//针对+0不等于-0的情况
			return x !== 0 || 1/x === 1/y;
		}
		//针对NaN的情况
		return x !== x && y !== y;
	},
	configurable:true,
	enumerable:false,
	writable:true
});

//Object.assign();方法用于对象的合并，将源对象（source）的所有可枚举属性，
//复制到目标对象target（浅复制）
var target = {a:1, b:1}
var source1 = {b:2, c:2}
var source2 = {c:3}
//如果该参数不是对象、则会先转成对象、然后返回，undefined和null无法转成对象，如果他们作为参数，就会报错
//如果其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错，但除了字符串会以数组形式，拷贝入目标对、其他值都不会产生效果

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj4 = Object.assign({},v1,v2,v3);

Object.assign({b:'c'}, 
	Object.defineProperty({}, 'invisible', {
		enumerable:false,
		value:'hello'
	})
);

Object.assign({a:'b'}, {[Symbol('c')]:'d'})
//Object.assign浅复制

class point {
	constructor(x,y){
		Object.assign(this, {x,y})
	}
}

var po = new point(1,2);

//为对象添加方法
function SomeClass(){};
Object.assign(SomeClass.prototype, {
	someMethod(arg1, arg2){

	},
	anotherMethod(){

	}
});

function clone(origin){
	return Object.assign({}, origin);
}

function clone(origin){
	let originProto = Object.getPrototypeOf(origin);
	return Object.assign(Object.create(originProto), origin);
}

//合并多个对象
const merge1 = (target, ...sources) => Object.assign(target, ...sources);
const merge2 = (...sources) => Object.assign({}, ...sources);

//为属性指定默认值
const DEFAULTS = {
	logLevel:0,
	outputFormat:'html'
}

var oo = {};

function processContent(options){
	options = Object.assign({}, DEFAULTS, options);
	console.log(options);
}
//processContent(oo);

//属性的可枚举性和遍历
//可枚举性
let obj6 = {foo:123};
Object.getOwnPropertyDescriptor(obj6, 'foo')

/*
目前有四个操作会忽略enumerable为false的属性
for...in循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()：返回对自身的所有可枚举的属性的键名
JSON.stringify():只串化对象自身的可枚举的属性。
Object.assign()忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性
*/
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable;

Object.getOwnPropertyDescriptor([], 'length').enumerable;


//ES6规定，所有Class的原型的方法都是不可枚举的

Object.getOwnPropertyDescriptor(class{foo(){}}.prototype, 'foo').enumerable;

/*
属性的遍历
ES6一共有5中方法可以遍历对象的属性
1.for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）
2.Object.keys(obj)
object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）
3.Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包含不可枚举属性）
4.Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性
5.Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。
以上5中方法遍历对象的属性，都遵守同样的 属性遍历的次序规则
-首先遍历所有书名为数值的属性，按照数字排序
-其次遍历所有属性名为字符串的属性，按照生成时间排序
-最后遍历所有属性名为Symbol值得属性，按照生成时间排序


*/
Reflect.ownKeys({[Symbol()]:0, b:0, 10:0, 2:0, a:0});

//7.Object.getOwnPropertyDescriptors();

const obj7 = {
	foo:123,
	get bar(){return 'abc'}
}
Object.getOwnPropertyDescriptors(obj7);


function getOwnPropertyDescriptors(obj){
	const result = {}
	for(let key of Reflect.ownKeys(obj)){
		result[key]=Object.getOwnPropertyDescriptor(obj, key)
	}
	return result;
}

const source = {
	set foo(value){
		console.log(value);
	}
};
const target1 = {};
Object.assign(target1, source);
Object.getOwnPropertyDescriptor(target1, 'foo')

const target2 = {}
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source))
Object.getOwnPropertyDescriptor(target2, 'foo')

const shalloMerge = (target, source) => Object.defineProperties(
	target,
	Object.getOwnPropertyDescriptors(source)
)
