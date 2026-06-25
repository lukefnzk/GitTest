# -*- coding: utf-8 -*-
"""
06. 함수 버전 vs 클래스 버전 (그리고 둘의 혼용)
같은 '카운터' 기능을 두 방식으로 만들어 차이를 눈으로 비교한다.

핵심 차이 한 줄 요약:
  '데이터(상태)를 누가 들고 관리하느냐'
  - 함수 : 데이터가 바깥에 있고, 함수는 받아서 처리만 한다 (데이터 ↔ 동작 분리).
  - 클래스 : 데이터와 동작이 한 덩어리. 인스턴스를 여러 개 찍어내 각자 굴린다.
"""


# ============================================================
# [Part 1] 함수 버전 - 상태(count)가 함수 '바깥'에 흩어진다
# ============================================================
def increase(c):
    # 자기 상태가 없다. 받은 값을 +1 해서 '돌려줄' 뿐.
    return c + 1


def run_function_version():
    print("----- 함수 버전 -----")

    # 카운터를 2개 쓰려면 변수를 따로따로 만들어 관리해야 한다.
    count_a = 0
    count_b = 0

    count_a = increase(count_a)   # a 용
    count_a = increase(count_a)
    count_a = increase(count_a)

    count_b = increase(count_b)   # b 용

    print(f"a = {count_a}, b = {count_b}")   # a = 3, b = 1
    # -> 개수가 늘수록 'count_c, count_d ...' 와 '어느 변수를 넘기는지'가 엉킨다.


# ============================================================
# [Part 2] 클래스 버전 - 상태(count)가 객체 '안'에 들어있다
# ============================================================
class Counter:
    def __init__(self):
        self.count = 0            # 데이터를 자기 안에 가진다

    def increase(self):
        self.count += 1           # 자기 데이터를 직접 다룬다


def run_class_version():
    print("----- 클래스 버전 -----")

    a = Counter()                 # a 는 자기 count 를 들고 다닌다
    b = Counter()                 # b 는 완전히 별개의 count

    a.increase()
    a.increase()
    a.increase()

    b.increase()

    print(f"a = {a.count}, b = {b.count}")   # a = 3, b = 1
    # -> 변수를 따로 관리할 필요 없이, 인스턴스를 찍어내면 각자 독립적으로 동작한다.


# ============================================================
# [Part 3] 혼용 - 함수와 클래스는 같이 써도 된다 (오히려 보통 같이 쓴다)
# ============================================================
# 평범한 함수 : 입력 -> 출력이 명확하고 기억할 상태가 없는 '계산'은 함수가 깔끔하다.
def total_kcal(meals):
    return sum(meals)


class Meal:
    def __init__(self, date):
        self.date = date
        self.kcals = []           # 상태(끼니별 칼로리)는 객체가 보관

    def add(self, kcal):
        self.kcals.append(kcal)

    def report(self):
        # 메서드 안에서 일반 함수를 그대로 호출 -> 자연스러운 혼용
        print(f"[{self.date}] 합계 {total_kcal(self.kcals)} kcal")


def run_mixed_version():
    print("----- 혼용 버전 -----")
    m = Meal("2026-06-25")
    m.add(300)
    m.add(250)
    m.report()                    # [2026-06-25] 합계 550 kcal
    # 정리 : '상태를 들고 다니는 일'은 클래스가, '순수 계산'은 함수가 맡으면 좋다.


if __name__ == '__main__':
    run_function_version()
    print()
    run_class_version()
    print()
    run_mixed_version()
