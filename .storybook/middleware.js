const express = require('express');
const bodyParser = require('body-parser');


const expressMiddleWare = router => {
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

    router.get("/api/getSelectOptions", (request, response) => {
        if (request.params.orderId === 'error') {
            response.status(500).send('Something broke!')
        }

        response.send({
            success: true,
            data: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4',
            ]
        }
        )

    })
};


module.exports = expressMiddleWare;