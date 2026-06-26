# -*- coding: utf-8 -*-
"""
09. *args 와 **kwargs
08에서 데코레이터가 *args, **kwargs 로 '어떤 함수든' 감싸는 걸 봤다.
그 별표(*)가 정확히 뭘 하는지 양방향으로 파헤친다.

핵심 한 줄 요약:
  * 와 ** (별표)는 '문법' 이라 못 바꾸고, args / kwargs 는 '이름' 이라 바꿔도 된다.

  별표는 방향이 두 개다.
    - 함수를 '정의'할 때 : 흩어진 인자를 '모은다'  (* -> 튜플, ** -> 딕셔너리)
    - 함수를 '호출'할 때 : 모여있던 걸 '푼다'     (리스트/딕셔너리를 인자로 펼침)
"""


# ============================================================
# [Part 1] '모으기' - 정의할 때 * 는 위치 인자를 '튜플' 로 모은다
# 몇 개가 들어올지 몰라도 다 받는다.
# ============================================================
def add_all(*args):
    print(f"  args 의 정체: {args} (type={type(args).__name__})")
    return sum(args)


# ============================================================
# [Part 2] '모으기' - 정의할 때 ** 는 키워드 인자를 '딕셔너리' 로 모은다
# 이름=값 형태로 들어온 것들을 모은다.
# ============================================================
def make_profile(**kwargs):
    print(f"  kwargs 의 정체: {kwargs} (type={type(kwargs).__name__})")
    for key, value in kwargs.items():
        print(f"    - {key}: {value}")


# ============================================================
# [Part 3] 이름은 자유, 별표는 강제 - 이름만 바꿔도 똑같이 동작
# args/kwargs 는 관례(줄임말)일 뿐, 별표만 붙어 있으면 이름은 마음대로.
# ============================================================
def show(*numbers, **options):     # args -> numbers, kwargs -> options 로 바꿈
    print(f"  numbers = {numbers}")
    print(f"  options = {options}")


# ============================================================
# [Part 4] 섞어 쓰는 '순서' - 일반 / *args / 키워드기본값 / **kwargs
# 이 순서를 어기면 SyntaxError. 별표 인자는 정해진 자리에 와야 한다.
# ============================================================
def order_demo(a, b, *args, sep="-", **kwargs):
    print(f"  a={a}, b={b}")        # 앞의 위치 인자가 먼저 채워짐
    print(f"  args={args}")          # 남는 위치 인자는 여기로
    print(f"  sep={sep!r}")          # *args 뒤의 것은 '키워드로만' 지정 가능
    print(f"  kwargs={kwargs}")      # 남는 키워드 인자는 여기로


# ============================================================
# [Part 5] '풀기' - 호출할 때 * / ** 는 모여있던 걸 펼쳐서 넘긴다
# Part 1~2 와 정반대 방향. 리스트/딕셔너리를 개별 인자로 풀어준다.
# ============================================================
def greet(greeting, name):
    return f"  {greeting}, {name}!"


# ============================================================
# [Part 6] 08 과의 연결 - 데코레이터가 이 둘을 동시에 쓰는 이유
# 모으기(*args, **kwargs)로 받아서 -> 풀기(*args, **kwargs)로 원래 함수에 그대로 전달.
# 덕분에 인자 모양이 어떻든 '아무 함수나' 감쌀 수 있다.
# ============================================================
def trace(func):
    def wrapper(*args, **kwargs):          # 모은다 (어떤 함수든 대응)
        print(f"  [호출] {func.__name__} args={args} kwargs={kwargs}")
        return func(*args, **kwargs)       # 푼다 (원래 함수에 그대로 전달)
    return wrapper


@trace
def divide(x, y):
    return x / y


if __name__ == '__main__':
    print("===== Part 1: * 로 위치 인자 모으기 =====")
    print(f"  합계 = {add_all(1, 2, 3, 4)}")      # 인자 4개
    print(f"  합계 = {add_all(10, 20)}")          # 인자 2개 (개수 자유)

    print("\n===== Part 2: ** 로 키워드 인자 모으기 =====")
    make_profile(name="Kim", age=20, city="Seoul")

    print("\n===== Part 3: 이름은 바꿔도 동작 (별표만 강제) =====")
    show(1, 2, 3, name="Kim")
    # numbers = (1, 2, 3) / options = {'name': 'Kim'}

    print("\n===== Part 4: 섞어 쓰는 순서 =====")
    order_demo(1, 2, 3, 4, sep="/", color="red", size="L")
    # a=1, b=2 / args=(3, 4) / sep='/' / kwargs={'color': 'red', 'size': 'L'}

    print("\n===== Part 5: 호출할 때 풀기 =====")
    args_list = ["안녕", "철수"]
    print(greet(*args_list))                  # greet("안녕", "철수") 와 같음

    kwargs_dict = {"greeting": "Hello", "name": "Lee"}
    print(greet(**kwargs_dict))               # greet(greeting="Hello", name="Lee") 와 같음

    print("\n===== Part 6: 데코레이터가 둘을 함께 쓰는 이유 =====")
    print(f"  결과 = {divide(10, 2)}")        # wrapper 가 (10, 2) 를 받아 그대로 전달
    # [호출] divide args=(10, 2) kwargs={} / 결과 = 5.0
