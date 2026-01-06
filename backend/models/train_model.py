import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

df = pd.read_csv("data/diabetes_012_health_indicators_BRFSS2015.csv")

X = df.drop("Diabetes_012", axis=1)
y = df["Diabetes_012"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)


model = RandomForestClassifier(
    n_estimators=100,
    max_depth=12,
    random_state=42,
    class_weight='balanced' 
)

print("Training balanced model... please wait.")
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))


joblib.dump(model, "models/diabetes_model.pkl")
print("New Balanced Model saved successfully!")