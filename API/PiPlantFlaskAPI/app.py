from flask import Flask
from flask_cors import cross_origin
import ligthFunctions.lightFunctionsFunctions
from moistureSensorFunc import moistureSensor

app = Flask(__name__)


@app.route('/toggleLight/<lightNumber>', methods=['POST'])
@cross_origin()
def toggleLight(lightNumber: int):
    return ligthFunctions.lightFunctionsFunctions.toggleLight(int(lightNumber))


@app.route('/getCurrentValue', methods=['GET'])
@cross_origin()
def getCurrentValue():
    return moistureSensor.getCurrentValueOfMoistureSensor()


if __name__ == '__main__':
    app.run()
