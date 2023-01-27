from flask import Flask, jsonify, request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend
# configuro la base de datos, con el nombre el usuario y la clave

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://laffarguej:95686235jM@laffarguej.mysql.pythonanywhere-services.com/laffarguej$default'
#'mysql+pymysql://root:root@127.0.0.1/CodoaCodo'

# URI de la BBDD                      driver de la BD  user:clave@URL/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)
ma=Marshmallow(app)
 
# defino la tabla
class Producto(db.Model):   # la clase Producto hereda de db.Model     
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    usuario=db.Column(db.String(8))
    mail=db.Column(db.String(255))
    comentario=db.Column(db.String(255))
    def __init__(self,nombre,usuario,mail,comentario):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.usuario=usuario
        self.mail=mail
        self.comentario=comentario
 
 
 
with app.app_context():
    db.create_all()  # crea las tablas
#  ************************************************************
class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','usuario','mail','comentario')
producto_schema=ProductoSchema()            # para crear un producto
productos_schema=ProductoSchema(many=True)  # multiples registros
 
# crea los endpoint o rutas (json)
@app.route('/productos',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all()     # query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos)  # .dump() lo hereda de ma.schema
    return jsonify(result)
 
@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)


@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route('/productos', methods=['POST']) # crea ruta o endpoint
def create_producto():
    print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    usuario=request.json['usuario']
    mail=request.json['mail']
    comentario=request.json['comentario']
    new_producto=Producto(nombre,usuario,mail,comentario)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

@app.route('/productos/<id>', methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)
   
    nombre=request.json['nombre']
    usuario=request.json['usuario']
    mail=request.json['mail']
    comentario=request.json['comentario']
 
    producto.nombre=nombre
    producto.usuario=usuario
    producto.mail=mail
    producto.comentario=comentario
    db.session.commit()
    return producto_schema.jsonify(producto)
 
# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000) 