from models import User, LoanBeneficiary, Company, Loan,LoanApplication,Employee
from fastapi import HTTPException, status
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_new_acc(info, db):
    if db.query(User).filter(User.username == info.username).first():
        return {
            "detail":"username already registered",
        },status.HTTP_400_BAD_REQUEST,
    hashed_psw = pwd_context.hash(info.password)
    new_user = User(username=info.username, password= hashed_psw, email=info.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "status": status.HTTP_201_CREATED}

def login_to_userAcc(info, db):
    user = db.query(User).filter(User.username ==info.username).first()
    if user is None or not pwd_context.verify(info.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_data = {
        "id":user.id,
        "username":user.username,
        "email": user.email
    }
    return {"user": user_data, "token_type": "bearer"},status.HTTP_200_OK
def get_loan_Beneficiaries(id, db):
    beneficiaries = db.query(LoanBeneficiary).filter(LoanBeneficiary.loaned_from == id).all()
    if not beneficiaries:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No beneficiaries found for the specified provider",
        )
    return beneficiaries    
def apply_for_loan(loan_details, db):
    pass

def get_loan_payments(user_id, db):
    return

def get_company_employee(company_id, db):
    company = db.query(Company).filter(Company.id== company_id).first()
    if not company:
        return({ 
            "detail":"company not found"
        }),status.HTTP_404_NOT_FOUND
    company_employees = company.employees
    employees_list_with_loans = []
    employees_list_without_loans = []
    for employee in company_employees:
        if db.query(Loan).filter(Loan.beneficiary_id == employee.id).first():
            employees_list_with_loans.append(employee)
        else:
            employees_list_without_loans.append(employee)
    return {
        "employees_list_with_loans" : employees_list_with_loans,
        "employees_list_without_loans" : employees_list_without_loans
    },status.HTTP_200_OK

def get_loan_applications(company_id, db):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        return {
            "detail": "Company not found"
        }, status.HTTP_404_NOT_FOUND
    loan_applications = (
        db.query(LoanApplication)
        .join(Employee, LoanApplication.applicant_id == Employee.id)
        .filter(Employee.company_id == company_id)
        .all()
    )
    active_loans = (
        db.query(LoanBeneficiary)
        .join(Employee, LoanBeneficiary.loan_by == Employee.id)
        .filter(Employee.company_id == company_id, LoanBeneficiary.is_loan_active == True)
        .all()
    )

    return {
        "loan_applications": loan_applications,
        "active_loans": active_loans
    }

def apply_for_new_loan(loan_info, db):
    company_exist = db.query(Company).filter(Company.id == loan_info.company_id).first()
    company_employees = company_exist.employees
    employee_exist = db.query(Employee).filter(Employee.id == loan_info.employee_id).first()
    if employee_exist:
        return employee_exist
    if employee_exist.company_id != company_exist.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The specified employee does not belong to the specified company"
        )
    active_loans = db.query(LoanBeneficiary).join(Employee, LoanBeneficiary.loan_by == Employee.id).filter(
        Employee.company_id == company_exist.id,
        LoanBeneficiary.is_loan_active == True
    ).filter(LoanBeneficiary.loan_by == employee_exist.id).first()
    
    if active_loans:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You can't apply for a loan because you already have an active loan"
        )
    new_loan = LoanApplication(applicant_id=employee_exist.id, amount_requested=loan_info.amount_need)
    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)
    
    return {
        "message": company_exist
    }, status.HTTP_200_OK
