from starlette.background import BackgroundTasks
from starlette.websockets import WebSocket, WebSocketDisconnect
import json
from ..chat_helpers.notifier import Notifier
from typing import Optional
from fastapi import Request, APIRouter, Cookie, Depends
from ..cruds.chat import ChatDbTools
from sqlalchemy.orm import Session
from ..dependencies import get_db

router = APIRouter()
notifier = Notifier()


@router.websocket("/ws/{room_name}")
async def websocket_endpoint(
    websocket: WebSocket, room_name, background_tasks: BackgroundTasks, chat_session: Optional[str] = Cookie(None),
        db: Session = Depends(get_db)
):
    config_db = ChatDbTools(db)
    db_config = config_db.get_user_by_cookie(chat_session)
    if db_config:
        await notifier.connect(websocket, room_name)
        try:
            while True:
                data = await websocket.receive_text()
                d = json.loads(data)
                d["room_name"] = room_name

                room_members = (
                    notifier.get_members(room_name)
                    if notifier.get_members(room_name) is not None
                    else []
                )
                if websocket not in room_members:
                    print("SENDER NOT IN ROOM MEMBERS: RECONNECTING")
                    await notifier.connect(websocket, room_name)

                await notifier._notify(f"{data}", room_name)
        except WebSocketDisconnect:
            notifier.remove(websocket, room_name)
