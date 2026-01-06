#  AI Health Risk Analyzer

An end-to-end Machine Learning web application that predicts diabetes risk based on health indicators using a **Random Forest Classifier**. Built with **Flask**, **React**, and **Scikit-Learn**.



##  Key Features
- **Accurate Prediction**: Trained on the CDC BRFSS2015 dataset (Alex Teboul) with 250k+ records.
- **Data Balancing**: Utilizes `class_weight='balanced'` to effectively handle imbalanced health data.
- **Smart Mapping**: Automatically converts real-world age inputs into standardized dataset categories.
- **Modern UI**: Responsive React interface with color-coded risk assessment.

##  Tech Stack
- **Frontend**: React.js, Axios
- **Backend**: Python, Flask, Flask-CORS
- **Machine Learning**: Scikit-Learn, Pandas, NumPy, Joblib
- **Dataset**: [Diabetes Health Indicators Dataset (Kaggle)](https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset)



##  Getting Started

### Prerequisites
- Python 3.10+
- Node.js & npm

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
Train the model (optional if .pkl exists):

Bash

python models/train_model.py
Start the server:

Bash

python app.py
Frontend Setup
Navigate to the frontend folder:

Bash

cd frontend
npm install
npm start
📊 Model Performance
The model utilizes a Random Forest algorithm optimized for Recall, ensuring that potential high-risk cases are identified even in imbalanced data environments.

⚖️ Disclaimer
This application is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a physician or other qualified health provider.
