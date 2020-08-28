// Estandarizar y Normalizar errores
// Ref. https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
// Ref. https://devcenter.heroku.com/articles/error-codes
export const codes = {
    'OK':'200 OK',
    'CREATED': '201 Created',    
    'BAD REQUEST': '400 Bad Request' ,  
    'UNAUTHORIZED': '401 Unauthorized' ,       
    'NOT FOUND':'404 Not Found' , 
    'REQUEST TIMEOUT':'408 Request Timeout' ,
    'UNSUCCESSFUL PRE-INSERT':'Unsuccessful control to insert',    
    'UNSUCCESSFUL INSERT':'Unsuccessful insert',
    'UNSUCCESSFUL PRE-UPDATE':'Unsuccessful control to update',    
    'UNSUCCESSFUL UPDATE':'Unsuccessful update',
    'UNSUCCESSFUL PRE-DELETE':'Unsuccessful control to delete',    
    'UNSUCCESSFUL DELETE':'Unsuccessful delete',        
    'UNSUCCESSFUL FUNCTION':'Unsuccessful function',
    'UNSUCCESSFUL VALIDATION':'Unsuccessful validation',
    'DATABASE SERVICE ERROR': 'Database Service has an error'        
}