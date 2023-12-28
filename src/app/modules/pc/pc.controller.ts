import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../middlewares/catchAsync"
import sendResponse from "../../middlewares/sendResponse"
import { IPc } from "./pc.interface"
import { PCService } from "./pc.service" 
import httpStatus from 'http-status';

  
  const getAll = catchAsync(async (req: Request, res: Response) => {
    const result = await PCService.getAll()
    sendResponse<IPc>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ALL PC Parts Retrived Successfully',
      data: result,
    })
  })
 
  const createPc: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const { ...pcData } = req.body  
      const result = await PCService.createPc(pcData)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Parts created successfully',
        data: result,
      })
    },
  )

  const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await PCService.getSingleProduct(id) 
    sendResponse<IPc>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single PC information Retrived Successfully',
      data: result,
    })
  })
  

  export const PCController = {
    getAll,
    createPc,
    getSingleProduct
  }