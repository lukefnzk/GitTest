import sys
import time
from queue import Queue, Empty
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtCore import QThread, Signal
from PySide6.QtGui import QStandardItemModel, QStandardItem
from qthread_ui import Ui_MainWindow


class Producer(QThread):
    """데이터를 생성하는 Producer 클래스"""
    error_signal = Signal(str)  # 에러 발생시 알림용 시그널
    
    def __init__(self, queue, mode='number'):
        super().__init__()
        self.queue = queue
        self.mode = mode
        self._is_running = True
    
    def run(self):
        try:
            if self.mode == 'number':
                self.produce_numbers()
            else:
                self.produce_alphabets()
        except Exception as e:
            self.error_signal.emit(str(e))
    
    def produce_numbers(self):
        for n in range(1, 31):
            if not self._is_running:
                break
            self.queue.put(('number', n))
            time.sleep(1.0)
        self.queue.put(('end', None))  # 작업 완료 신호
            
    def produce_alphabets(self):
        alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", 
                    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", 
                    "W", "X", "Y", "Z"]
        for alpha in alphabets:
            if not self._is_running:
                break
            self.queue.put(('alpha', alpha))
            time.sleep(1.3)
        self.queue.put(('end', None))  # 작업 완료 신호
    
    def stop(self):
        self._is_running = False


class Consumer(QThread):
    """데이터를 소비하는 Consumer 클래스"""
    update_signal = Signal(str, object)  # (데이터 타입, 값) 형태로 전달
    finished_signal = Signal()
    
    def __init__(self, queue):
        super().__init__()
        self.queue = queue
        self._is_running = True
    
    def run(self):
        while self._is_running:
            try:
                # 큐에서 데이터를 가져옴 (최대 0.5초 대기)
                data_type, value = self.queue.get(timeout=0.5)
                
                # 종료 신호를 받으면 종료
                if data_type == 'end':
                    break
                    
                # UI 업데이트를 위해 시그널 발생
                self.update_signal.emit(data_type, value)
                
                # 작업 완료 표시
                self.queue.task_done()
                
            except Empty:  # Queue.Empty 대신 Empty 사용
                continue  # 타임아웃시 계속 진행
            except Exception as e:
                print(f"Consumer error: {e}")
                break
        
        self.finished_signal.emit()
    
    def stop(self):
        self._is_running = False


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        
        # UI 초기화
        self.model = QStandardItemModel()
        self.ui.listView.setModel(self.model)
        
        # 데이터 큐 생성
        self.data_queue = Queue()
        
        # Producer와 Consumer 저장용 리스트
        self.producers = []
        self.consumers = []
        
        # 버튼 연결
        self.setup_connections()
    
    def setup_connections(self):
        self.ui.pushButton.clicked.connect(lambda: self.start_processing('number'))
        self.ui.pushButton_2.clicked.connect(lambda: self.start_processing('alpha'))
    
    def start_processing(self, mode):
        # Producer 생성 및 시작
        producer = Producer(self.data_queue, mode)
        producer.error_signal.connect(self.handle_error)
        self.producers.append(producer)
        
        # Consumer 생성 및 시작
        consumer = Consumer(self.data_queue)
        consumer.update_signal.connect(self.update_ui)
        consumer.finished_signal.connect(lambda: self.cleanup_threads(consumer))
        self.consumers.append(consumer)
        
        # 쓰레드 시작
        producer.start()
        consumer.start()
    
    def update_ui(self, data_type, value):
        self.model.appendRow(QStandardItem(str(value)))
        self.ui.listView.scrollToBottom()
    
    def handle_error(self, error_msg):
        print(f"Error occurred: {error_msg}")
    
    def cleanup_threads(self, consumer):
        if consumer in self.consumers:
            self.consumers.remove(consumer)
            consumer.deleteLater()
    
    def closeEvent(self, event):
        # 모든 Producer 중지
        for producer in self.producers:
            producer.stop()
            producer.wait()
            producer.deleteLater()
        
        # 모든 Consumer 중지
        for consumer in self.consumers:
            consumer.stop()
            consumer.wait()
            consumer.deleteLater()
        
        # 큐 비우기
        while not self.data_queue.empty():
            try:
                self.data_queue.get_nowait()
            except Queue.Empty:
                break
        
        super().closeEvent(event)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec()) 