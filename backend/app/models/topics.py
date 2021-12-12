from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from users import User
from ..database import Base


class Topic(Base):
    __tablename__ = 'topic'

    topic_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    title =  Column(String, unique=True)
    description = Column(String)
    participants =  Column(Integer)
    children = relationship("User")