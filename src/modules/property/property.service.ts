import { prisma } from "../../lib/prisma";
import { IProperty } from "./property.interface";


const createProperty = async (
  payload: IProperty,
  landlordId: string
) => {


  const result = await prisma.property.create({

    data:{
      ...payload,
      landlordId
    }

  });


  return result;

};



const getAllProperties = async()=>{


 const result = await prisma.property.findMany({

    include:{
      category:true,
      landlord:{
        select:{
          id:true,
          name:true,
          email:true
        }
      }
    }

 });


 return result;

};



const getSingleProperty = async(
 id:string
)=>{


 const result = await prisma.property.findUnique({

    where:{
      id
    },

    include:{
      category:true,
      landlord:{
        select:{
          id:true,
          name:true,
          email:true
        }
      }
    }

 });


 return result;

};



export const PropertyService={

 createProperty,
 getAllProperties,
 getSingleProperty

};