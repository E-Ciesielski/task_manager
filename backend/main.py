from datetime import timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

import models
from auth import authenticate_user, create_access_token, get_current_user, \
    get_password_hash, get_user
from config import settings
from database import get_db_session, Base, engine
from schemas import Token, User, RegisterUser


Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.post("/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db_session)) -> Token:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@app.get("/auth/me/")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    return current_user

@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
async def register_user(data: RegisterUser, db: Session = Depends(get_db_session)):
    hashed_password = get_password_hash(data.password)
    if get_user(data.email, db) is not None:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = models.User(email=data.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"email": new_user.email}

# @app.get("/users/me/items/")
# async def read_own_items(
#     current_user: Annotated[User, Depends(get_current_user)],
# ):
#     return [{"item_id": "Foo", "owner": current_user.email}]