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
                    "name": makeRandomText(7)
                }
            )
        }

        setTimeout(() => {
            response.send({
                success: true,
                message: "Data inserted correctly",
                data
            })
        }, TIMEOUT)
    })
    router.post("/api/crud", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data inserted correctly"
            })
        }, TIMEOUT)
    })
    router.put("/api/crud", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data updated correctly"
            })
        }, TIMEOUT)
    })
    router.delete("/api/crud", (request, response) => {
        setTimeout(() => {
            response.send({
                success: true,
                message: "Data deleted correctly"
            })
        }, TIMEOUT)
    })
};


module.exports = expressMiddleWare;