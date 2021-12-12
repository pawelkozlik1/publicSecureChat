from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from . import database
from .database import engine
from .routers import basic, users, topics, chatroom
from .init_db import init_topic, init_user, update_seed_roles, seed_topic

database.Base.metadata.create_all(bind=engine)

app_auth = FastAPI()

app_auth.include_router(basic.router, prefix='/api/1')
app_auth.include_router(users.router, prefix='/api/1')

app_be = FastAPI()
app_be.include_router(topics.router, prefix='/api/2')

app_chat = FastAPI()

app_chat.include_router(chatroom.router, prefix='/api/3')

app_chat.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    init_topic()
    init_user()
    try:
        seed_topic()
        update_seed_roles()
    except:
        pass
except:
    pass
