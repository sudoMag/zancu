from flask import Flask, render_template, url_for, request, jsonify, send_file, send_from_directory, redirect
from env import STYLES_RUTE, SCRIPTS_RUTE, HOST_IP, SRC_FILES_RUTE, SRC_MEDIA_RUTE

app = Flask(__name__)

@app.route("/")
def home():
	return render_template("home.html")


@app.route("/static/js/<filename>")
def scripts(filename):
	return send_from_directory(SCRIPTS_RUTE, filename)


@app.route("/static/js/jquery/<filename>")
def jQueryScripts(filename):
	return send_from_directory(SCRIPTS_RUTE + "jquery/", filename)


@app.route("/static/css/<filename>")
def stylesSheet(filename):
	return send_from_directory(STYLES_RUTE, filename)

@app.route("/src/<folder>/<route>/<filename>")
def srcFiles (folder, route, filename):
	return send_from_directory(SRC_FILES_RUTE + folder + "/" + route, filename)


@app.route("/src/media/<filename>")
def mediaFiles(filename):
	return send_from_directory(SRC_MEDIA_RUTE, filename)


if __name__ == "__main__":
	app.run(debug=True)
	#app.run(port=3000, host=HOST_IP, debug=True)