# from flask import Flask, request, jsonify
# import json

# app = Flask(__name__)

# class User:
#     def __init__(self, username, password):
#         self.username = username
#         self.password = password
#         self.data = []

# class UserManager:
#     def __init__(self):
#         try:
#             with open("user_data.json", "r") as file:
#                 self.users = json.load(file)
#         except FileNotFoundError:
#             self.users = {}

#     def save_user_data(self):
#         with open("user_data.json", "w") as file:
#             json.dump(self.users, file)

#     def register(self, username, password):
#         if username in self.users:
#             return {'success': False, 'message': 'Username already exists. Please choose a different username.'}
#         self.users[username] = User(username, password)
#         self.save_user_data()
#         return {'success': True, 'message': 'User registered successfully!'}

#     def login(self, username, password):
#         if username not in self.users or self.users[username].password != password:
#             return {'success': False, 'message': 'Invalid username or password.'}
#         return {'success': True, 'message': 'Login successful!', 'user': self.users[username]}

#     def add_data(self, username, new_data):
#         if username not in self.users:
#             return {'success': False, 'message': 'User does not exist.'}
#         self.users[username].data.append(new_data)
#         self.save_user_data()
#         return {'success': True, 'message': 'Data added successfully!'}

# user_manager = UserManager()

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     username = data.get('username')
#     password = data.get('password')

#     if not username or not password:
#         return jsonify({'success': False, 'message': 'Username and password are required fields.'}), 400

#     response = user_manager.register(username, password)
#     return jsonify(response)

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     username = data.get('username')
#     password = data.get('password')

#     response = user_manager.login(username, password)
#     return jsonify(response)

# @app.route('/add_data', methods=['POST'])
# def add_data():
#     data = request.json
#     username = data.get('username')
#     new_data = data.get('new_data')

#     response = user_manager.add_data(username, new_data)
#     return jsonify(response)

# if __name__ == "__main__":
#     app.run(debug=True)






from flask import Flask, request, jsonify
import json
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)

try:
    with open("user_data.json", "r") as file:
        user_data = json.load(file)
except FileNotFoundError:
    user_data = {}

def save_user_data():
    with open("user_data.json", "w") as file:
        json.dump(user_data, file)



@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(data)
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required fields.'}), 400
    
    if username in user_data:
        return jsonify({'success': False, 'message': 'Username already exists. Please choose a different username.'}), 400
    
    user_data[username] = {'password': password, 'data': []}
    save_user_data()
    
    return jsonify({'success': True, 'message': 'User registered successfully.'}), 200



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    username = data.get('username')
    password = data.get('password')
    
    if username not in user_data or user_data[username]['password'] != password:
        return jsonify({'success': False, 'message': 'Invalid username or password.'}), 401
    
    return jsonify({'success': True, 'message': 'Login successful.'}), 200


@app.route('/add_data', methods=['POST'])
def add_data():
    data = request.json
    username = data.get('username')
    new_data = data.get('new_data')
    
    if username not in user_data:
        return jsonify({'success': False, 'message': 'User does not exist.'}), 404
    
    user_data[username]['data'].append(new_data)
    save_user_data()
    
    return jsonify({'success': True, 'message': 'Data added successfully.'}), 200


@app.route('/delete_data', methods=['POST'])
def delete_data():
    data = request.json
    username = data.get('username')
    index_to_delete = data.get('index_to_delete')
    
    if username not in user_data:
        return jsonify({'success': False, 'message': 'User does not exist.'}), 404
    
    try:
        index_to_delete = int(index_to_delete)
        if 0 <= index_to_delete < len(user_data[username]['data']):
            del user_data[username]['data'][index_to_delete]
            save_user_data()
            return jsonify({'success': True, 'message': 'Data deleted successfully.'}), 200
        else:
            return jsonify({'success': False, 'message': 'Invalid index.'}), 400
    except ValueError:
        return jsonify({'success': False, 'message': 'Invalid index format.'}), 400


    
if __name__ == "__main__":
    app.run(debug=True,port=5000)
