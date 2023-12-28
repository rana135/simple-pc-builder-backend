import { IPc } from "./pc.interface";
import { PCParts } from "./pc.model";
 

const getAll = async (): Promise<IPc | null> => {
  const pcparts = await PCParts.find({}).exec();
  return pcparts;
}

const createPc = async ( pcDetails: IPc): Promise<IPc | null> => {
  const newPc = await PCParts.create(pcDetails)
  return newPc
}
const getSingleProduct = async (id: string): Promise<IPc | null> => {
  const newPc = await PCParts.findOne({ _id: id}).exec()
  return newPc;
}

export const PCService = {
  getAll,
  createPc,
  getSingleProduct
}
