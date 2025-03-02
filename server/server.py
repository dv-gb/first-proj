from flask import Flask, request, jsonify, session
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os
from flask_bcrypt import Bcrypt
from flask_session import Session  # 🔥 Ensure proper session handling

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Allow credentials for session handling
bcrypt = Bcrypt(app)

# 🔐 Secure Session Configuration
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_USE_SIGNER"] = True
app.secret_key = os.getenv("SECRET_KEY")

Session(app)  # Initialize session

# Load environment variables
load_dotenv()

# Database configuration
DB_CONFIG = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT')
}

def get_db_conn():
    try:
        conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
        print('✅ Database connection successful')
        return conn
    except Exception as e:
        print(f'❌ Database connection failed: {e}')
        return None

# Debug DB connection
get_db_conn()

#login
@app.route('/login', methods=['POST'])
def login():
    try:
        if "user" in session:
            return jsonify({'redirect': '/dashboard'}), 200

        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        conn = get_db_conn()
        if not conn:
            return jsonify({'message': 'Database connection failed'}), 500

        cursor = conn.cursor()
        cursor.execute('SELECT * FROM user_list WHERE email = %s', (email,))
        user = cursor.fetchone()

        if user and bcrypt.check_password_hash(user['password'], password):
            session["user"] = user['email']  # Store user session
            return jsonify({'message': 'Login successful', 'redirect': '/dashboard'}), 200
        else:
            return jsonify({'message': 'Wrong Email or Password'}), 401

    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500

    finally:
        cursor.close()
        conn.close()
        
#register
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    fname = data.get('first_name')
    lname = data.get('last_name')
    contact_number = data.get('contact_number')
    email = data.get('email')
    password = data.get('password')
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    conn = get_db_conn()
    cursor = conn.cursor()
    
    #check if email already used
    try:
        cursor.execute('SELECT * FROM user_list WHERE email = %s', 
        (email,))
        user = cursor.fetchone()
        
        if user:
            return jsonify({'message': 'Trying to Logged in with the same email'}), 409
        
        try:
            cursor.execute('INSERT INTO user_list (first_name, last_name, contact_number, email, password) VALUES (%s, %s, %s, %s, %s)', 
            (fname, lname, contact_number, email, hashed_password))
            conn.commit()
            
            return jsonify({'message': 'Registered Successfully!'}), 200

        except:
            return jsonify({'message': 'Failed to Register'}), 401
            
    except Exception as e:
        return jsonify({'error': f'Database Error: str{e}'}), 500
    finally:
        cursor.close()
        conn.close()
        
        

#logout functionality
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  #clear the session
    return jsonify({'message': 'Logged out successfully', 'redirect': '/login'}), 200

#check session
@app.route('/user')
def user():
    if "user" in session:
        return jsonify({'user': session["user"], 'logged_in': True}), 200
    else:
        return jsonify({'user': None, 'logged_in': False}), 200

#dashboard for logged in users
@app.route('/dashboard')
def dashboard():
    if "user" in session:
        return jsonify({'message': 'Welcome to the Dashboard', 'user': session['user']}), 200
    else:
        return jsonify({'message': 'Unauthorized. Please login', 'redirect': '/login'}), 401


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
