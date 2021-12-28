const express = require('express');
const bodyParser = require('body-parser');


const expressMiddleWare = router => {
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

    router.get("/api/getSelectOptions", (request, response) => {
        response.send({
            success: true,
            data: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4',
            ]
        })
    })

    router.post("/api/crud", (request, response) => {
        response.send({
            success: true,
            message: "Data inserted correctly"
        })
    })
    router.put("/api/crud", (request, response) => {
        response.send({
            success: true,
            message: "Data updated correctly"
        })
    })
    router.delete("/api/crud", (request, response) => {
        response.send({
            success: true,
            message: "Data deleted correctly"
        })
    })
};


module.exports = expressMiddleWare;