from typing import Optional, List

import bcrypt
import secrets
from sqlalchemy.orm import Session

from ..constants import BCRYPT_SALT
from ..models.models import User
from ..schemas.users import UserCreate


class UsersDbTools:
    def __init__(self, db: Session):
        self._db = db

    def get_user(self, user_id: int) -> User:
        return self._db.query(User).filter(User.id == user_id).first()

    def get_user_by_username(self, username: str) -> User:
        return self._db.query(User).filter(User.username == username).first()

    def get_user_by_session(self, session: str) -> User:
        return self._db.query(User).filter(User.session_cookie == session).first()

    def get_users_by_topic_id(self, topic_id: int, skip: int = 0, limit: int = 100) -> User:
        return self._db.query(User).filter(User.topic_id == topic_id).limit(limit).offset(skip).all()

    def get_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        return self._db.query(User).offset(skip).limit(limit).all()

    def create_user(self, user: UserCreate) -> User:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user.password.encode(), salt)
        user_cookie = secrets.token_hex(16)
        role_id = 0
        topic_id = 1
        if user.username == "admin":
            role_id = 1
        db_user = User(username=user.username, hashed_password=hashed_password, role_id=role_id,
                       session_cookie=user_cookie, user_type=0, topic_id=topic_id)

        self._db.add(db_user)
        self._db.commit()
        self._db.refresh(db_user)
        return db_user

    def set_default_session_cookie(self, cookie: str) -> None:
        self._db.query(User). \
            filter(User.session_cookie == cookie). \
            update({"session_cookie": None})
        self._db.commit()

    def set_user_cookie(self, user: User, cookie_value: Optional[str] = None) -> None:
        user_cookie = cookie_value or secrets.token_hex(16)
        user_name = user.username
        self._db.query(User). \
            filter(User.username == user_name). \
            update({"session_cookie": user_cookie})
        self._db.commit()

    def create_discord_user(self, username, session_cookie):
        db_user = User(username=username, role_id=0, session_cookie=session_cookie, user_type=1, topic_id=1)

        self._db.add(db_user)
        self._db.commit()
        self._db.refresh(db_user)
        return db_user
    
    def delete_user_by_id(self, user_id: int):
        self._db.query(User).filter(User.id == user_id).delete()
        self._db.commit()
    
    def delete_user_by_username(self, username: str):
        self._db.query(User).filter(User.username == username).delete()
        self._db.commit()
    
    def update_role_id(self, user: User):
        self._db.query(User).filter(User.username == user.username).update({"role_id": user.role_id})
        self._db.commit()

    def update_topic_id(self, user: User):
        self._db.query(User).filter(User.username == user.username).update({"topic_id": user.topic_id})
        self._db.commit()
