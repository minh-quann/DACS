from flask import Flask, request, jsonify
from get_comment import crawl_comments
from analyze_comment import analyzer_sentiments
from get_product_infor import crawl_product_info
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/crawl_comments', methods=['GET'])
def get_comments():
    # Tải nội dung HTML của trang sản phẩm
    url = request.args.get('url')
    comments = crawl_comments(url)
    return jsonify({"comments": comments})

@app.route('/analyzer_comments', methods=['POST'])
def analyze():
    # Lấy các comment từ request
    data = request.get_json()
    comments = data.get('comments')

    if not comments or not isinstance(comments, list):
        return jsonify({"error": "Invalid or missing 'comments' in request"}), 400

    # Kiểm tra định dạng từng comment
    comment = comments[0]
    if not isinstance(comment, dict) or not 'content' in comment:
        return jsonify({"error": "Each comment must be a dictionary with a 'content' key"}), 400
    # Phân tích cảm xúc các comment
    analysis_results = analyzer_sentiments(comments)
    return jsonify(analysis_results)

@app.route('/crawl_and_analyze_comments', methods=['GET'])
def crawl_and_analyzer():
    url = request.args.get('url')
    comments = crawl_comments(url)

    # Kiểm tra định dạng từng comment
    comment = comments[0]
    if not isinstance(comment, dict) or not 'content' in comment:
        return jsonify({"error": "Each comment must be a dictionary with a 'content' key"}), 400
    # Phân tích cảm xúc các comment
    analysis_results = analyzer_sentiments(comments)
    return jsonify(analysis_results)

@app.route('/get_product_information', methods=['GET'])
def get_infor():
    url = request.args.get('url')
    product_info = crawl_product_info(url)
    return jsonify(product_info)

if __name__ == '__main__':
    app.run(debug=True)


