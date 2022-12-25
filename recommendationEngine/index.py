from flask import Flask, jsonify, request
from recommendationEngine.model.request import Request,RequestSchema
from recommendationEngine.mlCore.connector import predict_output
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/find-my-carrier', methods=['POST'])
def parseRequest():
    print(request.data)
    print(request.values)
    req = RequestSchema().load(request.get_json())
    print(req)
    result = predict_output(req.get('to_add'), req.get('to_add'), float(req.get('package_weight')), int(req.get('delivery_req')))
    print(result)
    return jsonify({"result":result});


if __name__ == "__main__":
    app.run()



