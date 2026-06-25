# -*- coding: utf-8 -*-
"""
01. 클래스의 기초
- class 키워드로 '설계도(틀)'를 정의한다.
- __init__ 은 인스턴스를 만들 때 자동으로 불리는 '생성자'.
- self 는 '만들어진 그 인스턴스 자신'을 가리킨다.
- 함수가 class 안에 들어가면 '메서드(method)'라고 부른다.
"""


class Dog:
    # __init__ : Dog(...) 로 인스턴스를 만드는 순간 자동 실행된다.
    # 첫 번째 인자 self 는 항상 '자기 자신' -> 호출할 때 우리가 직접 넘기지 않는다.
    def __init__(self, name, age):
        # self.name 처럼 self 에 붙여 저장하면 '인스턴스 속성(attribute)'이 된다.
        self.name = name
        self.age = age

    # 메서드 : 인스턴스가 할 수 있는 동작.
    def bark(self):
        print(f"{self.name}: 멍멍!")

    def introduce(self):
        print(f"제 이름은 {self.name}이고, {self.age}살 입니다.")


if __name__ == '__main__':
    # 클래스(설계도)로 실제 객체(인스턴스)를 만든다.
    my_dog = Dog("바둑이", 3)

    # 속성 접근
    print(my_dog.name)   # 바둑이
    print(my_dog.age)    # 3

    # 메서드 호출 (self 자리에는 자동으로 my_dog 가 들어간다)
    my_dog.bark()
    my_dog.introduce()
