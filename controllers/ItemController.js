//const db = require('../lib/db');
const item = require('../models/Item');
const mysql = require('mysql');
const config = require('config');

exports.index = (req, res) => {
    item.fetch((err, results, fields) => {
        if (err) throw err;
        let data = { items: results, err: err };
        res.render('item/index', data);
    });
}

exports.create = (req, res) => {
    res.render('item/create');
}

exports.add = (req, res) => {
    item.insert(req.body, (err, results) => {
        if (err) {
            res.redirect('/item/create');
        } else {
            res.redirect('/item');
        }
    });
}

exports.edit = (req, res) => {
    //const con = db.connect();
    item.find(req.params.id, (err, results) => {
        if (err) {
            res.redirect('/item');
        } else {
            let data = { item: results[0], err: err };
            res.render('item/edit', data);
        }
    });
}

exports.update = (req, res) => {
    let params = [req.body, req.params.id];
    const sql = 'UPDATE items SET ? WHERE id = ?;';

    const con = mysql.createConnection(config.mysql)
    con.connect();
    // const con = db.connect();
    con.query(sql, params, (err) => {
        if (err) {
            res.redirect('/item/edit/' + id);
        } else {
            res.redirect('/item');
        }
    });

    
}

exports.delete = (req, res) => {
    let id=req.params.id;
    let params = [id];
    const sql = 'DELETE FROM items WHERE id = ?;';

    const con = mysql.createConnection(config.mysql)
    con.connect();
    // const con = db.connect();
    con.query(sql, params, (err) => {
        if (err) {
            res.redirect('/item/edit/' + id);
        } else {
            res.redirect('/item');
        }
    });   
    con.end();
}


exports.search = (req, res) => {
    let item_name=req.query.item_name;
    //查找语句的书写
    const sql = "SELECT * FROM items WHERE name LIKE '%" + item_name + "%';";
    
    const con = mysql.createConnection(config.mysql)
    con.connect();
    // const con = db.connect();
    con.query(sql,  (err,results) => {
        console.log(sql);
        if (err) throw err;
        let data={items:results,err:err};
        res.render("item/index",data);
    });   
    con.end();
}
