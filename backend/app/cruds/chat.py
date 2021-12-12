from sqlalchemy.orm import Session

from ..models.models import User


class ChatDbTools:
    def __init__(self, db: Session):
        self._db = db

    def get_user_by_cookie(self, user_cookie: str):
        return self._db.query(User).filter(User.session_cookie == user_cookie).first()
