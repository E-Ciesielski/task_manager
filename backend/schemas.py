from datetime import datetime

from pydantic import BaseModel, Field, EmailStr


class Project(BaseModel):
    id: int
    name: str = Field(min_length=3, max_length=100)
    description: str
    archived: bool
    createdAt: datetime
    updatedAt: datetime

class ProjectCreate(BaseModel):
    name: str
    description: str

class Task(BaseModel):
    id: int
    name: str = Field(min_length=3, max_length=100)
    description: str
    priority: int
    status: str
    type: str
    createdAt: datetime
    updatedAt: datetime

class TaskCreate(BaseModel):
    name: str = Field(min_length=3, max_length=100)
    description: str
    priority: int
    status: str
    description: str
    priority: int
    status: str
    type: str

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