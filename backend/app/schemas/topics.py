from pydantic import BaseModel
from typing import List


class BasicConfig(BaseModel):
    user_id: int
    title: str
    description: str
    participants: int

    class Config:
        orm_mode = True


class TopicConfig(BasicConfig):
    topic_id: int
