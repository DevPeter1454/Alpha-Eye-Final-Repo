from .api import router
from .core.config import settings
from .core.setup import create_application
from fastapi.middleware.cors import CORSMiddleware

app = create_application(router=router, settings=settings)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
