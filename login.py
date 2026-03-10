import hashlib

def hash_password(password):
    
    # aqui se simula el hasheo de una contraseña
    return hashlib.sha256(password.encode()).hexdigest()

def login_seguro(username, password):

    # en un sistema real, esto vendría de una DB cifrada por tanto,
    # no hay contraseñas en texto plano aquí
    users_db = {
        "administrador": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        "usuario": "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
    }
    
    if username in users_db:
        if users_db[username] == hash_password(password):
             True
    return False

if __name__ == "__main__":
    user = input("Usuario: ") # administrador, usuario
    pw = input("Contraseña: ") # admin, 1234
    
    if login_seguro(user, pw):
        print("ESTAS DENTRO!")
    else:
        print("ACCESO DENEGADO, VETE DE AQUI.")