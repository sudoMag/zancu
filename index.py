from flask import Flask, render_template, url_for, request, jsonify, send_file, send_from_directory, redirect
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from env import DATABASE_RUTE, SCRIPTS_RUTE, STYLES_RUTE, MEDIA_RUTE, USERS_FOLDER_RUTE, HOST_IP


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_RUTE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String)
	password = db.Column(db.String)
	foldername = db.Column(db.String)
	permises = db.Column(db.String)


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

@app.route("/static/media/<filename>")
def mediaFiles(filename):
	return send_from_directory(MEDIA_RUTE, filename)

def scanFiles(rute):
	files_name = os.listdir(rute)
	files = {}
	for file in files_name:
		def type_file(file_extention):
			img = ('jpg', 'png', 'jpeg')
			vid = ('mp4', 'avi', 'mkv')
			aud = ('mp3')
			pdf = ('pdf')

			if len(file_extention) == 1:
				return 'folder'
			elif file_extention[1] in img:
				return 'file'
			elif file_extention[1] in vid:
				return 'file'
			elif file_extention[1] in aud:
				return 'file'
			elif file_extention[1] in pdf:
				return 'pdf'
			else:
				return "file" 

		def extention(file_extention):
			if len(file_extention) > 1:
				return file_extention[1]
			else:
				return None

		file_extention = file.split('.')
		data = type_file(file_extention)
		extention_data = extention(file_extention)
		files[file] = {\
			'size' : os.stat(rute + '/' + file).st_size,\
			'type' : data,\
			'name': file_extention[0],\
			'extention': extention_data
		}
		
	#print(files)
	return files


@app.route("/signin", methods=["POST"])
def signin():
	username = User.query.filter_by(username=request.json["username"]).first()

	if username:
		return  jsonify(dates="alreadyExist")

	foldername = request.json["username"] + "_folder"
	rute = USERS_FOLDER_RUTE
	files = scanFiles(rute)

	if foldername not in files:
		os.mkdir(rute + foldername)
		print('nueva carpeta creada : ' + foldername)


	new_user = User(username=request.json["username"],\
				password=generate_password_hash(request.json["password"]),\
				foldername=foldername)
	db.session.add(new_user)
	db.session.commit()
	user = User.query.filter_by(username=request.json["username"]).first()

	return	jsonify(sessionID=user.id, dates="ok")


@app.route("/login", methods=["POST"])
def login():
	user = User.query.filter_by(username=request.json["username"]).first()
	if user and check_password_hash(user.password, request.json["password"]):
		print("user registered")
		return jsonify(sessionID=user.id, dates="correct")
	print("user unregistered")
	return jsonify(dates="incorrect")


@app.route("/username/<id>")
def checkUserName(id):
	user = User.query.filter_by(id=id).first()
	return jsonify(username=user.username)


@app.route("/folder/<id>")
def getAllFiles(id):

	user = User.query.filter_by(id=id).first()
	route = USERS_FOLDER_RUTE + user.foldername
	files = scanFiles(route)

	if files:
		return jsonify(files=files)
	return jsonify(files='null')


@app.route("/getfile/<id>/<filename>")
def dowloadFile(id, filename):
	folder = request.args["folder"]
	user = User.query.filter_by(id=id).first()
	route = USERS_FOLDER_RUTE + user.foldername + folder
	return send_from_directory(route, filename)



#--------------------------------------------------
#add route for download folder entires with it inside files 
#--------------------------------------------------


@app.route("/savefile/<id>/", methods=["POST"])
def saveFile(id):
	if request.method == "POST":
		folder = request.args["folder"]
		user = User.query.filter_by(id=id).first()
		rute = USERS_FOLDER_RUTE + user.foldername + folder
		file = request.files["file_submit_button"]
			#if file:
		file_name = secure_filename(file.filename)
		file.save(rute + file_name)
		print("archivo subido : " + file_name)


@app.route("/getfolder/<id>", methods=["POST"])
def getFolder(id):
	folder = request.args["folder"]

	user = User.query.filter_by(id=id).first()
	rute = USERS_FOLDER_RUTE + user.foldername + folder

	files = scanFiles(rute)

	if files:
		return jsonify(files=files)
	return jsonify(files='null')



if __name__ == "__main__":
	db.create_all()
	app.run(debug=True)
	#app.run(port=3000, host=HOST_IP, debug=True)



