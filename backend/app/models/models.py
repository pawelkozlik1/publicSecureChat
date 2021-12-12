from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(LargeBinary, nullable=True)
    session_cookie = Column(String)
    user_type = Column(Integer)
    topic_id = Column(Integer, ForeignKey('topic.topic_id'))
    parent = relationship('Topic', back_populates='children')

    role_id = Column(Integer, unique=False)


class Topic(Base):
    __tablename__ = 'topic'

    topic_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    title = Column(String, unique=True)
    description = Column(String)
    participants = Column(Integer)
    children = relationship('User', back_populates='parent')
