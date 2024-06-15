from flask import Flask, request
import requests
from bs4 import BeautifulSoup
import csv

def crawl_comments(url):
    # Tải nội dung HTML của trang sản phẩm
    response = requests.get(url)
    
    # Parse HTML với BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    
    comments = []
    
    # Trích xuất các bình luận
    reviews = soup.find_all('div', attrs={'data-hook': 'review'})
    
    # Duyệt qua từng bình luận và trích xuất thông tin
    for review in reviews:
        review_info = {}

        # Trích xuất tên người bình luận 
        username = review.find('span', class_='a-profile-name')
        if username:
            review_info['username'] = username.text.strip()

        # Trích xuất nội dung bình luận
        content = review.find('span', attrs={'data-hook': 'review-body'}).find('span')
        if content:
            review_info['content'] = content.text.strip()

        # Trích xuất số sao đánh giá
        star = review.find('span', class_='a-icon-alt')
        if star:
            review_info['star'] = star.text.strip()
        
        comments.append(review_info)

    csv_file_path = "data.csv"
    with open (csv_file_path, mode="w", newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=["username", "content", "star"])

        writer.writeheader()

        for comment in comments:
            writer.writerow(comment)

    return comments


