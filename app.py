from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Замени на свои данные Telegram
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"
CHAT_ID = "YOUR_CHAT_ID_HERE"

def send_to_telegram(data):
    message = f"""
НОВАЯ ЗАЯВКА

Имя: {data['name']}
Услуга: {data['service']}
Телефон: {data['phone']}
Email: {data.get('email', '—')}
Сообщение: {data.get('message', '—')}
    """.strip()

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": message, "parse_mode": "HTML"}
    try:
        requests.post(url, data=payload, timeout=10)
    except Exception as e:
        print(f"Telegram error: {e}")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/photozones")
def photozones():
    return render_template("photozones.html")

@app.route("/signs")
def signs():
    return render_template("signs.html")

@app.route("/repair")
def repair():
    return render_template("repair.html")

@app.route("/websites")
def websites():
    return render_template("websites.html")

@app.route("/calculator")
def calculator():
    return render_template("calculator.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/send", methods=["POST"])
def send():
    data = request.get_json()
    if not data or "name" not in data or "phone" not in data:
        return jsonify({"status": "error", "message": "Missing data"}), 400
    send_to_telegram(data)
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)