from .database import Base
from sqlalchemy import Column, String, Integer

class Traduccion(Base):
    __tablename__ = 'traducciones'
    id = Column(Integer, primary_key=True, index=True)
    texto_esp = Column(String, index=True)
    texto_braille = Column(String, index=True)
