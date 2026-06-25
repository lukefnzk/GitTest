# -*- coding: utf-8 -*-
"""
02. 인스턴스와 self
- 클래스 하나로 서로 '독립된' 인스턴스를 여러 개 만들 수 있다.
- 각 인스턴스는 자기만의 속성 값을 가진다 -> 그래서 self 가 필요하다.
"""


class Counter:
    def __init__(self):
        # 인스턴스마다 따로 관리되는 값
        self.count = 0

    def increase(self):
        self.count += 1

    def show(self):
        print(f"현재 카운트: {self.count}")


if __name__ == '__main__':
    a = Counter()
    b = Counter()

    # a 만 3번 증가
    a.increase()
    a.increase()
    a.increase()

    # b 는 1번만 증가
    b.increase()

    a.show()  # 현재 카운트: 3
    b.show()  # 현재 카운트: 1
    # -> a 와 b 는 같은 클래스지만 서로 다른 self(자기 자신)를 가지므로 값이 따로 논다.
