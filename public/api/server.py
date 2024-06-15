from flask import Flask, request, jsonify
from comments import crawl_comments


app = Flask(__name__)

@app.route('/crawl_comments', methods=['GET'])

def get_comments():
    # Tải nội dung HTML của trang sản phẩm
    url = request.args.get('url')
    comments = crawl_comments(url)
    return jsonify(comments)

if __name__ == '__main__':
    app.run(debug=True)


