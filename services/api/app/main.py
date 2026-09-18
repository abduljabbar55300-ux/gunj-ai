from fastapi import FastAPI

app = FastAPI(title='Gunj AI API', version='0.1.0')

@app.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok', 'service': 'gunj-ai-api'}

@app.get('/')
def read_root() -> dict[str, str]:
    return {'message': 'Welcome to Gunj AI API'}
