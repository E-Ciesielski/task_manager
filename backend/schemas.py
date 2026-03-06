from datetime import datetime

from pydantic import BaseModel, Field, EmailStr

from enums import TaskStatus, TaskType


class Project(BaseModel):
    id: int
    name: str = Field(min_length=3, max_length=100)
    description: str
    archived: bool
    createdAt: datetime
    updatedAt: datetime

class ProjectDetail(BaseModel):
    id: int
    name: str = Field(min_length=3, max_length=100)
    description: str
    archived: bool
    createdAt: datetime
    updatedAt: datetime
    tasks: list[Task]

class ProjectCreate(BaseModel):
    name: str
    description: str

class Task(BaseModel):
    id: int
    name: str = Field(min_length=3, max_length=100)
    description: str
    priority: int
    status: TaskStatus
    type: TaskType
    createdAt: datetime
    updatedAt: datetime

class TaskCreate(BaseModel):
    name: str = Field(min_length=3, max_length=100)
    project_id: int
    description: str
    priority: int
    status: TaskStatus
    type: TaskType

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str

class User(BaseModel):
    email: str

class RegisterUser(BaseModel):
    email: EmailStr
    password: str