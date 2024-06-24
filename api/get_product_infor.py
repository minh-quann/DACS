from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import requests
import time
import pickle

     
# Tạo user-agent
user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"

def create_driver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(f'user-agent={user_agent}')
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def crawl_product_info(url):

    data = []
    
    driver = create_driver()

    # vào trang amazon load các cookies của tài khoản đã đăng ký
    driver.get('https://www.amazon.com')
    
    # Đọc cookies từ file và thêm vào phiên làm việc
    with open('amazon_cookies.pkl', 'rb') as file:
        cookies = pickle.load(file)
        for cookie in cookies:
            driver.add_cookie(cookie)

    driver.get(url)

    WebDriverWait(driver, 7).until(
            EC.presence_of_element_located((By.ID, 'productTitle'))
    )

    html = driver.page_source      
    soup = BeautifulSoup(html, 'html.parser')
    driver.quit() 

    product_infor = {}

    product_title = soup.find('span', attrs={'id': 'productTitle'})
    if product_title:
        product_infor['title'] = product_title.text.strip()

    product_thumb_url = soup.find('div', attrs={'id': 'imgTagWrapperId'}).find('img').get("src")
    if product_thumb_url:
        product_infor['thumb_url'] = product_thumb_url
    
    product_infor['url'] = url

    data.append(product_infor)
    

    return data