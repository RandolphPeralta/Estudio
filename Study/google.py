from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

#https://sites.google.com/chromium.org/driver/

#service = Service(executable_path="chromedriver.exe")
#driver = webdriver.Chrome(service=service)

driver = webdriver.Chrome()  # Selenium Manager resuelve el driver

driver.get("https://google.com")

#WebDriverWait(driver, 5).until(
#    EC.presence_of_element_located((By.CLASS_NAME, "gLFyf"))
#)

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CLASS_NAME, "gLFyf"))
)

input_element = driver.find_element(By.CLASS_NAME, "gLFyf")
input_element.clear()
input_element.send_keys("tech with tim" + Keys.ENTER)

link = driver.find_elements(By.PARTIAL_LINK_TEXT, "Tech wih Tim")
link.click()

time.sleep(10)

driver.quit()