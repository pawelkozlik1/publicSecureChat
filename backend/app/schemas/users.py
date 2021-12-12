from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str
    topic_id: Optional[int] = 0


class User(UserBase):
    id: int
    role_id: int
    topic_id: Optional[int] = 0

    class Config:
        orm_mode = True


class UserForm(BaseModel):
    username: str
    password: str
