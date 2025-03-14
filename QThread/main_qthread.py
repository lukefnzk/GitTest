import sys
import time
from PySide6.QtWidgets import QApplication, QMainWindow, QMessageBox
from PySide6.QtCore import QThread, Signal
from PySide6.QtGui import QStandardItemModel, QStandardItem, QMovie
from qthread_ui import Ui_MainWindow
from threading import Thread, Event


class ThreadWorker(QThread):
    progressSignal = Signal(int)
    
    def run(self):
        for i in range(1, 101):
            self.progressSignal.emit(i)
            time.sleep(1.0)
    


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        
        self.model = QStandardItemModel()
        self.ui.listView.setModel(self.model)
        
        self.setup_connections()
      
    def setup_connections(self):
        self.ui.pushButton.clicked.connect(self.startThread_1)
        self.ui.pushButton_2.clicked.connect(self.startThread_2)
        
    def startThread_1(self):
        self.ThreadWorker = ThreadWorker()
        self.ThreadWorker.progressSignal.connect(self.update_progress)
        self.ThreadWorker.start()
        # self.fill_list()
    
    def startThread_2(self):
        self.model.clear()
    
    def update_progress(self, value):
        self.model.appendRow(QStandardItem(str(value)))
    
    
    # def fill_list(self):
    #     n = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    #     for i in n:
    #         self.model.appendRow(QStandardItem(i))


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())