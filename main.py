from typing import Union, Annotated
from models import User
import models
from fastapi import FastAPI, Depends, HTTPException,status
from models import User,Company
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from helper import create_new_acc,login_to_userAcc,apply_for_new_loan, get_loan_Beneficiaries,get_loan_applications

app = FastAPI()
origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
models.Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class Login_details(BaseModel):
    username : str
    password : str
class signup_details(BaseModel):
    username : str
    password : str
    email: str
class loan_app_details(BaseModel):
    fname:str
    sname:str
class ApplyLoanInfo(BaseModel):
    company_id : int
    employee_id: int
    amount_need: int
@app.post("/login")
async def login_user(info:Login_details, db:db_dependency):
    return login_to_userAcc(info, db)

@app.post("/signup")
async def signup_user(info:signup_details, db:db_dependency):
    return await create_new_acc(info, db)

@app.get("/get_loan_bene/{user_id}")
async def get_all_loan_bene(user_id:int, db:db_dependency):
    return get_loan_Beneficiaries(id, db) 

@app.get("/get_loan_applications/{user_id}")
async def get_loans_info(user_id:int, db:db_dependency):
    return get_loan_applications(user_id, db)

@app.post("/apply_for_loan")
async def apply_for_loan(loan_info:ApplyLoanInfo, db:db_dependency):
    return  apply_for_new_loan(loan_info,db)
