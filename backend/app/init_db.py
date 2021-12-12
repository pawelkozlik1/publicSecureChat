from .cruds.topics import TopicDbTools
from .cruds.users import UsersDbTools
from .schemas.topics import TopicConfig
from .schemas.users import UserCreate, User
from .dependencies import get_db


def init_topic():
    topic_db = TopicDbTools(next(get_db()))
    topic: TopicConfig = TopicConfig(**{
        'topic_id': 999,
        'user_id': 999,
        'title': 'init_topic',
        'description': 'init_desc',
        'participants': 999,
    })
    topic_db.add_topic(topic)


def init_user():
    user_db = UsersDbTools(next(get_db()))
    user_student: UserCreate = UserCreate(**{
        'username': 'Student Example',
        'password': 'password',
        'topic_id': 1,
    })
    user_admin: UserCreate = UserCreate(**{
        'username': 'admin',
        'password': 'password',
        'topic_id': 1,
    })
    user_professor: UserCreate = UserCreate(**{
        'username': 'Professor Example',
        'password': 'password',
        'topic_id': 1,
    })
    user_db.create_user(user_student)
    user_db.create_user(user_admin)
    user_db.create_user(user_professor)


def seed_topic():
    topic_db = TopicDbTools(next(get_db()))
    default_topic: TopicConfig = TopicConfig(**{
        'topic_id': 2,
        'user_id': 3,
        'title': 'To jest przykładowy temat',
        'description': 'Tak wygląda przykładowy opis',
        'participants': 5,
    })
    topic_db.add_topic(default_topic)


def update_seed_roles():
    user_db = UsersDbTools(next(get_db()))
    user_student: User = User(**{
        'username': 'Professor Example',
        'id': 3,
        'role_id': 2,
        'topic_id': 2,
    })
    user_db.update_role_id(user_student)
    user_db.update_topic_id(user_student)
