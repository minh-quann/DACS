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

def crawl_comments(url):
    # Tải nội dung HTML của trang sản phẩm
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    base_url = ""
    # Truy cập vào phần xem tất cả các bình luận
    all_comments_url = soup.find('a', attrs={'data-hook': 'see-all-reviews-link-foot'})
    href_value = all_comments_url.get("href")
    # Lấy ra base_url là giá trị của href
    base_url = f'https://www.amazon.com/{href_value}&pageNumber={{page}}'


    data = []
    
    driver = create_driver()

    driver.get('https://www.amazon.com')
    
    # Đọc cookies từ file và thêm vào phiên làm việc
    with open('amazon_cookies.pkl', 'rb') as file:
        cookies = pickle.load(file)
        for cookie in cookies:
            driver.add_cookie(cookie)
    
    
    max_pages = 10
    for page in range(0, max_pages+1):
        page_url = base_url.format(page=page)
        driver.get(page_url)

        # time.sleep(15)
        WebDriverWait(driver, 7).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '#cm_cr-review_list'))
        )
        
        html = driver.page_source      
        soup = BeautifulSoup(html, 'html.parser')
        
        reviews = soup.find_all('div', attrs={'data-hook': 'review'})
        
        for review in reviews:
            review_detail = {}

            # Trích xuất tên người dùng
            username = review.find('span', class_='a-profile-name')
            if username:
                review_detail['username'] = username.text.strip()

            # Trích xuất nội dung bình luận
            content = review.find('span', attrs={'data-hook': 'review-body'}).find('span')
            if content:
                review_detail['content'] = content.text.strip()

            # Trích xuất số sao đánh giá
            star = review.find('span', class_='a-icon-alt')
            if star:
                review_detail['star'] = star.text.strip()
            
            
            data.append(review_detail)

        # Nếu button Next có thuộc tính a-disable dừng chương trình
        next_button = soup.find('li', class_='a-disabled a-last')
        if next_button:
            break

    driver.quit()   

    return data