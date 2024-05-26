from .database import Base, engine

def init_db():
    from . import models
    Base.metadata.create_all(bind=engine)
