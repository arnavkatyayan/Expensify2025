import io
from flask import Flask, request, send_file
import pandas as pd
import numpy as np
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Hello from Flask!"

@app.route('/download', methods=['POST'])
def download_income():
    data = request.get_json()
    user_name = data.get("userName", "user")
    income_data = data.get("incomeDataAll", [])

    # Convert to DataFrame
    df = pd.DataFrame(income_data)
    df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
    # Save CSV to memory (not disk)
    output = io.StringIO()
    df.to_csv(output, index=False)
    output.seek(0)

    # Send file as response
    return send_file(
        io.BytesIO(output.getvalue().encode()),
        mimetype='text/csv',
        as_attachment=True,
        download_name=f"{user_name}_income_data.csv"
    )


if __name__ == "__main__":
    app.run(debug=True)
