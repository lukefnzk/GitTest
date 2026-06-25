# -*- coding: utf-8 -*-
"""
07. __str__ 과 @property
지금까지는 '속성과 메서드'를 만들었다. 이번엔 클래스를 더 다루기 편하게 해주는
두 가지 도구를 배운다.

  1) __str__       : print(객체) 했을 때 보기 좋은 글자로 나오게 한다.
  2) @property     : 메서드를 '속성처럼' 쓰게 하고, 값을 넣을 때 검사도 할 수 있다.

하나의 Circle(원) 클래스로 두 가지를 함께 익힌다.
"""

import math


class Circle:
    def __init__(self, radius):
        # 관례상 '_radius' 처럼 밑줄을 붙여 '직접 건드리지 말라'는 내부용 속성으로 둔다.
        # 실제 접근/수정은 아래 @property 를 통해 이루어진다.
        self._radius = radius

    # ----------------------------------------------------------
    # __str__ : print(객체) / str(객체) 할 때 자동으로 불린다.
    # 정의하지 않으면 <__main__.Circle object at 0x...> 처럼 보기 싫게 나온다.
    # ----------------------------------------------------------
    def __str__(self):
        return f"반지름 {self._radius}인 원 (넓이: {self.area:.2f})"

    # ----------------------------------------------------------
    # @property : area 를 '메서드'가 아니라 '속성'처럼 쓰게 한다.
    # 호출할 때 c.area() 가 아니라 c.area 로 쓴다 (괄호 없음).
    # radius 로부터 그때그때 '계산되는' 값이라 따로 저장할 필요가 없다 (읽기 전용).
    # ----------------------------------------------------------
    @property
    def area(self):
        return math.pi * self._radius ** 2

    # ----------------------------------------------------------
    # getter : c.radius 로 '읽을' 때 불린다.
    # ----------------------------------------------------------
    @property
    def radius(self):
        return self._radius

    # ----------------------------------------------------------
    # setter : c.radius = 10 처럼 '값을 넣을' 때 불린다.
    # 여기서 검사(validation)를 하면 잘못된 값이 들어오는 걸 막을 수 있다.
    # ----------------------------------------------------------
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("반지름은 0보다 작을 수 없습니다.")
        self._radius = value


if __name__ == '__main__':
    c = Circle(5)

    # __str__ 덕분에 print 가 사람이 읽기 좋은 문장으로 나온다.
    print(c)                       # 반지름 5인 원 (넓이: 78.54)

    # area 는 @property 라서 괄호 없이 '속성처럼' 읽는다.
    print(f"넓이만: {c.area:.2f}")  # 넓이만: 78.54

    # setter 를 통해 값을 바꾸면, area 도 자동으로 다시 계산된다.
    c.radius = 10
    print(c)                       # 반지름 10인 원 (넓이: 314.16)

    # setter 의 검사 덕분에 잘못된 값은 막힌다.
    try:
        c.radius = -3
    except ValueError as e:
        print(f"에러 막음: {e}")    # 에러 막음: 반지름은 0보다 작을 수 없습니다.

    # area 는 읽기 전용(setter 가 없음) -> 직접 넣으려 하면 에러가 난다.
    try:
        c.area = 100
    except AttributeError:
        print("area 는 계산되는 값이라 직접 넣을 수 없습니다.")
