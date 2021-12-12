from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from topics import Topic
from ..database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(LargeBinary, nullable=True)
    session_cookie = Column(String)
    user_type = Column(Integer)
    topic_id = Column(Integer, ForeignKey('topic.id'))

    role_id = Column(Integer, unique=False)
