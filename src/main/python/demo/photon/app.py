import os
import simplejson

import pysolr
from flask import Flask, render_template, request


app = Flask(__name__)
DEBUG = os.environ.get('DEBUG', False)
PORT = os.environ.get('PHOTON_PORT', 5001)
HOST = os.environ.get('PHOTON_HOST', '127.0.0.1')
solr = pysolr.Solr(os.environ.get("SOLR_ENDPOINT", 'http://localhost:8983/solr/'), timeout=10)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search/')
def search():
    bbox = request.args['bbox'].split(',')
    params = {
        "hl": 'true',
        "rows": 10,
        "sfield": "coordinate",
        "pt": "{0},{1}".format(*bbox),
        "sort": "geodist() asc, score desc",
        "d": 100,
    }
    results = solr.search(request.args.get('q', '*:*'), **params)
    return simplejson.dumps({
        "docs": results.docs,
        "highlight": results.highlighting
    })

if __name__ == "__main__":
    app.run(debug=DEBUG, port=int(PORT), host=HOST)
