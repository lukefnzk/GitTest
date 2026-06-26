# -*- coding: utf-8 -*-
"""
08. 데코레이터(@) 기초
07에서 만난 @property, @radius.setter 가 대체 뭔지 그 정체를 파헤친다.

핵심 한 줄 요약:
  @데코레이터 는 "바로 아래 정의한 함수를, 그 데코레이터에 넣어서 바꿔치기해라" 라는
  '간편 표기법(syntactic sugar)' 일 뿐이다.

    @deco            는 사실        def f(): ...
    def f(): ...                    f = deco(f)
                                    와 똑같다.

그래서 @ 뒤에는 '함수를 받아서 처리하는, 호출 가능한(callable) 것' 만 올 수 있다.
"""

import functools


# ============================================================
# [Part 1] 가장 단순한 데코레이터 - 함수를 '감싸기'
# 데코레이터는 별게 아니라 '함수를 받아서 새 함수를 돌려주는 함수' 다.
# ============================================================
def my_logger(func):              # 1) 원래 함수(func)를 받는다
    def wrapper(*args, **kwargs):  # 2) 그 함수를 감쌀 새 함수를 만든다
        print(f"[로그] '{func.__name__}' 시작")
        result = func(*args, **kwargs)   # 3) 원래 함수를 그대로 실행
        print(f"[로그] '{func.__name__}' 끝")
        return result
    return wrapper                # 4) 감싼 함수를 돌려준다 (이게 원래 함수를 대체)


@my_logger
def hello():
    print("  안녕하세요")


# ============================================================
# [Part 2] @ 없이 똑같이 해보기 - '@는 그냥 줄여쓴 것' 임을 눈으로 확인
# 아래 두 함수는 데코레이터를 직접 손으로 적용한다. Part 1 의 @my_logger 와 동일.
# ============================================================
def goodbye():
    print("  안녕히 가세요")


goodbye = my_logger(goodbye)   # ← @my_logger 가 사실 이 한 줄이었다


# ============================================================
# [Part 3] *args, **kwargs 가 필요한 이유
# wrapper 가 '어떤 함수든' 감쌀 수 있으려면 인자를 그대로 받아 넘겨줘야 한다.
# ============================================================
@my_logger
def add(a, b):
    return a + b


# ============================================================
# [Part 4] functools.wraps - 원래 함수의 '정체(이름 등)' 를 보존
# 데코레이터를 씌우면 함수 이름이 'wrapper' 로 바뀌어 버린다.
# @functools.wraps(func) 를 붙이면 원래 이름/설명을 그대로 유지한다.
# ============================================================
def my_logger_v2(func):
    @functools.wraps(func)        # ← 이 한 줄이 이름 보존의 핵심
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper


@my_logger          # wraps 없음
def no_wraps():
    pass


@my_logger_v2       # wraps 있음
def with_wraps():
    pass


# ============================================================
# [Part 5] 한 단계 더 - '인자를 받는' 데코레이터
# @repeat(3) 처럼 괄호가 붙는 형태. '데코레이터를 만들어내는 함수' 라 한 겹 더 감싼다.
# repeat(3) 이 먼저 실행돼 진짜 데코레이터를 돌려주고, 그게 함수에 적용된다.
# ============================================================
def repeat(times):                    # 1) 설정값(times)을 받아서
    def decorator(func):              # 2) 진짜 데코레이터를 만들고
        @functools.wraps(func)
        def wrapper(*args, **kwargs):  # 3) 함수를 times 번 반복 실행
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator                 # 4) 만들어진 데코레이터를 돌려준다


@repeat(3)          # repeat(3) -> decorator 가 되어 cheer 에 적용됨
def cheer():
    print("  파이팅!")


# ============================================================
# [Part 6] 07 과의 연결 - @property 도 결국 '데코레이터' 다
# @property 는 우리가 만든 게 아니라 Python 내장 데코레이터일 뿐,
# 원리는 위 Part 1~5 와 똑같다. radius 가 property 객체가 되고,
# 그 객체가 가진 .setter 를 @radius.setter 로 쓰는 것.
# ============================================================
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property                  # getter : t.celsius 로 '읽을' 때
    def celsius(self):
        return self._celsius

    @celsius.setter            # setter : t.celsius = 30 처럼 '넣을' 때 (검사 가능)
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("절대영도보다 낮을 수 없습니다.")
        self._celsius = value


if __name__ == '__main__':
    print("===== Part 1: @my_logger 로 감싼 함수 =====")
    hello()
    # [로그] 'hello' 시작
    #   안녕하세요
    # [로그] 'hello' 끝

    print("\n===== Part 2: @ 없이 손으로 적용 (결과 동일) =====")
    goodbye()
    # [로그] 'goodbye' 시작
    #   안녕히 가세요
    # [로그] 'goodbye' 끝

    print("\n===== Part 3: 인자 있는 함수도 그대로 감싼다 =====")
    print(f"  add(3, 5) = {add(3, 5)}")
    # [로그] 'add' 시작 / [로그] 'add' 끝 / add(3, 5) = 8

    print("\n===== Part 4: functools.wraps 의 효과 =====")
    print(f"  wraps 없음 -> 이름이 바뀜 : {no_wraps.__name__}")    # wrapper
    print(f"  wraps 있음 -> 이름 보존  : {with_wraps.__name__}")   # with_wraps

    print("\n===== Part 5: 인자를 받는 데코레이터 @repeat(3) =====")
    cheer()
    #   파이팅!  (3번 반복)

    print("\n===== Part 6: @property 도 같은 원리 =====")
    t = Temperature(25)
    print(f"  현재 온도: {t.celsius}도")   # 속성처럼 괄호 없이 읽기
    t.celsius = 30                         # setter 로 값 넣기
    print(f"  바꾼 온도: {t.celsius}도")
    try:
        t.celsius = -300                   # setter 의 검사에 걸린다
    except ValueError as e:
        print(f"  에러 막음: {e}")
