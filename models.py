from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric
from sqlalchemy.orm import relationship
import datetime

class User(Base):
    __tablename__="users"
    id = Column(Integer, primary_key=True)
    fullname = Column(String)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String(255))
    date = Column(DateTime, default=datetime.datetime.now)
    role = Column(String, default="user")
    def __str__(self):
        return f"{self.username}"

    
class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    address = Column(String)
    contact = Column(String)
    employees = relationship("Employee", back_populates="company")
    
    
class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True)
    fullname = Column(String)
    email = Column(String, unique=True, nullable=True)
    password = Column(String)
    role = Column(String, default="ICT Assistant")
    company_id = Column(Integer, ForeignKey('companies.id'))
    company = relationship("Company", back_populates="employees")
    loans_received = relationship("Loan", back_populates="beneficiary")
    applications_sent = relationship("LoanApplication", back_populates="applicant")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    amount = Column(Numeric(precision=10, scale=2))
    transaction_type = Column(String) 
    date = Column(DateTime, default=datetime.datetime.now)
    
    
class LoanApplication(Base):
    __tablename__ = "loan_applications"
    id = Column(Integer, primary_key=True)
    provider_id = Column(Integer, ForeignKey('loan_providers.id'))
    provider = relationship("LoanProvider", back_populates="applications_received")
    applicant_id = Column(Integer, ForeignKey('employees.id'))
    applicant = relationship("Employee", back_populates="applications_sent")
    amount_requested = Column(Numeric(precision=10, scale=2))
    date_applied = Column(DateTime, default=datetime.datetime.now)

class LoanBeneficiary(Base):
    __tablename__ ="loan_beneficiaries"
    id = Column(Integer, primary_key=True)
    loaned_from = Column(Integer, ForeignKey("loan_providers.id", ondelete="CASCADE"), nullable=False)
    loan_by = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"))
    date = Column(DateTime, default=datetime.datetime.now)
    commission = Column(Numeric(precision=10, scale=2))
    amount = Column(Numeric(precision=10, scale=2))
    is_loan_active = Column(Boolean, default=True)

class Loan(Base):
    __tablename__ = "loans"
    id = Column(Integer, primary_key=True)
    provider_id = Column(Integer, ForeignKey('loan_providers.id', ondelete="CASCADE"))
    beneficiary_id = Column(Integer, ForeignKey('employees.id', ondelete="CASCADE"))
    amount = Column(Numeric(precision=10, scale=2))
    date_disbursed = Column(DateTime, default=datetime.datetime.now)
    payments = relationship("LoanPayment", back_populates="loan")
    beneficiary = relationship("Employee", back_populates="loans_received")
    provider = relationship("LoanProvider", back_populates="loans")

class LoanPayment(Base):
    __tablename__ = "loan_payments"
    id = Column(Integer, primary_key=True)
    loan_id = Column(Integer, ForeignKey('loans.id', ondelete="CASCADE"))
    loan = relationship("Loan", back_populates="payments")
    amount_paid = Column(Numeric(precision=10, scale=2))
    date_paid = Column(DateTime, default=datetime.datetime.now)
    payee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"))
    payee = relationship("Employee")

class LoanProvider(Base):
    __tablename__ = "loan_providers"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    acc_balance = Column(Numeric(precision=10, scale=2))
    loans = relationship("Loan", back_populates="provider")
    applications_received = relationship("LoanApplication", back_populates="provider")

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True)
    notification_details =  Column(String, nullable= False)
    date =  Column(DateTime, default=datetime.datetime.now)
