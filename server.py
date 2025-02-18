from flask import Flask, request, jsonify
import subprocess
import tempfile
import os

app = Flask(__name__)

@app.route("/editor")
def editor():
	editor_text = open("src/editor.html").read()
	return editor_text

@app.route("/run", methods=["POST"])
def run_code():
	data = request.get_json()
	code = data['code']
	lang = data['language']

	# Create empty temp file on code execution, tokenize the result
	temp_dir = tempfile.mkdtemp()
	exe_res = ""

	try:
		# If language is python, run as python script
		if lang == "python":
			file_path = os.path.join(temp_dir, "script.py")
			with open(file_path, "w") as f:
				f.write(code)
			exe_res = subprocess.run(["python3", file_path], capture_output=True, text=True, timeout=5)

		# If language is java, interpret as java code
		elif lang == "java":
			file_path = os.path.join(temp_dir, "Main.java")
			with open(file_path, "w") as f:
				f.write(code)
			subprocess.run(["javac", file_path], capture_output=True, text=True, timeout=5)
			exe_res = subprocess.run(["java", "-cp", temp_dir, "Main"], capture_output=True, text=True, timeout=5)

		# If language is C++, compile as C++ code
		elif lang == "cpp":
			file_path = os.path.join(temp_dir, "program.cpp")
			with open(file_path, "w") as f:
				f.write(code)
			subprocess.run(["g++", file_path, "-o", temp_dir + "/program"], capture_output=True, text=True, timeout=5)
			exe_res = subprocess.run([temp_dir + "/program"], capture_output=True, text=True, timeout=5)

		return jsonify({"output": exe_res.stdout + exe_res.stderr})

	except Exception as e:
		return jsonify({"output": f"Error: {str(e)}"})

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)