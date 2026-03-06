// Sistema de correos

interface Database {

}

interface Mysql extends Database {

}

interface PostgrestSQL extends Database {
    
}

//------------------------------

class MSQL implements Mysql {

}

class PSQL implements PostgrestSQL {

}

class CorreoMSQL {
    constructor(private memoria: MSQL){}
}