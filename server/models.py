from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, relationship
from sqlalchemy.sql.expression import text
from sqlalchemy import or_
from sqlalchemy.ext.hybrid import hybrid_property



from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users-table'
    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String, nullable = False, unique = True)
    email = db.Column(db.String, nullable = False )
    _password_hash = db.Column(db.String, nullable=True)
    profile_pic = db.Column(db.String)

    # validate the email
#RELATIONSHIPS==========================
    listings_field = relationship('Listing', back_populates='users_field')
    chats_field = relationship('Chat', primaryjoin="or_(User.id==Chat.user_id_1, User.id==Chat.user_id_2)", back_populates='users_field')
    sent_messages = relationship('Message', back_populates='sender')
#Serializing_RULES======================
    serialize_rules=('-listings_field','-chats_field', '-messages_field', '-sender', '-sent_messages')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    



class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings-table'
    id = db.Column(db.Integer, primary_key= True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    price = db.Column(db.Float, nullable = False)
    category = db.Column(db.String, nullable = False)
    location = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    image_url = db.Column(db.String, nullable = False)
#RELATIONSHIPS==========================
    user_id = db.Column(db.Integer, db.ForeignKey('users-table.id'))
    users_field = relationship('User', back_populates='listings_field')
#Serializing_RULES======================  
    serialize_rules = ('-users_field', )
   


class Chat(db.Model, SerializerMixin):
    __tablename__ = 'chats_table'
    id = db.Column(db.Integer, primary_key= True)
#RELATIONSHIPS==========================
    user_id_1 = db.Column(db.Integer, db.ForeignKey('users-table.id'))
    user_id_2 = db.Column(db.Integer, db.ForeignKey('users-table.id'))
    users_field = relationship('User',primaryjoin="or_(Chat.user_id_1==User.id, Chat.user_id_2==User.id)",  back_populates='chats_field')
    messages_field = relationship('Message', back_populates='chats_field')
#Serializing_RULES======================
    serialize_rules = ('-users_field', '-messages_field.chats_field')


class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages_table'
    id = db.Column(db.Integer, primary_key= True)
    content = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))

#RELATIONSHIPS==========================
    chat_id = db.Column(db.Integer, db.ForeignKey('chats_table.id'))
    chats_field = relationship('Chat', back_populates='messages_field')
    sender_id = db.Column(db.Integer, db.ForeignKey('users-table.id'))
    sender = relationship('User', back_populates='sent_messages')
#Serializing_RULES======================   
    serialize_rules = ('-chats_field.user_field', '-sender.sent_messages')

