from RPi import GPIO
from flask import Flask
from flask_cors import cross_origin
import ligthFunctions.lightFunctionsFunctions
from moistureSensorFunc import moistureSensor
try:
    app = Flask(__name__)


    @app.route('/numberOfLights')
    @cross_origin()
    def numberOfLights():
        return ligthFunctions.lightFunctionsFunctions.numberOfLights()

    @app.route("/numberOfMoistureSensors")
    @cross_origin()
    def numberOfMoistureSensors():
        return moistureSensor.numberOfMoistureSensors()

    @app.route('/toggleLight/<lightNumber>', methods=['POST'])
    @cross_origin()
    def toggleLight(lightNumber: int):
        return ligthFunctions.lightFunctionsFunctions.toggleLight(int(lightNumber))


    @app.route('/getCurrentValues', methods=['GET'])
    @cross_origin()
    def getCurrentValue():
        return moistureSensor.getCurrentValueOfMoistureSensor()


    @app.route("/getValuesForDay/<day>/<id>")
    @cross_origin()
    def getValuesForDay(day, id):
        return moistureSensor.getGraphData(day, id)


    if __name__ == '__main__':
        app.run(threaded=True)

    try:
        moistureSensor.startCollectDataThread()
    except KeyboardInterrupt:
        print('exiting script')
except KeyboardInterrupt:
    print('exiting script')
    GPIO.cleanup()