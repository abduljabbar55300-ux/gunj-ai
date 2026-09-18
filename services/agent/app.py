from fastapi import FastAPI

app = FastAPI(title='Gunj AI Agent Service')

@app.get('/status')
def status() -> dict[str, str]:
    return {'status': 'running', 'service': 'agent'}
