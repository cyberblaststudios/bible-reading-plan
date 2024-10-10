from flask import Flask, send_from_directory, jsonify
import bible_plan
import sys

FRONTEND_PATH = 'frontend'

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, static_folder=FRONTEND_PATH)

    # loads the reading plan from the CSV file
    reading_plan = bible_plan.BiblePlan()

    @app.route('/apiv1/bibleplan')
    def bibleplan():
        return jsonify(reading_plan.get_reading_plan())

    # serves the frontend
    @app.route('/')
    @app.route('/<path:path>')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')
    
    return app