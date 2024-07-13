import sys
import pandas as pd
import joblib

# Load the model
model = joblib.load('trained_model.joblib')

# Read input data
annual_income = float(sys.argv[1])
credit_score = int(sys.argv[2])

# Create DataFrame for input data
new_data = pd.DataFrame({
    'annual_income': [annual_income],
    'credit_scr': [credit_score]
})

# Predict
predicted_investment = model.predict(new_data[['annual_income', 'credit_scr']])
print(predicted_investment[0])
