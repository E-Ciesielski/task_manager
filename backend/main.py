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
from schemas import Token, User, RegisterUser, ProjectCreate, Project, Task, TaskCreate, ProjectDetail

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

@app.get("/api/projects", status_code=status.HTTP_200_OK, response_model=list[Project])
async def get_projects(db: Session = Depends(get_db_session), user: User = Depends(get_current_user)):
    projects = db.query(models.Project).filter(models.Project.user == user).all()
    return projects

@app.get("/api/projects/{project_id}", status_code=status.HTTP_200_OK, response_model=ProjectDetail)
async def get_project(project_id: int, db: Session = Depends(get_db_session), user: User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.user == user, models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/projects", status_code=status.HTTP_201_CREATED, response_model=Project)
async def create_project(data: ProjectCreate, db: Session = Depends(get_db_session), user: User = Depends(get_current_user)):
    project = models.Project(name=data.name, description=data.description, user=user)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@app.delete("/api/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: int, db: Session = Depends(get_db_session), user: User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.id == project_id, models.Project.user == user).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()

@app.post("/api/tasks", status_code=status.HTTP_201_CREATED, response_model=Task)
async def create_task(data: TaskCreate, db: Session = Depends(get_db_session), user: User = Depends(get_current_user)):
    project = db.query(models.Project).filter(models.Project.user == user, models.Project.id == data.project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    task = models.Task(**data.model_dump())

    db.add(task)
    db.commit()
    db.refresh(task)

    return task



