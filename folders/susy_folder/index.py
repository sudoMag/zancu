from flask import Flask, render_template, url_for, request, jsonify, send_file, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import datetime
from env import DATABASE_RUTE, SCRIPTS_RUTE


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_RUTE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Anime(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String)
	sinopsis = db.Column(db.String)
	caps_number = db.Column(db.Integer)
	files_rute = db.Column(db.String)

class cap(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	anime = db.Column(db.String)
	cap_filename = db.Column(db.String)


@app.route("/")
def home():
	return render_template("home.html")


@app.route("/static/js/<filename>")
def scripts(filename):
	filename = SCRIPTS_RUTE
	return send_file(SCRIPTS_RUTE, filename)


@app.route("/anime/<id>")
def anime():
	anime = Anime.query.filter_by(id = Anime.id).first()
	anime_info = {
		"id":anime.id,
		"title":anime.title,
		"sinopsis":anime.sinopsis,
		"capsNumber":anime.caps_number,
		"filesRute":anime.files_rute
	}
	print (anime_info)
	return jsonify(anime_info)


if __name__ == "__main__":
	db.create_all()
	app.run(debug=True)
#    app.run(port=3000, host="192.168.137.174", debug=True)
