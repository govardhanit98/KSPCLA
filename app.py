from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from flask_cors import CORS, cross_origin
from helpers import image_name
from functools import wraps
import os
import base64
import razorpay
import jwt
import datetime


app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///teachers_db.db'
app.config['SECRET_KEY'] = 'dontreveal'
db = SQLAlchemy(app)

#migrations
migrate = Migrate(app, db)

class Teachers(db.Model):
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	full_name = db.Column(db.String(100), nullable=False)
	college_type = db.Column(db.String(20), nullable=False) #college type
	kgid_hrms = db.Column(db.String(50), nullable=False)
	mode_of_recuritment_or_aided_date = db.Column(db.String(20), nullable=False)
	subject = db.Column(db.String(100), nullable=False)
	qualification = db.Column(db.String(100), nullable=False)
	date_of_birth = db.Column(db.String(20), nullable=False)
	clg_street_name = db.Column(db.String(100), nullable=False)
	clg_state = db.Column(db.String(20), nullable=False)
	clg_city = db.Column(db.String(15), nullable=False)
	clg_country = db.Column(db.String(10), nullable=False)
	clg_zip_code = db.Column(db.String(10), nullable=False)
	clg_code = db.Column(db.String(15), nullable=False)
	clg_taluk = db.Column(db.String(50), nullable=False)
	emp_street_name = db.Column(db.String(100), nullable=False)
	emp_state = db.Column(db.String(20), nullable=False)
	emp_city = db.Column(db.String(15), nullable=False)
	emp_country = db.Column(db.String(15), nullable=False)
	emp_zip_code = db.Column(db.String(10), nullable=False)
	emp_taluk = db.Column(db.String(50), nullable=False)
	emp_contact = db.Column(db.String(10), nullable=False)
	emp_alt_contact = db.Column(db.String(10), nullable=False)
	issue_date = db.Column(db.String(15), nullable=False)
	joining_date = db.Column(db.String(10), nullable=False)
	fee = db.Column(db.String(10), nullable=False)
	transact_date = db.Column(db.String(10), nullable=False)
	reciept_num = db.Column(db.String(10), nullable=False)
	blood_grp = db.Column(db.String(10), nullable=False)
	img_name = db.Column(db.String(200), nullable=False)
	is_active = db.Column(db.Boolean, nullable=False, default=False)
	razorpay_order_id = db.Column(db.String(50), nullable=True)
	razorpay_payment_id = db.Column(db.String(50), nullable=True)
	razorpay_signature = db.Column(db.String(200), nullable=True)
	
	def __repr__(self):
		return  str(self.id)
	
class Admins(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	full_name = db.Column(db.String(100), nullable=False)
	email_id = db.Column(db.String(20), nullable=False)
	password = db.Column(db.String(150), nullable=False)

	def __repr__(self):
		return "AdminLog(full_name={name},email_id={email_id},password={password})"


with app.app_context(): # run this on first time only to create all the tables coded before this line.
    db.create_all() # db.fetch and other things have to check !! to check the tables

teacher_post_args = reqparse.RequestParser()
teacher_post_args.add_argument("full_name", type=str, help="Name is required", required=True)
teacher_post_args.add_argument("college_type", type=str, help="Type of employee is required", required=True)
teacher_post_args.add_argument("kgid_hrms", type=str, help="kgid or hrms is required", required=True)
teacher_post_args.add_argument("mode_of_recuritment_or_aided_date", type=str, help="mode of requirement is required", required=True)
teacher_post_args.add_argument("subject", type=str, help="Content/Subject is required", required=True)
teacher_post_args.add_argument("qualification", type=str, help="Qualification is required", required=True)
teacher_post_args.add_argument("date_of_birth", type=str, help="date of birth is required", required=True)
teacher_post_args.add_argument("clg_street_name", type=str, help="College street name is required", required=True)
teacher_post_args.add_argument("clg_state", type=str, help="College state is required", required=True)
teacher_post_args.add_argument("clg_city", type=str, help="College city is required", required=True)
teacher_post_args.add_argument("clg_country", type=str, help="College contry is required", required=True)
teacher_post_args.add_argument("clg_zip_code", type=str, help="College ZIP code is required", required=True)
teacher_post_args.add_argument("clg_code", type=str, help="College code is required", required=True)
teacher_post_args.add_argument("clg_taluk", type=str, help="College taluk is required", required=True)
teacher_post_args.add_argument("emp_street_name", type=str, help="Employee street name is required", required=True)
teacher_post_args.add_argument("emp_state", type=str, help="Employee state is required", required=True)
teacher_post_args.add_argument("emp_city", type=str, help="Employee city is required", required=True)
teacher_post_args.add_argument("emp_country", type=str, help="Employee contry is required", required=True) 
teacher_post_args.add_argument("emp_zip_code", type=str, help="Employee ZIP code is required", required=True)
teacher_post_args.add_argument("emp_taluk", type=str, help="Employee taluk is required", required=True)
teacher_post_args.add_argument("emp_contact", type=str, help="Employee contact number is required", required=True)
teacher_post_args.add_argument("emp_alt_contact", type=str, help="Employee alternate contact number is required", required=True)
teacher_post_args.add_argument("issue_date", type=str, help="Issue date is required", required=True)
teacher_post_args.add_argument("joining_date", type=str, help="Joining date is required", required=True)
teacher_post_args.add_argument("fee", type=str, help="Fee details are required", required=True)
teacher_post_args.add_argument("transact_date", type=str, help="Transaction date is required", required=True)
teacher_post_args.add_argument("reciept_num", type=str, help="Reciept number is required", required=True)
teacher_post_args.add_argument("blood_grp", type=str, help="Blood group is required", required=True)

teacher_put_args = reqparse.RequestParser()
teacher_put_args.add_argument("full_name", type=str, help="Name is required")
teacher_put_args.add_argument("content_subject", type=str, help="Content/Subject is required")
teacher_put_args.add_argument("eligibility", type=str, help="Eligibility is required")
teacher_put_args.add_argument("clg_street_name", type=str, help="College street name is required")
teacher_put_args.add_argument("clg_state", type=str, help="College state is required")
teacher_put_args.add_argument("clg_city", type=str, help="College city is required")
teacher_put_args.add_argument("clg_contry", type=str, help="College contry is required")
teacher_put_args.add_argument("clg_zip_code", type=str, help="College ZIP code is required")
teacher_put_args.add_argument("clg_code", type=str, help="College code is required")
teacher_put_args.add_argument("emp_street_name", type=str, help="Employee street name is required")
teacher_put_args.add_argument("emp_state", type=str, help="Employee state is required")
teacher_put_args.add_argument("emp_city", type=str, help="Employee city is required")
teacher_put_args.add_argument("emp_contry", type=str, help="Employee contry is required")
teacher_put_args.add_argument("emp_zip_code", type=str, help="Employee ZIP code is required")
teacher_put_args.add_argument("emp_alt_contact", type=str, help="Employee alternate contact number is required")
teacher_put_args.add_argument("issue_date", type=str, help="Issue date is required")
teacher_put_args.add_argument("joining_date", type=str, help="Joining date is required")
teacher_put_args.add_argument("fee", type=str, help="Fee details are required")
teacher_put_args.add_argument("transact_date", type=str, help="Transaction date is required")
teacher_put_args.add_argument("reciept_num", type=str, help="Reciept number is required")
teacher_put_args.add_argument("blood_grp", type=str, help="Blood group is required")

admin_post_args = reqparse.RequestParser()
admin_post_args.add_argument("email_id", type=str, help="Email Id is required", required=True)
admin_post_args.add_argument("password", type=str, help="Password is required", required=True)

admin_put_args = reqparse.RequestParser()
admin_put_args.add_argument("full_name", type=str, help="Name is required", required=True)
admin_put_args.add_argument("email_id", type=str, help="Email Id is required", required=True)
admin_put_args.add_argument("password", type=str, help="Password is required", required=True)

resource_fields = {
	'full_name': fields.String,
	'subject': fields.String,
	'qualification': fields.String,
	'clg_street_name': fields.String,
	'clg_state': fields.String,
	'clg_city': fields.String,
	'clg_country': fields.String,
	'clg_zip_code': fields.String,
	'clg_code': fields.String,
	'emp_street_name': fields.String,
	'emp_state': fields.String,
	'emp_city': fields.String,
	'emp_country': fields.String,
	'emp_zip_code': fields.String,
	'emp_contact': fields.String,
	'emp_alt_contact': fields.String,
	'issue_date': fields.String,
	'joining_date': fields.String,
	'fee': fields.String,
	'transact_date': fields.String,
	'reciept_num': fields.String,
	'blood_grp': fields.String,
	'img_name' : fields.String,
	'message' : fields.String	
}

log_in_fields = {
	'full_name': fields.String,
	'email_id': fields.String,
	'password': fields.String
}

def token_check(f):
	@wraps(f)
	def request_check(*args, **kwargs):
		token = request.headers['Authorization']
		if not token:
			return {'message': 'This is not for Public!!!'},403
		try:
			data = jwt.decode(token,app.config['SECRET_KEY'],"HS256")
			#print(data)
		except:
			return {'message': 'Login Required!!!'},403
		
		return f(*args, **kwargs)
	return request_check

class Teacher(Resource):
	@marshal_with(resource_fields)
	def get(self, emp_contact):
		result = Teachers.query.filter_by(emp_contact=emp_contact).first()
		if not result:
			abort(404, message="Could not find the MEMBER")

		return result

	# @marshal_with(resource_fields)
	def post(self, emp_contact):

		#print(request.json)
		
		args = teacher_post_args.parse_args()
	
		
		result = Teachers.query.filter_by(emp_contact=args['emp_contact']).first()
		
		if result:
			abort(409, message="Employee is already registered.")
		
		
		'''
		image_name is a function which takes the current filename of the image
		and renames it for current date, time and goes till milliseconds.
		'''
		bytes = request.json['image_name']
		
		file_name = image_name()

		client = razorpay.Client(auth=("rzp_live_NsPEDhaehr4Mho","mtDtX8FtSN0uGpivTFG5R56G"))
		razorpay_data = {
			'amount' : 100,
			'currency' : 'INR' 
		}
		payment = client.order.create(data=razorpay_data)
		razorpay_order_id = payment['id']
		
		teacher = Teachers(razorpay_order_id=razorpay_order_id,full_name=args['full_name'],college_type=args['college_type'],kgid_hrms = args['kgid_hrms'], mode_of_recuritment_or_aided_date = args['mode_of_recuritment_or_aided_date'], subject=args['subject'],qualification=args['qualification'],date_of_birth=args['date_of_birth'],clg_street_name=args['clg_street_name'],clg_state=args['clg_state'],clg_city=args['clg_city'],clg_country=args['clg_country'],clg_zip_code=args['clg_zip_code'],clg_code=args['clg_code'],clg_taluk=args['clg_taluk'],emp_street_name=args['emp_street_name'],emp_state=args['emp_state'],emp_city=args['emp_city'],emp_country=args['emp_country'],emp_zip_code=args['emp_zip_code'],emp_taluk=args['emp_taluk'],emp_contact=args['emp_contact'],emp_alt_contact=args['emp_alt_contact'],issue_date=args['issue_date'],joining_date=args['joining_date'],fee=args['fee'],transact_date=args['transact_date'],reciept_num=args['reciept_num'],blood_grp=args['blood_grp'], img_name=file_name, is_active=False)
		
		db.session.add(teacher)
		db.session.commit()
		with open(f"images/{file_name}", 'wb') as image:
			image.write(base64.b64decode(bytes))
			image.close()
		

			
		return {'razorpay_order_id':razorpay_order_id}, 201

class Admin(Resource):
	@marshal_with(resource_fields)
	@token_check
	def get(self,emp_contact):
		
		
		if emp_contact:
			result = Teachers.query.filter_by(emp_contact=emp_contact).first()
		else:
			result = Teachers.query.all()
		


		if not result:
			abort(404, message="can't fetch the Datails.")
		
		return result
	
	@cross_origin(origin='*',headers=['Content-Type','Authorization'])
	@marshal_with(resource_fields)
	@token_check
	def put(self,emp_contact):
		args = teacher_put_args.parse_args()
		#print('args ok')
		result = Teachers.query.filter_by(emp_contact=emp_contact).first()
		if not result:
			abort(404, message="Member doesn't exist, cannot update")
		
		if args['full_name']:
			result.full_name = args['full_name']
		if args['content_subject']:
			result.subject = args['content_subject']
		if args['eligibility']:
			result.qualification = args['eligibility']
		if args['clg_street_name']:
			result.clg_street_name = args['clg_street_name']
		if args['clg_state']:
			result.clg_state = args['clg_state']
		if args['clg_city']:
			result.clg_city = args['clg_city']
		if args['clg_contry']:
			result.clg_country = args['clg_contry']
		if args['clg_zip_code']:
			result.clg_zip_code = args['clg_zip_code']
		if args['clg_code']:
			result.clg_code = args['clg_code']
		if args['emp_street_name']:
			result.emp_street_name = args['emp_street_name']
		if args['emp_state']:
			result.emp_state = args['emp_state']
		if args['emp_city']:
			result.emp_city = args['emp_city']
		if args['emp_contry']:
			result.emp_country = args['emp_contry']
		if args['emp_zip_code']:
			result.emp_zip_code = args['emp_zip_code']
		# if args['emp_contact']:
		# 	result.emp_contact = args['emp_contact']
		if args['emp_alt_contact']:
			result.emp_alt_contact = args['emp_alt_contact']
		if args['issue_date']:
			result.issue_date = args['issue_date']
		if args['joining_date']:
			result.joining_date = args['joining_date']
		if args['fee']:
			result.fee = args['fee']
		if args['transact_date']:
			result.transact_date = args['transact_date']
		if args['reciept_num']:
			result.reciept_num = args['reciept_num']
		if args['blood_grp']:
			result.blood_grp = args['blood_grp']
		
		db.session.commit()
		
		return result

	@token_check
	def delete(self,emp_contact):
		result = Teachers.query.filter_by(emp_contact=emp_contact).first()
		if not result:
			abort(404, message="Member doesn't exist, cannot delete")
		db.session.delete(result)
		db.session.commit()
		
		return '', 204
	
class Admin_log(Resource):
	# @cross_origin(origin='*',headers=['Content-Type','Authorization'])
	@marshal_with(log_in_fields)
	def post(self):
		#print(admin_post_args.parse_args())
		args = admin_post_args.parse_args()
		result = Admins.query.filter_by(email_id=args['email_id'],password=args['password']).first()
		if not result:
			abort(400, message="Account not found")
		else:
			token = jwt.encode({'email_id':args['email_id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=20)}, app.config['SECRET_KEY'])
			result.password = token
			#print(token)
			return result, 200
	
	
	@marshal_with(log_in_fields)
	def put(self):
		args = admin_put_args.parse_args()
		result = Admins.query.filter_by(email_id=args['email_id']).first()
		if result:
			# return result
			abort(409, message="Account is already registered")
		
		admin = Admins(full_name=args['full_name'],email_id=args['email_id'],password=args['password'])
		db.session.add(admin)
		db.session.commit()
		#print("Registered user ")
		return admin, 201
	
	@marshal_with(log_in_fields)
	def get(self):
		result = Admins.query.all()
		return result, 200


class TeachersData(Resource):

	@marshal_with(resource_fields)
	@token_check
	def test(teachers):
		return teachers

	
	@token_check
	def get(self):
		page = request.args.get('page', 1, int)
		per_page = request.args.get('per_page',10,int)
		district = request.args.get('district',"District", str)
		print(page,per_page,district)
		try:
			if district != "District":
				teachers = Teachers.query.filter(Teachers.clg_city == district).order_by(Teachers.id.desc()).paginate(page=page, per_page=per_page).items
			else:
				teachers = Teachers.query.order_by(Teachers.id.desc()).paginate(page=page, per_page=per_page).items
			if teachers:
				data = TeachersData.test(teachers)
				'''
				adding number_of_teachers at the end of the list 
				so that front end people will get the data 
				to generate the buttons dynamically for pagination
				'''
				
				number_of_teachers = {'number_of_teachers' : Teachers.query.count()}
				data.append(number_of_teachers)
				return data, 200
				
		except:	
			return {'message' : 'data not present'}, 404


class RazorPaySuccess(Resource):
	
	'''
	writing this class in order to update
	the payment_id and signature in the database
	'''

	def put(self, order_id):
		#print(request.json)
		teacher = Teachers.query.filter(Teachers.razorpay_order_id == request.json['razorpay_order_id']).first()
		teacher.razorpay_payment_id = request.json['razorpay_payment_id']
		teacher.razorpay_signature = request.json['razorpay_signature']
		teacher.is_active = True
		db.session.add(teacher)
		db.session.commit()

		data = {
			'name' : teacher.full_name,
			'date' : teacher.transact_date,
			'order_id' : teacher.razorpay_order_id,
			'payment_id' : teacher.razorpay_payment_id
		}
		return data, 200




api.add_resource(Teacher, "/register/success/<int:emp_contact>")  
api.add_resource(Admin, "/admin/dashboard/<int:emp_contact>")  
api.add_resource(Admin_log, "/login") 	
api.add_resource(TeachersData, "/admin/teachers")
api.add_resource(RazorPaySuccess,"/razorpay/success/<order_id>")

if __name__ == "__main__":
	app.run(host="0.0.0.0" ,debug=True)
