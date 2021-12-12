from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from ..constants import discord_client
from ..cruds.users import UsersDbTools
from ..dependencies import get_db
from ..schemas.users import User

router = APIRouter()


@router.get('/')
async def index():
    return 'jk Auth service'


@router.get('/oauth_login')
async def start_login():
    return discord_client.redirect()


@router.get('/callback', response_model=User)
async def login_with_discord(code: str, db: Session = Depends(get_db)):
    user = await discord_client.login(code)
    username = user['username']
    session_cookie = code

    users_db = UsersDbTools(db)
    db_user = users_db.get_user_by_username(username)

    redirect_response = RedirectResponse('https://localhost:3000/dashboard')
    if db_user:
        users_db.set_user_cookie(user=db_user, cookie_value=session_cookie)
        redirect_response.set_cookie(key='chat_session', value=session_cookie, expires=12000000)
        return redirect_response

    users_db.create_discord_user(username=username, session_cookie=session_cookie)

    redirect_response.set_cookie(key='chat_session', value=session_cookie, expires=12000000)
    return redirect_response
