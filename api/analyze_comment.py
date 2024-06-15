
import math
from nltk.sentiment.vader import SentimentIntensityAnalyzer 
     

def analyzer_sentiments(comments):
    # phân tích cảm xúc
    analyzer = SentimentIntensityAnalyzer()
    
    contents = []
    for comment in comments:
        if 'content' in comment:
            contents.append(comment['content'])
        else:
            contents.append('')

    neg, neu, pos, compound = [], [], [], []
    for content in contents:
        res = analyzer.polarity_scores(str(content))
        neg.append(res['neg'])
        neu.append(res['neu'])
        pos.append(res['pos'])
        compound.append(res['compound'])

    for comment, negative in zip(comments, neg):
        comment['neg'] = negative
    for comment, positive in zip(comments, pos):
        comment['pos'] = positive

    sentiment_tag=[]
    for i in range(len(comments)):
        winning_val = max(neg[i],pos[i])
        if (winning_val == 0.0):
            rating = float(comments[i]['star'].split(' out')[0])
            if (rating <= 3):
                sentiment_tag.append("Negative")
            else:
                sentiment_tag.append("Positive")
        if(neg[i] == winning_val):
            sentiment_tag.append("Negative")
        elif(pos[i] == winning_val):
            sentiment_tag.append("Positive")

    for comment, tag in zip (comments, sentiment_tag):
        comment['SentimentTag'] = tag


    ratings = [float(comment['star'].split()[0]) for comment in comments]
    avg_rating = sum(ratings)/len(ratings)   
    avg_rating = math.ceil(avg_rating * 2) / 2  

    positive_count = len([comment for comment in comments if comment['SentimentTag'] == 'Positive'])
    pos_ratio = positive_count/len(comments)
    pos_ratio = round(pos_ratio, 2)

    if (avg_rating >= 4 and pos_ratio >= 0.60):
        conclusion = "Positive"
    elif (avg_rating <= 3 and pos_ratio <= 0.40):
        conclusion = "Negative"
    else:
        conclusion = "Neutral"
    

    result = []
    result_info = {}
    result_info['result'] = conclusion
    result_info['avg_rating'] = avg_rating
    result_info['pos_ratio'] = pos_ratio
    result.append(result_info)
    return result
    # return comments



