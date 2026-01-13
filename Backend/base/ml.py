import joblib

model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

def is_sensitive_ml(text):
    X_vec = vectorizer.transform([text])
    return model.predict(X_vec)[0] == "sensitive"
