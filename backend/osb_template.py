from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '<h1>Welcome to the OSB project page. Please login!</h1>'

@app.route('/login', methods=['POST'])
def login():
    return jsonify(success=True)

@app.route('/register', methods=['POST'])
def register():
    req_data=request.get_json()
    service_name=req_data['sname']
    url=req_data['url']
    username=req_data['uname']
    password=req_data['pwd']
    return jsonify(success=True,ServiceName=service_name,URL=url,Username=username,Password=password)

@app.route('/v2/catalog')
def catalog():
    return 'You\'ve hit the catalog page'


if __name__ == "__main__":
    app.run(host='0.0.0.0')