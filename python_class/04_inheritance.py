# -*- coding: utf-8 -*-
"""
04. 상속(inheritance)과 오버라이드(override)
- 상속 : 기존 클래스(부모)의 기능을 물려받아 새 클래스(자식)를 만든다.
- 오버라이드 : 자식에서 같은 이름의 메서드를 다시 정의하면 부모 것을 '덮어쓴다'.
- super() : 부모의 기능을 그대로 빌려 쓸 때 사용한다.
"""


class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name}: (동물이 소리를 낸다)")


# Animal 을 상속 -> Cat 은 Animal 의 __init__ 과 speak 를 그대로 물려받는다.
class Cat(Animal):
    # speak 를 다시 정의 -> 오버라이드
    def speak(self):
        print(f"{self.name}: 야옹")


class Dog(Animal):
    def __init__(self, name, breed):
        # 부모의 __init__ 을 호출해서 name 세팅을 재사용한다.
        super().__init__(name)
        self.breed = breed       # 자식만의 추가 속성

    def speak(self):
        print(f"{self.name}({self.breed}): 멍멍")


if __name__ == '__main__':
    animals = [Cat("나비"), Dog("바둑이", "진돗개")]

    # 같은 speak() 호출이지만 각자 자기 방식대로 동작한다 (이것이 '다형성').
    for a in animals:
        a.speak()
