from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session

import bcrypt
import secrets

from ..constants import BCRYPT_SALT
from ..cruds.users import UsersDbTools
from ..dependencies import get_db
from ..schemas.users import User, UserCreate, UserForm

router = APIRouter(
    prefix='/users',
    tags=['users']
)


@router.get('', response_model=List[User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    db_users = users_db.get_users(skip, limit)
    return db_users


@router.get('/topic/{topic_id}', response_model=List[User])
def get_users_by_topic_id(topic_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    db_users = users_db.get_users_by_topic_id(topic_id, skip, limit)
    return db_users


@router.get('/{user_id}', response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    db_user = users_db.get_user(user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return db_user


@router.get('/{username}', response_model=User)
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    db_user = users_db.get_user_by_username(username)
    if db_user is None:
        raise HTTPException(status_code=404, detail=f'User with username "{username}" not found')
    return db_user


@router.post('', response_model=User)
def create_user(response: Response, user: UserCreate, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    db_user = users_db.get_user_by_username(user.username)
    if db_user:
        raise HTTPException(status_code=400, detail=f'User already exists')

    new_user = users_db.create_user(user)
    cookie_value = new_user.session_cookie
    response.set_cookie(key='chat_session', value=cookie_value, expires=12000000)
    return new_user


@router.post('/validate', response_model=User)
def validate_user(response: Response, request: Request, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    user_cookie = request.cookies.get('chat_session')
    if not user_cookie:
        raise HTTPException(status_code=403, detail=f'Fake user')
    db_user = users_db.get_user_by_session(user_cookie)
    if not db_user:
        response.delete_cookie('chat_session')
        raise HTTPException(status_code=403, detail=f'Fake user')
    return db_user


@router.post('/login', response_model=User)
def login(response: Response, request: Request, user: UserForm, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    db_user = users_db.get_user_by_username(user.username)

    if not db_user:
        raise HTTPException(status_code=404, detail='User not found')

    db_user_cookie = db_user.session_cookie
    login_user_cookie = request.cookies.get('chat_session')

    if db_user_cookie and login_user_cookie == db_user_cookie:
        return db_user

    # hashed_request_user_password = bcrypt.hashpw(user.password.encode(), BCRYPT_SALT)
    # bcrypt_password_check = hashed_request_user_password == db_user.hashed_password

    if not bcrypt.checkpw(user.password.encode(), db_user.hashed_password):
        raise HTTPException(status_code=401, detail='Invalid password')

    # if not bcrypt_password_check:
    #     raise HTTPException(status_code=401, detail='Invalid password')

    if not login_user_cookie:
        cookie_value = secrets.token_hex(16)
        response.set_cookie(key='chat_session', value=cookie_value, expires=12000000)
        users_db.set_user_cookie(db_user, cookie_value)

    return db_user


@router.post('/logout')
def logout(response: Response, request: Request,
           db: Session = Depends(get_db)):
    user_cookie = request.cookies.get('chat_session')
    users_db = UsersDbTools(db)
    users_db.set_default_session_cookie(user_cookie)

    response.delete_cookie('chat_session')

    return 'logged out'


@router.delete('/{user_id}')
def delete_user_by_id(user_id: int, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    users_db.delete_user_by_id(user_id)
    return 'Success'


@router.delete('/{username}')
def delete_user_by_name(username: str, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    users_db.delete_user_by_username(username)
    return 'Success'


@router.put('/{username}')
def update_user_topic_id(user: User, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    users_db.update_topic_id(user)
    return 'Success'


@router.put('/user/{username}')
def update_user_role_id(user: User, db: Session = Depends(get_db)):
    users_db = UsersDbTools(db)
    users_db.update_role_id(user)
    return 'Success'
