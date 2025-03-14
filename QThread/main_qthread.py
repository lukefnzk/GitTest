import sys
import time
from PySide6.QtWidgets import QApplication, QMainWindow, QMessageBox
from PySide6.QtCore import QThread, Signal
from PySide6.QtGui import QStandardItemModel, QStandardItem, QMovie
from qthread_ui import Ui_MainWindow
from threading import Thread, Event


class ThreadWorker(QThread):
    progressSignal_num = Signal(int)
    progressSignal_alpa = Signal(str)
    
    def __init__(self, mode='number'):
        super().__init__()
        self.mode = mode
        self._is_running = True
    
    def run(self):
        if self.mode == 'number':
            self.progress_num()
        else:
            self.progress_alpa()
    
    def stop(self):
        self._is_running = False
    
    def progress_num(self):
        for n in range(1, 31):
            if not self._is_running:
                break
            self.progressSignal_num.emit(n)
            time.sleep(1.0)
            
    def progress_alpa(self):
        alpa = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        for c in alpa:
            if not self._is_running:
                break
            self.progressSignal_alpa.emit(c)
            time.sleep(1.3)
    


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        
        self.model = QStandardItemModel()
        self.ui.listView.setModel(self.model)
        
        # 쓰레드 객체를 저장할 리스트
        self.thread_workers = []
        
        self.setup_connections()
      
    def setup_connections(self):
        self.ui.pushButton.clicked.connect(self.startThread_1)
        self.ui.pushButton_2.clicked.connect(self.startThread_2)
        
    def startThread_1(self):
        worker = ThreadWorker(mode='number')
        worker.progressSignal_num.connect(self.update_progress)
        worker.finished.connect(lambda: self.cleanup_thread(worker))  # 쓰레드 완료시 정리
        self.thread_workers.append(worker)
        worker.start()
    
    def startThread_2(self):
        worker = ThreadWorker(mode='alpha')
        worker.progressSignal_alpa.connect(self.update_progress)
        worker.finished.connect(lambda: self.cleanup_thread(worker))  # 쓰레드 완료시 정리
        self.thread_workers.append(worker)
        worker.start()
    
    def cleanup_thread(self, worker):
        if worker in self.thread_workers:
            self.thread_workers.remove(worker)
            worker.deleteLater()  # Qt 객체 정리
    
    def closeEvent(self, event):
        # 프로그램 종료시 모든 쓰레드 정리
        for worker in self.thread_workers:
            worker.stop()  # 먼저 쓰레드에게 중지 신호를 보냄
            worker.quit()
            # 최대 1초만 기다림
            if not worker.wait(500):
                worker.terminate()  # 1초 후에도 종료되지 않으면 강제 종료
        super().closeEvent(event)
        
    def update_progress(self, value):
        self.model.appendRow(QStandardItem(str(value)))
        # 새 항목이 추가된 후 ListView를 최하단으로 스크롤
        self.ui.listView.scrollToBottom()
    
    # def fill_list(self):
    #     n = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    #     for i in n:
    #         self.model.appendRow(QStandardItem(i))


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())