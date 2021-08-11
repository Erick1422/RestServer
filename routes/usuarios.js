const { Router } = require('express');
const router = Router();


router.get('/', );

router.post('/', (req, res) => {
    res.json({
        msg: "post API"
    });
});

router.put('/', (req, res) => {
    res.json({
        msg: "put API"
    });
});

router.delete('/', (req, res) => {
    res.json({
        msg: "delete API"
    });
});

module.exports = router;