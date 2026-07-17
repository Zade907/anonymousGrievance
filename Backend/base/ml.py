import joblib
from pathlib import Path

# BASE_DIR points to the Backend/ folder (where model.pkl lives)
_BASE_DIR = Path(__file__).resolve().parent.parent

_model = None
_vectorizer = None


def _load_model():
    """Lazy-load ML model and vectorizer on first use to avoid OOM at startup."""
    global _model, _vectorizer
    if _model is None:
        try:
            _model = joblib.load(_BASE_DIR / "model.pkl")
            _vectorizer = joblib.load(_BASE_DIR / "vectorizer.pkl")
        except Exception as e:
            raise RuntimeError(
                f"Failed to load ML model files (model.pkl / vectorizer.pkl): {e}"
            ) from e
    return _model, _vectorizer


def is_sensitive_ml(text):
    model, vectorizer = _load_model()
    X_vec = vectorizer.transform([text])
    return model.predict(X_vec)[0] == "sensitive"
