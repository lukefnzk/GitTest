# -*- coding: utf-8 -*-
"""
03. 클래스 변수 vs 인스턴스 변수
- 클래스 변수 : class 바로 아래에 선언. 모든 인스턴스가 '공유'한다.
- 인스턴스 변수 : self.xxx. 인스턴스마다 '따로' 가진다.
"""


class Student:
    # 클래스 변수 : 모든 Student 가 같은 학교에 다닌다고 가정 -> 공유한다.
    school = "파이썬 고등학교"

    # 만들어진 학생 수를 세는 용도로도 클래스 변수를 쓸 수 있다.
    count = 0

    def __init__(self, name):
        self.name = name          # 인스턴스 변수 (학생마다 다름)
        Student.count += 1        # 클래스 변수는 '클래스이름.변수' 로 접근/수정


if __name__ == '__main__':
    s1 = Student("철수")
    s2 = Student("영희")

    # 인스턴스 변수는 각자 다르다
    print(s1.name, s2.name)        # 철수 영희

    # 클래스 변수는 모두가 공유한다
    print(s1.school, s2.school)    # 둘 다 같은 학교

    # 학생을 만들 때마다 count 가 올라갔다
    print(f"총 학생 수: {Student.count}")  # 2
