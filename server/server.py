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
app.config["SESSION_PERMANENT"] = False
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

### 🚀 LOGIN ROUTE
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
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

### 🚀 LOGOUT ROUTE (Ensures Session is Cleared)
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # 🔥 Completely clear the session
    return jsonify({'message': 'Logged out successfully', 'redirect': '/login'}), 200

### 🚀 CHECK SESSION (Used in React `useEffect`)
@app.route('/user')
def user():
    if "user" in session:
        return jsonify({'user': session["user"], 'logged_in': True}), 200
    else:
        return jsonify({'user': None, 'logged_in': False}), 200

### 🚀 DASHBOARD ROUTE (Ensures Only Logged-in Users Access)
@app.route('/dashboard')
def dashboard():
    if "user" in session:
        return jsonify({'message': 'Welcome to the Dashboard', 'user': session['user']}), 200
    else:
        return jsonify({'message': 'Unauthorized. Please login', 'redirect': '/login'}), 401


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
