'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { estadiosfutbols } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[gamesystem.controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Gamesystem deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getEstadiosfutbolsbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("estadiosfutbol by id..." + id);
    //console.log(gamesystems);

    estadiosfutbols.findByPk(id)
    .then(myestadiosfutbol => {
    console.log(myestadiosfutbol);
    res.status(200).send(myestadiosfutbol);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getEstadiosfutbolbyId.name, error, res);
  }
}

function getEstadiosfutbols(req, res) {

  try {
        
   console.log("estadiosfutbols...");
   console.log(estadiosfutbols);
   estadiosfutbols.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((myestadiosfutbols) => {
     console.log(myestadiosfutbols);
     res.status(200).send(myestadiosfutbols);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getEstadiosfutbols.name, error, res);
  }
}

function updateEstadiosfutbols(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdateestadiosfutbol = req.body;
    console.log("update gamesystems ... " + myupdateestadiosfutbol.name + " " + myupdateestadiosfutbol.descripcion);
 

    estadiosfutbols.findByPk(id)
      .then(myestadiosfutbol => {
        console.log("Result of findById: " + myestadiosfutbol);
        if (!myestadiosfutbol) {
          res.status(401).send(({}));
        
        }
        return myestadiosfutbol
          .update({ 
            name: myupdateestadiosfutbol.name, 
            city: myupdateestadiosfutbol.city,
            capacity: myupdateestadiosfutbol.capacity 
           })
          .then(() => res.status(200).send(myestadiosfutbol) )
          .catch(error => res.status(403).send(myestadiosfutbol));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updateEstadiosfutbols.name, error, res);
  }

}

function addEstadiosfutbols(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var myestadiosfutbol = req.body;
    console.log("gamesystems ... " + myestadiosfutbol);
 
      return estadiosfutbols
        .create({
          stadium: myestadiosfutbol.stadium,
          city: myestadiosfutbol.city,
          capacity: myestadiosfutbol.capacity
          
          
         
        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((myestadiosfutbol) => {
          res.status(201).send(myestadiosfutbol);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addEstadiosfutbols.name, error, res);
  }
}


function deleteEstadiosfutbols(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  estadiosfutbols
    .findByPk(id)
    .then(myestadiosfutbol => {
      console.log("Result of findById: " + myestadiosfutbol);
      if (!myestadiosfutbol) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return myestadiosfutbol
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getEstadiosfutbolsbyId,
  getEstadiosfutbols,
  updateEstadiosfutbols,
  addEstadiosfutbols,
  deleteEstadiosfutbols,
  GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}