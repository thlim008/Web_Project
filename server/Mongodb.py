from pymongo.mongo_client import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client.local

collection = db.startup_log

row = collection.find_one()


collection = db.test
collection.insert_one({
    "name" : "lala",
    "gender" : "female"
})

row = collection.find_one({'name' : 'lala'})
print(row)