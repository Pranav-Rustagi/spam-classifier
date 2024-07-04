from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle as pkl

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'static/'
vectorizer = pkl.load(open('./models/vectorizer.pkl', 'rb'))
model = pkl.load(open('./models/model.pkl', 'rb'))

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method=='GET':
        return render_template('index.html')
    else:
        content = request.form['content']
        vectorizer_data = vectorizer.transform([content])
        prediction = model.predict(vectorizer_data)
        result = True if prediction[0] == 1 else False
        return jsonify(is_spam=result)

if __name__ == '__main__':
    app.run(debug=True)