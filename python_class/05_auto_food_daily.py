# -*- coding: utf-8 -*-
"""
05. 종합 미니 예제 - AutoFoodDaily 맛보기
지금까지 배운 것(__init__, self, 인스턴스 속성, 메서드, 리스트 속성)을
한데 모아 '하루 식단을 관리하는' 작은 클래스를 만들어 본다.

DMS3 auto_server 의 AutoFoodDaily 클래스에서 아이디어를 가져온 연습용 코드.
실제 클래스도 결국 '데이터(속성) + 그 데이터를 다루는 동작(메서드)'의 묶음이다.
"""


class FoodDaily:
    def __init__(self, date):
        self.date = date          # 어떤 날짜의 식단인지 (인스턴스 속성)
        self.meals = []           # 끼니 목록. 인스턴스마다 자기 리스트를 가진다.

    # 끼니 한 개 추가
    def add_meal(self, name, kcal):
        # 한 끼니를 dict 로 만들어 리스트에 담는다.
        self.meals.append({"name": name, "kcal": kcal})
        print(f"[{self.date}] '{name}' 추가됨 ({kcal} kcal)")

    # 하루 총 칼로리 계산
    def total_kcal(self):
        return sum(meal["kcal"] for meal in self.meals)

    # 하루 식단 요약 출력
    def report(self):
        print(f"===== {self.date} 식단 =====")
        for meal in self.meals:
            # :<8 왼쪽 정렬 8칸, :>4 오른쪽 정렬 4칸 (보기 좋게 줄맞춤)
            print(f" - {meal['name']:<8} {meal['kcal']:>4} kcal")
        print(f" 합계: {self.total_kcal()} kcal")
        print("=" * 24)


if __name__ == '__main__':
    today = FoodDaily("2026-06-25")

    today.add_meal("백미밥", 300)
    today.add_meal("김치찌개", 250)
    today.add_meal("계란후라이", 90)

    today.report()
