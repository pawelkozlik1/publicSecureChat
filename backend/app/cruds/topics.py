from typing import List
from sqlalchemy.orm import Session

from ..models.models import Topic
from ..schemas.topics import BasicConfig, TopicConfig


class TopicDbTools:
    def __init__(self, db: Session):
        self._db = db

    def add_topic(self, config: BasicConfig) -> Topic:
        db_config = Topic(user_id=config.user_id, title=config.title, description=config.description,
                                       participants=config.participants)
        self._db.add(db_config)
        self._db.commit()
        self._db.refresh(db_config)
        return db_config
    
    def get_topics(self, skip: int = 0, limit: int = 100) -> List[Topic]:
      return self._db.query(Topic).offset(skip).limit(limit).all()

    def get_topics_by_user_id(self, user_id: int) -> List[Topic]:
      return self._db.query(Topic).filter(Topic.user_id == user_id).all()
    
    def get_topic_by_id(self, topic_id: int) -> Topic:
      return self._db.query(Topic).filter(Topic.topic_id == topic_id).first()
    
    def get_topic_by_title(self, title: str) -> Topic:
      return self._db.query(Topic).filter(Topic.title == title).first()
    
    def delete_topic_by_id(self, topic_id: int):
      self._db.query(Topic).filter(Topic.topic_id == topic_id).delete()
      self._db.commit()
    
    def delete_topic_by_title(self, title: str) -> Topic:
      self._db.query(Topic).filter(Topic.title == title).delete()
    
    def update_topic_by_id(self, config: TopicConfig):
      self._db.query(Topic).filter(Topic.topic_id == config.topic_id).update({
        "title": config.title,
        "description": config.description,
        "participants": config.participants,
        "user_id": config.user_id
      })

      self._db.commit()