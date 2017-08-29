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