/*
 * 10. 클래스 (class)
 * -----------------------------------------------------------
 * python_class 에서 배운 클래스를 JS 로. 개념(생성자·상속·오버라이드)은
 * 똑같고 문법만 바뀐다. 그래서 Python 대조로 빠르게 훑는다.
 *
 * 실행:  node 10_classes.js
 */

// ------------------------------------------------------------
// 1) 기본 클래스 — python_class 01 의 Dog 를 JS 로
// ------------------------------------------------------------
class Dog {
  // constructor = Python 의 __init__ (인스턴스를 만들 때 자동 호출)
  constructor(name, age) {
    this.name = name; // this = Python 의 self (단, 매개변수로 적지 않음)
    this.age = age;
  }

  // 메서드 — function 키워드 없이 이름만 적는다
  bark() {
    console.log(`${this.name}: 멍멍!`);
  }

  introduce() {
    console.log(`제 이름은 ${this.name}이고, ${this.age}살 입니다.`);
  }
}

const myDog = new Dog("바둑이", 3); // new 로 인스턴스 생성 (Python 은 new 없이 Dog(...))
myDog.bark(); // → 바둑이: 멍멍!
myDog.introduce(); // → 제 이름은 바둑이이고, 3살 입니다.
// [Python 비교]
//   __init__ ↔ constructor,   self ↔ this,   Dog("바둑이", 3) ↔ new Dog("바둑이", 3)

// ------------------------------------------------------------
// 2) 상속 — extends 와 super (python_class 04 와 동일한 개념)
// ------------------------------------------------------------
class Puppy extends Dog {
  // Python: class Puppy(Dog)
  constructor(name) {
    super(name, 0); // 부모 생성자 호출 = Python 의 super().__init__()
  }
  bark() {
    // 오버라이드 — 부모 메서드를 새로 정의
    console.log(`${this.name}: 낑낑 (아직 아기)`);
  }
}

const p = new Puppy("콩이");
p.bark(); // → 콩이: 낑낑 (아직 아기)         (오버라이드된 버전)
p.introduce(); // → 제 이름은 콩이이고, 0살 입니다.  (부모 것 그대로 물려받음)

// ------------------------------------------------------------
// 3) getter / static (python_class 07 의 @property 와 대응)
// ------------------------------------------------------------
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  get area() {
    // get = @property. 괄호 없이 c.area 로 읽는다
    return Math.PI * this.radius ** 2;
  }
  static unit() {
    // static = 인스턴스 없이 클래스로 직접 호출
    return new Circle(1);
  }
}
const c = new Circle(5);
console.log(c.area.toFixed(2)); // → 78.54   (메서드인데 속성처럼 c.area)
console.log(Circle.unit().radius); // → 1        (Circle.unit() 로 바로 호출)
// [Python 비교] @property ↔ get,   @staticmethod ↔ static
// ※ 참고: React 는 요즘 클래스보다 '함수 컴포넌트'를 주로 쓴다. 하지만 클래스
//    개념(this, 상속)은 JS 전반과 옛 React 코드 이해에 여전히 필요하다.
