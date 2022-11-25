from flask import Flask,request, jsonify
import pprint


app = Flask(__name__)

@app.route('/flask', methods=['GET'])
def index():
    return "Flask server"

@app.route('/ml', methods=['POST'])
def ml():
    print("Printing Data")
    print(request.json)
    pil_image = Image.open(image)
    print(image)
    return request.json
   


if __name__ == "__main__":
    app.run(port=5000, debug=True)