/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */


import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"  
import ApiError from "../errors/ApiErorr"
import handleCastError from "../errors/handleCastError"
import handleValidationError from "../errors/handleValidationError"
import handleZodError from "../errors/handleZodError" 
import config from "../../../config"
 

export type IGenericErrorMessage = {
    path: string | number
    message: string
}
 
export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessage: IGenericErrorMessage[]

}

export type IGenericResponse<T> = {
    meta: {
      page: number,
      limit: number,
      total: number,
    }
    data: T
}

const globalErrorHandler: ErrorRequestHandler
    = (error, req,  res, next ) => {
 
        let statusCode = 500
        let message = 'Something went wrong!'
        let errorMessage: IGenericErrorMessage[] = []

        if (error?.name === 'ValidationError') {
            const simplifiedError = handleValidationError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error?.name === 'CastError') {
            const simplifiedError = handleCastError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error instanceof ZodError) {
            const simplifiedError = handleZodError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error instanceof ApiError) {
            statusCode = error?.statusCode;
            message = error.message;
            errorMessage = error?.message ?
                [
                    {
                        path: '',
                        message: error?.message
                    }
                ] : []
        }

        else if (error instanceof Error) {
            message = error?.message
            errorMessage = error?.message ?
                [
                    {
                        path: '',
                        message: error?.message
                    }
                ] : []

        }
 
        res.json({
            sucess: false,
            message,
            errorMessage,
            stack: config.env !== 'production' ? error?.stack : undefined
        })
        // next()
    }

export default globalErrorHandler; 