from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()  # Selenium Manager resuelve el driver

driver.get("https://orteil.dashnet.org/cookieclicker/")

time.sleep(60)

cookie_id = "bigCookie"

cookie = driver.find_element(By.ID, cookie_id)
cookie.click()