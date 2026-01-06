from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)


model_path = os.path.join("models", "diabetes_model.pkl")
model = joblib.load(model_path)

def map_age_to_category(age):
    """Maps real age to the 1-13 scale used in the dataset."""
    if age < 25: return 1
    if age < 30: return 2
    if age < 35: return 3
    if age < 40: return 4
    if age < 45: return 5
    if age < 50: return 6
    if age < 55: return 7
    if age < 60: return 8
    if age < 65: return 9
    if age < 70: return 10
    if age < 75: return 11
    if age < 80: return 12
    return 13

@app.route("/", methods=["GET"])
def home():
    return "Diabetes Prediction API is running."

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        
        real_age = float(data.get("Age", 30))
        age_category = map_age_to_category(real_age)

        
        feature_keys = [
            "HighBP", "HighChol", "CholCheck", "BMI", "Smoker", 
            "Stroke", "HeartDiseaseorAttack", "PhysActivity", "Fruits", 
            "Veggies", "HvyAlcoholConsump", "AnyHealthcare", "NoDocbcCost", 
            "GenHlth", "MentHlth", "PhysHlth", "DiffWalk", "Sex", 
            "Age", "Education", "Income"
        ]

        
        features = []
        for key in feature_keys:
            if key == "Age":
                features.append(float(age_category))
            elif key == "GenHlth":
                
                features.append(3.0)
            elif key == "CholCheck" or key == "AnyHealthcare":
                
                features.append(1.0)
            elif key == "Education":
                features.append(5.0) 
            elif key == "Income":
                features.append(6.0) 
            else:
            
                features.append(float(data.get(key, 0)))

        input_array = np.array([features])

        prediction = model.predict(input_array)[0]
        
        risk_map = {
            0: "Low Risk (No Diabetes)", 
            1: "Medium Risk (Pre-Diabetes)", 
            2: "High Risk (Diabetes)"
        }
        
        return jsonify({
            "prediction": int(prediction),
            "risk": risk_map.get(int(prediction), "Unknown"),
            "status": "success"
        })

    except Exception as e:
        print(f"Backend Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)