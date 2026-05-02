from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/book', methods=['POST'])
def book_ticket():
    data = request.json
    
    from_city = data.get("from")
    to_city = data.get("to")
    date = data.get("date")
    bus_type = data.get("busType")
    passengers = int(data.get("passengers"))

    total_price = int(bus_type) * passengers

    return jsonify({
        "message": "Booking Successful!",
        "from": from_city,
        "to": to_city,
        "date": date,
        "passengers": passengers,
        "total": total_price
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
