from pydantic_settings import BaseSettings, SettingsConfigDict

# to generate secret key:
# openssl rand -hex 32
class Settings(BaseSettings):
    SECRET_KEY: str = "secret key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()