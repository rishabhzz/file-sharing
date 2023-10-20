from flask import Flask, request, render_template

app = Flask(__name__)

# Store messages in memory (for simplicity)
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data['message']
    messages.append(message)
    return 'Message sent!', 200

@app.route('/get_messages')
def get_messages():
    return {'messages': messages}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)  # Change host and port as needed
