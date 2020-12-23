from flask import Flask, request, jsonify
from property_search import search_properties, get_local_nbrhood_details

app = Flask(__name__)


@app.route("/search/", methods=["POST"])
def searchProperties():
    payload = request.get_json()
    # Call the python function to fetch the properties

    search_output = search_properties(payload)
    result_json = get_local_nbrhood_details(payload)

    # Replace this line to return the listings
    return jsonify({
        'searchOutput': search_output,
        'detailsOutput': result_json})


@ app.route("/details/", methods=["POST"])
def getDetails():
    payload = request.get_json()
    print(payload)
    # Call the python function to fetch the properties

    result_json = get_local_nbrhood_details(payload)

    # Replace this line to return the listings
    return result_json


if(__name__ == "__main__"):
    app.run(host="localhost", port=5000, debug=True)
