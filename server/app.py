#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource


# Local imports
from config import app, db, api, socketio
# Add your model imports
from models import User, Message, Listing, Chat
from datetime import datetime



# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_user = User(
                username =request_obj["username"],
                email =request_obj["email"],
                profile_pic = request_obj["user_image"]
                # _password_hash =request_obj["_password_hash"],
            )
            new_user.password_hash = request_obj["_password_hash"]
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_user.to_dict(),200)
api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        response_obj = User.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = User.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    response_obj.password_hash = request_object["_password_hash"]

                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = User.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted !'}
            return response_dict, 200
api.add_resource(UsersById, '/users/<int:id>')

class UserProfile(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            listings = [l.to_dict() for l in Listing.query.filter_by(user_id=user_id).all()]
            response_obj = {
                "user_details": user.to_dict(),
                "user_listings": listings
            }
            return make_response(response_obj, 200)
        else:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)

api.add_resource(UserProfile, '/user-profile/<int:user_id>')



class Listings(Resource):
    def get(self):
        listings = [l.to_dict() for l in Listing.query.all()]
        return make_response(listings, 200)
    def post(self):
        request_obj = request.get_json()
        print(request_obj)
        try:
            #created_at_str = request_obj["created_at"]
            #created_at_datetime = datetime.strptime(created_at_str, '%Y-%m-%d %H:%M:%S')
            new_listing = Listing(
                category =request_obj["category"],
                description =request_obj["description"],
                image_url =request_obj["image_url"],
                #created_at =created_at_datetime,
                location =request_obj["location"],
                price =request_obj["price"],
                title =request_obj["title"],
                user_id =session['user_id']
                 
                
            )
            db.session.add(new_listing)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_listing.to_dict(),200)
    
api.add_resource(Listings, '/listings')

class ListingById(Resource):
    def get(self, id):
        response_obj = Listing.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Listing not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = Listing.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Listing not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    if attr == 'created_at':
                        request_object[attr] = datetime.strptime(request_object[attr], '%Y-%m-%d %H:%M:%S')
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = Listing.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Listing not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted!'}
            return response_dict, 200
api.add_resource(ListingById, '/listings/<int:id>')


class Chats(Resource):
    def get(self):
        chats = [c.to_dict() for c in Chat.query.all()]
        return make_response(chats, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_Chats = Chat(
                user_id_1 =request_obj["user_id_1"],
                user_id_2 =request_obj["user_id_2"],    
            )
            db.session.add(new_Chats)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_Chats.to_dict(),200)
    
api.add_resource(Chats, '/chats')

class ChatById(Resource):
    def get(self, id):
        response_obj = Chat.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Chat not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = Chat.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "chat not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = Chat.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "chat not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted!'}
            return response_dict, 200
api.add_resource(ChatById, '/chats/<int:id>')


class Messages(Resource):
    def get(self):
        messages = [m.to_dict() for m in Message.query.all()]
        return make_response(messages, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            created_at_str = request_obj["created_at"]
            created_at_datetime = datetime.strptime(created_at_str, '%Y-%m-%d %H:%M:%S')
            new_message = Message(
                chat_id =request_obj["chat_id"],
                content =request_obj["content"],
                created_at =created_at_datetime,    
            )
            db.session.add(new_message)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_message.to_dict(),200)
    
api.add_resource(Messages, '/messages')

class MessagesById(Resource):
    def get(self, id):
        response_obj = Message.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "message not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = Message.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Message not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    if attr == 'created_at':
                        request_object[attr] = datetime.strptime(request_object[attr], '%Y-%m-%d %H:%M:%S')
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
         
    def delete(self, id):
        response_obj = Message.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Message not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted!'}
            return response_dict, 200
api.add_resource(MessagesById, '/messages/<int:id>')

class MessagesByUserId(Resource):
    def get(self, user_id):
        response_objs = Message.query.filter_by(sender_id=user_id).all()
        if response_objs:
            response_data = [obj.to_dict() for obj in response_objs]
            return make_response({"messages": response_data}, 200)
        else:
            response_dict = {
                "error": "No messages found for this user"
            }
            return make_response(response_dict, 404)


api.add_resource(MessagesByUserId, '/messages/user/<int:user_id>')

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password_hash = data['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password_hash):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401
    
api.add_resource(Login, '/login')
    
# check session 
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

# logout
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message':'204: No Content'}
api.add_resource(Logout, '/logout')

@socketio.on('message')
def handle_message(data):
    print('Received message:', data)


    new_message = Message(content=data['content'], chat_id=data['chat_id'], sender_id=data['sender_id'])

    db.session.add(new_message)
    db.session.commit()

    socketio.emit('message', data)









# if __name__ == '__main__':
#     app.run(port=5555, debug=True)


if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)
