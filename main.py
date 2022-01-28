import flask
import logging
import os

app = flask.Flask("LinkTK")
logging.getLogger('werkzeug').setLevel(logging.ERROR)

def css():
	f = open("style.css", 'r')
	css = f.read()
	f.close()
	return css

def js():
	f = open("script.js", 'r')
	js = f.read()
	f.close()
	return js

def ejs():
	f = open("extension.js", 'r')
	js = f.read()
	f.close()
	return js

@app.route('/style')
def style():
	return css()

@app.route('/script')
def script():
	return js()

@app.route('/extensions')
def extensions():
	return ejs()

@app.route('/')
def home():
	url = flask.request.url
	content = url.split('?')

	if len(content) > 1:
		if os.path.isfile(f"data/{content[1]}"):
			with open(f"data/{content[1]}", "r") as f:
				return f"<script>window.location.replace('{f.read()}');</script>"

	f = open("index.html", 'r')
	home = f.read()
	f.close()
	
	return home

@app.route('/save')
def save():
	url = flask.request.url
	content = url.split('?')

	f = open('result.html', 'r')
	template = f.read()
	f.close()

	if len(content) < 2:
		return template.replace('<div id="warning">', '<div id="warning">No Data To Save!')
	else:
		name = content[1].split('&')[0]
		data = content[1].split('&')[1].replace("%2F", "/")

		if os.path.isfile(f'data/{name}'):
			return template.replace('<div id="error">', '<div id="error">Token Occupied!')
		else:
			try:
				f = open(f'data/{name}', 'w')
				f.write(data)
				f.close()
				return template.replace('<div id="success">', '<div id="success">Saved Successfully!').replace('<change></change>', f'<br><input value="https://Use.LinkEasy.TK?{name}" type="text" name="link" autocomplete="off"><br>')
			except:
				return template.replace('<div id="error">', '<div id="error">Failed To Save!')

app.run(host="0.0.0.0", port="2020")

