//map和set数据结构

//set类似数组，但成员的值都是唯一的，没有重复的值，set本身是一个构造函数，用来生成set数据结构
const s = new Set();
[2,3,4,3,5,2,2].forEach(x => s.add(x));

//console.log(s);

for(let i of s){
	//console.log(i);
}

//set值不重复
const set = new Set([1,2,3,4,4])
//console.log([...set]);

const items = new Set([1,2,3,4,5,5,5,5])
//console.log(items);

function divs(){
	return [...document.querySelectorAll('div')]
}

const set1 = new Set(divs());
//console.log(set1)
//console.log(set1.size)

divs().forEach(div => set1.add(div))
//console.log(set1)

var arr = [1,2,3,4,5,6,75,4,3,2,2,1,1, '5', NaN, NaN, undefined, undefined];
//console.log([...new Set(arr)])

//set内部判读两个值是否不同，使用的算法叫做‘same-value equality’ 它类似于精确相等运算符（===），
//主要区别是NaN等于自身，而精确相等运算符任务NaN不等于自身

let set2 = new Set();   //set内部两个NaN是相等的

set2.add({});
set2.add({})
//console.log(set2.size)

//set的属性和方法
/*
set解构的实例有以下属性
Set.prototype.constructor:构造函数，默认就是set函数
Set.prototype.size：返回set实例的成员综述
set实例的方法分为两大类；操作方法（用于操作数据）和遍历方法（用于遍历成员）
四个操作方法
add(value)：添加某个值，返回set结构本身
delete(value) 删除某个值，返回一个布尔值，表示删除是否成功
has(value) 返回一个布尔值，表示该值是否为set函数
clear（）清除所有成员，没有返回值

*/

/*var s3 = new Set();
s3.add(1).add(2).add(2)
console.log(s3);
console.log(s3.size);
console.log(s3.has(1));
console.log(s3.has(2));
console.log(s3.has(3));

console.log(s3.delete(2))
console.log(s3.has(2));
console.log(s3);*/

const item = new Set([1,2,3,4,5]);
const array = Array.from(item);
//console.log(item);
//console.log(array);

/*
遍历操作
set解构的实例有四个遍历方法，可以用于遍历成员
keys()返回键名的遍历器
values()返回键值的遍历器
entries()返回键值对的遍历器
forEach()返回回调函数遍历每个成员

set的遍历顺序就是插值顺序。这个特性有时非常有用，比如用set保存一个回调函数列表，调用时就能保证按照添加顺序调用


*/
let set4 = new Set(['red', 'green', 'blue'])

for(let item of set4){
	//console.log(item)
}

let set5 = new Set([1,2,3]);
//set5.forEach((value,key) => console.log(value * 2))

//遍历的应用
let set6 = new Set(['red', 'green', 'blue'])
let arr1 = [...set6];
//console.log(arr1);


let arr2 = [3,5,2,2,5,5]
let unique = [...new Set(arr2)]
//console.log(unique);

let set7 = new Set([1,2,3])
set7 = new Set([...set7].map(x => x * 2))
//console.log(set7);

let set8 = new Set([1,2,3,4,5])
set8 = new Set([...set8].filter(x => (x%2)==0));
//console.log((4%2)==0);
 
//set很容易实现交集并集差集
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);
let unit = new Set([...a, ...b]);

let intersect = new Set([...a].filter(x => b.has(x)))

let defference = new Set([...a].filter(x => !b.has(x)))
//console.log(unit);
//console.log(intersect);
//console.log(defference);

/*
改变set的原来set的结构
*/
let set9 = new Set([1,2,3])
set9 = new Set([...set9].map(val => val * 2))
//console.log(set9);

let set10 = new Set([1,2,3]);
set10 = new Set(Array.from(set10, val => val * 2))
//console.log(set10);


//weakSet
//weakSet结构与set类似，也是不重复的值得集合。但是，它与set有两个区别。首先，weakset的成员只能是对象，而不能是其他类型的值
const ws = new WeakSet();
// ws.add(1)		报错	
// ws.add(Symbol()) 报错

/*
WeakSet中的对象都是弱引用，及垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象
那么垃圾回收机制会自动回收该对象所占用的内存，不会考虑该对象还存在WeeakSet中
这是因为垃圾回收机制依赖引用计数，如果一个值得引用次数不为0，那么垃圾回收机制就不会释放这块内存。结束使用
该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄露。WeakSet里面的引用，都不计入垃圾回收机制
所以就不存在这个问题。因此，WeakSet适合临时存放一组对象，已经存放跟对象绑定的信息。只要这些对象在外部消失
他在WeakSet里面的引用就会自动消失

weakSet

WeakSet是一个构造函数，可以使用new命令，创建weakset数据及结构
作为构造函数，wekset可以接受一个数组或类似数组的对象作为参数。
（实际上，任何具有iterable解构的对象，都可以作为weakset的参数）
该数组的所有成员，都会自动成为weakset实例对象的成员
*/

const a1 = [[1,2],[3,4]]
const ws1 = new WeakSet(a1);
console.log(ws1);
//a1数组的成员成为weakset的成员，而不是a数组本身。这一晚这，数组的声音只能是对象

// const b1 = [3,4]
// const ws2 = new WeakSet(b1) //invalid value used in weak set
// console.log(ws2)

/*
WeakSet解构有以下三个方法
WeakSet.prototype.add(value)//想WeakSet实例添加一个新成员
WeakSet.prototype.delete(value)
WeakSet.prototype.has(value)//返回一个布尔值，表示某个值是否存在
*/

const ws3 = new WeakSet();
const obj = {}
const foo = {}
ws3.add(window)
ws3.add(obj)
ws3.has(window)
ws3.has(foo)

ws3.delete(window)
ws3.has(window)

//weakSet没有size属性，没有办法遍历他的成员

//weakset的一个用处，是存储DOM节点，而不用担心这些节点从文档移除是，会发生内存泄露
const foos = new WeakSet()
class Foo{
	constructor(){
		foos.add(this)
	}
	method(){
		if(!foos.has(this)){
			throw new TypeError('Foo.prorotype.method 只能在Foo的实例上调用！')
		}
	}
}

//Foo.method.caller()

/*
map 的含义和基本用法
js对象object，本质上是键值对的集合（Hash结构），但是传统上只能用字符串当做键
map类似于对象，也是键值对的集合，但是‘键’的范围不限于字符串，各种类型的值都可以当做键。
也就是说，Object结构提供了“字符串-值”的对应，map结构提供了“值-值”的对应，是一种更完善的HASH
结构实现

*/
const data = {}
const element = document.getElementById('myDiv')

data[element] = 'metadata';
//console.log(data['[object HTMLDivElement]'])

const m = new Map();
const o = {p:'Hello World'};
m.set(o, 'content');
// console.log(m)
// console.log(m.get(o))
// 
// console.log(m.has(o))
// console.log(m.delete(o))
// console.log(m.has(o))
// console.log(m)

const map = new Map([
	['name', '张三'],
	['title', 'Author']
])

// console.log(map)
// console.log(map.size)
// console.log(map.has('name'))
// console.log(map.get('name'))
// console.log(map.has('title'))
// console.log(map.get('title'))

//Map构造函数结构数字作为参数，实际上执行的是下面的算法
const item1 = [
	['name', '张三'],
	['title', 'Author']
]

const map1 = new Map();
item1.forEach(([key,value]) => map1.set(key, value))
//console.log(map1)


const set11 = new Set([
	['foo', 1],
	['bar', 2]
]);

// const m1 = new Map(set11)
// console.log(m1.get('foo'))
// const m2 = new Map([['bar',3]]);
// const m3 = new Map(m2);
// console.log(m3.get('bar'))

//如果对同一个键多次赋值，后面的值将覆盖前面的值/如果读取一个未知的键，则返回undefined。
//注意，只有同一个对象的引用，map解构才将其视为同一个键。这一点非常小心
const map2 = new Map()
map2.set(1,'aaa').set(1,'bbb');
//console.log(map2);

const map3 = new Map()
map.set(['a'], 555);
//console.log(map.get(['a']))

const map4 = new Map();
const k1 = ['a']
const k2 = ['a']
map4.set(k1,111).set(k2,222)

// console.log(map4.get(k1))
// console.log(map4.get(k2))
let map5 = new Map()
map5.set(-0, 123)
// console.log(map5.get(+0))

map5.set(true, 1)
map5.set('true', 2)
// console.log(map5.get(true))

map5.set(undefined, 3)
map5.set(null, 4)
// console.log(map5.get(undefined))
// console.log(map5)

map5.set(NaN, 123)
// console.log(map5.get(NaN))

//实例的属性和操作方法
//1.size属性
//console.log(map5.size)
const map6 = new Map()
map6.set('edition', 6)
map6.set(262, 'standard')
map6.set(undefined, 'nah')
// console.log(map6.get(undefined));
// console.log(map6.has(undefined))
// console.log(map6.delete(undefined))
// console.log(map6.clear())
// console.log(map6)


const map7 = new Map([
	['F','no'],
	['T','yes']
])

for(let key of map7.keys()){
	//console.log(key)
}

for(let key of map7.values()){
	//console.log(key)
}

for(let item of map7.entries()){
	//console.log(item[0], item[1])
}

for(let [key, value] of map7.entries()){
	//console.log(key, value);
}

for(let [key, value] of map7){
	//console.log(key, value)
}

//console.log(map7[Symbol.iterator] == map7.entries)

const map8 = new Map([
	[1, 'one'],
	[2, 'two'],
	[3, 'three']
])

//console.log([...map8]);
//console.log([...map8.keys()])
//console.log([...map8.values()])
//console.log([...map8.entries()])

//结合数字的map方法、filter方法，可以实现map的遍历和过滤（MAP本身没有map和filter方法）
const map9 = new Map()
.set(1,'a')
.set(2,'b')
.set(3,'c')

const map10 = new Map(
	[...map9].filter(([k,v]) => k<3)
)

//console.log(map10)

const map11 = new Map(
	[...map9].map(([k,v])=>[k*2, '_'+v])
)
//console.log(map11);

map11.forEach(function(value, key, map){
	//console.log('Key: %s, Value: %s', key ,value);
});

const reporter = {
	report:function(key, value){
		//console.log('Key:%s, Value:%s', key, value)
	}
}

map11.forEach(function(value,key,map){
	this.report(key, value);
}, reporter)

//与其他数据结构的互相转换
//1.map转为数组
const myMap = new Map().set(true,7).set({foo:3},['abc'])
//console.log([...myMap])

//数组转为map
// console.log(new Map([
// 	[true, 7],
// 	[{foo:3}, ['abc']]
// ]))

//map转为对象
function strMapToObject(strMap){
	let obj = Object.create(null);
	for(let [k, v] of strMap){
		obj[k] = v;
	}
	return obj;
}

const myMap1 = new Map().set('yes', true).set('no', false);
//console.log(strMapToObject(myMap1))

//对象转map
function objToMap(obj){
	let strMap = new Map()
	for(let k of Object.keys(obj)){
		strMap.set(k, obj[k])
	}
	return strMap
}

//console.log(objToMap({yes:true, no:false}))

//map转json
//map转json要区分两种情况，一种是map的键名都是字符串，这时可以选择转为对象json
function strMapToJson(strMap){
	return JSON.stringify(strMapToObject(strMap))
}
let myMap2= new Map().set('yes', true).set('no', false)
//console.log(strMapToJson(myMap2));

//另一种情况是，map的键名有非字符串，这时可以选中转为数组JSON
function mapToArrayJson(map){
	return JSON.stringify([...map])
}
let myMap3 = new Map().set(true,7).set({foo:3},['abc']);
//console.log(mapToArrayJson(myMap3))

//JSON转为Map
//JSON转为Map，正常情况下，所有键名都是字符串
function jsonToStrMap(jsonStr){
	return objToMap(JSON.parse(jsonStr));
}

//console.log(jsonToStrMap('{"yes":true, "no":false}'))
function jsonToMap(jsonStr){
	return new Map(JSON.parse(jsonStr));
}

//console.log(jsonToMap('[[true,7],[{"foo":3},["abc"]]]'));

//WeakMap
//wekMap与map解构相似

const wm1 = new WeakMap()
const key = {foo:1}
wm1.set(key,2)
//console.log(wm1.get(key))

const k11 = [1,2,3]
const k22 = [4,5,6]
const wm2 = new WeakMap([[k11, 'foo'],[k22, 'bar']]);
//console.log(wm2.get(k22));
//console.log(wm2)

//WeakMap与Map的区别有两点
//首先WeakMap只接受对象所谓键名（null除外），不接受其他类的值作为键名
const map12 = new WeakMap()
//map12.set(1,2)
//map12.set(Symbol(),2)
//map12.set(null,2)	Invalid value used as weak map key    Invalid 无效的
//其次，weakMap的键名所指向的对象，不计入垃圾回收机制
//weakMap的设计目的在于，有时我们想在某个对象上存放一些数据，但是会形成对于这个对象的引用

const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr5 = [
	[e1, 'foo 元素'],
	[e2, 'bar 元素']
]

const wm3 = new WeakMap();
let key3 = {}
let obj5 = {foo:1}

wm3.set(key3, obj5)
obj5 = null;
//console.log(wm3.get(key3))
//console.log(wm3);

const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
	constructor(counter, action){
		_counter.set(this, counter);
		_action.set(this, action)
	}
	dec(){
		let counter = _counter.get(this);
		if(counter<1) return;
		counter --;
		_counter.set(this, counter);
		if(counter === 0){
			_action.get(this)()
		}
	}
}

var c = new Countdown(2, ()=>console.log('DONE'));
c.dec()
c.dec()
//console.log(delete c);
//console.log(_counter);
//console.log(_action);
//console.log(c)





