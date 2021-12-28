const express = require('express');
const bodyParser = require('body-parser');

// Is for MOCK the requests


const makeRandomText = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result +=
            characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const TIMEOUT = 800

const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
]

const expressMiddleWare = router => {
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

    router.get("/api/getSelectOptions", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                data: options
            })
        }, TIMEOUT)
    })

    // CRUD - GET
    router.get("/api/crud", (request, response) => {
        const random = Math.floor(Math.random() * 300)
        const data = []
        for (var i = 0; i < random; i++) {
            data.push(
                {
                    "id": makeRandomText(5),
                    "ean": makeRandomText(8),
                    "sku_base": makeRandomText(9),
                    "descripcion": makeRandomText(50),
                    "name": makeRandomText(7),
                    "field_type": options[Math.floor(Math.random() * options.length)]
                }
            )
        }

        setTimeout(() => {
            response.send({
                success: true,
                data
            })
        }, TIMEOUT)
    })

    // CRUD - CREATE
    router.post("/api/crud", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data inserted correctly"
            })
        }, TIMEOUT)
    })

    // CRUD - UPDATE
    router.put("/api/crud", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data updated correctly"
            })
        }, TIMEOUT)
    })

    // CRUD - DELETE
    router.delete("/api/crud", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data deleted correctly"
            })
        }, TIMEOUT)
    })

    /* MULTI SELECT */

    // MULTI SELECT CRUD - GET TABLE DATA
    router.get("/api/multiselect", (request, response) => {
        const random = Math.floor(Math.random() * 7)
        const data = []
        for (var i = 0; i < random; i++) {
            data.push(
                {
                    "id": makeRandomText(5),
                    "name": makeRandomText(7),
                    "description": makeRandomText(20)
                }
            )
        }

        setTimeout(() => {
            response.send({
                success: true,
                data
            })
        }, TIMEOUT)
    })

    // MULTI SELECT CRUD - GET ELEMENT OF ARRAY
    router.get("/api/multiselect/get_array", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                data: options
            })
        }, TIMEOUT)
    })

    // MULTI SELECT CRUD - Create
    router.post("/api/multiselect", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data inserted correctly"
            })
        }, TIMEOUT)
    })

    // MULTI SELECT CRUD - DELETE
    router.delete("/api/multiselect", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data deleted correctly"
            })
        }, TIMEOUT)
    })
};


module.exports = expressMiddleWare;