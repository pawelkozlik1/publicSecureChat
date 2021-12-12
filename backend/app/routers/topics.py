from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session

from ..dependencies import get_db
from ..schemas.topics import TopicConfig, BasicConfig
from ..cruds.topics import TopicDbTools

router = APIRouter()


@router.get('/')
async def index():
    return 'be service'


@router.get('', response_model=List[TopicConfig])
def get_topics(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  db_config = config_db.get_topics(skip, limit)
  return db_config


@router.get('/users/{user_id}', response_model=List[TopicConfig])
def get_topic_by_user_id(user_id: int, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  db_config = config_db.get_topics_by_user_id(user_id)
  return db_config


@router.get('/{topic_id}', response_model=TopicConfig)
def get_topic_by_id(topic_id: int, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  db_config = config_db.get_topic_by_id(topic_id)
  return db_config


@router.get('/{title}', response_model=TopicConfig)
def get_topic_by_title(title: str, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  db_config = config_db.get_topic_by_title(title)
  return db_config


@router.post('', response_model=TopicConfig)
def add_topic(config: BasicConfig, db: Session = Depends(get_db)):
    config_db = TopicDbTools(db)
    new_config = config_db.add_topic(config)
    return new_config


@router.put('/{topic_id}')
def update_topic_by_id(config: TopicConfig, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  config_db.update_topic_by_id(config)
  return 'Success'


@router.delete('/{topic_id}')
def delete_topic_by_id(topic_id: int, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  config_db.delete_topic_by_id(topic_id)
  return 'Success'


@router.delete('/{title}')
def delete_topic_by_title(title: str, db: Session = Depends(get_db)):
  config_db = TopicDbTools(db)
  config_db.delete_topic_by_title(title)
  return 'Success'