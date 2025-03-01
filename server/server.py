from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import psycopg2 
from psycopg2.extras import RealDictCursor
from flask_bcrypt import Bcrypt

#load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

DB_CONFIG = {
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT")
}

def get_db_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
        print('Database Connected!')
        return conn
    except Exception as e:
        print(f'Failed to connect Database :( Error:{e}')
        
#debug db connection
get_db_connection()
        
#login
@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('SELECT * FROM user_list WHERE email = %s', (email,))
        user = cursor.fetchone()
        
        if user and bcrypt.check_password_hash(user['password'], password):
            return jsonify ({'message': 'login successful'}), 200
        else:
            return jsonify ({'message': 'Invalid email or password'}), 409
    except:
        return jsonify({'error': 'Database Error'}), 500
    finally:
        conn.close()
        cursor.close()

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)