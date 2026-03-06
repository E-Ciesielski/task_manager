import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_CONN_URL = "sqlite:///./task.db"

engine = create_engine(DATABASE_CONN_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db_session():
    with SessionLocal() as session:
        yield session
