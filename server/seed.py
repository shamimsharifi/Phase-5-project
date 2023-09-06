#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import User, Chat, Listing, Message

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
import random

fake = Faker()

def create_users():
    users= []
    for _ in range(20):
        u = User(
            username=fake.user_name(),
            email=fake.email(),
            profile_pic= fake.image_url(),
            password_hash="123",
        )
        users.append(u)
    return users

def create_listings():
    listings = []
    for _ in range (30):
        l = Listing(
            title=fake.name(),
            description=fake.text(),
            price=str(fake.random_number(digits=5)),
            category=fake.word(),
            location=fake.city(),
            image_url=fake.image_url(),
            user_id=random.randint(1, 20)  
        )
        listings.append(l)
    return listings

def create_chats():
    chats = []
    for _ in range(30):
        c = Chat(
        user_id_1=random.randint(1, 20),
        user_id_2=random.randint(1, 20)
        )
        chats.append(c)
    return chats

def create_messages():
    messages = []
    for _ in range(30):
        m = Message(
            content=fake.text(),
            chat_id=random.randint(1, 30),
            sender_id=random.randint(1, 20)
        )
        messages.append(m)
    return messages






if __name__ == '__main__':
   
    with app.app_context():
        print("Starting seed...")
        print('clearing db ...')
        User.query.delete()
        Listing.query.delete()
        Chat.query.delete()
        Message.query.delete()

        print('seeding users')
        users = create_users()
        db.session.add_all(users)
        db.session.commit()


        print('seeding listings')
        listings = create_listings()
        db.session.add_all(listings)
        db.session.commit()

        print('seeding chats')
        chats = create_chats()
        db.session.add_all(chats)
        db.session.commit()

        print('seeding messages')
        messages = create_messages()
        db.session.add_all(messages)
        db.session.commit()

