from sqlalchemy import Column, Integer, String
from .database import Base

class Traduccion(Base):
    __tablename__ = "traducciones"

    id = Column(Integer, primary_key=True, index=True)
    texto_esp = Column(String, index=True)
    texto_braille = Column(String, index=True)
