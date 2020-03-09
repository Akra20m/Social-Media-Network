from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__, static_folder='../client/build/static',
            template_folder="../client/build")
app.url_map.strict_slashes = False
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

from application import routes
