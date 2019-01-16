const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => console.log('Example app listening on port '+ PORT));
app.get('/', (req, res) => res.send('usare /api').status(200));
app.get('/api', (req, res) => res.send('applicazione usare /api/'));

let rooms = [ {'main': [{id: 0, name: 'nome_utente', msg: 'messaggio' },
                        {id: 0, name: 'nome_utente', msg: 'messaggio' }] } ];
let contatori = [ { name: 'main', posizione: 0 } ];
let posizioni = [{name: 'main', pos: 0}];

let users = [{username: 'username', password: 'password'}];


app.post('/api/rooms/:roomname/messages', (req, res) => {
    
    const stanza = req.params.roomname;
    let utente;
    if( utente = users.find(c => c.username === (req.query.u) && c.password === req.query.p) )
    {
        const messaggio = { msg: req.body.msg };

        if(stanza.push(messaggio))
        {
            res.status(201);

        }else
        {
            res.status(400).json({message: 'msg non caricato'});
        }
    }else
    {
        res.status(400).send('utente non trovato');

    }
});

app.get('/api/rooms/:roomname/messages', (req, res) => {
    const stanza = req.params.roomname;
    let room_posizione = posizioni.find(c => c.name === (stanza));
    if(room_posizione != null){
        let posizione = room_posizione.pos;
        res.json(rooms[posizione]).status(200);
    }else
        res.status(404).send('stanza non trovata');

});

app.post('/api/users', (req,res) => {
    const registra = {
        username: req.body.username,
        password: req.body.password
     };

    if (registra.username != null && registra.password != null && users.push(registra))
        res.status(201).send(registra.username);
    else
        res.status(400).send('dati non caricati');
});
