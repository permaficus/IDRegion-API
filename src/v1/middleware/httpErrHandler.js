import express from 'express'

export const badRequest = async ( err, res, next ) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).send({
            status: 'ERR_BAD_REQUEST',
            code: res.statusCode,
            details: `Oops..there is something wrong with your request`
        }).end();
        return;
    }

    next();
}
export const PathNotFound = async (err, res) => {
    res.status(404).json({
        status: 'ERR_NOT_FOUND',
        code: 404,
        errors: {
            message: `URL Not Found - ${err.originalUrl}`,
            method: err.method
        }
    })
}