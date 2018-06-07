/**
 * Created by jimmivila on 9/5/17.
 */
import React, {Component} from 'react';
import {Alert} from 'react-native';
import {createClient} from 'contentful';

const client = createClient({
    accessToken: '30438416aae71be8a348516e64d3ec993881c29dd8abfab786379c93444148ea',
    space: 'ypefrn1ce2ds'
});

const subcategorias = {
    'nacionales':'1bYf4CvqfaSokMCICgGOgy',
    'internacionales':'21udwADP8IyykOoa8YkMMK'
};

export default class EnterServices extends Component{

    getNoticiaById(idNoticia, callback){
        client.getEntries({
                'sys.id': idNoticia
            }).then(function (noticia) {
            // console.log(noticia.fields);
            // Alert.alert(JSON.stringify(noticia.fields));
            callback(noticia.items[0]);
        }).catch(function (err) {
            // Alert.alert(JSON.stringify(err))
        });
    }

    getTresNoticiasById(one,two,three){

        client.getEntries({
            'content_type':'noticia',
            'sys.id[in]':one+','+two+','+three
        }).then(function(entry){
            console.log(entry);
            Alert.alert(JSON.stringify(entry))
        }).catch(function(error){
            console.log(error)
            Alert.alert(error)
        });

    }

    getNoticiasByArrayIds(ids, callback){
        var query = '';
        for(var i = 0; i<ids.length;i++){
            query+=ids[i]+',';
        }

        client.getEntries({
            'content_type':'noticia',
            'sys.id[in]':query,
            'order':'-sys.createdAt'
        }).then(function(entry){
            // console.log(entry);
            // Alert.alert(JSON.stringify(entry))
            callback(entry.items);
        }).catch(function(error){
            console.log(error);
            Alert.alert(error);
        });

    }

    findNoticiaByTitle(palabra, callback){
        client.getEntries({
            'content_type':'noticia',
            // 'limit': 10,
            'fields.titulo[match]':palabra,
            'order':'-sys.createdAt'
        }).then(function(entry){
            // Alert.alert(JSON.stringify(entry))
            callback(entry.items);
        }).catch(function(error){
            // Alert.alert(error)
        });
    }

    findNoticiasByContent(palabra, callback){
        client.getEntries({
            'content_type':'noticia',
            // 'limit': 10,
            'fields.contenido[match]':palabra,
            'order':'-sys.createdAt'
        }).then(function(entry){
            // Alert.alert(JSON.stringify(entry));
            callback(entry.items);
        }).catch(function(error){
            // Alert.alert(error)
        });
    }

    getNoticias(cantidad, callback){
        client.getEntries({
            'content_type':'noticia',
            'limit': cantidad,
            'order':'sys.createdAt'
        }).then(function(entry){
            // Alert.alert(JSON.stringify(entry))
            callback(entry.items);
        }).catch(function(error){
            console.log(error)
        });
        // Alert.alert('getNoticias fin');
    }

    getNoticiaBySubcategoria(psubcategoria){

        client.getEntries({
            'content_type':'noticia',
            'limit': 10,
            'fields.subcategoria.sys.id':subcategorias[psubcategoria]

        }).then(function(entry){
            console.log(entry);
            Alert.alert(JSON.stringify(entry))
        }).catch(function(error){
            console.log(error)
        });

    }

    getNoticiaBySubcategoria(psubcategoria,pcantidad){

        client.getEntries({
            'content_type':'noticia',
            'limit': pcantidad,
            'fields.subcategoria.sys.id':subcategorias[psubcategoria]

        }).then(function(entry){
            console.log(entry);
            Alert.alert(JSON.stringify(entry))
        }).catch(function(error){
            console.log(error)
        });

    }

    getlastNews(cantNoticias, callback){
        client.getEntries({
            'content_type':'noticia',
            'limit': cantNoticias,
            'order':'-sys.createdAt'
        }).then(function(entry){
            // Alert.alert(JSON.stringify(entry));
            // console.log(entry);
            callback(entry.items);
        }).catch(function(error){
            console.log(error)
        });
    }

    testMethod (){
        console.log("sirve");
        Alert.alert("kdfkmkf");
    }

    getNoticiasSimilares(idCategoria,cantNoticias,callback){
        client.getEntry(idCategoria).then(function (categoria) {
            // console.log(categoria.fields);
            var idsSub = '';

            for(var i = 0; i < categoria.fields.subcategorias.length; i++){
                idsSub += categoria.fields.subcategorias[i].sys.id+',';
            }

            client.getEntries({
                'content_type':'noticia',
                'fields.subcategoria.sys.id[in]':idsSub,
                'limit':cantNoticias,
                'order':'-sys.createdAt'
            }).then(function(entry){
                // Alert.alert(JSON.stringify(entry))
                callback(entry.items);
            }).catch(function(error){
                console.log(error);
                // Alert.alert(error);
            });

        }).catch(function (err) {

        });

    }


}